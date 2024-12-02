"use client";
import React, { useEffect, useState } from "react";
import Modal from "@/components/modals/modalContainer"; // Import the Modal component
import InputField from "@/components/Form/inputfield";
import Button from "@/components/Button/button";
import Link from "next/link";
import Swal from "sweetalert2"; // Ensure you import Swal from SweetAlert2
import { useRouter } from "next/navigation";
import { MdEmail } from "react-icons/md";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [warning, setWarning] = useState(""); // State for warning messages
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true); // Show modal after delay
      setIsAnimating(true); // Trigger animation
    }, 300); // Delay for the animation, adjust as needed

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const handleEmailSubmission = async (email: string) => {
    setEmail(email);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        }
      );

      // Check if the response is OK
      if (!response.ok) {
        const errorData = await response.json(); // Parse the error response
        // Check for specific error message for non-existing email
        if (errorData.message === "Email does not exist") {
          // Show SweetAlert for non-existing email
          Swal.fire({
            title: "Warning!",
            text: "The entered email does not exist in our records.",
            icon: "warning",
            confirmButtonText: "try Again",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text:
              errorData.message || "An error occurred while sending the email.",
            icon: "error",
            confirmButtonText: "Okay",
          });
        }
        return; // Exit if there was an error
      }

      // If successful, handle the success response
      const data = await response.json(); // Parse the success response
      console.log(data.message); // Log the success message or handle it as needed

      // Show SweetAlert on submit
      Swal.fire({
        title: "Success!",
        text: "Instructions to reset your password have been sent to your email. Please Check Email Account",
        icon: "success",
        confirmButtonText: "Continue",
      }).then(() => {
        // Open the link in a new tab
        window.open(
          "https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&emr=1&ltmpl=default&ltmplcache=2&osid=1&passive=true&rm=false&scc=1&service=mail&ss=1&ifkv=AcMMx-fPoSa09y4KG-adLY-xsoE1sS7VDGgi7IP1SWTfl4tnqRZkw336VuOSUv8Iy-RoLi4-s2Fp&ddm=0&flowName=GlifWebSignIn&flowEntry=ServiceLogin",
          "_blank"
        );
      });
    } catch (error) {
      console.error("Error sending request:", error);
      Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred. Please try again later.",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email format
    if (!emailRegex.test(email)) {
      setWarning("Please enter a valid email address."); // Set warning message
      return; // Exit the function if the email is invalid
    } else {
      setWarning(""); // Clear warning if email is valid
    }

    // Call the function to handle email submission
    await handleEmailSubmission(email); // Call the email submission function

    setIsModalOpen(false);
  };

  return (
    <div className="relative w-full h-screen bg-blackColor/50 flex justify-center items-center text-blackColor">
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        width="400px"
        height="auto"
        className="items-center "
      >
        <div
          className={`transform bg-white rounded-[5px] text-blackColor py-8 px-6 transition-transform duration-500 ease-in-out ${isAnimating ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
          onAnimationEnd={() => setIsAnimating(false)}
        >
          <h2 className="text-[20px] font-semibold mb-2">Forgot Password </h2>
          <p className="text-[15px] mb-4">
            Enter the email address you used to create the account and we will
            email you instructions to reset your password.
          </p>
          {warning && <p className="text-red-500 mb-2">{warning}</p>}{" "}
          {/* Display warning message */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 items-center"
          >
            <div className="w-full">
              <label htmlFor="email" className="block font-medium">
                Email Address:
              </label>
              <InputField
                icon={
                  <MdEmail
                    className={`${email ? "text-primaryColor" : "text-[#CCCCCC]"} size-[20px]`}
                  />
                }
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
              />
            </div>
            <Button
              type="submit"
              name="Send Email"
              backgroundColor="alert"
              height="40px"
            ></Button>
            <p className="text-[15px]">
              Remember Password?{" "}
              <Link href="/login" className="text-button underline text-[15px]">
                Login
              </Link>
            </p>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ForgotPassword;
