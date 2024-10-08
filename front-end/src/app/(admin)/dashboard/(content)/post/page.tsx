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
import React, { useEffect, useState } from 'react'

const AdminPost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null); // State to hold the selected post details
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false); // State for modal
  const [description, setDescription] = useState('');
  const [postImage, setPostsImage] = useState<File | null>(null);

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
    setIsAddPostModalOpen(true); // Correctly set the state to open the add post modal
    openModal(); // Open the modal
  }
  const handleImageUpload = (file: File) => {
    setPostsImage(file);
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
  console.log(posts, 'testing posting')

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // actions
  const handleEdit = (row: any) => {
    // Handle edit action
    console.log('Edit:', row);
    SweetAlert.showConfirm('Are you sure you want to Edit?')
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
  const totalPages = 10;
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };


  const onPublishClick = async (rowData: BlogPost): Promise<void> => {
    console.log('Publish:', rowData);
    const confirmed = await SweetAlert.showConfirm(`Are you sure you want to Publish Post [${rowData.post_id}]?`);
    if (confirmed) {
      try {
        // Check if the post is already published
        if (rowData.status === 'publish') {
          SweetAlert.showError('Post is already published.'); // Show error message
          return; // Exit the function if already published
        }

        // Call the API to update only the post status to 'publish'
        await fetchUpdatePosts(rowData.post_id, { status: 'publish' }); // Ensure only status is sent

        // Refetch posts after publishing
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

  // Function to open the modal with post details
  const viewPostDetails = (rowData: BlogPost) => {
    setSelectedPost(rowData); // Set the selected post
    openModal(); // Open the modal
  };

  const handleSave = () => {
    SweetAlert.showSuccess('Post saved successfully!'); // Show success alert
    closeModal(); // This will also clear the data
  };

  return (
    <div>
      {/* modal */}
      <Modal isOpen={isModalOpen} width='500px' height='460px'>
        <div>
          {selectedPost ? ( // Only show header if a post is selected
            <div className='w-full flex justify-between items-center bg-primaryColor'>

              <h2 className="text-[18px] font-semibold text-blackColor">POST DETAILS</h2>
              <IoClose onClick={closeModal} className='cursor-pointer font-medium' size={25} />
            </div>
          ) : isAddPostModalOpen && ( // Show header for adding post
            <div className='w-full flex justify-between items-center flex-col'>
              <div className='w-full h-[50px] flex pl-4 items-center bg-primaryColor rounded-t-[5px]'>
                <h2 className="text-[20px] text-white font-medium  ">CREATE BLOG POST</h2>
              </div>
              <div className='w-full px-4 p-4 '>
                <div className='flex flex-col gap-4'>
                  <div>
                    <label htmlFor="">Title <span className='text-red-700 font-bold'>*</span></label>
                    <InputField placeholder='Write Here...' />
                  </div>
                  <div className='w-full'>
                    <h2>Description <span className='text-red-700 font-bold'>*</span></h2>
                    <TextArea
                      value={description}  // Pass the value here
                      onChange={handleTextChange}  // Pass the onChange handler here
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

          {selectedPost && ( // Display post details if selectedPost is not null
            <div>
              <h3>{selectedPost.title}</h3>
              <p>{selectedPost.description}</p>
              <p>{formatDateRange(selectedPost.createdAt as any)}</p>
              {/* Add more fields as necessary */}
            </div>
          )}
        </div>

      </Modal>

      <div className='w-full pb-5'>
        <AdminHeader>
          <h1 className='text-[14px] flex items-end  text-blackColor/70 tracking-[2px]'><Link href="/dashboard">Dashboard</Link> / Posting</h1>
        </AdminHeader>
      </div>
      <div className='w-full px-[2%]'>
        <div className='w-full flex gap-2 py-5 justify-end'>
          <Button name='ADD POST' onClick={addPost} width='180px' height='35px'></Button>
          <Button name='Filter By : ' width='150px' height='35px'></Button>
          <InputField placeholder="Search ..." height='35px' width='220px' />
        </div>
        <DataTable
          value={posts}
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
            header=" Descrtiption" pt={{
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
                {rowData.status === 'DRAFT' && ( // Check if status is 'unpublish'
                  <>
                    <FaRegEdit
                      onClick={() => handleEdit(rowData)}
                      className="text-primaryColor cursor-pointer"
                      size={18}
                      title="Edit Post" // Tooltip for edit icon
                    />
                    <MdDeleteOutline
                      onClick={() => handleDelete(rowData)}
                      className="text-red-400 cursor-pointer"
                      size={22}
                      title="Delete Post" // Tooltip for delete icon
                    />
                  </>
                )}
                {rowData.status === 'PUBLISH' && ( // Show eye icon only for published posts
                  <FaEye
                    onClick={() => viewPostDetails(rowData)} // Update to call the new function
                    className="text-green-400 cursor-pointer"
                    size={22}
                    title="View Post" // Tooltip for view icon
                  />
                )}
                {rowData.status === 'DRAFT' && ( // Check if status is 'unpublish'
                  <MdPublish
                    onClick={() => onPublishClick(rowData)}
                    className="text-green-400 cursor-pointer"
                    size={22}
                    title="Publish Post" // Tooltip for publish icon
                  />
                )}
              </div>
            )} />
        </DataTable>
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>

    </div>
  )
}

export default AdminPost
