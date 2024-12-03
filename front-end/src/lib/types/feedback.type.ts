export interface Feedback {
    bookingId: number;
    fullName: string;
    email: string;
    overallExperience: string;
    suggestions: string;
    rating: number;
    created_at: string; // or Date if you plan to convert it to a Date object
}
export interface Feedbacks {
    feedback_id: number;
    booking_id: number;
    full_name: string;
    email: string;
    overall_experience: string;
    suggestions: string;
    rating: number;
    created_at: string; // or Date if you plan to convert it to a Date object
    status: string;
    success: string;
}