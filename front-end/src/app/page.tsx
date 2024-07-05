import Image from "next/image";
import Faqs from "@/components/landing/faqs";
import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";
import Button from "@/components/Button/button";

export default function Home() {
  return (
   <main>
    <div>
      <Header />
      <div>
        {/* BANNER */}
        <div className="font-Poppins w-full">
          <div className="w-full flex items-center max-md:py-5">
            <Image src="/banner.svg" width={500} height={500} alt="banner" className="basis-[70%] max-md:hidden"></Image>
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-[45px] font-semibold max-lg:text-[43px] max-sm:text-[40px]">VanGO Rentals</h1>
              <h3 className="text-[25px] px-[20px] text-center max-sm: max-sm:text-[20px]">Rent a van, gather your friends, and let the adventure begin</h3>
              <div className="flex justify-center w-full  py-2">
              {/* <button className=" p-1 rounded-[3px] bg-button text-white max-sm:p-1 text-[16px] font-medium ">BOOK IT NOW</button> */}
              <Button name="BOOK IT NOW" width="120px"></Button>
            </div>
            </div>
          </div>
          <div>

            <div></div>
          </div>
        </div>
        {/* why you choose us */}
        <div className="bg-primaryColor w-full">
          <div className="px-[15%] py-[2%] flex flex-col items-center gap-2 text-white font-Poppins w-full max-lg:px-[8%] max-md:px-[5%] max-sm:px-[3%] xl:px-[4%]">
            <h1 className="text-[25px] font-semibold max-sm:text-[16px] max-sm:font-medium py-2">Why should you choose us?</h1>
            <p className="text-center max-md:text-justify max-sm:text-[13px]">VanGo stands out as your top choice for van rentals for several compelling reasons. Our fleet is renowned for its reliability and comfort, ensuring a safe and enjoyable journey for you and your companions, making your travel plans not only convenient but also budget-friendly. What sets us apart is our commitment to exceptional service. Our dedicated team is always ready to assist you, ensuring a seamless rental experience from start to finish. With VanGo, booking a van is quick and easy, allowing you to focus on the adventure ahead. Whether you need a van for a weekend getaway or a long-term rental, our flexible options cater to your needs. Our 24/7 customer support is always at your service, guaranteeing your satisfaction throughout your rental journey. Choose VanGo for a rental experience that exceeds your expectations and leaves you with unforgettable memories</p>
            <div className="flex justify-end w-full  px-2">
              <Button name="Read More!" width="120px"></Button>
            </div>
          </div>
         
        </div>
        {/* van details */}
        <div className="w-full px-[15%] py-[2%] font-Poppins max-md:px-[5%] max-lg:px-[8%] xl:px-[5%] xl:py-[4%]">
          <div className="flex justify-center  w-full border p-[1%] items-center max-md:flex-col" >
            <div className="basis-[30%] ">
              <Image src="/van.svg" width={350} height={300} alt="Van"></Image>
            </div>
            <div className="basis-[70%] text-justify flex flex-col w-full gap-2">
              <p className="px-2 max-sm:text-[14px]">You could say that VanGo Rental is one of the best van renting services around which has concentrated on providing dependable and convenient transport solutions. We serve persons as well as commercial entities, valuing our customers highly and aiming at ensuring that renting out vans is not difficult or stress-causing.
              With our expanding coverage and focus on customer satisfaction, VanGo Rental is the go-to choice for all your transportation needs.</p>
              <div className="flex justify-end w-full max-md:justify-center px-2">
              <Button name="View Details" width="120px"></Button>
              </div>
            </div>
          </div>
          
        </div>
        {/* we offer */}
        <div className="font-Poppins flex flex-col justify-center w-full gap-4 max-sm:gap-2">
          <div className="flex justify-center w-full">
            <div className="py-[10px] border-b w-[300px] flex justify-center max-sm:w-[200px] max-sm:py-[2px]">
              <h1 className="text-[25px] font-bold  text-center max-sm:text-[20px]">What We Offer</h1>
            </div>
          </div> 
          <div className="w-full flex justify-center gap-[2%] max-sm:flex-col  max-md:flex-col max-sm:py-[2%] max-sm:text-[14px] max-sm:gap-2">
            <div className="flex w-[350px] h-[200px] flex-col border items-center justify-center  text-justify gap-[1rem] bg-primaryColor text-white rounded-[5px] max-sm:h-[150px] max-sm:w-full max-md:w-full">
              <div className="flex justify-center gap-2">
                <p>ICON</p>
                <p className="font-semibold">VOUCHER</p>
              </div>
              <p className="px-4">Experience the freedom of travel with VanGO Rental vouchers! Save on your next booking and discover new adventures. Get your Voucher now and start planning!</p>
            </div>
            <div className="flex w-[350px] h-[200px] flex-col border items-center justify-center  text-justify gap-[1rem] bg-primaryColor text-white rounded-[5px] max-sm:h-[150px] max-sm:w-full max-md:w-full">
              <div className="flex justify-center gap-2">
                <p>ICON</p>
                <p className="font-semibold">DISCOUNT</p>
              </div>
              <p className="px-4">Experience the freedom of travel with VanGO Rental vouchers! Save on your next booking and discover new adventures. Get your Voucher now and start planning!</p>
            </div>
            <div className="flex w-[350px] h-[200px] flex-col border items-center justify-center  text-justify gap-[1rem] bg-primaryColor text-white rounded-[5px] max-sm:h-[150px] max-sm:w-full max-md:w-full">
              <div className="flex justify-center gap-2">
                <p>ICON</p>
                <p className="font-semibold">PROMOTION</p>
              </div>
              <p className="px-4">Experience the freedom of travel with VanGO Rental vouchers! Save on your next booking and discover new adventures. Get your Voucher now and start planning!</p>
            </div>
            
          </div>
        </div>
      </div>
      <Faqs />
      <Footer />
    </div>
   </main>
  );
}
