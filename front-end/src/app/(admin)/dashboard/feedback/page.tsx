"use client";
import AdminHeader from "@/components/admin/adminHeader";
import {
  getAllPrivateFeedbacks,
  updateFeedbackStatus,
} from "@/lib/api/feedback.api";
import { Feedbacks } from "@/lib/types/feedback.type";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { formatDatePublicRange } from "@/components/date/formatDate";
import { MdPublish } from "@/components/icons";
import SweetAlert from "@/components/alert/alert";

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState<Feedbacks[]>([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<Feedbacks[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const data = await getAllPrivateFeedbacks();
        if (Array.isArray(data)) {
          setFeedbacks(data as any);
        } else {
          console.error("Data is not an array:", data);
          setError("Unexpected data format");
        }
      } catch (error) {
        console.error("Error fetching private feedbacks:", error);
        setError("Failed to fetch private feedbacks");
      }
    };

    fetchFeedbacks();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    setFilteredFeedbacks(
      feedbacks.filter(
        (feedback) =>
          feedback.full_name.toLowerCase().includes(value.toLowerCase()) ||
          (feedback.booking_id &&
            feedback.booking_id.toString().includes(value))
      )
    );
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={` ${i < rating ? "text-yellow" : "text-gray-300"}`}
        >
          ★
        </span>
      );
    }
    return <div className="flex justify-center">{stars}</div>;
  };

  const updateStatusToPublish = (feedbackId: number) => {
    setFeedbacks((prevFeedbacks) =>
      prevFeedbacks.map((feedback) =>
        feedback.feedback_id === feedbackId
          ? { ...feedback, status: "PUBLISH" }
          : feedback
      )
    );
  };

  const handlePublishClick = (feedbackId: number) => {
    // Optimistically update the status to 'PUBLISH'
    updateStatusToPublish(feedbackId);

    SweetAlert.showConfirm("Do you want to publish this feedback?").then(
      async (result) => {
        if (result) {
          try {
            console.log("Attempting to publish feedback with ID:", feedbackId);
            const response = await updateFeedbackStatus(feedbackId, "PUBLISH");
            console.log("Response from server:", response);

            if (response && response.success) {
              SweetAlert.showSuccess("The feedback has been published.");
            } else {
              // Revert the status if the server response indicates failure
              setFeedbacks((prevFeedbacks) =>
                prevFeedbacks.map((feedback) =>
                  feedback.feedback_id === feedbackId
                    ? { ...feedback, status: "UNPUBLISH" }
                    : feedback
                )
              );
              SweetAlert.showError("Failed to publish feedback.");
            }
          } catch (error) {
            console.error("Error details:", error);
            // Revert the status if an error occurs
            setFeedbacks((prevFeedbacks) =>
              prevFeedbacks.map((feedback) =>
                feedback.feedback_id === feedbackId
                  ? { ...feedback, status: "UNPUBLISH" }
                  : feedback
              )
            );
            SweetAlert.showError("Failed to publish feedback.");
          }
        }
      }
    );
  };

  return (
    <div className="w-full pt-[2%]">
      <div className="w-full pb-3">
        <AdminHeader>
          <h1 className="text-[14px] flex h-full items-end text-blackColor/70 tracking-[2px]">
            <Link href="/dashboard">Dashboard</Link> / Customer Feedback
          </h1>
        </AdminHeader>
      </div>
      <div className="w-full px-[2%]">
        <input
          type="text"
          placeholder="Search by Full Name or Booking ID"
          value={searchTerm}
          onChange={handleSearch}
          className="border p-2 mb-4 w-full text-[15px] lg:text-[14px]"
        />
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <DataTable
            value={searchTerm ? filteredFeedbacks : feedbacks} // Use filtered posts here
            tableStyle={{ minWidth: "50rem" }}
            pt={{
              thead: { className: "bg-primaryColor text-white " },
              tbody: { className: "border " },
              headerRow: { className: "h-[40px] " },
            }}
          >
            <Column
              header="Book ID"
              field="booking_id"
              pt={{
                bodyCell: {
                  className:
                    "border text-blackColor p-2 text-[15px] lg:text-[14px]",
                },
                headerCell: {
                  className:
                    "px-3 font-medium text-[16px] rounded-tl-[3px] border-r lg:text-[14px]",
                },
              }}
            />
            <Column
              body={(rowData) => `${formatDatePublicRange(rowData.created_at)}`}
              header="Date Created"
              pt={{
                bodyCell: {
                  className:
                    "border text-blackColor p-2 text-[15px] truncate lg:text-[14px]",
                },
                headerCell: {
                  className:
                    "px-3 font-medium text-[16px] border-r lg:text-[14px] truncate",
                },
              }}
            />
            <Column
              header="Full Name"
              field="full_name"
              pt={{
                bodyCell: {
                  className:
                    "border text-blackColor p-2 text-[15px] lg:text-[14px]",
                },
                headerCell: {
                  className:
                    "px-3 font-medium text-[16px] rounded-tl-[3px] border-r lg:text-[14px]",
                },
              }}
            />
            <Column
              field="overall_experience"
              header="Overall Experience"
              pt={{
                bodyCell: {
                  className:
                    "border text-blackColor p-2 text-[15px] lg:text-[14px]",
                },
                headerCell: {
                  className:
                    "px-3 font-medium text-[16px] border-r lg:text-[14px]",
                },
              }}
            />
            <Column
              field="suggestions"
              header="Suggestions"
              pt={{
                bodyCell: {
                  className:
                    "border text-blackColor p-2 text-[15px] lg:text-[14px]",
                },
                headerCell: {
                  className:
                    "px-3 font-medium text-[16px] border-r lg:text-[14px]",
                },
              }}
            />
            <Column
              field="rating"
              header="Ratings"
              body={(rowData) => renderStars(rowData.rating)}
              pt={{
                bodyCell: {
                  className:
                    "border text-blackColor p-2 text-[15px] lg:text-[14px]",
                },
                headerCell: {
                  className:
                    "px-3 font-medium text-[16px] border-r lg:text-[14px]",
                },
              }}
            />

            <Column
              field="status"
              header="Status"
              body={(rowData) => {
                let statusClass = "";

                // Apply different styles based on the status value
                switch (rowData.status) {
                  case "PUBLISH":
                    statusClass = "bg-green-500 text-white lg:text-[14px]";
                    break;
                  case "UNPUBLISH":
                    statusClass = "bg-yellow-400 text-white lg:text-[14px]";
                    break;
                  default:
                    statusClass = "bg-gray-100 text-gray-800 lg:text-[14px]";
                }

                return (
                  <span
                    className={`px-2 py-1 rounded ${statusClass} flex text-center items-center justify-center`}
                  >
                    {rowData.status}
                  </span>
                );
              }}
              pt={{
                bodyCell: { className: "border text-blackColor p-2" },
                headerCell: {
                  className:
                    "px-3 font-medium text-[16px] border-r lg:text-[14px]",
                },
              }}
            />
            <Column
              header="Actions"
              body={(rowData) => (
                <div className="flex justify-center">
                  {rowData.status !== "PUBLISH" ? (
                    <MdPublish
                      onClick={() => handlePublishClick(rowData.feedback_id)}
                      className="text-green-400 cursor-pointer transform rotate-180"
                    />
                  ) : (
                    <MdPublish
                      onClick={() =>
                        SweetAlert.showSuccess(
                          "This feedback is already published."
                        )
                      }
                      className="text-gray-400 transform rotate-180"
                    />
                  )}
                </div>
              )}
              pt={{
                bodyCell: { className: "border text-blackColor p-2" },
                headerCell: {
                  className:
                    "px-3 font-medium text-[16px] border-r lg:text-[14px]",
                },
              }}
            />
          </DataTable>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
