import Header from '@/components/landing/header'


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
            </body>
      </html>
    );
  }
  