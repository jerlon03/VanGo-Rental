'use client'
import React, { useEffect, useState } from 'react'
import Modal from '@/components/modals/modalContainer' // Import the Modal component
import InputField from '@/components/Form/inputfield'
import Button from '@/components/Button/button'
import { useRouter, useSearchParams } from 'next/navigation' // Import useSearchParams
import Swal from 'sweetalert2' // Ensure you import Swal from SweetAlert2
import SweetAlert from '@/components/alert/alert'
import { LuEye } from "react-icons/lu";
import { FaRegEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(true) // Open modal by default
    const [isAnimating, setIsAnimating] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false) 
    const [showConfirmPassword, setShowConfirmPassword] = useState(false) 
    const router = useRouter();
    const searchParams = useSearchParams(); // Get search params
    const token = searchParams.get('token'); // Extract token from URL

    useEffect(() => {
        if (!token) {
            Swal.fire({
                title: 'Error!',
                text: 'Youre not allowed to go this page.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
            router.push('/'); // Redirect to home or another page
        }
    }, [token, router]);

    useEffect(() => {
        setIsAnimating(true); // Set to true when the modal opens
    }, [isModalOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // New validation for password criteria
        const passwordCriteria = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/; // At least 8 characters, including a number
        if (!passwordCriteria.test(newPassword)) {
            SweetAlert.showError('Password must be at least 8 characters long and contain at least one number.');
            return;
        }

        if (newPassword !== confirmPassword) {
            SweetAlert.showError('Passwords do not match.');
            return;
        }

        // Call the change password API
        try {
            const response = await fetch('http://localhost:8080/users/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                SweetAlert.showSuccess('Your password has been successfully reset. Now you can login with your new password.');
                router.push('/login');
                setIsModalOpen(false);
            } else {
                SweetAlert.showError(data.message || 'An error occurred while resetting your password.');
            }
        } catch (error) {
            console.error('Error:', error);
            SweetAlert.showError('An error occurred while resetting your password.');
        }
    }

    return (
        <div className="relative w-full h-screen bg-blackColor/50 flex justify-center items-center text-blackColor">
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} width="400px" height="auto" className='items-center '>
                <div className={`transform bg-white rounded-[5px] text-blackColor py-8 px-6 transition-transform duration-500 ease-in-out ${isAnimating ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} onAnimationEnd={() => setIsAnimating(false)}>
                    <h2 className="text-[20px] font-semibold mb-2">Create New Password</h2>
                    <p className='text-[15px] mb-4'>Occur, your new password must be different from any of your previous password.</p>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4 items-center'>
                        <div className='w-full'>
                            <label htmlFor="newPassword" className="block font-medium">New Password</label>
                            <div className="relative">
                                <InputField
                                    type={showNewPassword ? "text" : "password"} // Use new state for visibility
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder='Enter Password'
                                />
                                <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                                    {showNewPassword ? <FaRegEyeSlash /> : <LuEye />}
                                </button>
                            </div>
                        </div>
                        <div className='w-full'>
                            <label htmlFor="confirmPassword" className="block font-medium">Confirm Password</label>
                            <div className="relative">
                                <InputField
                                    type={showConfirmPassword ? "text" : "password"} // Use separate state for confirm password visibility
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder='Re-Enter Password'
                                />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                                    {showConfirmPassword ? <FaRegEyeSlash /> : <LuEye />}
                                </button>
                            </div>
                        </div>
                        <Button type="submit" name='Reset Password' backgroundColor='alert' height='40px'></Button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default ResetPassword
