import { BlogPost, DataRes ,PostsResponse} from "@/lib/types/posts.type";
import { Instance } from "../axious";


// Public
const fetchAllPublicPosts = async () => {
    const response = await Instance.get<PostsResponse>('/public/posts/');
    return response.data;
}


// Private
const fetchAllPosts = async () => { // Changed function name to camelCase
    const response = await Instance.get<PostsResponse>('/api/posting/');
    return response.data;
}

const fetchUpdatePosts = async (postId: number, updatedData: any) => { // Accept postId and updatedData as parameters
    const response = await Instance.put<PostsResponse>(`/api/posting/update/${postId}`, updatedData); // Use PUT method for updating
    return response.data;
}
const fetchCreatePost = async (data: FormData) => { // Ensure the parameter type is FormData
    const response = await Instance.post<PostsResponse>('/api/posting/create', data); // Pass the FormData as the second argument
    return response.data;
}

const fetchPublishedPostCount = async () => { // New function to fetch published post count
    const response = await Instance.get<{ message: string; count: number }>('/api/posting/count/published'); // Fetch the published post count
    return response.data.count; // Return the count from the response
}

const fetchDeletePost = async (postId: number) => { // Accept postId as a parameter
    const response = await Instance.delete<{ message: string; affectedRows: number }>(`/api/posting/${postId}`); // Use DELETE method for deleting
    return response.data; // Return the response data
}


export{
    fetchCreatePost,
    fetchAllPublicPosts,
    fetchAllPosts,
    fetchUpdatePosts,
    fetchPublishedPostCount,
    fetchDeletePost
}
