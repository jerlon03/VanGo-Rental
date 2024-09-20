import React from 'react';

interface VanCardProps {
  van_name: string;
  van_description: string;
  van_image: string;
  people_capacity: number;
  transmission_type: string;
  things_capacity: number;
}

const VanCard: React.FC<VanCardProps> = ({
  van_name,
  van_description,
  van_image,
  people_capacity,
  transmission_type,
  things_capacity,
}) => {
  return (
    <div className="max-w-sm bg-white rounded-lg overflow-hidden shadow-lg text-[#003459] transform transition-transform hover:scale-105 duration-300 ease-in-out">
      <img className="w-full h-48 object-cover" src={van_image} alt={van_name} />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{van_name}</h2>
        <p className="text-sm mb-4">{van_description}</p>
        <div className="flex justify-between text-sm mb-4">
          <span>People: {people_capacity}</span>
          <span>Transmission: {transmission_type}</span>
        </div>
        <p className="mb-4">Things Capacity: {things_capacity}</p>
        <div className='w-full h-full flex items-end'>
          <button className="w-full bg-[#00A8E8] text-white font-bold py-2 px-4 rounded hover:bg-[#007ba7] transition-colors duration-300 ease-in-out h-full">
            Book Now
          </button>
        </div>
       
      </div>
    </div>
  );
};

export default VanCard;
