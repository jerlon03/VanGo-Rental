import React from 'react';
import Image from 'next/image'; // Adjust this import based on your setup
import { BlogPost } from '@/lib/types/posts.type';

interface PostsCardProps {
    posts: BlogPost; // Expecting a prop named 'posts' of type 'BlogPost'
}

const ArticleCard: React.FC<PostsCardProps> = ({ posts }) => {
  return (
    <div className="flex flex-col gap-[1rem]">
      {/* <Image
        src={posts.post_image} // Display the post image
        width={300}
        height={300}
        alt="Article Image"
        className="w-full"
      /> */}
      <h1>{posts.title}</h1>
      <p className="text-[12px] text-primaryColor font-semibold">
        {new Date(posts.createdAt).toLocaleDateString()} {/* Format the date */}
      </p>
      <p>{posts.description}</p>
    </div>
  );
};

export default ArticleCard;
