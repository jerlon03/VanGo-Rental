import React from 'react';
import Button from '@/components/Button/button';
import { formatDatePublicRange } from '../date/formatDate';
import Link from 'next/link';


interface PostCardProps {
    id: string; // Add id property
    title: string;
    createdAt: string; // You can also use Date if you want to pass a Date object
    imageUrl: string; // Add imageUrl property
}

const PostCard: React.FC<PostCardProps> = ({ id,title, createdAt, imageUrl }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex flex-col gap-[1rem]">
            {imageUrl && <img src={imageUrl} alt={title} className="rounded-lg mb-2" />}
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-gray-500 text-sm">{formatDatePublicRange(createdAt)}</p>
            <Link href={`/blog/${id}`}>
                <Button name='See More' width='100px'></Button>
            </Link>
            
        </div>
    );
};

export default PostCard;
