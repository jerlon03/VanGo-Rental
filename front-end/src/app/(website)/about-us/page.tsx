"use client";
import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import ScrollSection from "@/components/ScrollContent";
import { MdOutlineAirportShuttle } from "react-icons/md";
import { IoMdContacts } from "react-icons/io";
import { FaCity } from "react-icons/fa";
import { FaHotel } from "react-icons/fa6";
import { IoCarSportOutline } from "react-icons/io5";
import { BsPersonGear } from "react-icons/bs";

const AboutUs = () => {
  // Data for "Why Choose Us" section
  const whyChooseUsData = [
    {
      id: 1,
      title: "Passenger Insurance",
      description:
        "Our van rental service offers insurance protecting passengers in case of injury or loss during travel.",
      icon: "/png/why_us/Vector1.png",
    },
    {
      id: 2,
      title: "Professional and Reliable Driver",
      description:
        "A skilled and trustworthy driver who ensures a safe and reliable travel experience for passengers.",
      icon: "/png/why_us/Vector2.png",
    },
    {
      id: 3,
      title: "Comfortable and Safe Travel",
      description:
        "Providing passengers with a comfortable and secure journey, free from any unnecessary difficulties or inconveniences.",
      icon: "/png/why_us/Vector3.png",
    },
    {
      id: 4,
      title: "Fire Extinguisher",
      description:
        "Safety device used to extinguish small fires and prevent their spread, providing an added layer of safety during travel.",
      icon: "/png/why_us/Vector4.png",
    },
    {
      id: 5,
      title: "Negotiable Rates",
      description:
        "Flexible pricing options that can be adjusted or discussed to accommodate individual needs and circumstances.",
      icon: "/png/why_us/Vector5.png",
    },
    {
      id: 6,
      title: "First Aid Kit",
      description:
        "Essential medical supplies and equipment for providing initial medical assistance in case of injuries or emergencies during travel.",
      icon: "/png/why_us/Vector6.png",
    },
  ];

  // Data for "Our Services" section
  const ourServicesData = [
    {
      id: 1,
      title: "Company Services",
      description:
        "Our company provides a suite of tailored solutions to meet your diverse needs. From personalized private tours to seamless airport transfers, heartfelt Balik Probinsya assistance, stress-free hotel pickups and drop-offs, and comprehensive wedding services, we&apos;re dedicated to making every journey memorable and every occasion extraordinary.",
      icon: (
        <BsPersonGear
          size={100}
          className="p-4 text-white bg-primaryColor border rounded-full object-contain"
        />
      ),
    },
    {
      id: 2,
      title: "Private Tours",
      description:
        "Embark on a personalized adventure with our private tours. Discover the beauty of your chosen destinations with knowledgeable guides who cater to your interests and preferences, ensuring an unforgettable experience every step of the way.",
      icon: (
        <IoMdContacts
          size={100}
          className="p-4 text-white bg-primaryColor border rounded-full object-contain"
        />
      ),
    },
    {
      id: 3,
      title: "Airport Transfer",
      description:
        "Start or end your travels with ease with our reliable airport transfer service. Enjoy punctual pickups and drop-offs, allowing you to travel stress-free and focus on enjoying your journey to or from the airport.",
      icon: (
        <MdOutlineAirportShuttle
          size={100}
          className="p-4 text-white bg-primaryColor border rounded-full object-contain"
        />
      ),
    },
    {
      id: 4,
      title: "Balik Probinsya",
      description:
        "Let us assist you in reconnecting with your roots with our Balik Probinsya service. Whether you&apos;re returning to your hometown or exploring a new province, we provide seamless support to ensure a smooth transition and a warm welcome back home.",
      icon: (
        <FaCity
          size={100}
          className="p-4 text-white bg-primaryColor border rounded-full object-contain"
        />
      ),
    },
    {
      id: 5,
      title: "Hotel Pickup/DropOff",
      description:
        "Make your hotel stays hassle-free with our convenient pickup and drop-off service. Arrive and depart in comfort and style, with our reliable transportation ensuring a seamless transition to or from your accommodation.",
      icon: (
        <FaHotel
          size={100}
          className="p-4 text-white bg-primaryColor border rounded-full object-contain"
        />
      ),
    },
    {
      id: 6,
      title: "Wedding Services",
      description:
        "Turn your dream wedding into reality with our comprehensive wedding services. From elegant transportation for the bridal party to meticulous planning and coordination, we&apos;re here to make your special day unforgettable and stress-free.",
      icon: (
        <IoCarSportOutline
          size={100}
          className="p-4 text-white bg-primaryColor border rounded-full object-contain"
        />
      ),
    },
  ];

  return (
    <div className="bg-white">
      {/* About Us Section */}
      <div className="relative">
        <Image
          src="/png/about.png"
          alt="Scenic view of the Philippines with boats and mountains"
          layout="responsive"
          width={1200}
          height={400}
          className="w-full h-auto sm:aspect-[1200/600] md:aspect-[1200/300]"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="mt-2 text-lg">
            Driving Convenience, Every Mile of the Way&mdash;Your Trusted
            Partner for Seamless and Reliable Van Rentals
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <h2 className="text-3xl font-bold  text-primaryColor">Our Mission</h2>
      </div>
      <div className="bg-primaryColor text-white py-8 mt-4">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-center">
            At VanGo Rental, our mission is to provide reliable, convenient, and
            affordable van rental services that cater to the diverse needs of
            our customers. We are dedicated to delivering exceptional customer
            service and ensuring every journey is smooth, comfortable, and
            hassle-free. Through innovation and a commitment to excellence, we
            strive to set new standards in the van rental industry, fostering
            trust and long-lasting relationships with our clients. Our goal is
            to offer quality vehicles, a seamless booking process, and an
            unwavering dedication to customer satisfaction.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-6xl mx-auto py-12">
        <h2 className="text-3xl font-bold  text-primaryColor text-center mb-4">
          Why Choose Us?
        </h2>
        <ScrollSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {whyChooseUsData.map((item) => (
              <div
                key={item.id}
                className="bg-gray-100 p-6 rounded-lg shadow-lg shadow-gray-500 text-center"
              >
                <div className="bg-primaryColor text-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                  <Image
                    src={item.icon}
                    alt={`${item.title} Icon`}
                    width={64}
                    height={64}
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </ScrollSection>
      </div>

      {/* Our Services Section */}
      <ScrollSection>
        <div className="max-w-4xl mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold  text-primaryColor text-center">
            Our Services
          </h1>
          <p className="text-center text-lg mt-2 mb-16">
            We provide complete van rental solutions
          </p>
          <div className="w-full flex flex-col md:gap-[50px] sm:gap-[20px]">
            {ourServicesData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }} // Initial state for each item
                whileInView={{ opacity: 1, y: 0 }} // Fade and slide up when in view
                transition={{
                  opacity: { duration: 1.2 },
                  y: {
                    type: "spring",
                    stiffness: 100,
                    damping: 25,
                    duration: 1.2,
                  },
                  delay: index * 0.2, // Dynamic delay for each item (e.g., 0.2s delay per item)
                }}
              >
                <div
                  key={item.id}
                  className="w-full flex items-center md:gap-[50px] md:flex-row sm:flex-col sm:gap-[20px]"
                >
                  <div className=" flex items-center justify-center mx-auto mb-4">
                    {item.icon}
                  </div>
                  <div className="">
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <p className="mt-2 text-gray-600">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollSection>
    </div>
  );
};

export default AboutUs;
