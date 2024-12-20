"use client";
import LoadingComponents from "@/app/loading";
import AdminHeader from "@/components/admin/adminHeader";
import SweetAlert from "@/components/alert/alert";
import Button from "@/components/Button/button";
import {
  formatDatePublicRange,
  formatDateRange,
} from "@/components/date/formatDate";
import InputField from "@/components/Form/inputfield";
import TextArea from "@/components/Form/textarea";
import {
  FaEye,
  FaRegEdit,
  IoClose,
  MdDeleteOutline,
  MdPublish,
} from "@/components/icons";
import Modal from "@/components/modals/modalContainer";
import Pagination from "@/components/pagination/pagination";
import ImagesUploader from "@/components/Uplooad/ImagesUploader";
import { fetchAllAdmins, fetchAdminByUserId } from "@/lib/api/admin.api";
import {
  fetchAllPosts,
  fetchUpdatePosts,
  fetchCreatePost,
  fetchDeletePost,
} from "@/lib/api/posts.api";
import { Admin } from "@/lib/types/admin.type";
import { BlogPost } from "@/lib/types/posts.type";
import { useAuth } from "@/Provider/context/authContext";
import Link from "next/link";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const AdminPost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [postImage, setPostsImage] = useState<File | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL"); // Default to 'ALL'
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Ref for the dropdown
  const [admins, setAdmins] = useState<Admin[]>([]); // Initialize as an empty array
  const { user } = useAuth();
  const [title, setTitle] = useState(""); // State for title
  const [totalPosts, setTotalPosts] = useState<number>(0); // New state for total posts
  const postsPerPage = 5; // Set the number of posts per page
  const [isEditModal, setIsEditModal] = useState(false); // New state to determine if it's an edit modal
  const [searchQuery, setSearchQuery] = useState<string>(""); // New state for search query

  useEffect(() => {
    const loadAdmins = async () => {
      try {
        const userId = user?.user_id ? Number(user.user_id) : undefined; // Convert user_id to number if it exists
        if (userId !== undefined) {
          // Check if userId is defined before calling the function
          const response = await fetchAdminByUserId(userId); // Call the function to fetch the admin
          console.log("Admin Response", response);
          setAdmins([response]); // Set the fetched admin in state (wrap in an array if expecting a single admin)
        }
      } catch (err) {
        setError("Failed to fetch admin"); // Update error message for clarity
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    loadAdmins(); // Invoke the function
  }, [user]); // Add user as a dependency to re-run if user changes

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDescription(""); // Clear the description when closing the modal
    setPostsImage(null); // Clear the post image when closing the modal
  };

  const addPost = () => {
    setSelectedPost(null); // Reset selected post when adding a new post
    setIsAddPostModalOpen(true); // Open the add post modal
    setIsEditModal(false); // Ensure it's not in edit mode
    openModal(); // Open the modal
  };

  const handleImageUpload = (file: File) => {
    setPostsImage(file); // Ensure this is correctly setting the file
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle dropdown visibility
  };
  const totalPages = Math.ceil(totalPosts / postsPerPage); // Corrected total pages calculation

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchAllPosts(); // Fetch all posts
        const sortedPosts = data.posts.sort(
          (a: BlogPost, b: BlogPost) => b.post_id - a.post_id
        );

        // Check if filtering logic is correct
        const filteredPosts =
          selectedStatus === "ALL"
            ? sortedPosts.filter(
                (post) =>
                  post.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  post.post_id.toString().includes(searchQuery)
              )
            : sortedPosts.filter(
                (post) =>
                  post.status === selectedStatus &&
                  (post.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                    post.post_id.toString().includes(searchQuery))
              );

        setTotalPosts(filteredPosts.length); // Update total posts
        setPosts(
          filteredPosts.slice(
            (currentPage - 1) * postsPerPage,
            currentPage * postsPerPage
          ) || []
        );
      } catch (err) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    loadPosts(); // Load posts for the current page
  }, [currentPage, selectedStatus, searchQuery]); // Ensure dependencies include searchQuery

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Update the current page state
  };

  if (loading) return <LoadingComponents />;
  if (error) return <div>{error}</div>;

  // actions
  const editPost = async (rowData: BlogPost) => {
    openEditModal(rowData); // Set the selected post for editing
    openModal(); // Open the modal for editing
  };

  const handleEdit = (row: any) => {
    console.log("Edit:", row);
    SweetAlert.showConfirm("Are you sure you want to Edit?").then(
      (confirmed) => {
        if (confirmed) {
          editPost(row); // Call the editPost function
        }
      }
    );
  };

  const handleDelete = async (row: BlogPost) => {
    console.log("Delete:", row);
    const confirmed = await SweetAlert.showConfirm(
      "Are you sure you want to Delete?"
    );
    if (confirmed) {
      try {
        const response = await fetchDeletePost(row.post_id); // Call the fetchDeletePost function
        SweetAlert.showSuccess(response.message); // Show success message
        // Update the posts state to remove the deleted post
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post.post_id !== row.post_id)
        );
      } catch (error) {
        console.error("Error deleting post:", error);
        SweetAlert.showError("Failed to delete the post."); // Show error message
      }
    } else {
      console.log("Deletion canceled.");
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value); // Update title state
  };

  const onPublishClick = async (rowData: BlogPost): Promise<void> => {
    const confirmed = await SweetAlert.showConfirm(
      `Are you sure you want to Publish Post [${rowData.post_id}]?`
    );
    if (confirmed) {
      try {
        if (rowData.status === "PUBLISH") {
          SweetAlert.showError("Post is already published."); // Show error message
          return; // Exit the function if already published
        }

        await fetchUpdatePosts(rowData.post_id, { status: "PUBLISH" }); // Update post status
        // Update the local state to reflect the published status
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.post_id === rowData.post_id
              ? { ...post, status: "PUBLISH" } // Update the status of the published post
              : post
          )
        );
        SweetAlert.showSuccess("You successfully Published.");
      } catch (error) {
        console.error("Error updating post:", error);
        SweetAlert.showError("Failed to publish the post."); // Show error message
      }
    } else {
      console.log("Publishing canceled.");
    }
  };

  const viewPostDetails = (rowData: BlogPost) => {
    setSelectedPost(rowData); // Set the selected post
    openModal(); // Open the modal
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Check if all required fields are filled
    if (!title || !description || !postImage || !admins[0]?.admin_id) {
      SweetAlert.showError(
        "Please fill out all required fields and upload an image."
      );
      return; // Exit if validation fails
    }

    // Add SweetAlert confirmation before submission
    const confirmed = await SweetAlert.showConfirm(
      "Are you sure you want to submit this blog post?"
    );
    if (!confirmed) {
      return; // Exit if the user cancels the submission
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        SweetAlert.showError("You are not authorized. Please log in.");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("admin_id", admins[0]?.admin_id.toString() || "");
      formData.append("status", "DRAFT");

      if (postImage) {
        formData.append("post_image", postImage);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/posting/create`,
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
        SweetAlert.showSuccess("Post created successfully");
        // Reset your form fields as needed
        setTitle(""); // Reset title
        setDescription(""); // Reset description
        setPostsImage(null); // Reset image
        setIsAddPostModalOpen(false); // Close the modal
        setIsModalOpen(false); // Close the modal to remove background

        // Fetch updated posts to display
        const updatedPosts = await fetchAllPosts(); // Fetch updated posts
        setTotalPosts(updatedPosts.posts.length); // Update total posts
        setCurrentPage(1); // Reset to the first page
        setPosts(updatedPosts.posts.slice(0, postsPerPage)); // Set posts for the first page
      } else {
        SweetAlert.showError(data.message || "Failed to create post");
      }
    } catch (error) {
      SweetAlert.showError("Failed to create post");
      console.error("Error:", error);
    }
  };

  const statuses = ["ALL", "PUBLISH", "DRAFT", "CLOSED"]; // Updated array of statuses to include 'ALL'

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedStatus(value); // Set the selected status
    setIsDropdownOpen(false); // Close the dropdown when a status is selected
  };

  const openEditModal = (post: BlogPost) => {
    setSelectedPost(post); // Set the selected post for editing
    setTitle(post.title); // Pre-fill the title field
    setDescription(post.description as any); // Pre-fill the description field
    setIsAddPostModalOpen(false); // Ensure it's not in add mode
    setIsEditModal(true); // Set the modal to edit mode
    openModal(); // Open the modal
  };

  const handleEditSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate required fields
    if (!title && !description && !postImage) {
      SweetAlert.showError("Please fill out at least one field to update.");
      return;
    }

    const confirmed = await SweetAlert.showConfirm(
      "Are you sure you want to update this blog post?"
    );
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        SweetAlert.showError("You are not authorized. Please log in.");
        return;
      }

      const formData = new FormData();
      if (title) formData.append("title", title);
      if (description) formData.append("description", description);
      if (postImage) formData.append("post_image", postImage);
      formData.append("status", selectedPost?.status || "DRAFT");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/posting/update/${selectedPost?.post_id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();
      if (res.ok) {
        SweetAlert.showSuccess("Post updated successfully");
        // Reset your form fields as needed
        setTitle(""); // Reset title
        setDescription(""); // Reset description
        setPostsImage(null); // Reset image
        setIsAddPostModalOpen(false); // Close the modal
        setIsModalOpen(false); // Close the modal to remove background

        // Fetch updated posts to display
        const updatedPosts = await fetchAllPosts(); // Fetch updated posts
        setTotalPosts(updatedPosts.posts.length); // Update total posts
        setCurrentPage(1); // Reset to the first page
        setPosts(updatedPosts.posts.slice(0, postsPerPage)); // Set posts for the first page
      } else {
        SweetAlert.showError(data.message || "Failed to update post");
      }
    } catch (error) {
      SweetAlert.showError("Failed to update post");
      console.error("Error:", error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Ensure this updates the search query state
  };

  return (
    <div>
      {/* modal */}
      <Modal
        isOpen={isModalOpen}
        width="500px"
        height="460px"
        onClose={closeModal}
      >
        <div className="bg-white rounded-[5px]">
          {isEditModal ? ( // Check if it's an edit modal
            <div className="bg-white rounded-[5px] shadow-lg">
              <div className="flex justify-between items-center bg-primaryColor rounded-t-[5px] p-4">
                <h2 className="text-[20px] font-semibold text-white">
                  EDIT POST
                </h2>
              </div>
              <div className="p-4 ">
                <form onSubmit={handleEditSubmit}>
                  <div className="flex flex-col gap-4">
                    <div>
                      <label htmlFor="">
                        Title <span className="text-red-700 font-bold">*</span>
                      </label>
                      <InputField
                        placeholder="Write Here..."
                        value={title}
                        onChange={handleTitleChange}
                      />
                    </div>
                    <div className="w-full">
                      <h2>
                        Description{" "}
                        <span className="text-red-700 font-bold">*</span>
                      </h2>
                      <TextArea
                        value={description}
                        onChange={handleTextChange}
                        placeholder="Enter your description here"
                        rows={4}
                        cols={60}
                        maxLength={300}
                      />
                      <p className="flex w-full justify-end text-[12px] font-medium text-[#cccccc]">
                        {description.length}/300
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex gap-8 justify-center items-center">
                    <div className="flex flex-col w-[60%]">
                      <h2>
                        Post Image{" "}
                        <span className="text-red-700 font-bold">*</span>
                      </h2>
                      <ImagesUploader onUpload={handleImageUpload} />
                    </div>
                    <div className="flex w-[40%] flex-col h-full gap-2">
                      <Button
                        name="CANCEL"
                        onClick={closeModal}
                        backgroundColor="error"
                      ></Button>
                      <Button
                        name="UPDATE"
                        backgroundColor="success"
                        type="submit"
                      ></Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : isAddPostModalOpen ? ( // Check if it's an add post modal
            <div className="w-full flex justify-between items-center flex-col">
              <div className="w-full h-[50px] flex pl-4 items-center bg-primaryColor rounded-t-[5px]">
                <h2 className="text-[20px] text-white font-medium">
                  CREATE BLOG POST
                </h2>
              </div>
              <div className="w-full px-4 p-4">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-4">
                    <div>
                      <label htmlFor="">
                        Title <span className="text-red-700 font-bold">*</span>
                      </label>
                      <InputField
                        placeholder="Write Here..."
                        value={title}
                        onChange={handleTitleChange}
                      />
                    </div>
                    <div className="w-full">
                      <h2>
                        Description{" "}
                        <span className="text-red-700 font-bold">*</span>
                      </h2>
                      <TextArea
                        value={description}
                        onChange={handleTextChange}
                        placeholder="Enter your description here"
                        rows={4}
                        cols={60}
                        maxLength={300}
                      />
                      <p className="flex w-full justify-end text-[12px] font-medium text-[#cccccc]">
                        {description.length}/300
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex gap-8 justify-center items-center">
                    <div className="flex flex-col w-[60%]">
                      <h2>
                        Post Image{" "}
                        <span className="text-red-700 font-bold">*</span>
                      </h2>
                      <ImagesUploader onUpload={handleImageUpload} />
                    </div>
                    <div className="flex w-[40%] flex-col h-full gap-2">
                      <Button
                        name="CANCEL"
                        onClick={closeModal}
                        backgroundColor="error"
                      ></Button>
                      <Button
                        name="SUBMIT"
                        backgroundColor="success"
                        type="submit"
                      ></Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[5px] shadow-lg">
              <div className="flex justify-between items-center bg-primaryColor rounded-t-[5px] p-4">
                <h2 className="text-[20px] font-semibold text-white">
                  VIEW POST
                </h2>
                <IoClose
                  onClick={closeModal}
                  className="text-white cursor-pointer"
                  size={24}
                  title="Close"
                />
              </div>
              <div className="p-4">
                <div className="w-full flex  justify-center  items-center">
                  <Image
                    src={selectedPost?.post_image || "/default-image.png"}
                    alt={`${selectedPost?.title} image`}
                    className="object-contain rounded-[5px] "
                    width={200}
                    height={200}
                    onError={(e) => {
                      e.currentTarget.src = "/default-image.png";
                    }}
                  />
                </div>
                <h3 className="font-bold">Title:</h3>
                <p>{selectedPost?.title}</p>
                <h3 className="font-bold">Description:</h3>
                <p>{selectedPost?.description}</p>
                <h3 className="font-bold">Status:</h3>
                <p>{selectedPost?.status}</p>
                <h3 className="font-bold">Date Created:</h3>
                <p>{formatDatePublicRange(selectedPost?.createdAt as any)}</p>
              </div>
            </div>
          )}
        </div>
      </Modal>

      <div className="w-full pb-5">
        <AdminHeader>
          <h1 className="text-[14px] flex items-end text-blackColor/70 tracking-[2px]">
            <Link href="/dashboard">Dashboard</Link> / Posting
          </h1>
        </AdminHeader>
      </div>
      <div className="w-full px-[2%]">
        <div className="w-full flex gap-2 py-5 justify-end">
          <InputField
            placeholder="Search ..."
            height="35px"
            width="220px"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button
            name="ADD POST"
            onClick={addPost}
            width="180px"
            height="35px"
          />
          <Button
            name={`Filter By : ${selectedStatus}`}
            width="150px"
            height="35px"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute bg-white border rounded shadow-lg z-10 mt-6 w-[120px]"
            >
              <div className="p-2">
                {statuses.map((status) => (
                  <div key={status} className="flex items-center">
                    <input
                      type="radio"
                      id={status}
                      name="status"
                      value={status}
                      checked={selectedStatus === status} // Check if this status is selected
                      onChange={handleStatusChange}
                      className="mr-2 custom-radio"
                    />
                    <label htmlFor={status}>{status}</label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Conditional rendering for DataTable and no posts found message */}
        {posts.length > 0 ? (
          <>
            <DataTable
              value={posts} // Use filtered posts here
              tableStyle={{ minWidth: "50rem" }}
              pt={{
                thead: { className: "bg-primaryColor text-white " },
                tbody: { className: "border " },
                headerRow: { className: "h-[40px] " },
              }}
            >
              <Column
                header="ID"
                field="post_id"
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
                body={(rowData) =>
                  `${formatDatePublicRange(rowData.createdAt)}`
                }
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
                field="title"
                header="Title"
                pt={{
                  bodyCell: {
                    className:
                      "border text-blackColor p-2 text-[15px] text-center ",
                  },
                  headerCell: {
                    className:
                      "px-3 font-medium text-[16px] border-r lg:text-[14px]",
                  },
                }}
              />
              <Column
                field="description"
                header="Description"
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
                header="Image"
                body={(rowData) => (
                  <div className="flex justify-center items-center h-full">
                    <Image
                      src={rowData.post_image}
                      alt={`${rowData.title} image`}
                      className="object-contain rounded-[5px] border aspect-[100/80]"
                      width={80}
                      height={50}
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
                      "px-3 font-medium text-[16px] lg:text-[14px] xl:text-[15px] border-r",
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
                    case "DRAFT":
                      statusClass = "bg-yellow text-white lg:text-[14px]";
                      break;
                    case "CLOSED":
                      statusClass =
                        "bg-websiteSecondary text-white lg:text-[14px]";
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
                pt={{
                  bodyCell: { className: "border-b text-blackColor p-2" },
                  headerCell: {
                    className:
                      "rounded-tr-[3px] px-3 font-medium text-[16px] border-r lg:text-[14px]",
                  },
                }}
                body={(rowData) => (
                  <div className="flex space-x-2 justify-center">
                    {rowData.status === "DRAFT" && (
                      <>
                        <FaRegEdit
                          onClick={() => handleEdit(rowData)}
                          className="text-primaryColor cursor-pointer"
                          size={18}
                          title="Edit Post"
                        />
                        <MdDeleteOutline
                          onClick={() => handleDelete(rowData)}
                          className="text-red-400 cursor-pointer"
                          size={22}
                          title="Delete Post"
                        />
                      </>
                    )}
                    {rowData.status === "PUBLISH" && (
                      <>
                        <FaEye
                          onClick={() => viewPostDetails(rowData)}
                          className="text-green-400 cursor-pointer"
                          size={22}
                          title="View Post"
                        />
                        <MdPublish
                          onClick={() => {
                            SweetAlert.showConfirm(
                              "Are you sure you want to change the status to CLOSED?"
                            ).then(async (confirmed) => {
                              if (confirmed) {
                                try {
                                  await fetchUpdatePosts(rowData.post_id, {
                                    status: "CLOSED",
                                  }); // Update post status to CLOSED

                                  // Update the local state to reflect the new status
                                  setPosts((prevPosts) =>
                                    prevPosts.map((post) =>
                                      post.post_id === rowData.post_id
                                        ? { ...post, status: "CLOSED" } // Update the status to CLOSED
                                        : post
                                    )
                                  );
                                  SweetAlert.showSuccess(
                                    "Post status changed to CLOSED."
                                  );
                                } catch (error) {
                                  console.error("Error updating post:", error);
                                  SweetAlert.showError(
                                    "Failed to change post status."
                                  );
                                }
                              }
                            });
                          }}
                          className="text-green-400 cursor-pointer transform rotate-180"
                          size={22}
                          title="Publish Post"
                        />
                      </>
                    )}
                    {rowData.status === "DRAFT" && (
                      <MdPublish
                        onClick={() => onPublishClick(rowData)}
                        className="text-green-400 cursor-pointer"
                        size={22}
                        title="Publish Post"
                      />
                    )}
                  </div>
                )}
              />
            </DataTable>

            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center text-white mt-4 border p-4 rounded-[5px] bg-primaryColor/50">
            No posts found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPost;
