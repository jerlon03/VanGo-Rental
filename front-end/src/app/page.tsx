import React from "react";
import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";
import Container from "@/components/landing/Container";
import Image from "next/image";
import Button from "@/components/Button/WebsiteButton";
import { TextHighlight, Heading } from "@/components/landing/TextHighlight";
const HomePage = () => {
  const services = [
    {
      id: 1,
      title: "Negotiate Rates",
      description:
        "Flexible pricing options that can be adjusted or discussed to accommodate individual needs and circumstances.",
      image: "/icon/icon-negotiate.svg",
    },
    {
      id: 2,
      title: "Professional and Reliable Driver Rates",
      description:
        "A skilled and trustworthy driver who ensures a safe and reliable travel experience for passengers.",
      image: "/icon/icon-driver.svg",
    },
    {
      id: 3,
      title: " Comfy , Safe, Free Hassle Travel",
      description:
        "Providing passengers with a comfortable and secure journey, free from any unnecessary difficulties or inconveniences.",
      image: "/icon/icon-comfy.svg",
    },
    {
      id: 4,
      title: "Passenger Insurance",
      description:
        "Flexible pricing options that can be adjusted or discussed to accommodate individual needs and circumstances.",
      image: "/icon/icon-insurance.svg",
    },
    {
      id: 5,
      title: "First Aid kit",
      description:
        "Offers Insurance  protecting passengers in case of injury or loss during travel.",
      image: "/icon/icon-first-aid.svg",
    },
    {
      id: 6,
      title: "Fire Extinguisher",
      description:
        "Safety device used to extinguish small fires and prevent their spread, providing an added layer of safety during travel.",
      image: "/icon/icon-fire-extinguisher.svg",
    },
  ];

  return (
    <>
      <Header />
      <div className="w-full py-2 text-websiteBlack">
        {/* BANNER */}
        <Container>
          <div className="grid grid-cols-2">
            <div className="w-full flex flex-col justify-evenly h-full">
              <Heading
                text="We Have Prepared a Van For Your Trip"
                textSize="text-[45px]"
              />
              <p className="text-[20px]">
                Rent a van, gather your friends, and let the adventure begin.
              </p>
              <div className="flex gap-[10px]">
                <Button
                  label="Booking It Now !"
                  variant="primary" // Set as primary button
                  width="200px"
                  height="50px"
                />
                <Button
                  label="Call Us"
                  variant="secondary" // Set as secondary button
                  width="200px"
                  height="50px"
                  textSize="text-[20px]" // Set custom text size
                />
              </div>
            </div>
            <div className="w-full relative">
              <Image
                src="/van-banner.png"
                width={1000}
                height={500}
                alt="Banner"
                className="w-full h-auto"
              />
              <div className="absolute top-0 right-0">
                <Image
                  src="/book-sticker.png"
                  width={120}
                  height={80}
                  alt="Book Sticker"
                />
              </div>
            </div>
          </div>
        </Container>
        {/* VAN */}
        <Container>
          <div className="py-4">
            <TextHighlight text="OUR VAN" />
            <Heading
              text="Pick your van and hit the road with confidence."
              textSize="text-[36px]"
            />
          </div>
        </Container>
        {/* SERVICES */}
        <div className="bg-[#f2f2f2] py-[2%]">
          <Container>
            <div>
              <TextHighlight text="OUR SERVICES" />
              <Heading
                text="We provide complete van rental solutions"
                textSize="text-[24px]"
              />
            </div>
          </Container>
        </div>
        {/* WHY CHOOSE US */}
        <Container>
          <div className="py-[4%]">
            <div className="flex flex-col items-center pb-[2%]">
              <TextHighlight text="ADVANTAGES" />
              <Heading text="Why Choose Us ?" textSize="text-[36px]" />
              <p className="text-[15px]">
                We present many guarantees and advantages when you rent a van
                with us for your trip. Here are some of the advantages that you
                will get
              </p>
            </div>
            <div className="grid grid-cols-3 gap-y-[30px] gap-x-[20px]">
              {services.map((service) => (
                <div key={service.id} className="flex p-2 gap-[10px]">
                  <Image
                    src={service.image}
                    width={90}
                    height={90}
                    alt={service.title}
                  />
                  <div className="flex flex-col gap-[10px]">
                    <p className="font-medium text-[16px]">{service.title}</p>
                    <p className="text-[14px]">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
        {/* BLOG */}
        <Container>
          <div className="py-[2%]">
            <div className="pb-[2%]">
              <TextHighlight text="OUR BLOG" />
              <Heading
                text="Explore the Latest Trends, Expert Advice, and Fresh Perspectives"
                textSize="text-[28px]"
              />
            </div>
          </div>
        </Container>
        {/* REVIEW */}
        <Container>
          <div className="py-[2%]">
            <div className="flex flex-col items-center pb-[2%]">
              <TextHighlight text="OUR REVIEW" />
              <Heading text="What They Say?" textSize="text-[36px]" />
              <p className="text-[15px]">
                Here are some comments from our customers, be one of them
              </p>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
