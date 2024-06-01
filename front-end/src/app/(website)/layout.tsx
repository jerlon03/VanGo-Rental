import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';


export default function LandingLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body>
            <Header />
            {children}
            <Footer />
        </body>
      </html>
    );
  }
  