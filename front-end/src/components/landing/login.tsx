"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import InputField from "@/components/Form/inputfield";
import { MdEmail, IoMdLock } from "@/components/icons/index";
import Button from "@/components/Button/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Password } from "primereact/password";

const LoginPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation for empty fields
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Regular expression for validating an email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email is valid
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError(null);

    // Show loading toast
    toast.loading("Loading, please wait...");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!res.ok) {
        throw new Error("Invalid email or password.");
      }

      const data = await res.json();
      const { token, role } = data; // Extract token and role from the response

      // Store the token and role in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      // Redirect based on role
      if (role === "admin") {
        router.push(`/dashboard?${token}`);
      } else if (role === "driver") {
        router.push(`/driver?${token}`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      toast.dismiss(); // Dismiss the loading toast
    }
  };
  // Trigger modal visibility with a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalVisible(true);
    }, 300); // Delay for the animation, adjust as needed
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div className="relative w-full h-screen bg-blackColor/50 flex justify-center pt-[6%] text-blackColor">
      {/* Modal container */}
      <ToastContainer />
      <div
        className={`absolute z-10  h-auto bg-white px-6 pb-6 rounded-[5px] shadow-lg transition-transform duration-500 ease-in-out transform ${
          isModalVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"
        } `}
      >
        <div className="w-full flex justify-center flex-col items-center">
          <Image
            src="/van_gif.gif"
            width={180}
            height={50}
            alt="Van Gif"
          ></Image>
          <h1 className="text-[24px] font-medium mb-1 text-primaryColor">
            Hello, Welcome!
          </h1>
          <p className="mb-2 text-primaryColor">
            Enter your credentials to access your account
          </p>
          <form action="" onSubmit={handleSubmit} className="w-full">
            <div className="w-full flex flex-col gap-4">
              <div className="w-full">
                {error && (
                  <p
                    style={{ color: "#D0342C" }}
                    className="text-[14px] h-[35px] bg-red-300 pl-4 flex items-center rounded-[3px]"
                  >
                    {error}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-[20px]">
                <InputField
                  id="email"
                  type="email"
                  placeholder="Enter your Email / Username"
                  icon={
                    <MdEmail
                      className={`${email ? "text-primaryColor" : "text-[#CCCCCC]"} size-[20px]`}
                    />
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state on input change
                />
                <div className="relative w-full flex items-center ">
                  <IoMdLock
                    className={`ml-[10px] z-10 ${password ? "text-primaryColor" : "text-[#CCCCCC]"} size-[20px] `}
                  />
                  <Password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update password state on input change
                    feedback={false}
                    placeholder="Enter your password"
                    toggleMask // This will toggle the visibility of the password
                    pt={{
                      input: {
                        className:
                          "py-2 border rounded-[3px] placeholder:text-[#CCCCCC] placeholder:font-light focus:ring-0 ",
                      },
                    }}
                    className="absolute left-0 w-full password_container"
                  />
                </div>
              </div>
              <p className="text-[14px]">
                Forgot your password ?{" "}
                <Link href="/forgot-password">
                  <span className="text-button underline">Click Here !</span>
                </Link>
              </p>
              <div className="flex w-full gap-2  items-center justify-center px-2 bg-button">
                <Button
                  type="submit"
                  name={loading ? "Logging in..." : "Login"}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
