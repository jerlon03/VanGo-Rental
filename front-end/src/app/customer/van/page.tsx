'use client'
import React, { useEffect, useState } from 'react';
import VanCard from '@/components/Card/vanCard'
import { fetchAllVan } from '@/lib/api/van.api';

interface Van {
  van_id: number;
  van_name: string;
  van_description: string;
  van_image: string;
  people_capacity: number;
  transmission_type: string;
  things_capacity: number;
}

const VanList = () => {
  const [vans, setVans] = useState<Van[]>([]);

  useEffect(() => {
    const fetchVans = async () => {
      try {
        const vanData = await fetchAllVan();
        setVans(vanData.data); // Assuming the data comes in the `data` field
      } catch (error) {
        console.log('Failed to fetch vans.');
      }
    };

    fetchVans();
  }, []);


  return (
    <div className='py-[2rem]'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[3rem]">
        {vans.map((van) => (
          <VanCard
            key={van.van_id}
            van_name={van.van_name}
            van_description={van.van_description}
            van_image={van.van_image}
            people_capacity={van.people_capacity}
            transmission_type={van.transmission_type}
            things_capacity={van.things_capacity}
          />
        ))}
      </div>
    </div>

  );
};

export default VanList;
