"use client";
import Container from "@/components/landing/Container";
import React, { useEffect, useState } from "react";
import { Heading, TextHighlight } from "@/components/landing/TextHighlight";
import { fetchAllPublicVan } from "@/lib/api/van.api";
import type { Van } from "@/lib/types/van.type";
import VanCard from "@/components/Card/vanCard";

const Van = () => {
  const [vans, setVans] = useState<Van[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVans = async () => {
      try {
        const data = await fetchAllPublicVan();
        setVans(data.data);
      } catch (err) {
        setError("Failed to fetch vans");
      } finally {
        setLoading(false);
      }
    };
    fetchVans();
  }, []);
  return (
    <div className="w-full text-websiteBlack">
      <div
        className="bg-cover bg-center flex items-end pb-[1%]"
        style={{ backgroundImage: "url(/banner-image.png)", height: "200px" }}
      >
        <Container>
          <Heading text="Our Van" textSize="text-[28px]" />
          <p className="text-[15px] font-medium">Home / Van</p>
        </Container>
      </div>
      <Container>
        <div className="py-[4%]">
          <div className="pb-[2%]">
            <TextHighlight text="CHOOSE YOUR VAN" />
            <Heading
              text="Explore the best options and find the perfect van for your journey."
              textSize="text-[32px]"
            />
          </div>
          <div className="w-full flex gap-[40px]">
            <div className="w-[75%] ">
              <div className="grid grid-cols-2 gap-[20px] ">
                {vans.map((van) => (
                  <VanCard key={van.van_id} van={van} showDescription={true} />
                ))}
              </div>
            </div>
            <div className="w-[25%] border p-4 bg-white rounded-lg shadow-md flex flex-col h-[330px]">
              <h3 className="text-center font-bold text-lg mb-2">
                How to Book Your Van:
              </h3>
              <ol className="list-decimal pl-5 space-y-1 text-[15px] flex-grow">
                <li>Choose a van.</li>
                <li>Click the "Book Now" button.</li>
                <li>Read and accept the Terms & Conditions.</li>
                <li>
                  Fill out the form with your contact details and pick-up
                  location.
                </li>
                <li>Provide a screenshot or image as proof of payment.</li>
                <li>After submitting, please wait for a confirmation.</li>
              </ol>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Van;
