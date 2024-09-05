import React from "react";
import Image from "next/image";

const Blog = () => {
  return (
    <div className="">
      {/* banner */}
      <div className="w-full relative">
        <Image
          src="/png/blog_img.png"
          width={300}
          height={300}
          alt="image"
          className="w-full"
        ></Image>

        <h1 className="absolute top-10 right-9 w-[60%] text-[20px] text-center">
          “Embark on a Journey of Discovery: Your Go-To for Unforgettable
          Outdoor Fun, Where Every Moment Counts, Every Adventure Awaits, and
          Every Memory Lasts a Lifetime."
        </h1>
      </div>
      {/* 2nd div */}
      <div className="flex justify-center text-center p-[4%] ">
        <p className="px-[20%]">
          Discover the thrill of adventure where every tale told shows how
          exploring transforms us, sparking a love for travel and creating
          memories that stay with us forever
        </p>
      </div>
      {/* Third div */}
      <div className="px-[9%]">
        <h1 className="text-[20px] font-medium ">Featured Articles</h1>
        <div className="grid grid-cols-2 gap-7 text-justify">
          <div>
            <Image
              src="/png/blog_img.png"
              width={300}
              height={300}
              alt="image"
              className="w-full"
            ></Image>
            <h1>Family Escapades: Bonding Beyond Borders</h1>
            <p className="text-[12px] text-primaryColor font-semibold">
              April 05, 2024
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio, ipsa velit eaque temporibus sint incidunt est porro
              nostrum blanditiis maiores quasi, aut tempore nam eligendi
              adipisci quo possimus quam deserunt.
            </p>
          </div>

          <div>
            <Image
              src="/png/blog_img.png"
              width={300}
              height={300}
              alt="image"
              className="w-full"
            ></Image>
            <h1>Family Escapades: Bonding Beyond Borders</h1>
            <p className="text-[12px] text-primaryColor font-semibold">
              April 05, 2024
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio, ipsa velit eaque temporibus sint incidunt est porro
              nostrum blanditiis maiores quasi, aut tempore nam eligendi
              adipisci quo possimus quam deserunt.
            </p>
          </div>

          <div>
            <Image
              src="/png/blog_img.png"
              width={300}
              height={300}
              alt="image"
              className="w-full"
            ></Image>
            <h1>Family Escapades: Bonding Beyond Borders</h1>
            <p className="text-[12px] text-primaryColor font-semibold">
              April 05, 2024
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio, ipsa velit eaque temporibus sint incidunt est porro
              nostrum blanditiis maiores quasi, aut tempore nam eligendi
              adipisci quo possimus quam deserunt.
            </p>
          </div>

          <div className="flex flex-col gap-[1rem]">
            <Image
              src="/png/blog_img.png"
              width={300}
              height={300}
              alt="image"
              className="w-full"
            ></Image>
            <div>
              <h1>Family Escapades: Bonding Beyond Borders</h1>
              <p className="text-[12px] text-primaryColor font-semibold">
                April 05, 2024
              </p>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio, ipsa velit eaque temporibus sint incidunt est porro
              nostrum blanditiis maiores quasi, aut tempore nam eligendi
              adipisci quo possimus quam deserunt.
            </p>
          </div>
        </div>
      </div>

      {/*  4th div */}
      <div className="w-full py-[4rem] flex justify-center">
        <div className="w-full p-[2rem] px-[5%] relative">
          <div className="flex flex-col gap-[.7rem] justify-center items-center">
            <div className="border-t-2 w-full "></div>
            <div className="border-t-2 w-[90%] "></div>
          </div>

          <div className="absolute top-0 right-[16rem]">
            <div className="flex flex-col justify-center items-center  border-2 h-[150px] bg-white w-[720px] ">
              <h2 className="font-semibold text-[19px] ">Testimonial</h2>
              <h1 className="font-semibold text-[20px]">
                Our Sucesses Stories
              </h1>
              <p className="text-[16px]">
                Check out what our satisfied customers have shared about their
                experience with us
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* 5th div */}
      <div className="h-[300px] pt-[2rem] w-full px-[9%]">
        <div className="flex justify-center items-center">
          <div className="border size-[200px]">1</div>
          <div className="border size-[200px]">2</div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
