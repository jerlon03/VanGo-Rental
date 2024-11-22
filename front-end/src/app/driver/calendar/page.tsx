"use client";
import React, { useEffect, useState } from "react";
import { formatDatePublicRange } from "@/components/date/formatDate";
import { fetchBookingByVanId } from "@/lib/api/booking.api";
import { BookingDetails } from "@/lib/types/booking.type";
import { useAuth } from "@/Provider/context/authContext";
import { ApiResponse } from "@/lib/types/driver.type";
import { getDriver } from "@/lib/api/driver.api";

const Calendar = () => {
  const [bookings, setBookings] = useState<BookingDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate] = useState(() => new Date());
  const [displayDate, setDisplayDate] = useState(new Date());
  const { user, loading: authLoading } = useAuth();
  const [dataDriver, setDataDriver] = useState<ApiResponse | null>(null);
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

  const vanId = dataDriver?.driver.van_id;
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await fetchBookingByVanId(vanId as any);
        setBookings(
          data.filter(
            (booking) =>
              booking.status === "confirmed" || booking.status === "ongoing"
          )
        );
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [vanId]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getBookingsForDate = (date: Date) => {
    return bookings.filter((booking) => {
      const bookingStartDate = new Date(booking.pickup_date_time);
      const bookingEndDate = new Date(booking.booking_end_date);
      return date >= bookingStartDate && date <= bookingEndDate;
    });
  };

  const previousMonth = () => {
    setDisplayDate(
      new Date(displayDate.getFullYear(), displayDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setDisplayDate(
      new Date(displayDate.getFullYear(), displayDate.getMonth() + 1)
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg md:p-6 sm:p-2 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b pb-4 flex justify-between w-full items-center">
        <div>
          <h1 className="text-[18px] font-semibold text-gray-800">
            My Calendar
          </h1>
          <p className="text-sm text-gray-500 ">Driver / Calendar</p>
        </div>
        <div className="flex gap-4 ">
          <div>
            <div className="w-full border h-[10] rounded-[5px] bg-green-800"></div>
            <span className="text-[10px] tracking-[1px] text-green-800 font-semibold">
              ongoing
            </span>
          </div>
          <div>
            <div className="w-full border h-[10] rounded-[5px] bg-primaryColor"></div>
            <span className="text-[10px] tracking-[1px] text-primaryColor font-semibold">
              upcoming
            </span>
          </div>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between mt-3">
        <button
          onClick={previousMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h2 className="text-[16px] font-semibold text-gray-800">
          {displayDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="mt-6">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-2 ">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-semibold text-gray-600 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: getFirstDayOfMonth(displayDate) }).map(
            (_, index) => (
              <div key={`empty-${index}`} className="aspect-square"></div>
            )
          )}

          {Array.from({ length: getDaysInMonth(displayDate) }).map(
            (_, index) => {
              const date = new Date(
                displayDate.getFullYear(),
                displayDate.getMonth(),
                index + 1
              );
              const dayBookings = getBookingsForDate(date);
              const isToday =
                date.toDateString() === currentDate.toDateString();

              return (
                <div
                  key={index}
                  className={`aspect-square p-1 border rounded-lg ${
                    isToday ? "bg-blue-50 border-blue-300" : "border-gray-200"
                  }`}
                >
                  <div className="h-full">
                    <div
                      className={`text-right mb-1 text-[14px] ${
                        isToday
                          ? "text-primaryColor font-semibold "
                          : "text-blackColor font-semibold"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="space-y-1 overflow-y-auto max-h-[70px]">
                      {dayBookings.length > 0 ? (
                        dayBookings.map((booking, bookingIndex) => (
                          <div
                            key={bookingIndex}
                            className={`text-xs p-1 rounded ${
                              booking.status === "ongoing"
                                ? "bg-green-800 text-white"
                                : "bg-primaryColor text-white"
                            }`}
                          >
                            <div className="truncate">
                              {new Date(
                                booking.pickup_date_time
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                            <div className="truncate">
                              {booking.first_name} {booking.last_name}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-xs text-gray-400 text-center">
                          No bookings
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>

      {loading && (
        <div className="text-center py-4 text-gray-500">
          Loading calendar...
        </div>
      )}
    </div>
  );
};

export default Calendar;
