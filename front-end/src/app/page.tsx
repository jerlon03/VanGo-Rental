import Image from "next/image";
import Faqs from "@/components/landing/faqs";
import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";
import Button from "@/components/Button/button";
import { FaCar, FaSuitcase, FaMapMarkerAlt } from 'react-icons/fa'; // Import FontAwesome icons

export default function Home() {
  return (
    <main>
      <Header />
      <div className="font-Poppins w-full">
        {/* BANNER */}
        <div className="w-full flex items-center max-md:py-5 2xl:px-[10%] max-sm:px-[1%]">
          <Image src="/png/homepage.png" width={500} height={500} alt="VanGo Rentals banner" className="basis-[40%] max-md:hidden" />
          <div className="flex flex-col w-full basis-[60%] justify-end h-full sm:basis-[100%] sm:justify-center sm:items-center">
            <h1 className="text-[45px] font-semibold max-lg:text-[43px] max-sm:text-[35px] md:text-[37px]">VanGO Rentals</h1>
            <h3 className="text-[25px] px-[20px] max-sm:text-[20px]">Rent a van, gather your friends, and let the adventure begin</h3>
            <Button name="BOOK IT NOW" width="150px" className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden" />
          </div>
        </div>
        <div className="w-full relative sm:hidden md:block lg:block xl:block 2xl:block">
          <Image src="/png/homepage-style.png" width={1000} height={200} className="w-full h-[150px]" alt="VanGo Rentals promotional image" />
          <div className="py-2 absolute top-8 2xl:right-52 xl:right-40 lg:right-36 md:right-20 sm:right-10">
            <Button name="BOOK IT NOW" width="150px" />
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-primaryColor w-full">
          <div className="px-[15%] py-[2%] flex flex-col items-center gap-2 text-white font-Poppins w-full max-lg:px-[8%] max-md:px-[5%] max-sm:px-[3%] xl:px-[4%]">
            <h1 className="text-[25px] font-semibold max-sm:text-[16px] max-sm:font-medium py-2">Why should you choose us?</h1>
            <p className="text-center max-md:text-justify max-sm:text-[13px]">VanGo stands out as your top choice for van rentals for several compelling reasons. Our fleet is renowned for its reliability and comfort, ensuring a safe and enjoyable journey for you and your companions, making your travel plans not only convenient but also budget-friendly. What sets us apart is our commitment to exceptional service. Our dedicated team is always ready to assist you, ensuring a seamless rental experience from start to finish. With VanGo, booking a van is quick and easy, allowing you to focus on the adventure ahead. Whether you need a van for a weekend getaway or a long-term rental, our flexible options cater to your needs. Our 24/7 customer support is always at your service, guaranteeing your satisfaction throughout your rental journey. Choose VanGo for a rental experience that exceeds your expectations and leaves you with unforgettable memories</p>
            <div className="flex justify-end w-full px-2">
              <Button name="Read More!" width="120px" />
            </div>
          </div>
        </div>

        {/* Van Details */}
        <div className="w-full px-[15%] py-[2%] font-Poppins max-md:px-[5%] max-lg:px-[8%] xl:px-[5%] xl:py-[4%]">
          <div className="flex justify-center w-full border p-[1%] items-center max-md:flex-col">
            <div className="basis-[30%]">
              <Image src="/van.svg" width={350} height={300} alt="Van details" />
            </div>
            <div className="basis-[70%] text-justify flex flex-col w-full gap-2">
              <p className="px-2 max-sm:text-[14px]">VanGo Rental is one of the best van renting services around, focusing on dependable and convenient transport solutions. We serve individuals and commercial entities, valuing our customers and ensuring that renting vans is not difficult or stressful. With our expanding coverage and focus on customer satisfaction, VanGo Rental is the go-to choice for all your transportation needs.</p>
              <div className="flex justify-end w-full max-md:justify-center px-2">
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
  <div className="absolute inset-0 flex flex-col items-start justify-center p-6 bg-black bg-opacity-40">
    <div className="w-full max-w-[600px] text-black ml-20">
      <h1 className="text-4xl font-bold mb-6 text-left sm:text-3xl">What makes us different?</h1>
      <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 pb-2 w-1/2 border-b-2 border-[#003459]">
          <FaCar className="text-3xl sm:text-2xl" />
          <span className="text-lg sm:text-base">Comfortable Vehicles</span>
        </div>
        <div className="flex items-center gap-4 pb-2 w-1/2 border-b-2 border-[#003459]">
          <FaSuitcase className="text-3xl sm:text-2xl" />
          <span className="text-lg sm:text-base">Flexible Packages</span>
        </div>
        <div className="flex items-center gap-4">
          <FaMapMarkerAlt className="text-3xl sm:text-2xl" />
          <span className="text-lg sm:text-base">Convenient Locations</span>
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