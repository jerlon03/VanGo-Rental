import React, { useContext, useState, useEffect } from "react";
import { useLogoutContext } from "@/Provider/context/contextProvider";
import { useRouter } from "next/navigation";
import Button from "@/components/Button/button";
import SweetAlert from "../alert/alert";

const LogoutModal: React.FC = () => {
  const { isOpen, setIsOpen } = useLogoutContext();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Add event listener to close modal when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".modal-inner")) {
        // If clicked outside the modal content, close modal
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      // Make a request to the server to perform any necessary server-side logout operations
      const res = await fetch(`http://localhost:8080/users/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include any authentication headers if needed
        },
      });

      if (!res.ok) {
        throw new Error("Logout failed.");
      }

      // Remove the token and role from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      router.push("/login"); // Redirect to login page after logout
    } catch (error) {
      SweetAlert.showError("Logout failed");
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
      setIsOpen(false); // Close the modal after the operation
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`fixed h-screen inset-0 overflow-y-auto  z-[99] ${isOpen ? "block" : "hidden"}`}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-blackColor opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="modal-inner inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <h3 className="text-lg leading-6 font-semibold text-primaryColor">
                  LOG OUT
                </h3>
                <div className="mt-2">
                  <p className="text-[16px] text-gray-500">
                    Are you sure you want to logout?
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-5">
            <Button
              name={isLoading ? "Logging out..." : "LOG OUT"}
              onClick={handleLogout}
              backgroundColor="alert"
            ></Button>
            <Button
              onClick={closeModal}
              name="CANCEL"
              backgroundColor="error"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
