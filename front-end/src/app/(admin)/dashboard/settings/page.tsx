"use client";
import AdminHeader from "@/components/admin/adminHeader";
import Link from "next/link";
import React, { useState, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import InputField from "@/components/Form/inputfield";
import Button from "@/components/Button/button";
import { Admin } from "@/lib/types/admin.type";
import { getAdminByUserId, updateAdminByUserId } from "@/lib/api/admin.api";
import { useAuth } from "@/Provider/context/authContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SweetAlert from "@/components/alert/alert";
import { getAllPayments, updatePayment } from "@/lib/api/payment.api";
import { Payment } from "@/lib/types/payment.type";
import { NewPassword } from "@/lib/api/user.api";

interface PaymentForm {
  paymentName: string;
  qrImage: File | null;
  previewUrl: string;
}

const SettingsPage = () => {
  const { user, updateUserData } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [paymentForms, setPaymentForms] = useState<PaymentForm[]>([
    { paymentName: "", qrImage: null, previewUrl: "" },
    { paymentName: "", qrImage: null, previewUrl: "" },
  ]);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Define showLoadingToast first
  const showLoadingToast = () => {
    return toast.loading("Please wait...", {
      position: "top-right",
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const fetchPayments = async () => {
    const toastId = showLoadingToast();

    try {
      const response = await getAllPayments();
      if (response.success) {
        setPayments(response.data);
        toast.dismiss(toastId);
      } else {
        toast.update(toastId, {
          render: "Failed to fetch payments",
          type: "error",
          isLoading: false,
        });
      }
    } catch (error) {
      setError("Failed to fetch payments");
      console.error("Error fetching payments:", error);
      toast.update(toastId, {
        render: "Failed to fetch payments",
        type: "error",
        isLoading: false,
      });
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const userId = user?.user_id;
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        console.log("Fetching admin data for userId:", userId);
        const response = await getAdminByUserId(userId as any);
        console.log("Admin API response:", response);
        setAdmin(response.data[0]);
      } catch (err) {
        console.error("Error fetching admin:", err);
        setError("Failed to fetch admin data");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      // Only fetch if userId exists
      fetchAdmin();
    }
  }, [userId]);

  useEffect(() => {
    const initializePaymentForms = () => {
      if (payments.length > 0) {
        const initializedForms = payments.map((payment) => ({
          paymentName: payment.payment_name,
          qrImage: null,
          previewUrl: payment.payment_image || "",
        }));
        setPaymentForms(initializedForms);
      }
    };

    if (payments.length > 0) {
      initializePaymentForms();
    }
  }, [payments]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleNameChange = (index: number, value: string) => {
    const updatedForms = [...paymentForms];
    updatedForms[index].paymentName = value;
    setPaymentForms(updatedForms);
  };

  const handleImageChange = (index: number, file: File) => {
    const updatedForms = [...paymentForms];
    updatedForms[index].qrImage = file;
    updatedForms[index].previewUrl = URL.createObjectURL(file);
    setPaymentForms(updatedForms);
  };

  const handleSinglePaymentUpdate = async (index: number) => {
    const toastId = showLoadingToast();

    try {
      const form = paymentForms[index];
      const payment = payments[index];

      // Check if anything has changed
      const hasNameChanged = form.paymentName !== payment.payment_name;
      const hasImageChanged = form.qrImage !== null;

      // If nothing has changed, show message and return
      if (!hasNameChanged && !hasImageChanged) {
        toast.info("No changes detected");
        return;
      }

      const formData = new FormData();

      // Only append changed fields
      if (hasNameChanged) {
        if (!form.paymentName) {
          toast.error("Please enter a payment method name");
          return;
        }
        formData.append("payment_name", form.paymentName);
      }

      if (hasImageChanged && form.qrImage) {
        formData.append("payment_image", form.qrImage);
      }

      const response = await updatePayment(
        payment.payment_id,
        payment.admin_id,
        formData
      );

      if (response.success) {
        toast.update(toastId, {
          render: "Payment updated successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        await fetchPayments();
      } else {
        toast.update(toastId, {
          render: response.message || "Failed to update payment",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error updating payment method:", error);
      toast.update(toastId, {
        render:
          error instanceof Error ? error.message : "Failed to update payment",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleInputChange = (field: keyof Admin, value: string) => {
    if (admin) {
      setAdmin({
        ...admin,
        [field]: value,
      });
    }
  };

  const handleSaveChanges = async () => {
    if (!admin || !userId) return;

    try {
      const result = await SweetAlert.showConfirm(
        "You want to save these changes?"
      );

      if (!result) {
        return;
      }

      const updateData = {
        user_id: Number(userId),
        first_name: admin.first_name,
        last_name: admin.last_name,
        email: admin.email,
        phone_number: admin.phone_number,
        address: admin.address,
      };

      const response = await updateAdminByUserId(userId, updateData as any);

      if (response.data) {
        toast.success("Profile updated successfully");
        // Update admin state
        setAdmin((prevAdmin) =>
          prevAdmin
            ? {
                ...prevAdmin,
                ...updateData,
                user_id: Number(userId),
                admin_id: prevAdmin.admin_id,
                permissions: prevAdmin.permissions,
              }
            : null
        );

        // Update user state in AuthContext
        updateUserData({
          first_name: admin.first_name,
          last_name: admin.last_name,
          email: admin.email,
        });
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile: " + (error as Error).message);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!"); // Show error if passwords don't match
      return;
    }

    try {
      await NewPassword(newPassword); // Call the API function
      toast.success("Password updated successfully"); // Show success message
    } catch (error) {
      toast.error("Error updating password: " + (error as Error).message); // Show error message
    }
  };

  return (
    <div className="w-full">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-full pb-5">
        <AdminHeader>
          <h1 className="text-[14px] flex items-end text-blackColor/70 tracking-[2px]">
            <Link href="/dashboard">Dashboard</Link>/ Settings
          </h1>
        </AdminHeader>
      </div>
      <div className="w-full px-[2%]">
        <div className="flex gap-2 mb-4">
          <span
            className={`cursor-pointer px-4 py-1 ${
              activeTab === "profile"
                ? "border-b-2 border-primaryColor text-primaryColor font-medium"
                : "text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Personal Information
          </span>
          <span
            className={`cursor-pointer px-4 py-1 ${
              activeTab === "payment"
                ? "border-b-2 border-primaryColor text-primaryColor font-medium"
                : "text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("payment")}
          >
            Payment Qr Code
          </span>
          <span
            className={`cursor-pointer px-4 py-1 ${
              activeTab === "changepassword"
                ? "border-b-2 border-primaryColor text-primaryColor font-medium"
                : "text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("changepassword")}
          >
            Change Password
          </span>
        </div>

        {activeTab === "profile" && (
          <div className="w-full flex justify-between">
            <div className="bg-white p-4 rounded-lg shadow-sm w-[70%]">
              <h2 className="text-[20px] font-semibold mb-6">
                Profile Settings
              </h2>
              <div className="w-full">
                <div className="grid grid-cols-2 gap-6 mb-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <InputField
                      type="text"
                      placeholder="Enter first name"
                      className="w-full"
                      value={admin?.first_name || ""}
                      onChange={(e) =>
                        handleInputChange("first_name", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <InputField
                      type="text"
                      placeholder="Enter last name"
                      className="w-full"
                      value={admin?.last_name || ""}
                      onChange={(e) =>
                        handleInputChange("last_name", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <InputField
                      type="email"
                      placeholder="Enter email address"
                      className="w-full"
                      value={admin?.email || ""}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <InputField
                      type="number"
                      placeholder="Enter phone number"
                      className="w-full"
                      value={admin?.phone_number || "dwad"}
                      onChange={(e) =>
                        handleInputChange("phone_number", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <InputField
                      type="text"
                      placeholder="Enter full address"
                      className="w-full"
                      value={admin?.address || ""}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      name="Save Changes"
                      backgroundColor="alert"
                      onClick={handleSaveChanges}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[30%]">
              <div className="bg-white border rounded-lg px-6 py-4 shadow-sm">
                <h3 className="text-[18px] font-semibold mb-4 text-gray-800">
                  Account Details
                </h3>

                {/* Status Badge */}
                <div className="mb-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <span className="w-2 h-2 mr-2 rounded-full bg-green-500"></span>
                    Active Account
                  </span>
                </div>

                {/* Role Section */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <svg
                      className="w-5 h-5 mr-2 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span className="font-semibold text-gray-700">Role</span>
                  </div>
                  <p className="text-blue-600 font-medium">Super Admin</p>
                </div>

                {/* Permissions Section */}
                <div className="space-y-4">
                  <div className="flex items-center mb-2">
                    <svg
                      className="w-5 h-5 mr-2 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-semibold text-gray-700">
                      Permissions
                    </span>
                  </div>
                  <div className="space-y-2 ml-7">
                    {/* Permission Items */}
                    {[
                      "Dashboard Access",
                      "User Management",
                      "Content Management",
                      "Booking Management",
                      "Settings Management",
                    ].map((permission) => (
                      <div
                        key={permission}
                        className="flex items-center text-sm"
                      >
                        <svg
                          className="w-4 h-4 mr-2 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-600">{permission}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "payment" && (
          <div className="w-full text-[blackColor]">
            <div className="bg-white px-6 rounded-lg shadow-sm">
              <h2 className="text-[16px] font-medium mb-4">Payment Methods</h2>

              {paymentForms.map((form, index) => (
                <div key={index} className="mb-2 p-4 border rounded-lg">
                  <h3 className="text-[14px] font-medium mb-4">
                    Payment Method {index + 1}
                  </h3>
                  <div className="w-full flex justify-between gap-4">
                    <div className="w-[40%]">
                      <label
                        htmlFor={`paymentName-${index}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        Payment Method Name
                      </label>
                      <InputField
                        type="text"
                        id={`paymentName-${index}`}
                        value={form.paymentName}
                        onChange={(e) =>
                          handleNameChange(index, e.target.value)
                        }
                        placeholder="Enter payment method name"
                        width="300px"
                      />
                    </div>
                    <div className="w-[37%]">
                      <label
                        htmlFor={`paymentImage-${index}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        Upload QR Code Image
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          id={`paymentImage-${index}`}
                          accept="image/*"
                          onChange={(e) =>
                            e.target.files?.[0] &&
                            handleImageChange(index, e.target.files[0])
                          }
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="mt-1 flex items-center">
                          <button
                            type="button"
                            className="px-4 py-2 bg-primaryColor text-white rounded-l-[5px] hover:bg-indigo-700"
                          >
                            Choose File
                          </button>
                          <span className="flex-1 px-4 py-2 border border-l-0 border-gray-300 rounded-r-[5px] bg-white text-gray-500 truncate">
                            {form.qrImage?.name ||
                              payments[index]?.payment_name ||
                              "No file chosen"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-[22%]">
                      <p className="text-sm font-medium text-gray-700">
                        Preview:
                      </p>
                      <div className="border border-gray-200 rounded-lg mt-2">
                        {(form.previewUrl ||
                          payments[index]?.payment_image) && (
                          <div className="relative">
                            <Image
                              src={
                                form.previewUrl ||
                                payments[index]?.payment_image
                              }
                              alt="QR Code Preview"
                              width={200}
                              height={200}
                              className="w-full h-auto rounded-lg aspect-[180/130] object-contain"
                              unoptimized={true}
                            />
                          </div>
                        )}
                      </div>
                      {form.paymentName !== payments[index]?.payment_name &&
                        form.paymentName !== "" &&
                        form.qrImage !== null && (
                          <Button
                            name="Update Payment Method"
                            backgroundColor="alert"
                            onClick={() => handleSinglePaymentUpdate(index)}
                          />
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "changepassword" && (
          <div className="bg-white p-4 rounded-lg shadow-sm w-full mt-6">
            <h2 className="text-[20px] font-semibold mb-6">Change Password</h2>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  New Password
                </label>
                <InputField
                  type="password"
                  placeholder="Enter new password"
                  className="w-full"
                  value={newPassword} // Bind state
                  onChange={(e) => setNewPassword(e.target.value)} // Update state on change
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <InputField
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full"
                  value={confirmPassword} // Bind state
                  onChange={(e) => setConfirmPassword(e.target.value)} // Update state on change
                />
              </div>
              <div className="pt-4">
                <Button
                  name="Change Password"
                  backgroundColor="alert"
                  onClick={handleChangePassword} // Add onClick handler
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
