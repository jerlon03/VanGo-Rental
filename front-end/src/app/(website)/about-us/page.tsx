import React from 'react';
import Image from 'next/image';

const AboutUs = () => {
  return (
    <div className="bg-white font-sans">
      {/* About Us Section */}
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
        <div className="w-1/2">
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

      {/* Why Choose Us Section */}
      <div className="max-w-6xl mx-auto py-12">
        <h2 className="text-center text-2xl font-semibold mb-4">
          Why Choose Us?
        </h2>
        <hr className="border-t-2 border-gray-300 w-24 mx-auto mb-8"/>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-200 p-6 rounded-lg shadow-lg max-w-sm text-center">
            <div className="bg-primaryColor text-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
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
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
          <div className="bg-primaryColor text-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <Image 
                src="/png/why_us/Vector2.png"
                alt="Professional and Reliable Driver Icon"
                width={64}
                height={64}
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
          <div className="bg-primaryColor text-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <Image 
                src="/png/why_us/Vector3.png"
                alt="Comfy, Safe and Free Hassle Travel Icon"
                width={64}
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
          <div className="bg-primaryColor text-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <Image 
                src="/png/why_us/Vector4.png"
                alt="Fire Extinguisher Icon"
                width={54}
                height={64}
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
          <div className="bg-primaryColor text-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
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
          <div className="bg-primaryColor text-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
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

      {/* Our Services Section */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-center">Our Services</h1>
        <p className="text-center text-lg mt-2">We provide complete van rental solutions</p>
        <hr className="my-4 border-t-2 border-gray-300 w-1/3 mx-auto"/>
        
        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
            <div className="bg-blue-100 p-12 rounded-full w-45 h-12 flex items-center justify-center">
                <Image 
                  src="/png/why_us/Service1.png" 
                  alt="Company Services Icon"
                  width={65}
                  height={65}
                />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Company Services</h2>
              <p className="mt-2 text-gray-600">Our company provides a suite of tailored solutions to meet your diverse needs. From personalized private tours to seamless airport transfers, heartfelt Balik Probinsya assistance, stress-free hotel pickups and drop-offs, and comprehensive wedding services, we're dedicated to making every journey memorable and every occasion extraordinary.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
            <div className="bg-blue-100 p-12 rounded-full w-45 h-12 flex items-center justify-center">
                <Image 
                  src="/png/why_us/Service2.png" 
                  alt="Private Tours Icon"
                  width={65}
                  height={65}
                />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Private Tours</h2>
              <p className="mt-2 text-gray-600">Embark on a personalized adventure with our private tours. Discover the beauty of your chosen destinations with knowledgeable guides who cater to your interests and preferences, ensuring an unforgettable experience every step of the way.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
            <div className="bg-blue-100 p-12 rounded-full w-45 h-12 flex items-center justify-center">
                <Image 
                  src="/png/why_us/Service3.png" 
                  alt="Airport Transfer Icon"
                  width={65}
                  height={65}
                />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Airport Transfer</h2>
              <p className="mt-2 text-gray-600">Start or end your travels with ease with our reliable airport transfer service. Enjoy punctual pickups and drop-offs, allowing you to travel stress-free and focus on enjoying your journey to or from the airport.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
            <div className="bg-blue-100 p-12 rounded-full w-45 h-12 flex items-center justify-center">
                <Image 
                  src="/png/why_us/Service4.png" 
                  alt="Balik Probinsya Icon"
                  width={65}
                  height={65}
                />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Balik Probinsya</h2>
              <p className="mt-2 text-gray-600">Let us assist you in reconnecting with your roots with our Balik Probinsya service. Whether you're returning to your hometown or exploring a new province, we provide seamless support to ensure a smooth transition and a warm welcome back home.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
            <div className="bg-blue-100 p-12 rounded-full w-45 h-12 flex items-center justify-center">
                <Image 
                  src="/png/why_us/Service5.png" 
                  alt="Hotel Pickup/DropOff Icon"
                  width={65}
                  height={65}
                />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Hotel Pickup/DropOff</h2>
              <p className="mt-2 text-gray-600">Make your hotel stays hassle-free with our convenient pickup and drop-off service. Arrive and depart in comfort and style, with our reliable transportation ensuring a seamless transition to or from your accommodation.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
            <div className="bg-blue-100 p-12 rounded-full w-45 h-12 flex items-center justify-center">
                <Image 
                  src="/png/why_us/Service6.png" 
                  alt="Wedding Services Icon"
                  width={65}
                  height={65}
                />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Wedding Services</h2>
              <p className="mt-2 text-gray-600">Turn your dream wedding into reality with our comprehensive wedding services. From elegant transportation for the bridal party to meticulous planning and coordination, we're here to make your special day unforgettable and stress-free.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
