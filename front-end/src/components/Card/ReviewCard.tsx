import React from "react";
import Image from "next/image";

type ReviewCardProps = {
  quote: string;
  author: string;
};

const ReviewCard: React.FC<ReviewCardProps> = ({ quote, author }) => (
  <div className="border border-[#CCCCCC] p-4 rounded-[5px] flex flex-col gap-[10px]">
    <div className="flex justify-between w-full">
      <Image src="/icon/icon-quote.svg" width={30} height={30} alt="Quote" />
      {/* Star Rating Component */}
      <div className="flex items-center text-[30px] gap-[10px]">
        {[...Array(5)].map((_, index) => (
          <Image
            key={index}
            src="/icon/icon-star.svg"
            width={18}
            height={18}
            alt="Quote"
          />
        ))}
      </div>
    </div>
    <p className="text-[15px]">{quote}</p>
    <p className="text-[15px] font-semibold">{author}</p>
  </div>
);

export default ReviewCard;
