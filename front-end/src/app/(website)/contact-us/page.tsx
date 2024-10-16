"use client";
import React from "react";
import Image from "next/image";

const ContactUs = () => {
  return (
    <div className="relative w-full min-h-screen">
      {/* Header Image */}
      <Image
        src="/png/blog_us/contact_us.png"
        width={300}
        height={300}
        alt="Contact Us"
        className="w-full object-cover"
      />
      {/* Contact Us Section */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-center text-white text-2xl space-y-2 md:space-y-4">
        <h1 className="font-medium text-lg md:text-2xl">Contact Us</h1>
        <p className="text-sm md:text-lg">
          Ready to connect? Reach out to us and let's start a conversation!
        </p>
      </div>
      {/* Main Content */}
      <div className="pt-[60px] p-5 md:p-12 text-base md:text-lg text-center">
        <h1 className="mb-4 font-semibold text-lg md:text-xl">Get in Touch</h1>
        <p className="p-2">
          Whether you have questions, feedback, or just want to say hello, our
          team is
        </p>
        <p className="">here to assist you every step of the way.</p>
      </div>
      {/* Contact Details */}
      <div className="flex flex-col items-center md:items-start md:flex-row justify-center p-4 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-2 w-full max-w-screen-lg">
          {/* Call or Text Section */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-3">
              <Image
                src="/png/blog_us/phonecall.png"
                width={57}
                height={57}
                alt="Phone call icon"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Call or Text</h2>
              <p>09123456789</p>
            </div>
          </div>
          {/* Facebook Section */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-3">
              <Image
                src="/png/blog_us/fb.png"
                width={57}
                height={57}
                alt="Facebook icon"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Facebook</h2>
              <p>Eliza Marzo Divino</p>
            </div>
          </div>
          {/* Location Section */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-3">
              <Image
                src="/png/blog_us/location.png"
                width={57}
                height={57}
                alt="Location icon"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Location</h2>
              <p>Metro Manila, Philippines</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-[200px] pb-[30px] mb-12">
        <div className="w-full ">
          <h1 className="text-center font- font-medium text-[20px] p-2">We are here</h1>
          <div id="embed-ded-map-canvas" className="h-full w-full max-w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61779.126284402606!2d120.95586963858878!3d14.587939294821581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ca03571ec38b%3A0x69d1d5751069c11f!2sManila%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1728554911436!5m2!1sen!2sph"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

