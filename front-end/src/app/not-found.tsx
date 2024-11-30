// pages/404.tsx
"use client";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import useAuth from "@/lib/hooks/useAuth";
import Button from "@/components/Button/button";
import Image from "next/image";

const NofFound: NextPage = () => {
  const router = useRouter();
  const role = useAuth();

  const handleRedirect = () => {
    if (role === "admin") {
      router.push("/dashboard");
    } else if (role === "driver") {
      router.push("/driver");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex h-screen w-screen justify-center items-center flex-col gap-2">
      <Image
        src="/notfound.png"
        width={500}
        height={500}
        alt="Not Found Page"
      />
      <h1 className="text-[20px] font-semibold">404 - Page Not Found</h1>
      <p>Sorry, we couldn&apos;t find the page you were looking for.</p>
      <Button
        name={role ? "Go to Your Dashboard" : "Go to Homepage"}
        backgroundColor="alert"
        width="200px"
        onClick={handleRedirect}
      />
    </div>
  );
};

export default NofFound;
