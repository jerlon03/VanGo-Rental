import Image from "next/image";
import Faqs from "@/components/landing/faqs";
import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
   <main>
    <div>
      <Header />
      <div>
      <div>Home Page</div>
    </div>
      {/* <div>{message}</div> */}
      <Faqs />
      <Footer />
    </div>
   </main>
  );
}
