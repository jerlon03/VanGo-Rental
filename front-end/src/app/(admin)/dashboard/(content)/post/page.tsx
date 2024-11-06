'use client'
import LoadingComponents from '@/app/loading'
import AdminHeader from '@/components/admin/adminHeader'
import SweetAlert from '@/components/alert/alert'
import Button from '@/components/Button/button'
import { formatDatePublicRange, formatDateRange } from '@/components/date/formatDate'
import InputField from '@/components/Form/inputfield'
import TextArea from '@/components/Form/textarea'
import { FaEye, FaRegEdit, IoClose, MdDeleteOutline, MdPublish } from '@/components/icons'
import Modal from '@/components/modals/modalContainer'
import Pagination from '@/components/pagination/pagination'
import ImagesUploader from '@/components/Uplooad/ImagesUploader'
import { fetchAllAdmins, fetchAdminByUserId } from '@/lib/api/admin.api'
import { fetchAllPosts, fetchUpdatePosts, fetchCreatePost } from '@/lib/api/posts.api'
import { Admin } from '@/lib/types/admin.type'
import { BlogPost } from '@/lib/types/posts.type'
import { useAuth } from '@/Provider/context/authContext'
import Link from 'next/link'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useRef, useState } from 'react'

const AdminPost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [postImage, setPostsImage] = useState<File | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL'); // Default to 'ALL'
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Ref for the dropdown
  const [admins, setAdmins] = useState<Admin[]>([]); // Initialize as an empty array
  const { user } = useAuth();
  const [title, setTitle] = useState(''); // State for title

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDescription(''); // Clear the description when closing the modal
    setPostsImage(null); // Clear the post image when closing the modal
  };

  const addPost = () => {
    setSelectedPost(null); // Reset selected post when adding a new post
    setIsAddPostModalOpen(true); // Open the add post modal
    openModal(); // Open the modal
  };

  const handleImageUpload = (file: File) => {
    setPostsImage(file); // Ensure this is correctly setting the file
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev); // Toggle dropdown visibility
  };

  useEffect(() => {
    const loadAdmins = async () => {
      try {
        const userId = user?.user_id ? Number(user.user_id) : undefined; // Convert user_id to number if it exists
        if (userId !== undefined) { // Check if userId is defined before calling the function
          const response = await fetchAdminByUserId(userId); // Call the function to fetch the admin
          console.log('Admin Response', response);
          setAdmins([response]); // Set the fetched admin in state (wrap in an array if expecting a single admin)
        }
      } catch (err) {
        setError('Failed to fetch admin'); // Update error message for clarity
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    loadAdmins(); // Invoke the function
  }, [user]); // Add user as a dependency to re-run if user changes

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchAllPosts(); // Call the function
        setPosts(data.posts || []); // Set the posts in state
      } catch (err) {
        setError('Failed to fetch posts'); // Handle error
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    loadPosts();
  }, []);

  if (loading) return <LoadingComponents />;
  if (error) return <div>{error}</div>;

  // actions
  const handleEdit = (row: any) => {
    console.log('Edit:', row);
    SweetAlert.showConfirm('Are you sure you want to Edit?');
  };

  const handleDelete = async (row: any) => {
    console.log('Delete:', row);
    const confirmed = await SweetAlert.showConfirm('Are you sure you want to Delete?');
    if (confirmed) {
      SweetAlert.showSuccess('You successfully Deleted.');
    } else {
      console.log('Deletion canceled.');
    }
  };

  // pagination
  const totalPages = 10; // Adjust this based on your data
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value); // Update title state
  };

  const onPublishClick = async (rowData: BlogPost): Promise<void> => {
    const confirmed = await SweetAlert.showConfirm(`Are you sure you want to Publish Post [${rowData.post_id}]?`);
    if (confirmed) {
      try {
        if (rowData.status === 'PUBLISH') {
          SweetAlert.showError('Post is already published.'); // Show error message
          return; // Exit the function if already published
        }

        await fetchUpdatePosts(rowData.post_id, { status: 'PUBLISH' }); // Update post status
        const data = await fetchAllPosts(); // Refetch posts
        setPosts(data.posts || []); // Update state with new posts
        SweetAlert.showSuccess('You successfully Published.');
      } catch (error) {
        console.error('Error updating post:', error);
        SweetAlert.showError('Failed to publish the post.'); // Show error message
      }
    } else {
      console.log('Publishing canceled.');
    }
  };

  const viewPostDetails = (rowData: BlogPost) => {
    setSelectedPost(rowData); // Set the selected post
    openModal(); // Open the modal
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Check if all required fields are filled
    if (!title || !description || !postImage || !admins[0]?.admin_id) {
      SweetAlert.showError('Please fill out all required fields and upload an image.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        SweetAlert.showError('You are not authorized. Please log in.');
        return;
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('admin_id', admins[0]?.admin_id.toString() || ''); // Ensure admin_id is included
      formData.append('status', 'DRAFT'); // Set the status as needed

      if (postImage) {
        formData.append('post_image', postImage); // Ensure the key matches what the back-end expects
      }

      const res = await fetch('http://localhost:8080/api/posting/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        SweetAlert.showSuccess('Post created successfully');
        // Reset your form fields as needed
        setTitle(''); // Reset title
        setDescription(''); // Reset description
        setPostsImage(null); // Reset image
        setIsAddPostModalOpen(false); // Close the modal
        setIsModalOpen(false); // Close the modal to remove background
        const updatedPosts = await fetchAllPosts(); // Fetch updated posts
        setPosts(updatedPosts.posts || []); // Update state with new posts
      } else {
        SweetAlert.showError(data.message || 'Failed to create post');
      }
    } catch (error) {
      SweetAlert.showError('Failed to create post');
      console.error('Error:', error);
    }
  };


  const statuses = ['ALL', 'PUBLISH', 'DRAFT', 'CLOSED']; // Updated array of statuses to include 'ALL'

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log("Selected Status:", value); // Debugging log
    setSelectedStatus(value); // Set the selected status
    setIsDropdownOpen(false); // Close the dropdown when a status is selected
  };

  // Filter posts based on selected status
  const filteredPosts = selectedStatus === 'ALL' ? posts : posts.filter(post => post.status === selectedStatus); // Show all posts if 'ALL' is selected



  return (
    <div>
      {/* modal */}
      <Modal isOpen={isModalOpen} width='500px' height='460px' onClose={closeModal}>
        <div className='bg-white rounded-[5px]'>
          {selectedPost ? (
            <div className="bg-white rounded-[5px] shadow-lg">
              <div className="flex justify-between items-center bg-primaryColor rounded-t-[5px] p-4">
                <h2 className="text-[20px] font-semibold text-white">POST DETAILS</h2>
                <IoClose
                  onClick={closeModal}
                  className='cursor-pointer text-white hover:text-red-300 transition duration-200'
                  size={25}
                />
              </div>
              {selectedPost && (
                <div className="p-4">
                  {/* Image Section */}
                  {selectedPost.post_image && (
                    <img
                      src={selectedPost.post_image}
                      alt={selectedPost.title}
                      className="w-full h-auto rounded-lg mb-4 shadow-md"
                    />
                  )}
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{selectedPost.title}</h3>
                  <p className="text-gray-600 mb-4">{selectedPost.description}</p>
                  <p className="text-gray-500 text-sm">{formatDateRange(selectedPost.createdAt as any)}</p>
                </div>
              )}
            </div>
          ) : isAddPostModalOpen && (
            <div className='w-full flex justify-between items-center flex-col'>
              <div className='w-full h-[50px] flex pl-4 items-center bg-primaryColor rounded-t-[5px]'>
                <h2 className="text-[20px] text-white font-medium">CREATE BLOG POST</h2>
              </div>
              <div className='w-full px-4 p-4'>
                <form onSubmit={handleSubmit}>
                  <div className='flex flex-col gap-4'>
                    <div>
                      <label htmlFor="">Title <span className='text-red-700 font-bold'>*</span></label>
                      <InputField
                        placeholder='Write Here...'
                        value={title}
                        onChange={handleTitleChange}
                      />
                    </div>
                    <div className='w-full'>
                      <h2>Description <span className='text-red-700 font-bold'>*</span></h2>
                      <TextArea
                        value={description}
                        onChange={handleTextChange}
                        placeholder="Enter your description here"
                        rows={4}
                        cols={60}
                        maxLength={300}
                      />
                      <p className='flex w-full justify-end text-[12px] font-medium text-[#cccccc]'>{description.length}/300</p>
                    </div>
                  </div>
                  <div className='w-full flex gap-8 justify-center items-center'>
                    <div className='flex flex-col w-[60%]'>
                      <h2>Post Image <span className='text-red-700 font-bold'>*</span></h2>
                      <ImagesUploader onUpload={handleImageUpload} />
                    </div>
                    <div className='flex w-[40%] flex-col h-full gap-2'>
                      <Button name='CANCEL' onClick={closeModal} backgroundColor='error'></Button>
                      <Button name='SAVE' backgroundColor='success' type="submit"></Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </Modal>

      <div className='w-full pb-5'>
        <AdminHeader>
          <h1 className='text-[14px] flex items-end text-blackColor/70 tracking-[2px]'>
            <Link href="/dashboard">Dashboard</Link> / Posting
          </h1>
        </AdminHeader>
      </div>
      <div className='w-full px-[2%]'>
        <div className='w-full flex gap-2 py-5 justify-end'>
          <InputField placeholder="Search ..." height='35px' width='220px' />
          <Button name='ADD POST' onClick={addPost} width='180px' height='35px'></Button>
          <Button name='Filter By : ' width='150px' height='35px' onClick={toggleDropdown}></Button>
          {isDropdownOpen && (
            <div ref={dropdownRef} className="absolute bg-white border rounded shadow-lg z-10 mt-6 w-[120px]">
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
        <DataTable
          value={filteredPosts} // Use filtered posts here
          tableStyle={{ minWidth: '50rem' }}
          pt={{
            thead: { className: 'bg-primaryColor text-white ' },
            tbody: { className: 'border ' },
            headerRow: { className: 'h-[40px] ' },
          }}
        >
          <Column
            header="ID"
            field="post_id"
            pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px] lg:text-[14px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] rounded-tl-[3px] border-r lg:text-[14px]' }
            }}
          />
          <Column
            body={(rowData) => `${formatDatePublicRange(rowData.createdAt)}`}
            header="Date Created"
            pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px] truncate lg:text-[14px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] border-r lg:text-[14px] truncate' }
            }} />
          <Column
            field="title"
            header="Title" pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px] text-center truncate' },
              headerCell: { className: 'px-3 font-medium text-[16px] border-r lg:text-[14px]' }
            }} />
          <Column
            field="description"
            header="Description" pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px] lg:text-[14px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] border-r lg:text-[14px]' }
            }} />
          <Column
            header="Image"
            body={(rowData) => (
              <div className="flex justify-center items-center h-full">
                <img
                  src={rowData.post_image}
                  alt={`${rowData.title} image`}
                  className=" object-cover  rounded-[5px] border "
                  width={100}
                  height={100}
                  onError={(e) => {
                    e.currentTarget.src = '/default-image.png ';
                  }}
                />
              </div>
            )}
            pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px] lg:text-[13px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] lg:text-[14px] xl:text-[15px]  border-r' }
            }}
          />
          <Column
            field="status"
            header="Status"
            body={(rowData) => {
              let statusClass = '';

              // Apply different styles based on the status value
              switch (rowData.status) {
                case 'PUBLISH':
                  statusClass = 'bg-green-500 text-white lg:text-[14px]';
                  break;
                case 'DRAFT':
                  statusClass = 'bg-yellow-400 text-white lg:text-[14px]';
                  break;
                case 'CLOSED':
                  statusClass = 'bg-yellow-400 text-white lg:text-[14px]';
                  break;
                default:
                  statusClass = 'bg-gray-100 text-gray-800 lg:text-[14px]';
              }

              return (
                <span className={`px-2 py-1 rounded ${statusClass} flex text-center items-center justify-center`}>
                  {rowData.status}
                </span>
              );
            }}
            pt={{
              bodyCell: { className: 'border text-blackColor p-2' },
              headerCell: { className: 'px-3 font-medium text-[16px] border-r lg:text-[14px]' }
            }}
          />
          <Column
            header="Actions"
            pt={{
              bodyCell: { className: 'border-b text-blackColor p-2' },
              headerCell: { className: 'rounded-tr-[3px] px-3 font-medium text-[16px] border-r lg:text-[14px]' }
            }}
            body={(rowData) => (
              <div className="flex space-x-2 justify-center">
                {rowData.status === 'DRAFT' && (
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
                {rowData.status === 'PUBLISH' && (
                  <FaEye
                    onClick={() => viewPostDetails(rowData)}
                    className="text-green-400 cursor-pointer"
                    size={22}
                    title="View Post"
                  />
                )}
                {rowData.status === 'DRAFT' && (
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
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default AdminPost;
