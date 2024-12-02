"use client";
import React from "react";
import Image from "next/image";
import { BlogPost as BlogPostType } from "@/lib/types/posts.type"; // Ensure correct import
import { formatDatePublicRange } from "../date/formatDate";

type BlogPostProps = {
  post: BlogPostType; // Use the BlogPost type
  showDescription?: boolean; // Optional prop to show description
};

const BlogPost: React.FC<BlogPostProps> = ({ post, showDescription }) => {
  return (
    <div key={post.post_id} className=" p-[8%] rounded-[10px]">
      <Image
        src={post.post_image || "/path/to/default/image.png"}
        width={300}
        height={200}
        alt="BLOG IMAGE"
        className="w-full h-auto aspect-[300/200] object-fill rounded-[10px]"
      />
      <p className="pt-2 text-[14px]">
        {formatDatePublicRange(post.createdAt as any)}
      </p>
      <p className="pt-2 text-[15px] font-semibold">{post.title}</p>
      {showDescription &&
        post.description && ( // Conditionally render description
          <p className="pt-2 text-[14px]">{post.description}</p>
        )}
    </div>
  );
};

export default BlogPost;
