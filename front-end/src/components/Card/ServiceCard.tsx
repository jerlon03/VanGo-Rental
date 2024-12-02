import React, { useState } from "react";
import Image from "next/image";

type ServiceCardProps = {
  image: string;
  title: string;
  description: string;
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  image,
  title,
  description,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="border-2 border-yellow rounded-[5px] py-10 flex justify-center items-center flex-col relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image src={image} width={90} height={90} alt={title} />
      <p className="md:text-[20px] sm:text-[18px] font-semibold pt-2">
        {title}
      </p>
      {isHovered && (
        <div className="absolute text-white bg-blackColor/70 border  p-2 rounded text-[14px] lg:text-[13px] md:text-[12x] sm:text-[13px] h-full">
          {description}
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
