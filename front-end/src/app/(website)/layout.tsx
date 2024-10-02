import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>

      <body>

        <Header />
        {children}
        <Footer />

      </body>
    </>

  );
}
