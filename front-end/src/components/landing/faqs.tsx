'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faPlus } from '@fortawesome/free-solid-svg-icons';

const Faqs = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const faqData = [
    {
      question: 'Can I modify or cancel my reservation?',
      answer: 'Yes, customers can modify or cancel their reservations. Our website provides options for modifications, such as changing rental dates or vehicle types. For cancellations, please check our policy regarding fees and timing. Customers can manage their reservations online or contact our customer service for assistance.',
    },
    {
      question: 'Is there a minimum age to rent a van?',
      answer: 'The minimum age to rent a van is typically 21 years old, but this can vary depending on the rental company and location. Additional fees or restrictions may apply for drivers under 25.',
    },
    {
      question: 'What are your rental rates?',
      answer: 'Rental rates vary depending on the type of van, rental duration, and location. Please visit our website or contact our customer service for detailed pricing information.',
    },
    {
      question: 'What happens if I return the van late?',
      answer: 'Returning the van late may incur additional charges. It is important to return the van on time or contact us to extend your rental period to avoid any late fees.',
    },
    {
      question: 'Are there restrictions on where I can take the rental van?',
      answer: 'Yes, there may be restrictions on taking rental vans out of certain areas or across borders. Please check with us for any specific restrictions or requirements.',
    },
    {
      question: 'Can I transport pets in a rental van?',
      answer: 'Yes, you can transport pets in our rental vans. However, we require that pets be kept in a carrier or crate, and the van should be returned clean and free of pet hair to avoid cleaning fees.',
    },
    {
      question: 'How do I make a reservation with VanGO rental?',
      answer: 'You can make a reservation with VanGO Rental by visiting our website, selecting your desired van, rental dates, and completing the booking process online. You can also contact our customer service for assistance with reservations.',
    },
  ];

  return (
    <div className='w-full xl:pt-[4%]'>
      <div className=' bg-opacity-45 flex justify-center items-center gap-[1rem] px-[3%]'>
        <div className='basis-[40%] flex justify-center w-full max-md:hidden'>
          <Image src="/faqs.svg" width={0} height={450} alt='FAQ Image' className='w-full' />
        </div>
        <div className='basis-[60%] flex w-full flex-col max-md:basis-[100%]'>
          <div className='flex items-center justify-center pt-[3%]'>
            <h1 className='text-[30px] font-bold font-Poppins max-sm:text-center max-sm:text-[20px]'>Frequently Asked Questions</h1>
          </div>
          <div className='py-[2rem] flex flex-col gap-[2rem] font-Poppins'>
            {faqData.map((faq, index) => (
              <div key={index}>
                <div className='flex justify-between font-Poppins p-1 border-b-[2px] border-primaryColor font-semibold text-[18px] items-center cursor-pointer max-sm:text-[15px] max-sm:gap-[5px]' onClick={() => toggleQuestion(index)}>
                  <h3 className='xl:text-[16px]'>{faq.question}</h3>
                  <div className='w-[20px] h-[20px]'>
                    {openQuestion === index ? (
                      <FontAwesomeIcon icon={faX} className='text-[14px] max-sm:text-[12px]'/>
                    ) : (
                      <FontAwesomeIcon icon={faPlus} />
                    )}
                  </div>
                </div>
                {openQuestion === index && (
                  <div className='p-3 text-justify font-Poppins py-5 font-medium bg-primaryColor bg-opacity-50 text-white max-sm:text-[14px] xl:text-[15px]'>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
