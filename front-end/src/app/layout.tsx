import type { Metadata } from "next";
import "./globals.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "react-loading-skeleton/dist/skeleton.css";
import QueryProviders from "@/Provider/context/tanstackQuery";

export const metadata: Metadata = {
  title: "VanGO Rental",
  description: "VanGO Rental: Effortless Van Hire at Your Fingertips",

  icons: {
    icon: ["./logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryProviders>
        <body>
          <div className="select-none">{children}</div>
        </body>
      </QueryProviders>
    </html>
  );
}
