"use client";
import PostCard from "@/components/Card/postCard";
import Container from "@/components/landing/Container";
import { Heading, TextHighlight } from "@/components/landing/TextHighlight";
import { fetchAllPublicPosts } from "@/lib/api/posts.api";
import { BlogPost } from "@/lib/types/posts.type";
import React, { useEffect, useState } from "react";

const Blog = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);

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

  return (
    <div className="w-full text-websiteBlack">
      <div
        className="bg-cover bg-center flex items-end pb-[1%]"
        style={{ backgroundImage: "url(/banner-image.png)", height: "200px" }}
      >
        <Container>
          <Heading text="Our Blog" textSize="text-[28px]" />
          <p className="text-[15px] font-medium">Home / Blog</p>
        </Container>
      </div>
      <div className="py-[4%]">
        <Container>
          <div className="pb-[2%]">
            <Heading
              text="Embark on Unforgettable Adventures: Where Every Moment Counts and Memories Last."
              className="lg:text-[32px] md:text-[24px] sm:text-[20px]"
            />
            <p className="md:text-[15px] sm:text-xs">
              ‘Discover the thrill of adventure where every tale told shows how
              exploring transforms us, sparking a love for travel and creating
              memories that stay with us forever.’
            </p>
          </div>
          <div className="">
            <TextHighlight text="Featured Articles" />
            <div className="grid md:grid-cols-3 md:gap-[40px] sm:gap-[20px] ">
              {posts.map((post) => (
                <PostCard
                  key={post.post_id}
                  post={post}
                  showDescription={true}
                />
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Blog;
