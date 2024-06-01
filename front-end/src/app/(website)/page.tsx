'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/landing/header';
import Faqs from '@/components/landing/faqs';
import Footer from '@/components/landing/footer';

const LandingPage = () => {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:8080/api/home")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // This will log the response data to the console
        setMessage(data.message);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setMessage("Failed to load message");
      });
  }, []);

  return (
    <div>
      <Header />
      <div>Landing Page</div>
      <div>{message}</div>
      <Faqs />
      <Footer />
    </div>
  );
}

export default LandingPage;
