import React from 'react';

// Sample data
const sampleBlogs = [
    { id: '1', title: 'First Blog Post', content: 'This is the content of the first blog post.', author: 'Jane Doe', date: 'January 1, 2024' },
    { id: '2', title: 'Second Blog Post', content: 'This is the content of the second blog post.', author: 'John Smith', date: 'February 2, 2024' },
    { id: '3', title: 'Third Blog Post', content: 'This is the content of the third blog post.', author: 'Alice Johnson', date: 'March 3, 2024' },
];

export default function BlogID({params}: any) {
    const blog_id = params.id;
    const blogData = sampleBlogs.find(blog => blog.id === blog_id);

    return (
        <div>
            {blogData ? (
                <>
                    <h1>{blogData.title}</h1>
                    <p>{blogData.content}</p>
                    <p>By {blogData.author}</p>
                    <p>{blogData.date}</p>
                </>
            ) : (
                <p>Blog not found.</p>
            )}
        </div>
    );
}
