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
        <div className="w-1/">
          <h2 className="text-2xl font-bold text-center">Our Mission</h2>
          <hr className="border-t-2 border-gray-300 mt-2"/>
        </div>
      </div>
      <div className="bg-primaryColor text-white py-8 mt-4">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-center">
            At VanGo Rental, our mission is to provide reliable, convenient, and affordable van rental services that cater to the diverse needs of our customers. We are dedicated to delivering exceptional customer service and ensuring every journey is smooth, comfortable, and hassle-free. Through innovation and a commitment to excellence, we strive to set new standards in the van rental industry, fostering trust and long-lasting relationships with our clients. Our goal is to offer quality vehicles, a seamless booking process, and an unwavering dedication to customer satisfaction.
          </p>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto py-12">
        <h2 className="text-center text-2xl font-semibold mb-4">
          Why Choose Us?
        </h2>
        <hr className="border-t-2 border-gray-300 w-24 mx-auto mb-8"/>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-900 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Image 
                src="/png/why_us/Vector1.png"
                alt="Passenger Insurance Icon"
                width={64}
                height={64}
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Passenger Insurance
            </h3>
            <p className="text-gray-600">
              Our van rental service offers insurance protecting passengers in case of injury or loss during travel.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-900 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Image 
                src="/png/why_us/Vector2.png"
                alt="Professional and Reliable Driver Icon"
                width={54}
                height={54}
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Professional and Reliable Driver
            </h3>
            <p className="text-gray-600">
              A skilled and trustworthy driver who ensures a safe and reliable travel experience for passengers.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-900 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Image 
                src="/png/why_us/Vector3.png"
                alt="Comfy, Safe and Free Hassle Travel Icon"
                width={50}
                height={64}
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Comfy, Safe and Free Hassle Travel
            </h3>
            <p className="text-gray-600">
              Providing passengers with a comfortable and secure journey, free from any unnecessary difficulties or inconveniences.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-900 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Image 
                src="/png/why_us/Vector4.png"
                alt="Fire Extinguisher Icon"
                width={47}
                height={50}
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Fire Extinguisher
            </h3>
            <p className="text-gray-600">
              Safety device used to extinguish small fires and prevent their spread, providing an added layer of safety during travel.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-900 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Image 
                src="/png/why_us/Vector5.png"
                alt="Negotiable Rates Icon"
                width={64}
                height={64}
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Negotiable Rates
            </h3>
            <p className="text-gray-600">
              Flexible pricing options that can be adjusted or discussed to accommodate individual needs and circumstances.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-900 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Image 
                src="/png/why_us/Vector6.png"
                alt="First Aid Kit Icon"
                width={64}
                height={64}
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              First Aid Kit
            </h3>
            <p className="text-gray-600">
              Essential medical supplies and equipment for providing initial medical assistance in case of injuries or emergencies during travel.
            </p>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default AboutUs;
