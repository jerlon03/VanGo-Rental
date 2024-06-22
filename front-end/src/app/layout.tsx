import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VanGO Rental",
  description: "VanGO Rental: Effortless Van Hire at Your Fingertips",

 icons: {
  icon: ['./logo.svg']
 }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
