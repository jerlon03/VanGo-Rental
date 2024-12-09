"use client";
import React, { useEffect, useState, useRef } from "react";
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

const HomePage = () => {
  const services = serviceCardData;
  const chooseUs = chooseUsCard;

  const reviewTemplate = (review: Feedbacks) => (
    <div className="mr-4">
      <ReviewCard
        key={review.feedback_id}
        quote={review.overall_experience}
        author={review.full_name}
      />
    </div>
  );

  const [vans, setVans] = useState<Van[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [posts, setPosts] = useState<BlogPost[]>([]); // Ensure posts is initialized as an empty array
  const [customerReviews, setCustomerReviews] = useState<Feedbacks[]>([]);
  const carouselRef = useRef<Carousel | null>(null);
  const [isAutoplay, setIsAutoplay] = useState(true); // State to manage autoplay

  const handleMouseEnter = () => {
    setIsAutoplay(false); // Stop autoplay on hover
  };

  const handleMouseLeave = () => {
    setIsAutoplay(true); // Restart autoplay on mouse leave
  };

  const handleServiceClick = (service: any) => {
    // Define what happens when a service card is clicked
    console.log("Service clicked:", service);
    // You can add more logic here, like navigating to a service detail page
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await fetchAllPublicPosts();
        // Sort posts by post_id in descending order and take the top based on window width
        setPosts(
          data.posts
            ?.sort((a, b) => b.post_id - a.post_id)
            .slice(0, window.innerWidth < 768 ? 1 : 3) || []
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
          .filter((van) => van.status === "available")
          .sort((a, b) => b.van_id - a.van_id)
          .slice(0, window.innerWidth < 767 ? 2 : 3);
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
      <div className="w-full py-2 text-websiteBlack mt-[100px]">
        {/* BANNER */}
        <Container>
          <div className="flex md:flex-row sm:flex-col-reverse pb-[5%]">
            <div className="w-full flex flex-col justify-evenly ">
              <Heading
                text="We Have Prepared a Van For Your Trip"
                textSize="lg:text-[45px] md:text-[28px] sm:text-[24px]"
              />
              <p className="lg:text-[20px] md:text-[15px]">
                Rent a van, gather your friends, and let the adventure begin.
              </p>
              <div className="flex gap-[10px]">
                <Link href="/van">
                  <Button
                    label="Book Now !"
                    variant="primary" // Set as primary butto
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
            <div className="w-full relative sm:px-[15%] md:px-0">
              <Image
                src="/van-banner.png"
                width={1000}
                height={500}
                alt="Banner"
                className="w-full h-auto"
              />
              <div className="absolute top-0 right-0 md:hidden sm:hidden lg:block">
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
        <div className="bg-websiteSecondary/30 py-2">
          <Container>
            <div className="md:py-8 sm:py-4">
              <TextHighlight text="OUR VAN" />
              <Heading
                text="Pick your van and hit the road with confidence."
                className="lg:text-[32px] md:text-[24px] sm:text-[16px]"
              />
            </div>
            <div className="grid md:grid-cols-3 md:gap-[20px] sm:gap-[5px] sm:grid-cols-2 ">
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
                  className="font-semibold sm:text-[14px] md:text-[16px]"
                />
              </Link>
            </div>
          </Container>
        </div>

        {/* SERVICES */}
        <Container>
          <div className="py-[5%]">
            <div>
              <TextHighlight text="EXPLORE OUR SERVICES" />
              <Heading
                text="Discover Our Comprehensive Van Rental Services"
                className="lg:text-[32px] md:text-[24px] sm:text-[16px]"
              />
            </div>
            <div className="py-[2%]">
              {loading ? ( // Check if loading
                <p>Loading services...</p> // Display loading message
              ) : (
                <Carousel
                  className="carousel"
                  ref={carouselRef}
                  value={services}
                  numVisible={
                    window.innerWidth < 767
                      ? 1
                      : window.innerWidth < 1280
                        ? 3
                        : 4
                  }
                  numScroll={1}
                  circular
                  autoplayInterval={isAutoplay ? 5000 : 0} // Control autoplay based on state
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  itemTemplate={(service) => (
                    <div className="flex justify-center mr-[4%] ">
                      <ServiceCard
                        key={service.title}
                        image={service.image}
                        title={service.title}
                        description={service.description}
                        onClick={() => handleServiceClick(service)}
                      />
                    </div>
                  )}
                  pt={{
                    previousButton: {
                      className: "scale-[200%] min-w-[4rem] ",
                    },
                    nextButton: { className: "scale-[200%] min-w-[4rem] " },
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
                  className="lg:text-[32px] md:text-[24px] sm:text-[16px]"
                />
                <p className="md:text-[15px] sm:text-xs">
                  We present many guarantees and advantages when you rent a van
                  with us for your trip. Here are some of the advantages that
                  you will get
                </p>
              </div>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-y-[30px] gap-x-[20px]">
                {chooseUs.map((about) => (
                  <div
                    key={about.id}
                    className="flex p-2 md:gap-[10px] sm:gap-[5px]"
                  >
                    <Image
                      src={about.image}
                      width={90}
                      height={90}
                      alt={about.title}
                    />
                    <div className="flex flex-col md:gap-[10px] sm:gap-[5px]">
                      <p className="font-medium md:text-[16px] sm:text-sm">
                        {about.title}
                      </p>
                      <p className="md:text-[14px] sm:text-xs">
                        {about.description}
                      </p>
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
                className="lg:text-[32px] md:text-[24px] sm:text-[16px]"
              />
            </div>
            <div className="grid md:grid-cols-3  lg:gap-[40px] md:gap-[20px]">
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
                className="lg:text-[32px] md:text-[24px] sm:text-[16px]"
              />
              <p className="md:text-[15px] sm:text-xs">
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
