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
            <div className="w-full ml-[220px]">
              <div className="w-full p-[3%]">
                {children}
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
  