"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";
import Container from "@/components/landing/Container";
import Image from "next/image";
import Button from "@/components/Button/WebsiteButton";
import { TextHighlight, Heading } from "@/components/landing/TextHighlight";
import ReviewCard from "@/components/Card/ReviewCard";
import { Carousel } from "primereact/carousel";
import Faqs from "@/components/landing/faqs";
import {
  serviceCardData,
  chooseUsCard,
} from "@/components/sampledata/sampleData"; // Adjust the import path as necessary
import ServiceCard from "@/components/Card/ServiceCard"; // Adjust the import path as necessary
import {
  BiSolidShoppingBags,
  IoPerson,
  TbManualGearboxFilled,
} from "@/components/icons";
import VanCard from "@/components/Card/vanCard"; // Import the new VanCard component
import { fetchAllPublicVan } from "@/lib/api/van.api";
import { Van } from "@/lib/types/van.type";
import Modal from "@/components/modals/modalContainer"; // Import the Modal component
import PostCard from "@/components/Card/postCard";
import { fetchAllPublicPosts } from "@/lib/api/posts.api";
import { BlogPost } from "@/lib/types/posts.type";
import { getAllFeedbacks } from "@/lib/api/feedback.api";
import { Feedbacks } from "@/lib/types/feedback.type";
import Link from "next/link";
import { VanLoader } from "@/components/loading/Loading"; // Import the VanLoader component

type Review = {
  quote: string;
  author: string;
};

const HomePage = () => {
  const services = serviceCardData;
  const chooseUs = chooseUsCard;

  const reviewTemplate = (review: Review) => (
    <div className="mr-4">
      <ReviewCard
        key={review.author}
        quote={review.quote}
        author={review.author}
      />
    </div>
  );

  const [vans, setVans] = useState<Van[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [posts, setPosts] = useState<BlogPost[]>([]); // Ensure posts is initialized as an empty array
  const [customerReviews, setCustomerReviews] = useState<Feedbacks[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await fetchAllPublicPosts();
        // Sort posts by post_id in descending order and take the top 3
        setPosts(
          data.posts?.sort((a, b) => b.post_id - a.post_id).slice(0, 3) || []
        );
      } catch (err) {
        setError("Failed to fetch posts"); // Updated error message for clarity
      } finally {
        setLoading(false);
      }
    };
    const fetchCustomerReviews = async () => {
      try {
        const reviewsData = await getAllFeedbacks(); // Assuming this fetches customer reviews
        setCustomerReviews(
          reviewsData.data.filter((review) => review.status === "PUBLISH")
        ); // Filter for 'PUBLISH' status
      } catch (error) {
        console.error("Error fetching customer reviews:", error);
      }
    };
    const fetchVans = async () => {
      try {
        const data = await fetchAllPublicVan();
        const sortedVans = data.data
          .sort((a, b) => b.van_id - a.van_id)
          .slice(0, 3);
        setVans(sortedVans);
      } catch (err) {
        setError("Failed to fetch vans");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerReviews();
    fetchPosts();
    fetchVans();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Function to close the modal
  };

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
                textSize="lg:text-[45px] md:text-[28px]"
              />
              <p className="lg:text-[20px] md:text-[15px]">
                Rent a van, gather your friends, and let the adventure begin.
              </p>
              <div className="flex gap-[10px]">
                <Link href="/van">
                  <Button
                    label="Booking It Now !"
                    variant="primary" // Set as primary button
                  />
                </Link>
                <Button
                  label="Call Us"
                  variant="secondary" // Set as secondary button
                  width="200px"
                  height="50px"
                  textSize="text-[20px]" // Set custom text size
                  onClick={handleOpenModal} // Open modal on button click
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
              <div className="absolute top-0 right-0 md:hidden lg:block">
                <Image
                  src="/book-sticker.png"
                  width={120}
                  height={80}
                  alt="Book Sticker"
                  className="md:aspect-[20/20] h-auto"
                />
              </div>
            </div>
          </div>
        </Container>
        {/* VAN */}
        <Container>
          <div className="py-8">
            <TextHighlight text="OUR VAN" />
            <Heading
              text="Pick your van and hit the road with confidence."
              className="lg:text-[32px] md:text-[24px]"
            />
          </div>
          <div className="grid grid-cols-3 gap-[20px] ">
            {loading // Check if loading
              ? Array.from({ length: 3 }).map(
                  (
                    _,
                    index // Create an array of 3 loaders
                  ) => (
                    <VanLoader key={index} /> // Render a VanLoader for each expected van
                  )
                )
              : vans.map((van) => <VanCard key={van.van_id} van={van} />)}
          </div>
          <div className="pt-[2%] flex justify-center">
            <Link href="/van">
              <Button
                label="SEE ALL VANS"
                variant="primary" // Set as primary button
                width="200px"
                height="50px"
                textSize="18px"
                className="font-semibold"
              />
            </Link>
          </div>
        </Container>
        {/* SERVICES */}
        <Container>
          <div className="py-[5%]">
            <div>
              <TextHighlight text="EXPLORE OUR SERVICES" />
              <Heading
                text="Discover Our Comprehensive Van Rental Services"
                className="lg:text-[32px] md:text-[24px]"
              />
            </div>
            <div className="py-[2%]">
              {loading ? ( // Check if loading
                <p>Loading services...</p> // Display loading message
              ) : (
                <Carousel
                  value={services}
                  numVisible={window.innerWidth < 1280 ? 3 : 4}
                  numScroll={1}
                  circular
                  autoplayInterval={5000}
                  itemTemplate={(service) => (
                    <div className="flex justify-center mr-[4%]">
                      <ServiceCard
                        key={service.title}
                        image={service.image}
                        title={service.title}
                        description={service.description}
                      />
                    </div>
                  )}
                  pt={{
                    previousButton: { className: "hidden" },
                    nextButton: { className: "hidden" },
                  }}
                />
              )}
            </div>
          </div>
        </Container>
        {/* WHY CHOOSE US */}
        <div className=" bg-websiteSecondary/35">
          <Container>
            <div className="py-[3%] ">
              <div className="flex flex-col items-center pb-[4%]">
                <TextHighlight text="ADVANTAGES" />
                <Heading
                  text="Why Choose Us ?"
                  className="lg:text-[32px] md:text-[24px]"
                />
                <p className="text-[15px]">
                  We present many guarantees and advantages when you rent a van
                  with us for your trip. Here are some of the advantages that
                  you will get
                </p>
              </div>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-y-[30px] gap-x-[20px]">
                {chooseUs.map((about) => (
                  <div key={about.id} className="flex p-2 gap-[10px]">
                    <Image
                      src={about.image}
                      width={90}
                      height={90}
                      alt={about.title}
                    />
                    <div className="flex flex-col gap-[10px]">
                      <p className="font-medium text-[16px]">{about.title}</p>
                      <p className="text-[14px]">{about.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>
        {/* BLOG */}
        <div className="bg-[#F2F2F2] py-[2%]">
          <Container>
            <div className="py-[2%]">
              <TextHighlight text="OUR BLOG" />
              <Heading
                text="Explore the Latest Trends, Expert Advice, and Fresh Perspectives"
                className="lg:text-[32px] md:text-[24px]"
              />
            </div>
            <div className="grid grid-cols-3 lg:gap-[40px] md:gap-[20px]">
              {posts.map((post) => (
                <div className="bg-white rounded-[10px]">
                  <PostCard
                    key={post.post_id}
                    post={post}
                    showDescription={false}
                  />
                </div>
              ))}
            </div>
            <div className="w-full justify-center flex pt-[2%]">
              <Link href="/blog">
                <Button
                  label="EXPLORE MORE"
                  variant="primary" // Set as primary button
                  width="200px"
                  height="50px"
                  textSize="18px"
                  className="font-semibold"
                />
              </Link>
            </div>
          </Container>
        </div>

        {/* REVIEW */}
        <Container>
          <div className="py-[2%]">
            <div className="flex flex-col items-center pb-[2%]">
              <TextHighlight text="OUR REVIEW" />
              <Heading
                text="What They Say?"
                className="lg:text-[32px] md:text-[24px]"
              />
              <p className="text-[15px]">
                Here are some comments from our customers, be one of them
              </p>
            </div>
            {loading ? ( // Check if loading
              <p>Loading reviews...</p> // Display loading message
            ) : (
              <Carousel
                value={customerReviews}
                numVisible={3}
                numScroll={3}
                className="space-x-[20px]"
                circular
                autoplayInterval={3000}
                itemTemplate={reviewTemplate}
                pt={{
                  previousButton: { className: "hidden" },
                  nextButton: { className: "hidden" },
                }}
              />
            )}
          </div>
        </Container>
        {/* FAQS */}
        <Faqs />
        {/* Modal Component */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          width="500px"
          height="460px"
        >
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <p className="text-md mb-2">You can reach us at:</p>
            <ul className="list-disc pl-5">
              <li>+63 9166672391 - Globe</li>
              <li>+63 9217244169 - Smart</li>
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </Modal>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
