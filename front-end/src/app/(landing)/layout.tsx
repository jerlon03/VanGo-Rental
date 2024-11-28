"use client";
import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";

import { useEffect, useState } from "react";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set mounted state to true after the component mounts
  }, []);

  return (
    <>
      {isMounted && (
        <div>
          <Header />
          <div>{children}</div>
          <Footer />
        </div>
      )}
    </>
  );
}
