// ContactUs.tsx
"use client"
import React from 'react';
import Button from '@/components/Button/button';
import SweetAlert from '@/components/alert/alert'; 

const ContactUs = () => { 
  const toggleSuccess = () => {
    SweetAlert.showSuccess('successfully completed.');
  };
  const toggleError = () => {
    SweetAlert.showError('Operation Failed.');
  };
  const toggleConfirm = () => {
    SweetAlert.showConfirm('Are you sure ?.');
  };


  return (
    <div className='p-5'>
      <h1>Contact Us Page</h1>
      <div className='flex gap-2'>
        <Button name="Default Button" />
        <Button name="Success" backgroundColor="success" onClick={() => toggleSuccess()} />
        <Button name="Error" backgroundColor="error" onClick={() => toggleError()}/>
        <Button name="Confirmation" backgroundColor="pending" onClick={() => toggleConfirm()}/>
      </div>
    </div>
  );
};

export default ContactUs;
