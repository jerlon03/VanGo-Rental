import Image from "next/image";
import Faqs from "@/components/landing/faqs";
import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
   <main>
    <div>
      <Header />
      <div>
        <div>Home Page</div>-
        <div className="font-Poppins flex flex-col justify-center w-full gap-4">
          <div className="flex justify-center w-full">
            <div className="py-[10px] border-b w-[300px] flex justify-center">
              <h1 className="text-[25px] font-semibold text-center">What We Offer</h1>
            </div>
          </div> 
          <div className="w-full flex justify-center gap-4 overflow-x-hidden sm:overflow-x-auto sm:overflow-y-hidden sm:flex-nowrap">
            <div className="flex-shrink-0 w-[350px] h-[200px] flex flex-col border items-center justify-center text-justify gap-[1rem] bg-primaryColor text-white rounded-[5px]">
              <div className="flex justify-center">
                <p>ICON</p>
                <p>VOUCHER</p>
              </div>
              <p className="px-4">Experience the freedom of travel with VanGO Rental vouchers! Save on your next booking and discover new adventures. Get your Voucher now and start planning!</p>
            </div>
            <div className="flex-shrink-0 w-[350px] h-[200px] flex flex-col border items-center justify-center text-justify gap-[1rem] bg-primaryColor text-white rounded-[5px]">
              <div className="flex justify-center">
                <p>ICON</p>
                <p>DISCOUNT</p>
              </div>
              <p className="px-4">Experience the freedom of travel with VanGO Rental vouchers! Save on your next booking and discover new adventures. Get your Voucher now and start planning!</p>
            </div>
            <div className="flex-shrink-0 w-[350px] h-[200px] flex flex-col border items-center justify-center text-justify gap-[1rem] bg-primaryColor text-white rounded-[5px]">
              <div className="flex justify-center">
                <p>ICON</p>
                <p>PROMOTION</p>
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
