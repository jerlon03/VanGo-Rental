'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchAllPublicPosts } from "@/lib/api/posts.api";
import { BlogPost } from "@/lib/types/posts.type";
import ArticleCard from "@/components/Card/postCard";

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]); // Ensure posts is initialized as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await fetchAllPublicPosts();
        console.log(data, 'datahgyuf'); // Logs the entire response
  
        // Assuming the structure is { message: '...', posts: [...] }
        setPosts(data.posts || []); // Set posts to an empty array if data.posts is undefined
      } catch (err) {
        setError('Failed to fetch posts'); // Updated error message for clarity
      } finally {
        setLoading(false);
      }
    };
  
    fetchPosts();
  }, []);
  

  console.log(posts, 'test again data')

  return (
    <div>
      {/* Banner */}
      <div className="relative w-full">
        <Image
          src="/png/blog_img.png"
          width={300}
          height={300}
          alt="Blog Banner"
          className="w-full"
        />
        <h1 className="absolute top-10 right-9 w-[60%] text-[20px] text-center">
          “Embark on a Journey of Discovery: Your Go-To for Unforgettable
          Outdoor Fun, Where Every Moment Counts, Every Adventure Awaits, and
          Every Memory Lasts a Lifetime."
        </h1>
      </div>

      {/* Introduction */}
      <div className="flex justify-center text-center p-[4%]">
        <p className="px-[20%]">
          Discover the thrill of adventure where every tale told shows how
          exploring transforms us, sparking a love for travel and creating
          memories that stay with us forever.
        </p>
      </div>

      {/* Featured Articles */}
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          posts.map(post => {
            console.log(post , 'test'); // Log each post to ensure it's being passed correctly
            return <ArticleCard key={post.post_id} posts={post} />; // Pass each post to ArticleCard
          })
        )}
      </div>
      <div className="px-[9%]">
        <h1 className="text-[20px] font-medium">Featured Articles</h1>
        <div className="grid grid-cols-2 gap-7 text-justify">
          {/* Article 1 */}
          <div className="flex flex-col gap-[1rem]">
            <Image
              src="/png/blog_img.png"
              width={300}
              height={300}
              alt="Article Image"
              className="w-full"
            />
            <div>
              <h1>Family Escapades: Bonding Beyond Borders</h1>
              <p className="text-[12px] text-primaryColor font-semibold">
                April 05, 2024
              </p>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio, ipsa velit eaque temporibus sint incidunt est porro
              nostrum blanditiis maiores quasi, aut tempore nam eligendi
              adipisci quo possimus quam deserunt.
            </p>
          </div>

          {/* Article 2 */}
          <div className="flex flex-col gap-[1rem]">
            <Image
              src="/png/blog_img.png"
              width={300}
              height={300}
              alt="Article Image"
              className="w-full"
            />
            <div>
              <h1>Family Escapades: Bonding Beyond Borders</h1>
              <p className="text-[12px] text-primaryColor font-semibold">
                April 05, 2024
              </p>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio, ipsa velit eaque temporibus sint incidunt est porro
              nostrum blanditiis maiores quasi, aut tempore nam eligendi
              adipisci quo possimus quam deserunt.
            </p>
          </div>

          {/* Article 3 */}
          <div className="flex flex-col gap-[1rem]">
            <Image
              src="/png/blog_img.png"
              width={300}
              height={300}
              alt="Article Image"
              className="w-full"
            />
            <div>
              <h1>Family Escapades: Bonding Beyond Borders</h1>
              <p className="text-[12px] text-primaryColor font-semibold">
                April 05, 2024
              </p>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio, ipsa velit eaque temporibus sint incidunt est porro
              nostrum blanditiis maiores quasi, aut tempore nam eligendi
              adipisci quo possimus quam deserunt.
            </p>
          </div>

          {/* Article 4 */}
          <div className="flex flex-col gap-[1rem]">
            <Image
              src="/png/blog_img.png"
              width={300}
              height={300}
              alt="Article Image"
              className="w-full"
            />
            <div>
              <h1>Family Escapades: Bonding Beyond Borders</h1>
              <p className="text-[12px] text-primaryColor font-semibold">
                April 05, 2024
              </p>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio, ipsa velit eaque temporibus sint incidunt est porro
              nostrum blanditiis maiores quasi, aut tempore nam eligendi
              adipisci quo possimus quam deserunt.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="w-full py-[4rem] flex justify-center">
        <div className="relative w-full p-[2rem] px-[5%]">
          <div className="flex flex-col gap-[.7rem] justify-center items-center">
            <div className="border-t-2 w-full"></div>
            <div className="border-t-2 w-[90%]"></div>
          </div>
          <div className="absolute top-[-20px] right-[16rem]">
            <div className="flex flex-col justify-center items-center border-2 h-[150px] bg-white w-[720px]">
              <h2 className="font-semibold text-[19px]">Testimonial</h2>
              <h1 className="font-semibold text-[20px]">Our Success Stories</h1>
              <p className="text-[16px]">
                Check out what our satisfied customers have shared about their
                experience with us.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="h-[400px] pt-[2rem] w-full px-[9%] mt-20 mb-10">
        <div className="flex justify-center items-center space-x-20">
          {/* Card 1 */}
          <div className="relative w-[350px] p-6 bg-gray-100 text-center rounded-lg shadow-lg">
            <div className="absolute top-[-50px] left-[35%]">
              <img
                src="png/blog_us/blog1.jpg"
                alt="Customer"
                className="w-[100px] h-[100px] rounded-full object-cover border-4 border-white"
              />
            </div>
            <div className="mt-16">
              <h3 className="font-semibold">Menjolen Bentolan</h3>
              <p className="text-gray-500 text-sm">25th of May, 2024</p>
              <p className="mt-4 text-gray-600">
                "The van provided excellent comfort and space for our group's
                trip around Cebu. Its smooth ride and reliable performance made
                our journey enjoyable and stress-free."
              </p>
              <p className="mt-4 text-gray-500">Review Rates</p>
              <div className="flex justify-center mt-2">
                <span className="text-yellow-500">★ ★ ★ ★ ★</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative w-[350px] p-6 bg-gray-100 text-center rounded-lg shadow-lg">
            <div className="absolute top-[-50px] left-[35%]">
              <img
                src="png/blog_us/blog2.jpg"
                alt="Customer"
                className="w-[100px] h-[100px] rounded-full object-cover border-4 border-white"
              />
            </div>
            <div className="mt-16">
              <h3 className="font-semibold">Shaira Shane Gonzaga</h3>
              <p className="text-gray-500 text-sm">25th of May, 2024</p>
              <p className="mt-4 text-gray-600">
                "The van provided excellent comfort and space for our group's
                trip around Cebu. Its smooth ride and reliable performance made
                our journey enjoyable and stress-free."
              </p>
              <p className="mt-4 text-gray-500">Review Rates</p>
              <div className="flex justify-center mt-2">
                <span className="text-yellow-500">★ ★ ★ ★ ★</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="mb-4 flex items-center justify-center">
        {/* Left Arrow */}
        <button className="p-2 bg-gray-300 hover:bg-gray-400 text-gray-600 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Pagination Dots */}
        <div className="flex space-x-2 mx-4">
          <button className="w-3 h-3 bg-gray-500 rounded-full"></button>
          <button className="w-3 h-3 bg-gray-300 rounded-full"></button>
          <button className="w-3 h-3 bg-gray-300 rounded-full"></button>
          <button className="w-3 h-3 bg-gray-300 rounded-full"></button>
          <button className="w-3 h-3 bg-gray-300 rounded-full"></button>
        </div>

        {/* Right Arrow */}
        <button className="p-2 bg-gray-300 hover:bg-gray-400 text-gray-600 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4"
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
    </div>
  );
};

export default Blog;


