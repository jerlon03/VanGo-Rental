'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import SweetAlert from './alert/alert';
import { toast, ToastContainer } from 'react-toastify';
import LoadingComponents from '@/app/loading';
import Image from 'next/image';
import TextArea from '@/components/Form/textarea';
import InputField from '@/components/Form/inputfield';
import StarRating from '@/components/StarRating';
import { getAddingFeedback } from '@/lib/api/feedback.api';
import Confetti from 'react-confetti';

interface FeedbackPageProps {
    bookingId: string;
}

const FeedbackPageClient = ({ bookingId }: FeedbackPageProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [overallExperience, setOverallExperience] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string>('');
    const [rating, setRating] = useState<number | null>();
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [idBooking, setBookingId] = useState<number | null>();
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/public/booking/${bookingId}`);
                const bookingData = response.data;

                if (!bookingData) {
                    SweetAlert.showWarning("Warning, You're not allowed to route in this page");
                    router.push('/');
                    return;
                }
                if (bookingData.status?.toLowerCase() !== 'completed') {
                    SweetAlert.showWarning("Warning, You're not allowed to route in this page");
                    router.push('/');
                    return;
                }

                setFullName(`${bookingData.first_name} ${bookingData.last_name}`);
                setEmail(bookingData.email);
                setBookingId(bookingData.booking_id)
            } catch (err: any) {
                console.error('Error details:', err);
                if (err.response?.status === 404) {
                    toast.error('Booking not found');
                } else {
                    setError('Unable to fetch booking details. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        };

        if (bookingId && bookingId.trim() !== '') {
            fetchBooking();
        } else {
            setError('Invalid booking ID');
            setLoading(false);
        }
    }, [bookingId, router]);

    if (loading) {
        return (
            <LoadingComponents />
        );
    }
    const handleRating = (newRating: number) => {
        setRating(newRating);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate each field individually
        if (!fullName) {
            SweetAlert.showError('Full Name is required.');
            return;
        }
        if (!email) {
            SweetAlert.showError('Email Address is required.');
            return;
        }
        if (!overallExperience) {
            SweetAlert.showError('Please share your overall experience.');
            return;
        }
        if (!suggestions) {
            SweetAlert.showError('Please provide your suggestions.');
            return;
        }
        if (!rating) {
            SweetAlert.showError('Please rate the service.');
            return;
        }
        if (!idBooking) {
            SweetAlert.showError('Booking ID is required.');
            return;
        }

        try {
            await getAddingFeedback({
                bookingId: idBooking,
                fullName,
                email,
                overallExperience,
                suggestions,
                rating,
                created_at: ''
            });
            setShowConfetti(true); // Show confetti on success

            // Show success alert after a short delay
            setTimeout(() => {
                SweetAlert.showSuccess('Feedback submitted successfully!');
                setShowConfetti(false); // Optionally hide confetti after showing the alert

                // Redirect to homepage after showing the success message
                setTimeout(() => {
                    router.push('/');
                }, 2000); // Adjust the delay as needed
            }, 3000); // Adjust the delay as needed
        } catch (error) {
            SweetAlert.showError('Failed to submit feedback. Please try again.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 h-screen">
            {showConfetti && <Confetti />}
            <div className='w-full bg-primaryColor text-white p-[1rem] rounded-t-[5px] flex justify-center flex-col '>
                <div className='flex items-center gap-2'>
                    <Image src="/logo.svg" width={61} height={58} alt="VanGo Rental Logo" />
                    <h1 className='text-[20px] tracking-[1px] font-semibold'>VanGO Rental Customer Feedback Form</h1>
                </div>
                <p className='text-[14px] pl-[4%]'>We are always looking for ways to improve your experience. Please take a moment to evaluate and tell us what you think.</p>
            </div>

            <div className="bg-white px-[5%] py-6 rounded-lg shadow-md ">
                <ToastContainer />
                <div className="text-center text-red-500">{error}</div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <h1 className="text-[18px] font-medium">We appreciate your feedback</h1>
                    <div className='flex gap-4 py-2 w-[70%]'>
                        <div className='w-full'>
                            <label htmlFor="" className='text-[14px] font-medium'>Full Name</label>
                            <InputField 
                                placeholder='Enter your Full Name' 
                                value={fullName} 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="" className='text-[14px] font-medium'>Email Address</label>
                            <InputField 
                                placeholder='Enter your Email Address' 
                                value={email} 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                    </div>
                    <div className='pt-4'>
                        <label className="block mb-2 text-[15px] font-medium">Tell us something about your overall experiences with our service.</label>
                        <TextArea
                            placeholder="Share your Experience ..."
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                setOverallExperience(e.target.value);
                            }}
                            value={overallExperience}
                        />
                    </div>
                    <div className='pt-4'>
                        <label className="block mb-2 text-[15px] font-medium">Do you have any suggestions to improve our service?</label>
                        <TextArea
                            placeholder="Share your Suggestions ..."
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                setSuggestions(e.target.value);
                            }}
                            value={suggestions}
                        />
                    </div>
                    <div>
                        <h1 className='text-[15px] font-medium'>Rate this Service</h1>
                        <StarRating maxStars={5} onRate={handleRating} />
                    </div>
                    <div className='pt-4'>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Submit Feedback
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FeedbackPageClient;