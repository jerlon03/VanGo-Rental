import Image from "next/image";
import Faqs from "@/components/landing/faqs";
import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";
import Button from "@/components/Button/button";
import { FaCar, FaSuitcase, FaMapMarkerAlt } from 'react-icons/fa';

export default function Home() {
  return (
    <main>
      <Header />
      <div className="font-Poppins w-full">
        {/* BANNER */}
        <div className="w-full flex flex-col md:flex-row items-center py-5 px-4 md:px-[10%]">
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold">VanGO Rentals</h1>
            <h3 className="text-xl md:text-2xl lg:text-3xl text-center md:text-left mt-2">Rent a van, gather your friends, and let the adventure begin</h3>
            <Button name="BOOK IT NOW" width="150px" className="mt-4 md:hidden" />
          </div>
          <div className="w-full md:w-1/2">
            <Image src="/png/homepage.png" width={500} height={500} alt="VanGo Rentals banner" className="object-cover" />
          </div>
        </div>

        <div className="relative hidden md:block">
          <Image src="/png/homepage-style.png" width={1000} height={200} className="w-full h-auto" alt="VanGo Rentals promotional image" />
          <div className="absolute top-2 right-4 md:right-10 lg:right-20">
            <Button name="BOOK IT NOW" width="150px" />
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-primaryColor w-full py-8 px-4 md:px-[5%] lg:px-[10%]">
          <div className="text-center text-white">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4">Why should you choose us?</h1>
            <p className="text-sm md:text-base lg:text-lg">VanGo stands out as your top choice for van rentals for several compelling reasons. Our fleet is renowned for its reliability and comfort, ensuring a safe and enjoyable journey for you and your companions, making your travel plans not only convenient but also budget-friendly. What sets us apart is our commitment to exceptional service. Our dedicated team is always ready to assist you, ensuring a seamless rental experience from start to finish. With VanGo, booking a van is quick and easy, allowing you to focus on the adventure ahead. Whether you need a van for a weekend getaway or a long-term rental, our flexible options cater to your needs. Our 24/7 customer support is always at your service, guaranteeing your satisfaction throughout your rental journey. Choose VanGo for a rental experience that exceeds your expectations and leaves you with unforgettable memories.</p>
            <Button name="Read More!" width="120px" className="mt-4" />
          </div>
        </div>

        {/* Van Details */}
        <div className="w-full py-8 px-4 md:px-[5%] lg:px-[10%]">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/3">
              <Image src="/van.svg" width={350} height={300} alt="Van details" className="object-cover" />
            </div>
            <div className="w-full md:w-2/3 text-center md:text-left">
              <p className="text-sm md:text-base lg:text-lg mb-4">VanGo Rental is one of the best van renting services around, focusing on dependable and convenient transport solutions. We serve individuals and commercial entities, valuing our customers and ensuring that renting vans is not difficult or stressful. With our expanding coverage and focus on customer satisfaction, VanGo Rental is the go-to choice for all your transportation needs.</p>
              <div className="text-center md:text-right">
                <Button name="View Details" width="150px" />
              </div>
            </div>
          </div>
        </div>

        {/* What makes us different? */}
        <section className="relative">
          <Image
            src="/png/bgvan.png"
            alt="Van interior"
            layout="responsive"
            width={1200}
            height={600}
            className="object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-black bg-opacity-40 text-white">
            <div className="w-full max-w-lg px-4 text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">What makes us different?</h1>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 pb-2 border-b-2 border-[#003459]">
                  <FaCar className="text-xl sm:text-2xl md:text-3xl lg:text-4xl" />
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl">Comfortable Vehicles</span>
                </div>
                <div className="flex items-center gap-4 pb-2 border-b-2 border-[#003459]">
                  <FaSuitcase className="text-xl sm:text-2xl md:text-3xl lg:text-4xl" />
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl">Flexible Packages</span>
                </div>
                <div className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-xl sm:text-2xl md:text-3xl lg:text-4xl" />
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl">Convenient Locations</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Faqs />
      <Footer />
    </main>
  );
}
