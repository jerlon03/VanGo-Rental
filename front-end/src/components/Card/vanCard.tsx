"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "@/components/modals/modalContainer"; // Adjust the import path if necessary
import { Van } from "@/lib/types/van.type";
import WebButton from "@/components/Button/WebsiteButton";
import Button from "../Button/button";
import SweetAlert from "@/components/alert/alert";
import { termsAndCons } from "@/components/sampledata/sampleData";
import InputField from "@/components/Form/inputfield";
import ImagesUploader from "../Uplooad/ImagesUploader";
import Select from "@/components/Form/select";
import { cebuData } from "@/components/sampledata/sampleData"; // Import the cebuData
import { getPublicAllPayments } from "@/lib/api/payment.api";
import { Payment } from "@/lib/types/payment.type";
import { Calendar } from "primereact/calendar";
import { publicBookingByVanId } from "@/lib/api/booking.api";
import {
  TbManualGearboxFilled,
  IoPerson,
  BiSolidShoppingBags,
} from "@/components/icons/index";

interface VanCardProps {
  van: Van; // Expecting a prop named 'van' of type 'Van'
  showDescription?: boolean; // New optional prop to control description visibility
}

const VanCard: React.FC<VanCardProps> = ({ van, showDescription = false }) => {
  const [currentModal, setCurrentModal] = useState<null | "terms" | "booking">(
    null
  );
  const [formData, setFormData] = useState<{
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    province: string;
    barangay: string;
    pickupLocation: string;
    pickupDateTime: Date | null;
    dateOfBirth: Date | null;
    pickupTime: string;
    bookingEndDate: Date | null;
    reservationImage: File | null;
    municipality: string;
  }>({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    province: "CEBU",
    barangay: "",
    pickupLocation: "",
    pickupDateTime: null,
    dateOfBirth: null,
    pickupTime: "",
    bookingEndDate: null,
    reservationImage: null,
    municipality: "",
  });
  const [isAgreed, setIsAgreed] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [municipality, setMunicipality] = useState("");
  const [vanStatus, setVanStatus] = useState(van.status);
  const [bookedDates, setBookedDates] = useState<Date[]>([]); // State to hold booked dates

  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [dobError, setDobError] = useState<string | null>(null);
  const [barangay, setBarangay] = useState("");
  const [reservationImage, setReservationImage] = useState<File | null>(null);
  const [pickupLocation, setPickupLocation] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false); // State to manage loading

  // Get the list of municipalities from cebuData
  const municipalities = Object.keys(cebuData.CEBU.municipality_list); // Define municipalities
  const barangays = municipality
    ? cebuData.CEBU.municipality_list[
        municipality as keyof typeof cebuData.CEBU.municipality_list
      ].barangay_list
    : [];

  const generateDisabledDates = (
    bookedDates: { pickupDate: Date; bookingEndDate: Date }[]
  ) => {
    const disabledDates: Date[] = [];
    bookedDates.forEach(({ pickupDate, bookingEndDate }) => {
      const currentDate = new Date(pickupDate);
      while (currentDate <= bookingEndDate) {
        disabledDates.push(new Date(currentDate)); // Push a copy of the current date
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
      }
    });
    return disabledDates;
  };

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const result = await getPublicAllPayments();
        setPayments(result.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    const fetchBookings = async () => {
      try {
        const bookings = await publicBookingByVanId(van.van_id); // Fetch bookings for the van
        const bookedDates = bookings
          .filter(
            (booking) =>
              booking.status !== "declined" && booking.status !== "completed"
          ) // Filter out declined and completed bookings
          .map((booking) => ({
            pickupDate: new Date(booking.pickup_date_time), // Extract pickup date
            bookingEndDate: new Date(booking.booking_end_date), // Extract booking end date
          })); // Extract booked dates
        setBookedDates(bookedDates.map((date) => date.pickupDate)); // Set booked pickup dates in state

        // Log the booked dates to the console
        console.log("Booked dates for van ID", van.van_id, ":", bookedDates);

        // Generate disabled dates based on booked date ranges
        const disabledDates = generateDisabledDates(bookedDates);
        setDisabledDates(disabledDates); // Set the disabled dates in state
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchPayments();
    fetchBookings(); // Call the fetchBookings function
  }, [van.van_id]); // Dependency on van.van_id

  // State to hold disabled dates
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);

  useEffect(() => {
    // Add or remove the class when the modal opens or closes
    if (currentModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [currentModal]); // Dependency on currentModal

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate email
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(
        emailRegex.test(value) ? null : "Please enter a valid email address."
      );
    }

    // Validate phone number
    if (name === "phoneNumber") {
      const phoneRegex = /^09\d{9}$/;
      setPhoneError(
        phoneRegex.test(value)
          ? null
          : "Please enter a valid Philippine phone number (e.g., 09123456789)."
      );
    }
  };

  const handleDateOfBirthChange = (selectedDate: any) => {
    const dateOfBirth = selectedDate.value as Date;
    setFormData((prev) => ({ ...prev, dateOfBirth }));

    // Validate date of birth
    const today = new Date();
    const age = today.getFullYear() - dateOfBirth.getFullYear();
    const isValidAge =
      age > 18 ||
      (age === 18 && today.getMonth() > dateOfBirth.getMonth()) ||
      (age === 18 &&
        today.getMonth() === dateOfBirth.getMonth() &&
        today.getDate() >= dateOfBirth.getDate());
    setDobError(
      isValidAge ? null : "You must be at least 18 years old to book."
    );
  };

  const isDateRangeBooked = (startDate: Date, endDate: Date): boolean => {
    return bookedDates.some((bookedDate) => {
      // Check if the booked date falls within the selected range
      return bookedDate >= startDate && bookedDate <= endDate;
    });
  };

  const handlePickupDateChange = (date: any) => {
    const selectedDate = date.value as Date;
    // Ensure the selected date is set correctly
    console.log("Selected Pickup Date:", selectedDate); // Debugging line
    // Check if the selected date is already booked
    if (isDateRangeBooked(selectedDate, selectedDate)) {
      SweetAlert.showError("This date is already booked."); // Show error message
    } else {
      setFormData((prev) => ({
        ...prev,
        pickupDateTime: selectedDate,
      }));
    }
  };

  const handleBookingEndDateChange = (date: any) => {
    const selectedDate = date.value as Date;
    // Ensure the selected date is set correctly
    console.log("Selected Booking End Date:", selectedDate); // Debugging line
    // Check if the selected date is already booked
    if (isDateRangeBooked(selectedDate, selectedDate)) {
      SweetAlert.showError("This date is already booked."); // Show error message
    } else {
      setFormData((prev) => ({
        ...prev,
        bookingEndDate: selectedDate,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate booking end date
    if (formData.bookingEndDate && formData.pickupDateTime) {
      if (formData.bookingEndDate < formData.pickupDateTime) {
        SweetAlert.showError("Booking end date must be after the pickup date.");
        return; // Exit the function if validation fails
      }

      // Check for overlapping bookings
      if (isDateRangeBooked(formData.pickupDateTime, formData.bookingEndDate)) {
        SweetAlert.showError("The selected date range is already booked.");
        return; // Exit the function if validation fails
      }
    }

    // Check if dateOfBirth is set before submission
    if (!formData.dateOfBirth) {
      SweetAlert.showError("Date of birth is required.");
      return; // Exit the function if validation fails
    }

    // Confirmation dialog using SweetAlert
    const isConfirmed = await SweetAlert.showConfirm(
      "Are you sure you want to submit your booking?"
    );
    if (!isConfirmed) {
      return; // Exit the function if the user cancels
    }

    // Set loading state to true
    setIsLoading(true);

    // Prepare booking details to send using FormData
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("first_name", formData.firstname);
    formDataToSubmit.append("last_name", formData.lastname);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("phone_number", formData.phoneNumber);
    formDataToSubmit.append("province", formData.province);
    formDataToSubmit.append("city_or_municipality", formData.municipality);
    formDataToSubmit.append("barangay", formData.barangay);
    formDataToSubmit.append("pickup_location", formData.pickupLocation);
    formDataToSubmit.append(
      "pickup_date_time",
      formData.pickupDateTime
        ? formData.pickupDateTime.toISOString()
        : new Date().toISOString()
    ); // Ensure it's in ISO format

    // Include booking_end_date
    formDataToSubmit.append(
      "booking_end_date",
      formData.bookingEndDate
        ? formData.bookingEndDate.toISOString()
        : new Date().toISOString() // Default to current date if not set
    );

    // Append the proof of payment image with the correct key
    if (reservationImage) {
      formDataToSubmit.append("proof_of_payment", reservationImage); // Ensure this key matches the backend
      console.log("FormData contents:", Array.from(formDataToSubmit.entries())); // Debugging line
    } else {
      console.error("No proof of payment image found."); // Debugging line
      SweetAlert.showError("Proof of payment image is required."); // Show error if image is not found
      return; // Exit the function if proof of payment is missing
    }

    // Additional fields
    formDataToSubmit.append("booking_id", "0");
    formDataToSubmit.append(
      "date_of_birth",
      formData.dateOfBirth.toISOString()
    );
    formDataToSubmit.append("van_id", van.van_id as any);
    formDataToSubmit.append("created_at", new Date().toISOString());
    formDataToSubmit.append("status", "");

    try {
      console.log(
        "Submitting booking with data:",
        Array.from(formDataToSubmit.entries())
      ); // Log FormData contents
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/public/booking/`,
        {
          method: "POST",
          body: formDataToSubmit,
        }
      ); // Pass the FormData object

      if (!response.ok) {
        const errorData = await response.json();
        SweetAlert.showError(errorData.error || "Failed to submit booking."); // Show error from backend
        return;
      }

      SweetAlert.showSuccess(
        "Thank you for submitting your rental request! Please allow up to 24 hours for confirmation to be sent to your email."
      );
    } catch (error: any) {
      console.error("Error submitting booking:", error); // Log the entire error object
      SweetAlert.showError("Failed to submit booking. Please try again.");
    } finally {
      // Reset loading state
      setIsLoading(false);
    }

    // Reset form fields
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      phoneNumber: "",
      province: "CEBU",
      barangay: "",
      pickupLocation: "",
      pickupDateTime: null,
      dateOfBirth: null,
      pickupTime: "",
      bookingEndDate: null,
      reservationImage: null,
      municipality: "",
    });

    // Optionally close the modal
    setCurrentModal(null); // Close the modal
  };

  const handleImageUpload = (file: File) => {
    console.log("Uploaded file:", file); // Debugging: Log the uploaded file
    setReservationImage(file); // Set the file directly in the state
  };

  return (
    <>
      <div className="w-full border border-[#cccccc] rounded-[10px] flex flex-col justify-between">
        <div className="px-[10%]">
          <Image
            src={van.van_image || "/default-image.png"}
            width={150}
            height={80}
            alt="Banner"
            className="object-contain aspect-[150/80] w-full"
          />
        </div>

        <div className="p-[4%]">
          <h1 className="font-semibold lg:text-[18px] md:text-[16px] sm:text-[14px]">
            {van.van_name}
          </h1>
          <div className="flex md:gap-[10px] sm:gap-[5px] items-center ">
            <TbManualGearboxFilled className="lg:text-[24px] md:text-[18px] sm:text-xs text-yellow" />
            <p className="lg:text-[18px] md:text-[14px] sm:text-xs font-medium">
              {van.transmission_type}
            </p>
          </div>
          <div className="flex pt-2 md:gap-[20px] sm:gap-[5px]">
            <div className="flex gap-[10px] items-center justify-center">
              <IoPerson className="lg:text-[24px] md:text-[18px] sm:text-xs text-yellow" />
              <p className="lg:text-[18px] md:text-[14px] sm:text-xs font-medium">
                {van.people_capacity} People
              </p>
            </div>
            <div className="flex gap-[10px] items-center justify-center">
              <BiSolidShoppingBags className="lg:text-[24px] md:text-[18px] sm:text-xs text-yellow" />
              <p className="lg:text-[18px] md:text-[14px] sm:text-xs font-medium">
                {van.things_capacity} KG
              </p>
            </div>
          </div>
          {showDescription && (
            <p className="mt-4 md:text-[16px] sm:text-xs font-normal tracking-[.5px]">
              {van.van_description}
            </p> // Assuming 'description' is a property of 'van'
          )}
          <div className="pt-[4%]">
            <WebButton
              label="Book Now"
              variant="primary" // Set as primary button
              width="200px"
              height="40px"
              textSize="18px"
              onClick={() => setCurrentModal("terms")}
              className="sm:w-full sm:text-[15px] md:text-[16px]"
            />
          </div>
        </div>
      </div>
      {/* Modal Logic */}
      <Modal
        onClose={() => setCurrentModal(null)}
        isOpen={currentModal === "terms"}
        width="800px"
        height="530px"
      >
        <div className="w-full flex flex-col gap-[10px] bg-white rounded-[5px]">
          <div className="w-full bg-primaryColor h-[80px] text-white flex flex-col justify-center px-[10px] rounded-t-[5px]">
            <h1 className="text-[20px] font-medium">TERMS AND CONDITION</h1>
            <p className="text-[15px] font-light">
              Please read these terms and condition carefully before using Our
              Service.
            </p>
          </div>
          <div className="w-full overflow-y-auto md:max-h-[430px] sm:max-h-screen pl-4 scrollbar-custom">
            {termsAndCons.map((terms, index) => (
              <div key={index} className="pe-[20px]">
                <h1 className="font-semibold pt-4 text-[18px]">
                  {terms.TermsHeading}
                </h1>
                <h1 className="font-semibold pt-4">{terms.Termstitle}</h1>
                <ul className="text-[14px]">
                  <li>{terms.AddedContent}</li>
                  <li>• {terms.TermsContent}</li>
                  <li>{terms.AddedContent1}</li>
                  <li>{terms.AddedContent2}</li>
                </ul>
              </div>
            ))}
            <div className="flex p-4 gap-4">
              <input
                type="radio"
                checked={isAgreed}
                onChange={() => setIsAgreed(true)}
              />
              <p className="text-[14px]">
                {" "}
                I agree that I have read and accept the terms and conditions and
                privacy policy.
              </p>
            </div>
            <div className="flex gap-[1rem] p-5 w-full justify-end">
              <Button
                name="CANCEL"
                onClick={() => setCurrentModal(null)}
                width="120px"
                className="bg-red-500 hover:bg-red-700 text-white"
              />
              <Button
                name="NEXT"
                onClick={() => setCurrentModal("booking")}
                width="120px"
                disabled={!isAgreed}
                className="bg-primaryColor hover:bg-blue-700 text-white"
              />
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        onClose={() => setCurrentModal(null)}
        isOpen={currentModal === "booking"}
        width="850px"
        height="530px"
      >
        <div className="w-full h-full flex flex-col justify-between bg-white rounded-[5px]">
          <div className="w-full bg-primaryColor h-[110px] text-white flex flex-col justify-center px-[10px] rounded-t-[5px]">
            <h1 className="text-[20px] font-medium">BOOKING DETAILS</h1>
            <p className="text-[15px] font-light">
              Please fill out the form to apply for VANGO Rental services.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="w-full pt-4 p-2 px-[5%] h-full flex flex-col gap-4 overflow-y-auto max-h-[430px] scrollbar-custom">
              <h1 className="text-[16px] font-medium p-2 bg-gray-500 text-white rounded-[3px]">
                Personal Details
              </h1>
              <div className="w-full grid md:grid-cols-3 md:gap-[30px] text-[15px] sm:grid-cols-1 sm:gap-[15px]">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstname">
                    Firstname <span className="text-red-700 font-bold">*</span>
                  </label>
                  <InputField
                    name="firstname"
                    placeholder="Enter your firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    className={formData.firstname ? "" : "border-red-500"}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastname">
                    Lastname <span className="text-red-700 font-bold">*</span>
                  </label>
                  <InputField
                    name="lastname"
                    placeholder="Enter your lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    className={formData.lastname ? "" : "border-red-500"}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email">
                    Email <span className="text-red-700 font-bold">*</span>
                  </label>
                  <InputField
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className={emailError ? "border-red-500" : ""}
                  />
                  {emailError && (
                    <span className="text-red-500 text-[10px]">
                      {emailError}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phoneNumber">
                    Phone Number{" "}
                    <span className="text-red-700 font-bold">*</span>
                  </label>
                  <InputField
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={phoneError ? "border-red-500" : ""}
                  />
                  {phoneError && (
                    <span className="text-red-500 text-[10px]">
                      {phoneError}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="dateOfBirth">
                    Date of Birth{" "}
                    <span className="text-red-700 font-bold">*</span>
                  </label>
                  <Calendar
                    value={formData.dateOfBirth}
                    onChange={handleDateOfBirthChange}
                    className={`w-full border font-Poppins text-[14px] rounded-[3px] md:h-[35px] sm:h-[35px] max-sm:rounded-0 max-sm:text-[14px] placeholder:text-[#CCCCCC] placeholder:font-light text-blackColor ${dobError ? "border-red-500" : ""}`}
                    placeholder="Select Date"
                  />
                  {dobError && (
                    <span className="text-red-500 text-[10px]">{dobError}</span>
                  )}
                </div>
              </div>
              <h1 className="text-[16px] font-medium p-2 bg-gray-500 text-white rounded-[3px]">
                Pick Up Location
              </h1>
              <div className="w-full grid md:grid-cols-3 md:gap-[30px] text-[15px] sm:grid-cols-1 sm:gap-[15px]">
                <div className="flex flex-col gap-2">
                  <label htmlFor="province">
                    Province <span className="text-red-700 font-bold">*</span>
                  </label>
                  <Select
                    options={[{ value: "CEBU", label: "CEBU" }]}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, province: value }))
                    }
                    value={formData.province}
                    className={formData.province ? "" : "border-red-500"}
                    disabled
                  />
                  <label htmlFor="pickupLocation">
                    Pick-up Location/ LandMark{" "}
                    <span className="text-red-700 font-bold">*</span>
                  </label>
                  <InputField
                    name="pickupLocation"
                    placeholder="Enter Pick-up Location"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    className={formData.pickupLocation ? "" : "border-red-500"}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="municipality">
                    City/Municipality{" "}
                    <span className="text-red-700 font-bold">*</span>
                  </label>
                  <Select
                    options={municipalities.map((muni) => ({
                      value: muni,
                      label: muni,
                    }))} // Populate municipalities
                    onChange={(value: string) => {
                      const selectedMunicipality = value; // Use value directly
                      console.log(
                        "Selected Municipality:",
                        selectedMunicipality
                      ); // Debugging: Log selected municipality
                      setMunicipality(selectedMunicipality); // Update municipality state
                      setBarangay(""); // Reset barangay when municipality changes
                      setFormData((prev) => ({
                        ...prev,
                        municipality: selectedMunicipality, // Update municipality in formData
                      })); // Ensure municipality is set in formData
                    }}
                    value={municipality}
                    className={municipality ? "" : "border-red-500"} // Change border color if empty
                    disabled={false} // Set to true if you want to disable the select
                  />
                  <label htmlFor="pickupDateTime">
                    Pick-up Date{" "}
                    <span className="text-red-700 font-bold">*</span>
                  </label>
                  <Calendar
                    value={formData.pickupDateTime}
                    onChange={handlePickupDateChange}
                    className={`w-full border font-Poppins text-[14px] rounded-[3px] px-2 md:h-[35px] sm:h-[35px] max-sm:rounded-0 max-sm:text-[14px] placeholder:text-[#CCCCCC] placeholder:font-light text-blackColor ${formData.pickupDateTime ? "" : "border-red-500"}`}
                    placeholder="Select Date"
                    minDate={new Date()}
                    disabledDates={disabledDates} // Disable booked dates
                  />
                  <label htmlFor="pickupTime">
                    Pick-up Time{" "}
                    <span className="text-red-700 font-bold">*</span>
                  </label>
                  <InputField
                    type="time"
                    name="pickupTime"
                    value={formData.pickupTime}
                    onChange={handleChange}
                    className={formData.pickupTime ? "" : "border-red-500"}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="barangay">
                    Barangay <span className="text-red-700 font-bold">*</span>
                  </label>
                  <Select
                    options={
                      municipality
                        ? cebuData.CEBU.municipality_list[
                            municipality as keyof typeof cebuData.CEBU.municipality_list
                          ].barangay_list.map((bgy) => ({
                            value: bgy,
                            label: bgy,
                          }))
                        : []
                    }
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, barangay: value }))
                    }
                    value={formData.barangay}
                    className={formData.barangay ? "" : "border-red-500"}
                  />
                  <label htmlFor="bookingEndDate">
                    Booking End Date{" "}
                    <span className="text-red-700 font-bold">*</span>
                  </label>
                  <Calendar
                    value={formData.bookingEndDate}
                    onChange={handleBookingEndDateChange}
                    className={`w-full border font-Poppins text-[14px] rounded-[3px] md:h-[35px] sm:h-[35px] max-sm:rounded-0 max-sm:text-[14px] placeholder:text-[#CCCCCC] placeholder:font-light text-blackColor ${formData.bookingEndDate ? "" : "border-red-500"}`}
                    placeholder="Select Booking End Date"
                    minDate={new Date()}
                    disabledDates={disabledDates} // Disable booked dates
                  />
                </div>
              </div>
              <h1 className="text-[16px] font-medium p-2 bg-gray-500 text-white rounded-[3px]">
                Reservation Payment
              </h1>
              <div className="w-full">
                <p>Reservation Fee Via</p>
                <div className="w-full flex md:flex-row sm:flex-col p-2 gap-6 items-center ">
                  {payments.length > 0 ? (
                    payments.map((payment) => (
                      <div
                        key={payment.payment_id}
                        className="md:w-[30%] sm:w-full h-[180px] border rounded-md p-1 flex items-center justify-center flex-col"
                      >
                        <h1 className="text-[16px] font-semibold tracking-[1px]">
                          {payment.payment_name}
                        </h1>
                        <Image
                          src={payment.payment_image || ""}
                          width={110}
                          height={20}
                          alt={`${payment.payment_name || "Payment"} QR`}
                        />
                      </div>
                    ))
                  ) : (
                    <div>No payment methods available</div>
                  )}
                  <div className="flex flex-col md:w-[40%] sm:w-full gap-2">
                    <h2>
                      Proof of Payment{" "}
                      <span className="text-red-700 font-bold">*</span>
                    </h2>
                    <ImagesUploader onUpload={handleImageUpload} />
                  </div>
                </div>
              </div>
              <div className="flex gap-[1rem] p-5 w-full justify-end">
                <Button
                  name="BACK"
                  onClick={() => setCurrentModal("terms")}
                  width="120px"
                  className="bg-gray-500 hover:bg-gray-700 text-white"
                />
                <Button
                  type="submit"
                  name={isLoading ? "Loading..." : "SUBMIT"}
                  width="120px"
                  className="bg-green-500 hover:bg-green-700 text-white"
                />
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default VanCard;
