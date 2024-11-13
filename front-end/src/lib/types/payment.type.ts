export interface Payment {
    payment_id: number;
    payment_name: string;
    payment_image: string;
    admin_id: number;
    created_at: string;
    updated_at: string;
}

export interface PaymentResponse {
    message: string;
    success: boolean;
    data: Payment[];
}