"use client";
import React, { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/adminHeader";
import CurrentDate from "@/components/admin/currentDate";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables, TooltipItem } from "chart.js";
import {
  FaVanShuttle,
  VscFeedback,
  IoPerson,
  GrArticle,
} from "@/components/icons";
import { fetchBookingStatusCounts } from "@/lib/api/booking.api";
import { fetchVanCount, getVanCountByStatus } from "@/lib/api/van.api";
import { fetchPublishedPostCount } from "@/lib/api/posts.api";
import { getFeedbackCount } from "@/lib/api/feedback.api";
import { fetchDriverCount } from "@/lib/api/user.api";
import { TextHighlight } from "@/components/landing/TextHighlight";

Chart.register(...registerables);

const AdminDashboard = () => {
  // Static driver count for now
  const [vanCount, setVanCount] = useState(0); // Change to state for dynamic value
  const [blogCount, setBlogCount] = useState(0); // Change to state for dynamic value
  const [feedbackCount, setFeedbackCount] = useState(0); // Change to state for dynamic value
  const [driverCount, setDriverCount] = useState(0); // Change to state for dynamic value

  // Sample data for the chart and table
  const [bookingData, setBookingData] = useState({
    labels: ["Confirmed", "Pending", "Ongoing", "Completed"],
    datasets: [
      {
        label: "Bookings",
        data: [0, 0, 0, 0], // Initialize with zeros
        backgroundColor: [
          "rgba(76, 175, 80, 0.8)", // Confirmed - Green
          "rgba(255, 193, 7, 0.8)", // Pending - Yellow
          "rgba(33, 150, 243, 0.8)", // Ongoing - Blue
          "rgba(244, 67, 54, 0.8)", // Completed - Red
        ],
        borderColor: [
          "#388E3C", // Darker green for confirmed
          "#F57F17", // Darker yellow for pending
          "#1976D2", // Darker blue for ongoing
          "#D32F2F", // Darker red for completed
        ],
        borderWidth: 2,
      },
    ],
  });

  // State for pie chart data
  const [pieChartData, setPieChartData] = useState({
    labels: ["Booked", "Available", "Under Maintenance"],
    datasets: [
      {
        data: [0, 0, 0], // Initialize with zeros
        backgroundColor: [
          "#FF6384", // Color for Booked
          "#36A2EB", // Color for Available
          "#FFCE56", // Color for Under Maintenance
        ],
        hoverBackgroundColor: [
          "#FF6384", // Hover color for Booked
          "#36A2EB", // Hover color for Available
          "#FFCE56", // Hover color for Under Maintenance
        ],
        borderWidth: 3, // Slight border for better separation between segments
        borderColor: "#fff", // White border color for sharp distinction
        hoverBorderWidth: 2, // Slightly bigger border on hover for emphasis
        hoverBorderColor: "#003459", // Darker border color on hover for contrast
      },
    ],
  });

  useEffect(() => {
    const getBookingStatusCounts = async () => {
      try {
        const counts = await fetchBookingStatusCounts();
        setBookingData((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: [
                counts.confirmed || 0, // Confirmed
                counts.pending || 0, // Pending
                counts.ongoing || 0, // Ongoing
                counts.completed || 0, // Completed
              ],
            },
          ],
        }));
      } catch (error) {
        console.error("Error fetching booking status counts:", error);
      }
    };

    const fetchVanCounts = async () => {
      try {
        const response = await getVanCountByStatus(); // Fetch the counts
        const counts = response.data; // Access the data property

        const bookedCount =
          counts.find((item) => item.status === "booked")?.status_count || 0;
        const availableCount =
          counts.find((item) => item.status === "available")?.status_count || 0;
        const underMaintenanceCount =
          counts.find((item) => item.status === "under maintenance")
            ?.status_count || 0;

        setPieChartData((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: [bookedCount, availableCount, underMaintenanceCount],
            },
          ],
        }));
      } catch (error) {
        console.error("Error fetching van counts by status:", error);
      }
    };

    const fetchCounts = async () => {
      const vanCount = await fetchVanCount(); // Fetch the total van count
      setVanCount(vanCount); // Update the driverCount state with the fetched value
    };
    const fetchBlogCounts = async () => {
      const blogCount = await fetchPublishedPostCount(); // Fetch the total van count
      setBlogCount(blogCount); // Update the driverCount state with the fetched value
    };
    const fetchFeedbackCounts = async () => {
      const feedbackCount = await getFeedbackCount(); // Fetch the total van count
      setFeedbackCount(feedbackCount); // Update the driverCount state with the fetched value
    };
    const fetchDriverCounts = async () => {
      const driverCount = await fetchDriverCount(); // Fetch the total van count
      setDriverCount(driverCount); // Update the driverCount state with the fetched value
    };

    getBookingStatusCounts();
    fetchVanCounts();
    fetchCounts(); // Fetch van counts on component mount
    fetchBlogCounts();
    fetchFeedbackCounts();
    fetchDriverCounts();
  }, []);

  // New options for the Bar chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      tooltip: {
        enabled: true, // Enable tooltips
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Start y-axis at zero
        grid: {
          color: "rgba(224, 224, 224, 0.5)", // Lighter grid line color for a subtle effect
          lineWidth: 1, // Set grid line width
        },
        ticks: {
          font: {
            size: 14, // Increase font size for y-axis ticks
            weight: "bold" as const, // Use 'as const' to ensure type compatibility
            family: "Arial", // Specify font family
            color: "#333", // Set color for y-axis tick labels
          },
          padding: 10, // Add padding for better spacing
        },
        title: {
          display: true, // Display y-axis title
          font: {
            size: 16, // Increase font size for y-axis title
            weight: "bold" as const, // Use 'as const' to ensure type compatibility
            family: "Arial", // Specify font family
            color: "#333", // Set color for y-axis title
          },
          padding: {
            top: 10, // Add padding above the title
            bottom: 10, // Add padding below the title
          },
        },
      },
      x: {
        grid: {
          color: "rgba(224, 224, 224, 0.5)", // Lighter grid line color for a subtle effect
          lineWidth: 1, // Set grid line width
        },
        ticks: {
          font: {
            size: 14, // Increase font size for x-axis ticks
            weight: "bold" as const, // Use 'as const' to ensure type compatibility
            family: "Arial", // Specify font family
            color: "#333", // Set color for x-axis tick labels
          },
          padding: 10, // Add padding for better spacing
        },
        title: {
          display: true, // Display x-axis title
          font: {
            size: 16, // Increase font size for x-axis title
            weight: "bold" as const, // Use 'as const' to ensure type compatibility
            family: "Arial", // Specify font family
            color: "#333", // Set color for x-axis title
          },
          padding: {
            top: 10, // Add padding above the title
            bottom: 10, // Add padding below the title
          },
        },
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 14,
            weight: "bold" as const,
          },
          color: "#333",
          padding: 20,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#000",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#fff",
        borderWidth: 1,
        callbacks: {
          label: function (tooltipItem: TooltipItem<"pie">) {
            const percentage =
              ((tooltipItem.raw as number) /
                pieChartData.datasets[0].data.reduce(
                  (acc, value) => acc + value
                )) *
              100;
            return `${tooltipItem.label}: ${tooltipItem.raw} (${percentage.toFixed(1)}%)`;
          },
        },
      },
      doughnut: {
        cutout: "70%",
      },
    },
    elements: {
      arc: {
        borderWidth: 2,
      },
    },
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <AdminHeader>
        <h1 className="font-semibold text-[24px] text-blackColor">
          Hello, Admin!
        </h1>
        <p className="font-normal text-[15px]">
          <CurrentDate />
        </p>
      </AdminHeader>

      <div className="flex-1 p-6 w-full">
        <div className="flex gap-4 pb-4 w-full ">
          {[
            {
              title: "Registered Drivers",
              value: driverCount,
              icon: <IoPerson className="text-yellow w-8 h-8" />,
              link: "/dashboard/users",
            },
            {
              title: "Customer Feedback",
              value: feedbackCount,
              icon: <VscFeedback className="text-yellow  w-8 h-8" />,
              link: "/dashboard/feedback",
            },
            {
              title: " Publish Blog Post",
              value: blogCount,
              icon: <GrArticle className="text-yellow  w-8 h-8" />,
              link: "/dashboard/post",
            },
            {
              title: "Total Van",
              value: vanCount,
              icon: <FaVanShuttle className="text-yellow  w-8 h-8" />,
              link: "/dashboard/van-inventory",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-[#003459] via-[#00698c] to-[#00b0c1] p-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl w-full flex items-center cursor-pointer"
              onClick={() => item.link && (window.location.href = item.link)}
            >
              <div className="flex items-center space-x-4 justify-center w-full ">
                <div className="bg-white rounded-full shadow-md lg:p-1 xl:p-2 2xl:p-3 md:p-2">
                  {item.icon}
                </div>
                <div>
                  <h2 className="font-medium text-white text-[18]">
                    {item.title}
                  </h2>
                  <p className="text-[20px] text-yellow font-bold">
                    {item.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-6 w-full">
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow w-[30%]">
            <TextHighlight text="Van Status Distribution" />
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow col-span-2 w-[70%]">
            <TextHighlight text="Booking Statistics" />
            <Bar data={bookingData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
