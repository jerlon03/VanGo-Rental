import AdminSidebar from "@/components/admin/adminSidebar";

export default function AdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body>
            <AdminSidebar />
            {children}
            </body>
      </html>
    );
  }
  