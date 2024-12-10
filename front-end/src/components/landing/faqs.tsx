"use client";
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FcNext } from "react-icons/fc";
import { Heading } from "./TextHighlight";
import { GrNext } from "../icons";

const Faqs = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const faqData = [
    {
      question: "Can I cancel my reservation?",
      answer: "Yes, you can cancel your reservation, but it is non-refundable.",
    },
    {
      question: "Is there a minimum age to rent a van?",
      answer:
        "You must be 18 years old or above to rent a van. For those below 18, a guardian is required.",
    },
    {
      question: "What happens if I return the van late?",
      answer: "A penalty of PHP 300 per hour will be applied for late returns.",
    },
    {
      question: "Are there restrictions on where I can take the rental van?",
      answer: "The van can be used anywhere within Cebu.",
    },
    {
      question: "Can I transport pets in a rental van?",
      answer: "Yes, you can transport pets, but please be a responsible owner.",
    },
    {
      question: "How do I make a reservation with VanGo Rental?",
      answer: `You can go to the <span className='font-bold'>Van</span> feature and click <span className='font-bold'>Book Now</span>. A guided process on how to book a van will assist you from there.`,
    },
  ];

  return (
    <div className="w-full p-[2%] ">
      <div className=" max-w-[900px] w-full mx-auto">
        <div className="flex items-center justify-center pt-[3%]">
          <Heading
            text="Frequently Asked Questions"
            className="lg:text-[32px] md:text-[24px] sm:text-[16px]"
          />
        </div>
        <div className="py-[2rem] flex flex-col gap-[2rem] font-Poppins">
          {faqData.map((faq, index) => (
            <div key={index}>
              <div
                className="flex justify-between w-full font-Poppins p-1  font-semibold text-[18px]  cursor-pointer max-sm:text-[15px] max-sm:gap-[5px]"
                onClick={() => toggleQuestion(index)}
              >
                <h3 className="font-semibold md:text-[16px] sm:text-sm text-[#595959]">
                  {faq.question}
                </h3>
                <div className="w-[20px] h-[20px]">
                  {openQuestion === index ? (
                    <FaAngleDown className="text-[18px] max-sm:text-[12px] text-yellow" />
                  ) : (
                    <GrNext className="text-yellow" />
                  )}
                </div>
              </div>
              {openQuestion === index && (
                <div className="border-t-2 border-yellow">
                  <p
                    className="md:text-[15px] sm:text-xs pl-4 pt-4"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
