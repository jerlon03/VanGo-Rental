"use client";
import React, { useEffect, useState } from "react";
import { FaMapLocationDot, RiErrorWarningFill } from "@/components/icons";
import Image from "next/image";
import InputField from "@/components/Form/inputfield";
import { getDriver, updateDriver } from "@/lib/api/driver.api";
import { ApiResponse } from "@/lib/types/driver.type";
import { useAuth } from "@/Provider/context/authContext";
import Button from "@/components/Button/button";
import Modal from "@/components/modals/modalContainer";
import { BsPencilSquare } from "react-icons/bs";
import SweetAlert from "@/components/alert/alert";
import { Van } from "@/lib/types/van.type";
import { getVanDetailsById } from "@/lib/api/van.api";
import { formatDatePublicRange } from "@/components/date/formatDate";
import { fetchBookingStatusCountsByVanId } from "@/lib/api/booking.api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DriverDashboard = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Added loading state
  const [error, setError] = useState<string | null>(null); // Added error state
  const { user, loading: authLoading } = useAuth();
  const userId = user?.user_id;
  const [vanData, setVanData] = useState<Van | null>(null);
  const [firstName, setFirstName] = useState<string>(
    data?.user.first_name || ""
  ); // Added state for first name
  const [lastName, setLastName] = useState<string>(data?.user.last_name || ""); // Added state for last name
  const [email, setEmail] = useState<string>(data?.user.email || ""); // Added state for email
  const [location, setLocation] = useState<string>(data?.driver.Location || ""); // Added state for location
  const [phoneNumber, setPhoneNumber] = useState<string>(
    data?.driver.phoneNumber || ""
  ); // Added state for phone number
  const [experience, setExperience] = useState<string>(""); // Added state for experience
  const [vanId, setVanId] = useState<string | null>(null);
  const [bookingStatusCounts, setBookingStatusCounts] = useState<{
    [key: string]: number;
  } | null>(null); // Added state for booking status counts

  useEffect(() => {
    if (!authLoading && userId) {
      const fetchData = async () => {
        try {
          const result = await getDriver(userId as any);
          setData(result);
          console.log("Driver Data:", result); // Log the entire driver data
        } catch (err) {
          setError("Error fetching user and driver details");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
    const fetchVanDetails = async () => {
      if (!vanId) return;
      try {
        const data = await getVanDetailsById(vanId as any);
        setVanData(data.data);

        // Fetch booking status counts for the van
        const statusCounts = await fetchBookingStatusCountsByVanId(vanId);
        setBookingStatusCounts(statusCounts); // Set the booking status counts
      } catch (error: any) {
        console.error("Error fetching van details:", error);
        setError("Failed to fetch van details");
      }
    };
    fetchVanDetails();
  }, [userId, authLoading, vanId]);

  useEffect(() => {
    if (data) {
      console.log("Driver Data:", data); // Log the entire driver data
      setFirstName(data.user.first_name);
      setLastName(data.user.last_name);
      setEmail(data.user.email);
      setLocation(data.driver.Location);
      setPhoneNumber(data.driver.phoneNumber);
      setExperience(
        data.driver.experience_years === 0
          ? ""
          : `${data.driver.experience_years}`
      );
      setVanId(data.driver.van_id as any);
    }
  }, [data]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setExperience(value);
    }
  };

  const handleUpdateDriver = async () => {
    // Confirmation before submission
    const confirmUpdate = SweetAlert.showConfirm(
      "Are you sure you want to update your information?"
    );
    if (!confirmUpdate) return; // Exit if the user cancels

    const updatedData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      experience_years: experience ? parseInt(experience) : 0,
      vehicle_assigned: "VAN-05",
      phoneNumber: phoneNumber,
      location: location,
    };

    try {
      await updateDriver(userId as any, updatedData);
      setIsModalOpen(false);
      const result = await getDriver(userId as any);
      setData(result);
      toast.success("Information updated successfully!");
    } catch (err) {
      setError("Error updating driver information");
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchVanDetails = async () => {
      if (!vanId) return;
      try {
        const data = await getVanDetailsById(vanId as any);
        setVanData(data.data);
      } catch (error: any) {
        console.error("Error fetching van details:", error);
        setError("Failed to fetch van details");
      }
    };

    fetchVanDetails();
  }, [vanId]);

  return (
    <div className="w-full">
      <ToastContainer />
      {error && <p className="text-red-500">{error}</p>}
      <p className="p-2 tracking-[1px]">
        Welcome ,
        <span className="font-semibold"> {data?.user.first_name}!</span>
      </p>
      <div className="w-full flex flex-col md:flex-row gap-[15px]">
        <div className="w-full md:w-[100%] lg:w-[80%] flex md:flex-row md:gap-[25px] sm:gap-[10px]">
          {[
            {
              title: "Active Trips",
              count: bookingStatusCounts?.ongoing || 0,
              message: "No Active Trips Yet",
            },
            {
              title: "Upcoming Trips",
              count: bookingStatusCounts?.confirmed || 0,
              message: "No Upcoming Trips Yet",
            },
            {
              title: "Completed Trips",
              count: bookingStatusCounts?.completed || 0,
              message: "No Completed Trips Yet",
            },
          ].map((trip, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-[#003459] via-[#00698c] to-[#00b0c1] bg-[#FFFFFF] w-full rounded-[5px] md:h-[100px] sm:h-[90px] flex md:justify-center sm:justify-evenly md:items-center sm:items-start gap-[10px]"
            >
              <div className="border p-2 bg-white rounded-full md:block sm:hidden">
                <FaMapLocationDot
                  size={30}
                  className={`text-yellow group-hover:text-button `}
                />
              </div>
              {trip.count > 0 ? (
                <div className="text-[25px] font-semibold flex flex-col justify-center items-center text-yellow">
                  {trip.count}{" "}
                  <span className="font-medium text-white md:text-[18px] sm:text-[14px] sm:text-center">
                    {trip.title}
                  </span>
                </div>
              ) : (
                <span className="font-medium text-white md:text-[18px] sm:text-[14px] flex justify-center items-center h-full text-center">
                  {trip.message}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Driver Information */}
      <div className="w-full pt-[3%] flex flex-col md:flex-row gap-[20px]">
        <div className="flex w-full md:w-[50%]">
          <div className="bg-white shadow-lg rounded-lg md:p-6 sm:p-3 w-full ">
            <h1 className="md:text-[18px] sm:text-[15px] font-bold mb-4 text-blackColor">
              {/* {data?.user.first_name} {data?.user.last_name} */} Your
              Information :
            </h1>
            <p className="text-gray-700 flex gap-4 md:text-[16px] sm:text-[14px]">
              <strong>ID:</strong>DR-0{data?.driver.driver_id}
            </p>
            <div className="table w-full md:text-[16px] sm:text-[14px]">
              <div className="table-row">
                <p className="table-cell font-semibold">Email:</p>
                <span className="table-cell">{data?.user.email}</span>
              </div>
              <div className="table-row md:text-[16px] sm:text-[14px]">
                <p className="table-cell font-semibold">Van Assigned:</p>
                <span className="table-cell">
                  VAN-O{data?.driver.van_id || "N/A"}
                </span>
              </div>
              <div className="table-row md:text-[16px] sm:text-[14px]">
                <p className="table-cell font-semibold">Driver Experience:</p>
                <span className="table-cell">
                  {data?.driver.experience_years === 0
                    ? "N/A"
                    : `${data?.driver.experience_years} years of Experience`}
                </span>
              </div>
              <div className="table-row md:text-[16px] sm:text-[14px]">
                <p className="table-cell font-semibold">Phone Number:</p>
                <span className="table-cell">
                  {data?.driver.phoneNumber || "N/A"}
                </span>
              </div>
              <div className="table-row md:text-[16px] sm:text-[14px]">
                <p className="table-cell font-semibold">Location:</p>
                <span className="table-cell">
                  {data?.driver.Location || "N/A"}
                </span>
              </div>
            </div>
            <div className="pt-4 flex justify-end">
              <Button
                name="Update Your Info"
                width="180px"
                onClick={handleOpenModal}
                icon={BsPencilSquare}
              />
            </div>
          </div>
        </div>

        {/* Van Assigned Section */}
        <div className="w-full md:w-[50%]">
          <div className="bg-white shadow-lg rounded-lg md:p-6 sm:p-3">
            <h1 className="text-xl font-bold mb-4 text-blackColor md:text-[18px] sm:text-[15px]">
              Van Assigned
            </h1>
            {vanData ? (
              <div className="w-full flex flex-col justify-center items-center gap-4">
                <Image
                  src={vanData.van_image || "/png/van/van1.png"}
                  alt="Van"
                  className="object-cover rounded-md mr-4"
                  width={300}
                  height={200}
                />
                <div className="table md:w-[80%] sm:w-full">
                  {[
                    {
                      label: "Van ID:",
                      value: `VAN-O${vanData?.van_id || "N/A"}`,
                    },
                    { label: "Model:", value: vanData?.van_name || "N/A" },
                    {
                      label: "Things Capacity:",
                      value: `${vanData?.things_capacity} kg`,
                    },
                    {
                      label: "Number of Passenger:",
                      value: `${vanData?.people_capacity}`,
                    },
                    {
                      label: "Assigned Date:",
                      value: formatDatePublicRange(vanData?.createdAt || "N/A"),
                    },
                  ].map((item, index) => (
                    <div
                      className="table-row md:text-[16px] sm:text-[14px]"
                      key={index}
                    >
                      <p className="table-cell font-semibold">{item.label}</p>
                      <span className="table-cell truncate">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col justify-center items-center gap-4 py-8">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-600">
                    No Van Assigned Yet
                  </h3>
                  <p className="text-sm text-gray-500">
                    Please wait for admin to assign a van to you.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} width="500px">
        <div className="w-full bg-white rounded-[5px]">
          <div className="w-full h-[60px] flex pl-4 items-start justify-center bg-primaryColor rounded-t-[5px] flex-col text-white">
            <h2 className="text-[20px] text-white font-medium">
              Update Your Information
            </h2>
            <p className="font-normal text-[14px]">
              Here you can update your information.
            </p>
          </div>
          <div className="w-full p-4 flex flex-col gap-2">
            {[
              {
                label: "First Name",
                value: firstName,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setFirstName(e.target.value),
              },
              {
                label: "Last Name",
                value: lastName,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setLastName(e.target.value),
              },
              {
                label: "Email",
                value: email,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value),
              },
              {
                label: "Location",
                value: location,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  setLocation(e.target.value),
              },
              {
                label: "Phone Number",
                value: phoneNumber,
                onChange: handlePhoneNumberChange,
                maxLength: 11,
              },
              {
                label:
                  "How many years or months of driving experience do you have?",
                value: experience,
                onChange: handleExperienceChange,
                placeholder: "Enter a number only",
              },
            ].map((input, index) => (
              <div className="w-full" key={index}>
                <label htmlFor="" className="text-[14px]">
                  {input.label}
                </label>
                <InputField
                  value={input.value}
                  onChange={input.onChange}
                  maxLength={input.maxLength}
                  placeholder={input.placeholder}
                />
              </div>
            ))}
          </div>
          <div className="w-full flex gap-4 p-2 px-[2rem]">
            <Button name="CANCEL" onClick={handleCloseModal}></Button>
            <Button name="SUBMIT INFO" onClick={handleUpdateDriver}></Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DriverDashboard;
