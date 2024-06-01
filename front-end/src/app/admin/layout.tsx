import AdminSidebar from "@/components/admin/adminSidebar";

export default function AdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body>
          <div className="w-full flex">
            <div className=""><AdminSidebar /></div>
            <div className="w-full">{children}</div>
          </div>
        </body>
      </html>
    );
  }
  