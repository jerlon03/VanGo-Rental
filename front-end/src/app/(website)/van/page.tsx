'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import '@fortawesome/fontawesome-free/css/all.min.css';
import VanCard from '@/components/Card/vanCard';
import { fetchAllPublicVan } from '@/lib/api/van.api';
import { Van } from '@/lib/types/van.type';

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
        setError('Failed to fetch vans');
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
          className="object-cover w-full"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold">RENT A VAN</h1>
          <p className="text-lg">Choose your van</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto mt-20 p-10">
        <h2 className="text-center text-2xl font-semibold mb-4">
          Book your next journey with our VanGo Rental services
        </h2>
        <h3 className="text-xl font-medium mb-10">Most Popular Used Van Vehicles</h3>

        {/* Render Van Cards */}
        {vans.map(van => (
          <VanCard key={van.van_id} van={van} />
        ))}
      </div>
    </div>
  );
};

export default VanPage;
