import type { Metadata } from "next";
import "./globals.css";
import QueryProviders from "@/Provider/context/tanstackQuery";

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
      <QueryProviders>
        <body >{children}</body>
      </QueryProviders>
     
    </html>
  );
}
