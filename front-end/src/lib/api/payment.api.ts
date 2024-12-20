import {Payment,PaymentResponse} from '@/lib/types/payment.type'
import { Instance } from '../axious';

const getAllPayments = async (): Promise<PaymentResponse> => {
    try {
        const response = await Instance.get(`/api/payment/payments`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const updatePayment = async (
    paymentId: number, 
    adminId: number,
    formData: FormData
): Promise<PaymentResponse> => {
    try {
        const response = await Instance.put(
            `/api/payment/payments/${paymentId}/admin/${adminId}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};


// PUBLIC
const getPublicAllPayments = async (): Promise<PaymentResponse> => {
    try {
        const response = await Instance.get(`/public/payment/payments`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export {
    getAllPayments,
    updatePayment,
    getPublicAllPayments
}