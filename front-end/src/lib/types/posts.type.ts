export interface BlogPost {
    post_id: number;              // Primary key for the blog post
    title: string;                // Title of the blog post
    description?: string;         // Description of the blog post (optional)
    post_image?: string;          // URL of the blog post image (optional)
    status: 'PUBLISH' | 'DRAFT'; // Status of the blog post
    createdAt: Date;              // Timestamp when the post was created
    updatedAt: Date;              // Timestamp when the post was last updated
    user_id?: number;    
}

export type DataRes<Data> = {
    data: Data
    error?: boolean;
}
export interface PostsResponse {
    message: string;
    posts: BlogPost[];
    total:number;    
}

