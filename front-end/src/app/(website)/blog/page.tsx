"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchAllPublicPosts } from "@/lib/api/posts.api";
import { BlogPost } from "@/lib/types/posts.type";
import {
  formatDatePublicRange,
  formatDateRange,
} from "@/components/date/formatDate";
import { motion } from "framer-motion";
import { getAllFeedbacks } from "@/lib/api/feedback.api";
import { Feedbacks } from "@/lib/types/feedback.type";
import { Carousel } from "primereact/carousel";

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]); // Ensure posts is initialized as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [customerReviews, setCustomerReviews] = useState<Feedbacks[]>([]); // State to hold customer reviews
  const [numVisible, setNumVisible] = useState(window.innerWidth < 640 ? 1 : 3); // State for number of visible items

  useEffect(() => {
    const handleResize = () => {
      setNumVisible(window.innerWidth < 640 ? 1 : 3); // Update visible items based on window width
    };

    window.addEventListener("resize", handleResize); // Add resize event listener
    return () => {
      window.removeEventListener("resize", handleResize); // Clean up on unmount
    };
  }, []); // Empty dependency array to run once on mount

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await fetchAllPublicPosts();

        // Assuming the structure is { message: '...', posts: [...] }
        setPosts(data.posts || []); // Set posts to an empty array if data.posts is undefined
      } catch (err) {
        setError("Failed to fetch posts"); // Updated error message for clarity
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchCustomerReviews = async () => {
      try {
        const reviewsData = await getAllFeedbacks(); // Assuming this fetches customer reviews
        setCustomerReviews(
          reviewsData.data.filter((review) => review.status === "PUBLISH")
        ); // Filter for 'PUBLISH' status
      } catch (error) {
        console.error("Error fetching customer reviews:", error);
      }
    };

    fetchCustomerReviews(); // Invoke the fetch function
  }, []);

  return (
    <div>
      {/* Banner */}
      <div className="relative w-full">
        <Image
          src="/png/blog_img.png"
          width={1200}
          height={300}
          alt="Blog Banner"
          className="w-full h-auto sm:aspect-[1200/600] md:aspect-[1200/300]"
        />
        <p className="absolute top-10 right-9 md:w-[60%] sm:w-[80%] md:text-[20px] sm:text-[16px] text-center">
          Embark on a Journey of Discovery : Your Go-To for Unforgettable
          Outdoor Fun, Where Every Moment Counts, Every Adventure Awaits, and
          Ever
        </p>
      </div>

      {/* Introduction */}
      <div className="flex justify-center text-center p-[4%]">
        <p className="md:px-[20%] sm:px-[5%]">
          Discover the thrill of adventure where every tale told shows how
          exploring transforms us, sparking a love for travel and creating
          memories that stay with us forever.
        </p>
      </div>

      {/* Featured Articles */}
      <div className="px-[9%] py-8">
        <h1 className="text-3xl font-bold mb-6 text-primaryColor">
          Featured Articles
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Article Loop */}
          {posts.length > 0 &&
            posts
              .filter((post) => post.status === "PUBLISH")
              .map(
                (
                  post,
                  index // Filter for 'PUBLISH' status
                ) => (
                  <motion.div
                    key={post.post_id}
                    initial={{ opacity: 0, y: 50 }} // Initial state for each item
                    whileInView={{ opacity: 1, y: 0 }} // Fade and slide up when in view
                    transition={{
                      opacity: { duration: 1.2 },
                      y: {
                        type: "spring",
                        stiffness: 100,
                        damping: 25,
                        duration: 1.2,
                      },
                      delay: index * 0.2, // Dynamic delay for each item (e.g., 0.2s delay per item)
                    }}
                  >
                    <div
                      key={index}
                      className="flex flex-col justify-between gap-5 bg-white shadow-md p-5 rounded-lg transition-transform transform hover:-translate-y-2 hover:shadow-x "
                    >
                      <Image
                        src={post.post_image || "/path/to/default/image.png"} // Fallback image if post_image is undefined
                        alt={post.title}
                        width={300} // Fixed width
                        height={200} // Fixed height
                        className="rounded-lg object-contain h-auto w-full aspect-[300/200]" // Added object-cover to maintain aspect ratio
                      />
                      <div className="w-full">
                        <div className="pb-4">
                          <h2 className="text-xl font-medium text-blackColor">
                            {post.title}
                          </h2>
                          <p className="text-[14px] font-semibold text-primaryColor mt-1">
                            {formatDatePublicRange(post.createdAt as any)}
                          </p>
                        </div>
                        <p className="text-gray-700 leading-relaxed ">
                          {post.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              )}
        </div>
      </div>
      {/* Customer Reviews */}
      <div className="md:px-[9%] sm:px-[5%] md:py-10 sm:py-2">
        <div className="w-full py-4">
          <h2 className="font-bold text-[14px] text-primaryColor ">
            Testimonial
          </h2>
          <h1 className="text-3xl font-bold  text-primaryColor">
            Our Customer Success Stories
          </h1>
          <p className="text-[15px]">
            Check out what our satisfied customers have shared about their
            experience with us.
          </p>
        </div>
        <Carousel
          value={customerReviews}
          numVisible={numVisible}
          numScroll={numVisible}
          itemTemplate={(review) => (
            <div className="flex flex-col justify-between  bg-white shadow-md p-5 rounded-lg mx-[20px]">
              <div>
                <h2 className="text-[18px] font-medium text-blackColor">
                  {review.full_name}
                </h2>
                <p className="text-[14px] font-semibold text-primaryColor ">
                  {formatDatePublicRange(review.created_at as any)}{" "}
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {review.overall_experience}
              </p>
              <div className="flex items-center">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={
                      i < review.rating ? "text-yellow-500" : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};
export default Blog;
