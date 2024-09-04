import React from "react";
import Image from "next/image";

const Blog = () => {
  return (
    <div className="">
      <div className="w-full relative">
        <Image
          src="/png/blog_img.png"
          width={300}
          height={300}
          alt="image"
          className="w-full"
        ></Image>

        <h1 className="absolute top-10 right-9 w-[60%] text-[24px] text-center">
          “Embark on a Journey of Discovery: Your Go-To for Unforgettable
          Outdoor Fun, Where Every Moment Counts, Every Adventure Awaits, and
          Every Memory Lasts a Lifetime."
        </h1>
      </div>

      <div className="">'Discover the thrill of adventure where every tale told shows how exploring transforms us, sparking a love for travel and creating memories that stay with us forever'</div>
    </div>
  )
};

export default Blog;
