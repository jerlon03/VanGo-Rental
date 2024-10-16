'use client'
import AdminHeader from '@/components/admin/adminHeader'
import SweetAlert from '@/components/alert/alert'
import Button from '@/components/Button/button'
import { formatDateRange } from '@/components/date/formatDate'
import InputField from '@/components/Form/inputfield'
import TextArea from '@/components/Form/textarea'
import { FaEye, FaRegEdit, IoClose, MdDeleteOutline, MdPublish } from '@/components/icons'
import Modal from '@/components/modals/modalContainer'
import Pagination from '@/components/pagination/pagination'
import ImagesUploader from '@/components/Uplooad/ImagesUploader'
import { fetchAllPosts, fetchUpdatePosts } from '@/lib/api/posts.api'
import { BlogPost } from '@/lib/types/posts.type'
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
    setPostsImage(file);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev); // Toggle dropdown visibility
  };

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

  if (loading) return <div>Loading...</div>;
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

  const handleSave = () => {
    SweetAlert.showSuccess('Post saved successfully!'); // Show success alert
    closeModal(); // This will also clear the data
  };

  const statuses = ['ALL', 'PUBLISH', 'DRAFT', 'CLOSED']; // Updated array of statuses to include 'ALL'

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log("Selected Status:", value); // Debugging log
    setSelectedStatus(value); // Set the selected status
    setIsDropdownOpen(false); // Close the dropdown when a status is selected
  };


  // Event handler for clicking outside the dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  // Effect to handle outside click
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // This effect runs only once on mount

  // Filter posts based on selected status
  const filteredPosts = selectedStatus ? posts.filter(post => post.status === selectedStatus) : posts; // Show all posts if selectedStatus is empty

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
                <div className='flex flex-col gap-4'>
                  <div>
                    <label htmlFor="">Title <span className='text-red-700 font-bold'>*</span></label>
                    <InputField placeholder='Write Here...' />
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
                    <Button name='SAVE' backgroundColor='success' onClick={handleSave}></Button>
                  </div>
                </div>
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
              bodyCell: { className: 'border text-blackColor p-2 text-[15px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] rounded-tl-[3px] border-r' }
            }}
          />
          <Column
            body={(rowData) => `${formatDateRange(rowData.createdAt)}`}
            header="Date Created"
            pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] border-r' }
            }} />
          <Column
            field="title"
            header="Title" pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px] text-center' },
              headerCell: { className: 'px-3 font-medium text-[16px] border-r' }
            }} />
          <Column
            field="description"
            header="Description" pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] border-r' }
            }} />
          <Column
            field="post_image"
            header="Image" pt={{
              bodyCell: { className: 'border text-blackColor p-2 text-[15px]' },
              headerCell: { className: 'px-3 font-medium text-[16px] border-r' }
            }} />
          <Column
            field="status"
            header="Status"
            body={(rowData) => {
              let statusClass = '';

              // Apply different styles based on the status value
              switch (rowData.status) {
                case 'PUBLISH':
                  statusClass = 'bg-green-500 text-white';
                  break;
                case 'DRAFT':
                  statusClass = 'bg-yellow-400 text-white';
                  break;
                case 'CLOSED':
                  statusClass = 'bg-yellow-400 text-white';
                  break;
                default:
                  statusClass = 'bg-gray-100 text-gray-800';
              }

              return (
                <span className={`px-2 py-1 rounded ${statusClass} flex text-center items-center justify-center`}>
                  {rowData.status}
                </span>
              );
            }}
            pt={{
              bodyCell: { className: 'border text-blackColor p-2' },
              headerCell: { className: 'px-3 font-medium text-[16px] border-r' }
            }}
          />
          <Column
            header="Actions"
            pt={{
              bodyCell: { className: 'border-b text-blackColor p-2' },
              headerCell: { className: 'rounded-tr-[3px] px-3 font-medium text-[16px] border-r ' }
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
