import React from 'react';
import Image from 'next/image';

const AboutUs = () => {
  return (
    <div className="bg-white font-sans">
      <div className="relative">
        <Image 
          src="/png/about.png" 
          alt="Scenic view of the Philippines with boats and mountains"
          layout="responsive"
          width={1200}
          height={400}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="mt-2 text-lg">
            Driving Convenience, Every Mile of the Way—Your Trusted Partner for Seamless and Reliable Van Rentals
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <div className="w-2/3">
          <h2 className="text-2xl font-bold text-center">Our Mission</h2>
          <hr className="border-t-2 border-gray-300 mt-2"/>
        </div>
      </div>
      <div className="bg-blue-900 text-white py-8 mt-4">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-center">
            At VanGo Rental, our mission is to provide reliable, convenient, and affordable van rental services that cater to the diverse needs of our customers. We are dedicated to delivering exceptional customer service and ensuring every journey is smooth, comfortable, and hassle-free. Through innovation and a commitment to excellence, we strive to set new standards in the van rental industry, fostering trust and long-lasting relationships with our clients. Our goal is to offer quality vehicles, a seamless booking process, and an unwavering dedication to customer satisfaction.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
