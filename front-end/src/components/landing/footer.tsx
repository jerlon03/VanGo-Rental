import React from "react";
import Container from "@/components/landing/Container";
import Image from "next/image";
import { GiCheckMark } from "../icons";

const Footer: React.FC = () => {
  const contactInfo = [
    {
      src: "/icon/f7_phone-circle.svg",
      alt: "Phone Number",
      text: "Feel Free To Contact Us Now",
      details: "+ 63 9217244169 - SMART , +63 9166672391 - Globe",
    },
    {
      src: "/icon/email.svg",
      alt: "Email",
      text: "Email us at",
      details: "vango.rental@gmail.com",
    },
  ];

  return (
    <div className="w-full bg-[#595959] text-white">
      <Container>
        <div className="flex flex-col gap-[10px] lg:flex-col md:flex-col md:gap-[20px]">
          <div className="flex gap-[20px]">
            {contactInfo.map((contact, index) => (
              <div key={index} className="flex items-center gap-4">
                <Image
                  src={contact.src}
                  width={47}
                  height={47}
                  alt={contact.alt}
                />
                <p>{contact.text}</p>
                <p>{contact.details}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row gap-[20px] py-[20px]">
            <div>
              <div className="pb-4">
                <h3 className="text-yellow border-b-2 w-20 border-yellow font-semibold text-[16px]">
                  About Us
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] gap-x-[40px]">
                {[
                  "Negotiate Rates",
                  "Passenger Insurance",
                  "First Aid kit",
                  "Professional and Reliable Driver Rates",
                  " Comfy , Safe, Free Hassle Travel",
                  "Fire Extinguisher",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-center text-[14px]"
                  >
                    <GiCheckMark />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="pb-4">
                <h3 className="text-yellow border-b-2 w-28 border-yellow font-semibold text-[16px]">
                  Our Services
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px] gap-x-[40px]">
                {[
                  "Company Service",
                  "Family Trips",
                  "Outing",
                  "Wedding Service",
                  "Balik Probinsyav",
                  "Private Tours",
                  "Airport Transfer",
                  "Hotel Transfer",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-center text-[14px]"
                  >
                    <GiCheckMark />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div className="border text-white"></div>
      <Container>
        <p className="text-center text-[14px] p-2">
          © 2024 | VanGO Rentals | All Rights Reserved.
        </p>
      </Container>
    </div>
  );
};

export default Footer;
