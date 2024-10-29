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
    const response = await Instance.put<PostsResponse>(`/api/posting/${postId}`, updatedData); // Use PUT method for updating
    return response.data;
}
const fetchCreatePost = async (data: FormData) => { // Ensure the parameter type is FormData
    const response = await Instance.post<PostsResponse>('/api/posting/create', data); // Pass the FormData as the second argument
    return response.data;
}


export{
    fetchCreatePost,
    fetchAllPublicPosts,
    fetchAllPosts,
    fetchUpdatePosts,
}
