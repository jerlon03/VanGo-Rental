import { Feedback, Feedbacks } from '@/lib/types/feedback.type';
import { Instance } from '../axious';

interface ApiResponse<T> {
    data: T;
    // other response properties if any
  }

// PRIVATE
const getAllPrivateFeedbacks = async (): Promise<Feedback[]> => {
    try {
        const response = await Instance.get(`/api/feedback/feedbacks`);
        
        // Log the entire response to inspect its structure
        console.log('API Response:', response.data);

        // Assuming the feedbacks are nested within a property called 'data'
        if (response.data && Array.isArray(response.data.data)) {
            return response.data.data;
        } else {
            console.error('Unexpected data format:', response.data);
            throw new Error('Unexpected data format');
        }
    } catch (error) {
        console.error('Error fetching all feedbacks:', error);
        throw new Error('Failed to fetch all feedbacks');
    }
};



// PUBLIC
const getAddingFeedback = async (feedbackData: Feedback): Promise<Feedback> => {
    try {
        const response = await Instance.post(`/public/feedback/feedback`, feedbackData);
        return response.data;
    } catch (error) {
        console.error('Error adding feedback:', error);
        throw new Error('Failed to add feedback');
    }
};

const getAllFeedbacks = async (): Promise<ApiResponse<Feedbacks[]>> => {
    try {
        const response = await Instance.get(`/public/feedback/feedbacks`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all feedbacks:', error);
        throw new Error('Failed to fetch all feedbacks');
    }
};

const updateFeedbackStatus = async (feedbackId: number, status: string): Promise<Feedbacks> => {
    try {
        const response = await Instance.put('/api/feedback/feedback/status', {
            feedbackId: feedbackId,
            newStatus: status,
        });

        if (!response.data.success) {
            throw new Error('Failed to update feedback status');
        }

        return response.data;
    } catch (error) {
        console.error('Error updating feedback status:', error);
        throw new Error('Failed to update feedback status');
    }
};

const getFeedbackCount = async (): Promise<number> => { // New function to fetch feedback count
    try {
        const response = await Instance.get<{ count: number }>('/api/feedback/feedback/count'); // Fetch the feedback count
        return response.data.count; // Return the count from the response
    } catch (error) {
        console.error('Error fetching feedback count:', error);
        throw new Error('Failed to fetch feedback count');
    }
};

export {
    getAddingFeedback,
    getAllFeedbacks,
    getAllPrivateFeedbacks,
    updateFeedbackStatus,
    getFeedbackCount
};
