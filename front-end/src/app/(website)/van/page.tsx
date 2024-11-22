"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import "@fortawesome/fontawesome-free/css/all.min.css";
import VanCard from "@/components/Card/vanCard";
import { fetchAllPublicVan } from "@/lib/api/van.api";
import { Van } from "@/lib/types/van.type";

const VanPage: React.FC = () => {
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

  if (loading) {
    return <div>Loading vans...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="relative">
        <Image
          src="/png/van/vanbg.png"
          alt="Car interior with steering wheel and dashboard"
          width={1200}
          height={400}
          className="object-cover w-full sm:aspect-[1200/600] md:aspect-[1200/300]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold">RENT A VAN</h1>
          <p className="text-lg">Choose your van</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto md:mt-20 sm:mt-0 md:p-10  sm:p-2">
        <h2 className="text-center text-2xl font-semibold mb-4">
          Book your next journey with our VanGo Rental services
        </h2>
        <h3 className="text-xl font-medium mb-10">
          Most Popular Used Van Vehicles
        </h3>

        {/* Render Van Cards */}
        {vans.map((van, index) => (
          <motion.div
            key={van.van_id}
            initial={{ opacity: 0, y: 50 }} // Initial state for each item
            whileInView={{ opacity: 1, y: 0 }} // Fade and slide up when in view
            transition={{
              opacity: { duration: 1.2 },
              y: { type: "spring", stiffness: 100, damping: 25, duration: 1.2 },
              delay: index * 0.2, // Dynamic delay for each item (e.g., 0.2s delay per item)
            }}
          >
            <VanCard key={van.van_id} van={van} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VanPage;
