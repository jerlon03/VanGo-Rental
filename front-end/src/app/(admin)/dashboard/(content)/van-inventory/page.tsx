"use client";
import AdminHeader from "@/components/admin/adminHeader";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  fetchAllVan,
  fetchDeleteVan,
  fetchUpdateVan,
  fetchUpdateVanStatus,
} from "@/lib/api/van.api";
import { Van } from "@/lib/types/van.type";
import { FaRegEdit, FaEye, FaTools } from "react-icons/fa";
import { IoClose, MdDeleteOutline } from "@/components/icons";
import { formatDateRange } from "@/components/date/formatDate";
import Button from "@/components/Button/button";
import Modal from "@/components/modals/modalContainer";
import SweetAlert from "@/components/alert/alert";
import ImagesUploader from "@/components/Uplooad/ImagesUploader";
import InputField from "@/components/Form/inputfield";
import Image from "next/image";
import { Driver } from "@/lib/types/driver.type";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import TextArea from "@/components/Form/textarea";
import { getAllDriver, getVanById } from "@/lib/api/driver.api";
import { TbCurrencyPeso } from "react-icons/tb";
import { fetchBookingStatusCountsByVanId } from "@/lib/api/booking.api";

const VanInventory = () => {
  const [vans, setVans] = useState<Van[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVan, setNewVan] = useState({
    van_name: "",
    van_description: "",
    people_capacity: "",
    transmission_type: "",
    things_capacity: "",
    estimate_price: "",
  });
  const [vanImage, setVanImage] = useState<File | null>(null);
  const [inputErrors, setInputErrors] = useState({
    people_capacity: "",
    things_capacity: "",
  });
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [selectedVan, setSelectedVan] = useState<Van | null>(null); // State to hold the selected van for details
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // State to control the details modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to control the edit modal
  const [loadingDrivers, setLoadingDrivers] = useState(true); // New loading state
  const [driverDetails, setDriverDetails] = useState<Driver | null>(null); // New state for driver details
  const [bookingStatusMap, setBookingStatusMap] = useState<{
    [key: string]: { confirmed: number; ongoing: number; pending: number };
  }>({}); // State to hold booking statuses

  const initialVanState = {
    van_name: "",
    van_description: "",
    people_capacity: "",
    transmission_type: "",
    things_capacity: "",
  };

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const driverData = await getAllDriver(); // Fetch drivers from the API
        console.log("Fetched Drivers:", driverData); // Log the fetched data
        if (Array.isArray(driverData)) {
          const formattedDrivers = driverData.map((driver) => ({
            ...driver,
            full_name: `${driver.first_name} ${driver.last_name} - DR-O${driver.driver_id}`, // Combine first and last name
          }));
          setDrivers(formattedDrivers); // Set the formatted drivers to state
        } else {
          console.error("Driver data is not an array:", driverData);
        }
      } catch (error) {
        console.error("Failed to fetch drivers:", error); // Handle any errors
      } finally {
        setLoadingDrivers(false); // Set loading to false after fetching
      }
    };

    fetchDrivers(); // Call the fetch function
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewVan((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (file: File) => {
    setVanImage(file);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log("Submitting van:", newVan);
    console.log("Selected Driver:", selectedDriver); // Log the selected driver

    // Check if all required fields are filled
    if (
      !newVan.van_name ||
      !newVan.van_description ||
      !vanImage ||
      !newVan.people_capacity ||
      !newVan.transmission_type ||
      !newVan.things_capacity ||
      !newVan.estimate_price ||
      !selectedDriver
    ) {
      SweetAlert.showError(
        "Please fill out all required fields, upload an image, and select a driver."
      );
      return;
    }

    const formData = new FormData();
    Object.entries(newVan).forEach(([key, value]) => {
      if (key === "people_capacity" || key === "things_capacity") {
        formData.append(key, value ? parseInt(value, 10).toString() : "0");
      } else {
        formData.append(key, value.toString());
      }
    });

    // Append the driver_id from selectedDriver
    formData.append("driver_id", selectedDriver as any); // Ensure this is set correctly

    if (vanImage) {
      formData.append("image", vanImage);
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        SweetAlert.showError("You are not authorized. Please log in.");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/van/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();
      if (res.ok) {
        SweetAlert.showSuccess("Van added successfully");
        setNewVan(initialVanState as any);
        setVanImage(null);
        setSelectedDriver(null); // Reset the selected driver after submission
        setIsModalOpen(false);
        const updatedVans = await fetchAllVan();
        setVans(updatedVans.data);
      } else {
        SweetAlert.showError(data.message || "Failed to add van");
      }
    } catch (error) {
      console.error("Error:", error);
      SweetAlert.showError("Failed to add van");
    }
  };

  console.log(selectedDriver, "driver id");

  const openModal = () => {
    setIsModalOpen(true);
    // No need to fetch drivers for now
  };

  useEffect(() => {
    const fetchVans = async () => {
      try {
        const vanData = await fetchAllVan();
        const sortedVans = vanData.data.sort(
          (a: Van, b: Van) => b.van_id - a.van_id
        );

        // Fetch booking status for each van
        const statusPromises = sortedVans.map(async (van) => {
          const statusCounts = await fetchBookingStatusCountsByVanId(
            van.van_id
          );
          return { vanId: van.van_id, statusCounts }; // Return the van ID and its status counts
        });

        const statuses = await Promise.all(statusPromises);
        const statusMap = statuses.reduce(
          (acc, { vanId, statusCounts }) => {
            acc[vanId] = {
              confirmed: statusCounts.confirmed || 0,
              ongoing: statusCounts.ongoing || 0,
              pending: statusCounts.pending || 0,
            }; // Ensure all required properties are present
            return acc;
          },
          {} as {
            [key: string]: {
              confirmed: number;
              ongoing: number;
              pending: number;
            };
          }
        );

        setBookingStatusMap(statusMap as any); // Set the booking status map
        setVans(sortedVans); // Set the sorted vans to state
      } catch (error) {
        setError("Failed to fetch vans.");
      }
    };

    fetchVans();
  }, []);

  const onViewDetailsClick = (rowData: Van): void => {
    setSelectedVan(rowData); // Set the selected van to display in the modal
    fetchDriverByVanId(rowData.van_id.toString()); // Fetch driver details by van_id, converted to string
    setIsDetailsModalOpen(true); // Open the details modal
  };

  // Function to handle the edit submission
  const handleEditSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Add your validation logic here if needed

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        SweetAlert.showError("You are not authorized. Please log in.");
        return;
      }

      const formData = new FormData();
      Object.entries(newVan).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      // {{ edit_1 }} - Call the new fetchUpdateVan function
      const updatedVan = await fetchUpdateVan(
        selectedVan?.van_id as any,
        newVan as any
      );
      // {{ edit_1 }}

      SweetAlert.showSuccess("Van updated successfully");
      setIsEditModalOpen(false);
      const updatedVans = await fetchAllVan();
      setVans(updatedVans.data);
    } catch (error) {
      SweetAlert.showError("Failed to update van");
      console.error("Error:", error);
    }
  };

  const handleEditConfirmation = (rowData: Van) => {
    const confirmed = SweetAlert.showConfirm(
      "Are you sure you want to edit this van?"
    );
    if (!confirmed) {
      // Change this condition to check if confirmed
      setSelectedVan(rowData); // Set the selected van to edit
      setIsEditModalOpen(true); // Open the edit modal
    }
  };

  const handleDelete = async (vanId: number) => {
    const confirmed = await SweetAlert.showConfirm(
      "Are you sure you want to delete this van?"
    );
    if (confirmed) {
      const bookingStatus = bookingStatusMap[vanId];
      if (
        bookingStatus &&
        (bookingStatus.confirmed > 0 ||
          bookingStatus.ongoing > 0 ||
          bookingStatus.pending > 0)
      ) {
        SweetAlert.showWarning(
          "This van cannot be deleted because it has active bookings."
        );
        return; // Exit if there are active bookings
      }
      try {
        await fetchDeleteVan(vanId); // Call the fetchDeleteVan function
        SweetAlert.showSuccess("Van deleted successfully");
        setVans((prevVans) => prevVans.filter((van) => van.van_id !== vanId)); // Update the state to remove the deleted van
        setIsDetailsModalOpen(false); // Close the details modal after deletion
      } catch (error) {
        SweetAlert.showError("Failed to delete van");
        console.error("Error:", error);
      }
    }
  };

  // Function to fetch driver details by van_id
  const fetchDriverByVanId = async (vanId: string) => {
    try {
      const driverData = await getVanById(vanId as any); // Fetch driver data using van_id
      if (driverData) {
        setDriverDetails(driverData.data as any); // Set driver details
      } else {
        SweetAlert.showError("Driver not found.");
      }
    } catch (error) {
      console.error("Error fetching driver:", error);
      SweetAlert.showError(
        "Failed to fetch driver details. Please try again later."
      );
    }
  };

  // Function to handle van maintenance status change
  const handleVanMaintenance = async (vanId: number) => {
    const selectedVanToUpdate = vans.find((van) => van.van_id === vanId); // Find the selected van
    if (selectedVanToUpdate?.status === "under maintenance") {
      SweetAlert.showWarning("This van is already under maintenance.");
      return; // Exit if the van is already under maintenance
    }

    // Check booking status counts
    const bookingStatus = bookingStatusMap[vanId];
    if (
      bookingStatus &&
      (bookingStatus.confirmed > 0 ||
        bookingStatus.ongoing > 0 ||
        bookingStatus.pending > 0)
    ) {
      SweetAlert.showWarning(
        "This van cannot be marked as under maintenance because it has active bookings."
      );
      return; // Exit if there are active bookings
    }

    const confirmed = await SweetAlert.showConfirm(
      "Are you sure you want to mark this van as under maintenance?"
    );
    if (confirmed) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          SweetAlert.showError("You are not authorized. Please log in.");
          return;
        }

        // Call the new fetchUpdateVanStatus function
        const response = await fetchUpdateVanStatus(vanId, "under maintenance");
        console.log("Update Response:", response); // Log the response

        if (response) {
          SweetAlert.showSuccess("Van status updated to under maintenance");
          const updatedVans = await fetchAllVan(); // Refresh the van list
          setVans(updatedVans.data); // Update the state with the new list of vans
        } else {
          SweetAlert.showError("Failed to update van status");
        }
      } catch (error) {
        console.error("Error:", error);
        SweetAlert.showError("Failed to update van status");
      }
    }
  };

  const handleVanAvailable = async (vanId: number) => {
    const confirmed = await SweetAlert.showConfirm(
      "Are you sure you want to mark this van as available?"
    );
    if (confirmed) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          SweetAlert.showError("You are not authorized. Please log in.");
          return;
        }

        // Call the new fetchUpdateVanStatus function to set the status to available
        const response = await fetchUpdateVanStatus(vanId, "available");
        console.log("Update Response:", response); // Log the response

        if (response) {
          SweetAlert.showSuccess("Van status updated to available");
          const updatedVans = await fetchAllVan(); // Refresh the van list
          setVans(updatedVans.data); // Update the state with the new list of vans
        } else {
          SweetAlert.showError("Failed to update van status");
        }
      } catch (error) {
        console.error("Error:", error);
        SweetAlert.showError("Failed to update van status");
      }
    }
  };

  return (
    <div className="w-full">
      <div className="w-full pb-5">
        <AdminHeader>
          <h1 className="text-[14px] flex items-end  text-blackColor/70 tracking-[2px]">
            <Link href="/dashboard">Dashboard</Link> / Van Inventory
          </h1>
        </AdminHeader>
      </div>
      <div className="w-full px-[2%]">
        <div className="flex justify-end py-[1rem]">
          <Button
            name="ADD VAN"
            onClick={openModal}
            width="180px"
            height="35px"
          ></Button>
        </div>
        <div></div>
        <DataTable
          value={vans}
          tableStyle={{ minWidth: "50rem" }}
          pt={{
            thead: { className: "bg-primaryColor text-white" },
            tbody: { className: "border " },
            headerRow: { className: "h-[40px] " },
          }}
        >
          <Column
            header="Van Name"
            field="van_name"
            pt={{
              bodyCell: {
                className:
                  "border text-blackColor p-2 text-[15px] lg:text-[13px]",
              },
              headerCell: {
                className:
                  "px-3 font-medium text-[15px] lg:text-[14px] xl:text-[14px] truncate rounded-tl-[3px] border-r",
              },
            }}
          />
          <Column
            header="Image"
            body={(rowData) => (
              <div className="flex justify-center items-center h-full">
                <Image
                  src={rowData.van_image || "/default-image.png"}
                  alt={`${rowData.van_name} image`}
                  className="object-contain rounded"
                  width={150}
                  height={150}
                  onError={(e) => {
                    e.currentTarget.src = "/default-image.png";
                  }}
                />
              </div>
            )}
            pt={{
              bodyCell: {
                className:
                  "border text-blackColor p-2 text-[15px] lg:text-[13px]",
              },
              headerCell: {
                className:
                  "px-3 font-medium text-[15px] lg:text-[14px] xl:text-[14px] border-r",
              },
            }}
          />
          <Column
            field="van_description"
            header="Description"
            style={{ width: "300px" }}
            body={(rowData) => (
              <div className="line-clamp-2" title={rowData.van_description}>
                {rowData.van_description}
              </div>
            )}
            pt={{
              bodyCell: {
                className:
                  "border text-blackColor p-2 text-[15px] lg:text-[13px]",
              },
              headerCell: {
                className:
                  "px-3 font-medium lg:text-[14px] xl:text-[14px] text-[15px] border-r",
              },
            }}
          />
          <Column
            field="estimate_price"
            header="Estimate Price"
            body={(rowData) => (
              <div className="flex items-center justify-center">
                <TbCurrencyPeso className="mr-1" />
                {rowData.estimate_price}
              </div>
            )}
            pt={{
              bodyCell: {
                className:
                  "border text-blackColor p-2 text-[15px] text-center lg:text-[13px]",
              },
              headerCell: {
                className:
                  "px-3 font-medium lg:text-[14px] text-[15px] xl:text-[14px]  border-r",
              },
            }}
          />
          <Column
            field="people_capacity"
            header="People Capacity"
            pt={{
              bodyCell: {
                className:
                  "border text-blackColor p-2 text-[15px] text-center lg:text-[13px]",
              },
              headerCell: {
                className:
                  "px-3 font-medium lg:text-[14px] text-[15px] xl:text-[14px]  border-r",
              },
            }}
          />
          <Column
            field="things_capacity"
            header="Things Capacity"
            pt={{
              bodyCell: {
                className:
                  "border text-blackColor p-2 text-[15px] lg:text-[13px]",
              },
              headerCell: {
                className:
                  "px-3 font-medium lg:text-[14px] text-[15px] xl:text-[14px]  border-r",
              },
            }}
          />
          <Column
            field="transmission_type"
            header="Transmission Type"
            pt={{
              bodyCell: {
                className:
                  "border text-blackColor p-2 text-[15px lg:text-[13px]",
              },
              headerCell: {
                className:
                  "px-3 font-medium lg:text-[14px] text-[15px] xl:text-[14px]  border-r",
              },
            }}
          />
          <Column
            body={(rowData) => `${formatDateRange(rowData.createdAt)}`}
            header="Date Created"
            pt={{
              bodyCell: {
                className:
                  "border text-blackColor p-2 text-[15px] lg:text-[13px]",
              },
              headerCell: {
                className:
                  "px-3 font-medium lg:text-[14px] text-[15px] xl:text-[14px]  border-r",
              },
            }}
          />
          <Column
            field="status"
            header="Van Status"
            body={(rowData) => {
              let statusClass = "";

              // Apply different styles based on the status value
              switch (rowData.status) {
                case "available":
                  statusClass =
                    "bg-websiteSecondary text-websiteBlack text-[14px]";
                  break;
                case "booked":
                  statusClass = "bg-green-100 text-green-800 text-[14px]";
                  break;
                case "under maintenance":
                  statusClass = "bg-yellow/50 text-websiteBlack text-[14px]";
                  break;
                default:
                  statusClass = "bg-gray-100 text-gray-800";
              }

              return (
                <span
                  className={`px-2 py-1 rounded w-full flex justify-center ${statusClass}`}
                >
                  {rowData.status}
                </span>
              );
            }}
            pt={{
              bodyCell: { className: "border text-blackColor p-2" },
              headerCell: {
                className:
                  "px-3 font-medium text-[15px] border-r xl:text-[14px] ",
              },
            }}
          />
          <Column
            header="Actions"
            pt={{
              bodyCell: { className: "border-b text-blackColor p-2" },
              headerCell: {
                className:
                  "rounded-tr-[3px] px-3 font-medium xl:text-[14px] xl:text-[14px]  text-[15px] border-r",
              },
            }}
            body={(rowData) => (
              <div className="flex space-x-2 justify-center">
                <FaEye
                  onClick={() => onViewDetailsClick(rowData)}
                  className="text-green-400 cursor-pointer"
                  size={22}
                />
              </div>
            )}
          />
        </DataTable>
      </div>
      {/* ADD MODAL */}
      <Modal
        isOpen={isModalOpen}
        width="500px"
        onClose={() => setIsModalOpen(false)}
      >
        <div className=" flex flex-col bg-white rounded-[5px]">
          <div className="w-full h-[50px] flex pl-4 items-center bg-primaryColor rounded-t-[5px]">
            <h2 className="text-[20px] text-white font-medium">CREATE VAN</h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto p-3 pt-2 h-[400px]"
          >
            <div className="space-y-4">
              <InputField
                type="text"
                name="van_name"
                value={newVan.van_name}
                onChange={handleInputChange}
                placeholder="Van Name"
              />
              <div>
                <TextArea
                  value={newVan.van_description}
                  onChange={handleInputChange}
                  placeholder="Van Description"
                  name="van_description"
                />
                {inputErrors.people_capacity && (
                  <p className="text-red-500 text-sm">
                    {inputErrors.people_capacity}
                  </p>
                )}
              </div>
              <div className="flex gap-4 w-full">
                <div className="w-full">
                  <InputField
                    type="number"
                    name="people_capacity"
                    value={newVan.people_capacity}
                    onChange={handleInputChange}
                    placeholder="People Capacity"
                    inputMode="numeric"
                  />
                  {inputErrors.people_capacity && (
                    <p className="text-red-500 text-sm">
                      {inputErrors.people_capacity}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <InputField
                    type="number"
                    name="things_capacity"
                    value={newVan.things_capacity}
                    onChange={handleInputChange}
                    placeholder="Things Capacity"
                    inputMode="numeric"
                  />
                  {inputErrors.things_capacity && (
                    <p className="text-red-500 text-sm">
                      {inputErrors.things_capacity}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-4">
                <select
                  name="transmission_type"
                  value={newVan.transmission_type}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${newVan.transmission_type ? "text-websiteBlack" : "text-[#cccccc] font-light"} outline-none`}
                >
                  <option value="" className="text-[#CCCCCC] font-light">
                    Transmission Type:
                  </option>
                  <option value="Manual" className="text-[13px] text-[#CCCCCC]">
                    Manual
                  </option>
                  <option
                    value="Automatic"
                    className="text-[13px] text-[#CCCCCC]"
                  >
                    Automatic
                  </option>
                </select>
                <div className="w-full">
                  <InputField
                    type="number"
                    name="estimate_price"
                    value={newVan.estimate_price}
                    onChange={handleInputChange}
                    placeholder="Estimate Price"
                    inputMode="numeric"
                  />
                </div>
              </div>
              <div className="flex w-full justify-between gap-4">
                <div className="flex flex-col gap-[.5rem] w-[55%]">
                  <p className="text-[#CCCCCC] font-light">Van Image</p>
                  <ImagesUploader onUpload={handleImageUpload} />
                </div>
                <div className="w-[45%] gap-[.5rem] flex flex-col">
                  <p className="text-[#CCCCCC] font-light">Driver Assignee</p>
                  {loadingDrivers ? ( // Show loading state
                    <p>Loading drivers...</p>
                  ) : (
                    <Dropdown
                      id="driver"
                      value={selectedDriver}
                      onChange={(e) => {
                        console.log("Selected Driver:", e.value); // Log the selected driver
                        setSelectedDriver(e.value); // Set the selected driver
                      }}
                      options={drivers} // Ensure this is an array of driver objects
                      optionLabel="full_name" // Ensure this matches the property in your driver object
                      optionValue="driver_id" // Ensure this matches the property in your driver object
                      placeholder="Select a Driver"
                      className="border"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="py-4 px-6 border-t">
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  name="CANCEL"
                  backgroundColor="error"
                ></Button>
                <Button
                  name="ADD VAN"
                  type="submit"
                  backgroundColor="alert"
                ></Button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
      {/* Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        width="600px"
        onClose={() => setIsDetailsModalOpen(false)}
      >
        <div className="flex flex-col bg-white rounded-[5px] justify-between">
          <div className="flex justify-between items-center bg-primaryColor rounded-t-[5px] p-2">
            <h2 className="text-[18px] font-semibold text-white">
              VAN DETAILS
            </h2>
          </div>
          {selectedVan && (
            <div className="w-full">
              <div className=" flex justify-center pt-4">
                <Image
                  src={selectedVan.van_image || "/default-image.png"}
                  alt={`${selectedVan.van_name} image`}
                  className="w-[200px] object-cover rounded mb-4"
                  width={200}
                  height={300}
                />
              </div>
              <div className="p-3 flex w-full items-start justify-between gap-[20px] text-[14px] bg-gray-100 rounded-lg shadow-md">
                <div className="flex flex-col w-[50%] bg-white p-4 rounded-lg shadow-sm">
                  <h2 className="text-[16px] font-semibold mb-2 text-websiteBlack">
                    Van Details
                  </h2>
                  {[
                    { label: "Van Name", value: selectedVan.van_name },
                    {
                      label: "Description",
                      value: selectedVan.van_description,
                    },
                    {
                      label: "People Capacity",
                      value: selectedVan.people_capacity,
                    },
                    {
                      label: "Things Capacity",
                      value: selectedVan.things_capacity,
                    },
                    {
                      label: "Transmission Type",
                      value: selectedVan.transmission_type,
                    },
                    {
                      label: "Estimate Price",
                      value: (
                        <>
                          <TbCurrencyPeso className="mr-1" />
                          {selectedVan.estimate_price}
                        </>
                      ),
                    },
                    { label: "Status", value: selectedVan.status },
                    {
                      label: "Date Created",
                      value: formatDateRange(selectedVan.createdAt),
                    },
                  ].map(({ label, value }) => (
                    <p key={label} className="py-1 flex gap-4">
                      <p className="font-medium">{label}:</p> {value}
                    </p>
                  ))}
                </div>
                {driverDetails && (
                  <div className="w-[50%] flex flex-col bg-white p-4 rounded-lg shadow-sm">
                    <h2 className="text-[16px] font-semibold mb-[2px] text-websiteBlack">
                      Driver Details
                    </h2>
                    {[
                      {
                        label: "Driver Name",
                        value: `${driverDetails.first_name} ${driverDetails.last_name}`,
                      },
                      {
                        label: "Driver ID",
                        value: `DR-O${driverDetails.driver_id}`,
                      },
                      {
                        label: "Phone Number",
                        value: driverDetails.phoneNumber,
                      },
                    ].map(({ label, value }) => (
                      <p key={label} className="py-1">
                        <p className="font-medium">{label}:</p> {value}
                      </p>
                    ))}
                    <h2 className="text-[16px] font-semibold mt-2 text-websiteBlack">
                      Active Booking Status
                    </h2>
                    {[
                      {
                        label: "Confirmed",
                        value:
                          bookingStatusMap[selectedVan.van_id]?.confirmed || 0,
                      },
                      {
                        label: "Ongoing",
                        value:
                          bookingStatusMap[selectedVan.van_id]?.ongoing || 0,
                      },
                      {
                        label: "Pending",
                        value:
                          bookingStatusMap[selectedVan.van_id]?.pending || 0,
                      },
                    ].map(({ label, value }) => (
                      <p key={label} className="py-1 flex gap-4">
                        <p className="font-medium">{label}:</p> {value}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="py-2 px-6 border-t">
            <div className="flex justify-end space-x-2">
              {selectedVan &&
                selectedVan.status === "available" && ( // Show edit and delete buttons only if available
                  <>
                    {[
                      {
                        icon: <FaRegEdit size={18} />,
                        onClick: () => handleEditConfirmation(selectedVan!),
                        tooltip: "Edit",
                        color: "text-primaryColor",
                      },
                      {
                        icon: <MdDeleteOutline size={22} />,
                        onClick: () => handleDelete(selectedVan?.van_id as any),
                        tooltip: "Delete",
                        color: "text-red-400",
                      },
                      {
                        icon: <FaTools size={22} />,
                        onClick: () =>
                          handleVanMaintenance(selectedVan?.van_id as any),
                        tooltip: "Under Maintenance",
                        color: "text-yellow",
                      },
                    ].map((button, index) => (
                      <div
                        key={index}
                        className="p-2 border-2 w-[40px] flex justify-center rounded-[5px] border-primaryColor group hover:bg-primaryColor transition-colors duration-200"
                      >
                        <div className="relative group">
                          <div
                            className="flex justify-center items-center h-full cursor-pointer"
                            onClick={button.onClick}
                          >
                            {React.cloneElement(button.icon, {
                              className: `${button.color} group-hover:text-white`,
                            })}
                          </div>
                          {/* Tooltip */}
                          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-1 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2">
                            {button.tooltip}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              {selectedVan && selectedVan.status === "under maintenance" && (
                <div className="flex justify-end p-2">
                  <FaTools
                    onClick={() => handleVanAvailable(selectedVan.van_id)}
                    className="text-blue-400 cursor-pointer"
                    size={22}
                    title="Mark as Available"
                  />
                </div>
              )}
              <div className="relative group">
                <div className="p-2 border-2 w-[40px] flex justify-center rounded-[5px] border-primaryColor hover:bg-primaryColor transition-colors duration-200">
                  <IoClose
                    className="text-primaryColor cursor-pointer group-hover:text-white"
                    onClick={() => setIsDetailsModalOpen(false)}
                    size={22}
                  />
                </div>
                {/* Tooltip */}
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-1 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2">
                  Close
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        width="500px"
        height="600px"
        onClose={() => setIsEditModalOpen(false)}
      >
        <div className="h-full flex flex-col bg-white">
          <h2 className="text-[20px] font-medium p-3 pb-2">Edit Van</h2>
          <form
            onSubmit={handleEditSubmit}
            className="flex-1 overflow-y-auto p-3 pt-2"
          >
            <div className="space-y-4">
              <InputField
                type="text"
                value={newVan.van_name}
                onChange={handleInputChange}
                placeholder="Van Name"
              />
              <input
                type="text"
                name="van_name"
                value={newVan.van_name}
                onChange={handleInputChange}
                placeholder="Van Name"
                className="w-full p-2 border rounded"
              />
              <textarea
                name="van_description"
                value={newVan.van_description}
                onChange={handleInputChange}
                placeholder="Van Description"
                className="w-full p-2 border rounded"
              />
              <div className="space-y-1">
                <input
                  type="text"
                  name="people_capacity"
                  value={newVan.people_capacity}
                  onChange={handleInputChange}
                  placeholder="People Capacity"
                  className="w-full p-2 border rounded"
                  inputMode="numeric"
                />
                {inputErrors.people_capacity && (
                  <p className="text-red-500 text-sm">
                    {inputErrors.people_capacity}
                  </p>
                )}
              </div>
              <select
                name="transmission_type"
                value={newVan.transmission_type}
                onChange={handleInputChange}
                className="w-full p-2 border rounded text-gray-700"
              >
                <option value="">Select Transmission Type</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
              <div className="space-y-1">
                <input
                  type="text"
                  name="things_capacity"
                  value={newVan.things_capacity}
                  onChange={handleInputChange}
                  placeholder="Things Capacity"
                  className="w-full p-2 border rounded"
                  inputMode="numeric"
                />
                {inputErrors.things_capacity && (
                  <p className="text-red-500 text-sm">
                    {inputErrors.things_capacity}
                  </p>
                )}
              </div>
              {/* Add any additional fields as necessary */}
            </div>
            <div className="py-2 px-6 border-t">
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <Button name="Update Van" type="submit"></Button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default VanInventory;
