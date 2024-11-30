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
    <div className="w-full bg-[#595959] text-white pt-[5px]">
      <Container>
        <div className="flex flex-col gap-[10px] lg:flex-col md:flex-col md:gap-[5px]">
          <div className="flex lg:gap-[20px] lg:flex-row md:flex-col md:gap-[10px]">
            {contactInfo.map((contact, index) => (
              <div key={index} className="flex items-center xl:gap-4 md:gap-2">
                <Image
                  src={contact.src}
                  width={47}
                  height={47}
                  alt={contact.alt}
                  className="lg:w-[35px] lg:h-[35px] xl:w-[47px] xl:h-[47px] md:w-[30px] md:-[30px]"
                />
                <p className="md:text-[14px] xl:text-[16px]">{contact.text}</p>
                <p className="md:text-[14px] xl:text-[16px]">
                  {contact.details}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row gap-[20px] py-[20px]">
            <div>
              <div className="pb-4">
                <h3 className="text-yellow border-b-2 lg:w-20 md:w-16  border-yellow font-semibold xl:text-[16px] lg:text-[14px] md:text-[13px]">
                  About Us
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:gap-[20px] lg:gap-[10px] xl:gap-x-[40px] lg:gap-x-[20px]">
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
                    <p className="lg:text-[14px] md:text-[13px]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="pb-4">
                <h3 className="text-yellow border-b-2 lg:w-28 md:w-24 border-yellow font-semibold xl:text-[16px] lg:text-[14px] md:text-[13px] tracking-[1px]">
                  Our Services
                </h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 xl:gap-[20px] lg:gap-[10px] xl:gap-x-[40px] lg:gap-x-[20px] md:gap-x-[20px]">
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
                    <p className="lg:text-[14px] md:text-[13px]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div className="border text-white"></div>
      <Container>
        <p className="text-center lg:text-[14px] md:text-[13px] p-2">
          © 2024 | VanGO Rentals | All Rights Reserved.
        </p>
      </Container>
    </div>
  );
};

export default Footer;
