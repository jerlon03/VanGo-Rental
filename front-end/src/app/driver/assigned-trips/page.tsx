"use client";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button/button";
import { formatDatePublicRange } from "@/components/date/formatDate";
import SweetAlert from "@/components/alert/alert";
import { GoDotFill } from "react-icons/go";
import {
  fetchBookingByVanId,
  updateBookingStatus,
} from "@/lib/api/booking.api";
import { BookingDetails } from "@/lib/types/booking.type";
import { useAuth } from "@/Provider/context/authContext";
import { getDriver } from "@/lib/api/driver.api";
import { ApiResponse } from "@/lib/types/driver.type";
import { fetchUpdateVanStatus } from "@/lib/api/van.api";

// Modified helper function to check if trip can be started
const canStartTrip = (pickupDateTime: string): boolean => {
  const pickupTime = new Date(pickupDateTime);
  const currentTime = new Date();
  // Allow starting the trip only at or after the pickup time
  return currentTime >= pickupTime;
};

const AssignedTrips = () => {
  const { user, loading: authLoading } = useAuth();
  const [view, setView] = useState("active");
  const [data, setData] = useState<BookingDetails[]>([]);
  const [dataDriver, setDataDriver] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Added error state

  const userId = user?.user_id;
  useEffect(() => {
    if (!authLoading && userId) {
      const fetchData = async () => {
        try {
          const result = await getDriver(userId as any);
          setDataDriver(result as any);
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
  }, [userId, authLoading]);

  // Fetch bookings when component mounts
  const vanId = dataDriver?.driver.van_id;
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookings = await fetchBookingByVanId(vanId as any);
        setData(bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        SweetAlert.showError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [vanId]);

  // Add useEffect to check trip times periodically
  useEffect(() => {
    // Check every minute if any trips can be started
    const interval = setInterval(() => {
      setData((prevData) => [...prevData]); // Force re-render to update button states
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  // Modified handleStartTrip function
  const handleStartTrip = async (booking: BookingDetails) => {
    if (!canStartTrip(booking.pickup_date_time.toString())) {
      const pickupTime = new Date(booking.pickup_date_time);
      SweetAlert.showWarning(
        `Trip can only be started at the scheduled pickup time.\nPlease wait until ${pickupTime.toLocaleTimeString()}`
      );
      return;
    }

    SweetAlert.showConfirm("Are you sure you want to start this trip?").then(
      async (result) => {
        if (result) {
          try {
            await updateBookingStatus(booking.booking_id, "Ongoing");

            // Update the van status to "booked"
            await fetchUpdateVanStatus(booking.van_id, "booked");

            // Update local state with case-insensitive status matching
            const updatedData = data.map((item) => {
              if (item.booking_id === booking.booking_id) {
                return { ...item, status: "ongoing" };
              }
              return item;
            });

            setData(updatedData as any);
            setView("active"); // Automatically switch to active view
          } catch (error) {
            console.error("Error starting trip:", error);
            SweetAlert.showError("Failed to start trip");
          }
        }
      }
    );
  };

  const handleFinishTrip = async (booking: BookingDetails) => {
    SweetAlert.showConfirm("Are you sure you want to finish this trip?").then(
      async (result) => {
        if (result) {
          try {
            await updateBookingStatus(booking.booking_id, "Completed");

            // Update the van status to "available"
            await fetchUpdateVanStatus(booking.van_id, "available");

            // Update local state with case-insensitive status matching
            const updatedData = data.map((item) =>
              item.booking_id === booking.booking_id
                ? { ...item, status: "completed" }
                : item
            );
            setData(updatedData as any);
            setView("completed"); // Automatically switch to completed view
            SweetAlert.showSuccess(
              "Completed! The trip has been marked as completed."
            );
          } catch (error) {
            console.error("Error finishing trip:", error);
            SweetAlert.showError("Failed to finish trip");
          }
        }
      }
    );
  };

  return (
    <div className="w-full">
      <h1 className="text-[18px] font-semibold text-gray-800 md:pt-0 sm:pt-4">
        Assigned Trips
      </h1>
      <p className="text-[15px] "> Driver / Assigned Trips</p>
      <div className="w-full px-[2%] pt-[2%]">
        <div className="w-full pt-5 flex md:gap-4 sm:gap-2">
          <p
            onClick={() => setView("active")}
            className={
              view === "active"
                ? "cursor-pointer font-bold border-b-2 md:text-[16px] sm:text-[14px] px-4 sm:px-0 flex justify-center border-blackColor text-blackColor"
                : "cursor-pointer md:text-[16px] sm:text-[14px] "
            }
          >
            Active
          </p>
          <p>|</p>
          <p
            onClick={() => setView("upcoming")}
            className={
              view === "upcoming"
                ? "cursor-pointer font-bold border-b-2  md:text-[16px] sm:text-[14px] md:px-4 sm:px-0 flex justify-center border-blackColor text-blackColor"
                : "cursor-pointer md:text-[16px] sm:text-[14px]"
            }
          >
            Upcoming
          </p>
          <p>|</p>
          <p
            onClick={() => setView("completed")}
            className={
              view === "completed"
                ? "cursor-pointer font-bold border-b-2 px-4 sm:px-0  md:text-[16px] sm:text-[14px]  flex justify-center border-blackColor text-blackColor"
                : "cursor-pointer md:text-[16px] sm:text-[14px]"
            }
          >
            Completed
          </p>
        </div>
        <div className="pt-6">
          {view === "active" && (
            <div className="flex flex-col gap-4">
              {data.filter((item) => item.status === "ongoing").length === 0 ? (
                <div className="flex items-center justify-center min-h-[120px] bg-gray-50 rounded-lg">
                  <div className="text-center p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      No Active Bookings yet.
                    </h3>
                    <p className="text-sm text-gray-500">
                      Please check the upcoming trips section for new bookings.
                    </p>
                  </div>
                </div>
              ) : (
                data
                  .filter((item) => item.status === "ongoing")
                  .map((trip, index) => (
                    <div key={index} className="w-full flex gap-6">
                      {/* Left Column - Date and Action */}
                      <div className="flex flex-col gap-4">
                        {/* Date Display */}
                        <div className="w-[120px] bg-gradient-to-br from-primaryColor to-blue-600 text-white rounded-lg shadow-md overflow-hidden">
                          <div className="text-center py-2 bg-black/10">
                            <span className="text-sm font-medium tracking-wider">
                              {new Date(trip.pickup_date_time)
                                .toLocaleDateString("en-US", { month: "long" })
                                .toUpperCase()}
                            </span>
                          </div>
                          <div className="text-center p-3">
                            <span className="block text-2xl font-bold">
                              {new Date(trip.pickup_date_time).getDate()}
                            </span>
                            <span className="text-sm opacity-90">
                              {new Date(trip.pickup_date_time)
                                .toLocaleDateString("en-US", {
                                  weekday: "short",
                                })
                                .toUpperCase()}
                            </span>
                          </div>
                        </div>

                        {/* Finish Button */}
                        <Button
                          name="FINISH TRIP"
                          onClick={() => handleFinishTrip(trip)}
                          className="w-[120px] bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2 font-medium"
                        />
                      </div>

                      {/* Right Column - Trip Details */}
                      <div className="flex-1 bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
                        <div className="grid grid-cols-2 gap-6 p-6 md:grid-cols-1">
                          {/* Customer Information */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-primaryColor"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                              <h2 className="text-lg font-semibold text-gray-800">
                                Customer Information
                              </h2>
                            </div>
                            <div className="space-y-3">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="text-gray-600">
                                  Customer Name
                                </div>
                                <div className="font-medium text-gray-800">
                                  {trip.first_name} {trip.last_name}
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="text-gray-600">
                                  Email Address
                                </div>
                                <div className="font-medium text-gray-800">
                                  {trip.email || "N/A"}
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="text-gray-600">
                                  Phone Number
                                </div>
                                <div className="font-medium text-gray-800">
                                  {trip.phone_number}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Pickup Information */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-primaryColor"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              <h2 className="text-lg font-semibold text-gray-800">
                                Pick Up Information
                              </h2>
                            </div>
                            <div className="space-y-3 text-websiteBlack">
                              <div className="grid grid-cols-2 gap-4">
                                <div className=""> Start Date & Time</div>
                                <div className="font-medium text-gray-800">
                                  {new Date(
                                    trip.pickup_date_time
                                  ).toLocaleString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    timeZone: "Asia/Manila",
                                  })}
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className=""> Booking End Date</div>
                                <div className="font-medium text-gray-800">
                                  {new Date(
                                    trip.booking_end_date
                                  ).toLocaleString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    timeZone: "Asia/Manila",
                                  })}
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="">Location</div>
                                <div className="font-medium text-gray-800 flex items-center">
                                  {trip.pickup_location}{" "}
                                  <GoDotFill className="text-[#cccccc]" />
                                  CEBU, {trip.city_or_municipality},{" "}
                                  {trip.barangay}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </div>
          )}
          {view === "upcoming" && (
            <div className="flex flex-col gap-4">
              {data.filter((item) => item.status === "confirmed").length ===
              0 ? (
                <div className="flex items-center justify-center min-h-[120px] bg-gray-50 rounded-lg">
                  <div className="text-center p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      No Upcomming Bookings yet.
                    </h3>
                    <p className="text-sm text-gray-500">
                      There are no upcoming bookings that confirmed from admin.
                    </p>
                  </div>
                </div>
              ) : (
                data
                  .filter((item) => item.status === "confirmed")
                  .map((booking) => (
                    <div key={booking.booking_id} className="w-full">
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="grid grid-cols-2 gap-8 md:grid-cols-1 lg:grid-cols-2">
                          {/* Customer Information Section */}
                          <div className="space-y-4">
                            <div className="flex items-center border-b pb-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-500 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                              <h2 className="text-lg font-semibold text-gray-800">
                                Customer Information
                              </h2>
                            </div>
                            <div className="grid gap-3 text-sm">
                              <div className="grid grid-cols-2 items-center">
                                <span className="text-gray-600 font-medium">
                                  Customer Name:
                                </span>
                                <span className="text-gray-800">
                                  {booking.first_name} {booking.last_name}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 items-center ">
                                <span className="text-gray-600 font-medium ">
                                  Email Address:
                                </span>
                                <span className="text-gray-800  truncate w-full max-w-[180px]">
                                  {booking.email || "N/A"}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 items-center">
                                <span className="text-gray-600 font-medium">
                                  Phone Number:
                                </span>
                                <span className="text-gray-800">
                                  {booking.phone_number}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Pickup Information Section */}
                          <div className="space-y-4">
                            <div className="flex items-center border-b pb-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-500 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              <h2 className="text-lg font-semibold text-gray-800">
                                Pick Up Information
                              </h2>
                            </div>
                            <div className="grid gap-3 text-sm">
                              <div className="grid grid-cols-2 items-center">
                                <span className="text-gray-600 font-medium">
                                  Start Date & Time:
                                </span>
                                <span className="text-gray-800">
                                  {new Date(
                                    booking.pickup_date_time
                                  ).toLocaleString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    timeZone: "Asia/Manila",
                                  })}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 items-center">
                                <span className="text-gray-600 font-medium">
                                  Start Date & Time:
                                </span>
                                <span className="text-gray-800">
                                  {new Date(
                                    booking.booking_end_date
                                  ).toLocaleString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    timeZone: "Asia/Manila",
                                  })}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 items-center">
                                <span className="text-gray-600 font-medium">
                                  Location:
                                </span>
                                <span className="text-gray-800">
                                  CEBU, {booking.city_or_municipality},{" "}
                                  {booking.barangay}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 items-center">
                                <span className="text-gray-600 font-medium">
                                  LandMark:
                                </span>
                                <span className="text-gray-800">
                                  {booking.pickup_location}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-6 flex justify-end">
                          <Button
                            name="Start The Trip"
                            onClick={() => handleStartTrip(booking)}
                            className={`px-6 py-2 rounded-md transition-colors duration-200 flex items-center gap-2 ${
                              canStartTrip(booking.pickup_date_time.toString())
                                ? "bg-blue-500 hover:bg-blue-600 text-white"
                                : "bg-gray-300 cursor-not-allowed text-gray-500"
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </div>
          )}
          {view === "completed" && (
            <div className="w-full">
              {data.filter((item) => item.status === "completed").length ===
              0 ? (
                <div className="flex items-center justify-center min-h-[120px] bg-gray-50 rounded-lg">
                  <div className="text-center p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      No Completed Bookings yet.
                    </h3>
                    <p className="text-sm text-gray-500">
                      There are no completed bookings to display at this time.
                    </p>
                  </div>
                </div>
              ) : (
                <DataTable
                  value={data.filter((item) => item.status === "completed")}
                  tableStyle={{ minWidth: "50rem" }}
                  pt={{
                    thead: { className: "bg-primaryColor text-white" },
                    tbody: { className: "border " },
                    headerRow: { className: "h-[40px] " },
                  }}
                >
                  <Column
                    field="customerName"
                    header="Customer Name"
                    body={(booking) => (
                      <span className="text-[14px]">
                        {booking.first_name} {booking.last_name}
                      </span>
                    )}
                    pt={{
                      bodyCell: {
                        className: "border text-blackColor p-2 text-[14px]",
                      },
                      headerCell: {
                        className: "px-3 font-medium text-[14px]  border-r",
                      },
                    }}
                  />
                  <Column
                    field="phone_number"
                    header="Phone No"
                    pt={{
                      bodyCell: {
                        className: "border text-blackColor p-2 text-[14px]",
                      },
                      headerCell: {
                        className: "px-3 font-medium text-[14px]  border-r",
                      },
                    }}
                  />
                  <Column
                    field="pickup_location"
                    header="Pick Up Location"
                    body={(booking) => (
                      <span className="text-[14px]">
                        {booking.pickup_location} • CEBU{" "}
                        {booking.city_or_municipality}, {booking.barangay}
                      </span>
                    )}
                    pt={{
                      bodyCell: {
                        className: "border text-blackColor p-2 text-[14px]",
                      },
                      headerCell: {
                        className: "px-3 font-medium text-[14px]  border-r",
                      },
                    }}
                  />
                  <Column
                    field="pickup_date_time"
                    header="Pick Up Date & Time"
                    pt={{
                      bodyCell: {
                        className: "border text-blackColor p-2 text-[14px]",
                      },
                      headerCell: {
                        className: "px-3 font-medium text-[14px]  border-r",
                      },
                    }}
                    body={(rowData) => (
                      <div>
                        {formatDatePublicRange(rowData.pickup_date_time)}
                      </div>
                    )}
                  />
                  <Column
                    field="status"
                    header="Status"
                    pt={{
                      bodyCell: {
                        className:
                          "border text-blackColor p-2 text-[14px] flex justify-center",
                      },
                      headerCell: {
                        className:
                          "px-3 font-medium text-[14px] rounded-tr-[3px] border-r",
                      },
                    }}
                    body={(rowData) => (
                      <Button
                        name={rowData.status}
                        className={`p-2 rounded ${rowData.status === "Completed" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
                      />
                    )}
                  />
                </DataTable>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignedTrips;
