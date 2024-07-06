'use client'
import React, { useState } from 'react';
import AdminSidebar from "@/components/admin/adminSidebar";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <html lang="en">
      <body>
        <div className="w-full flex">
          <AdminSidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
          <div className={`w-full transition-margin duration-300 p-[2%] ${isCollapsed ? 'ml-[60px]' : 'ml-[220px]'}`}>
              {children}
            </div>
        </div>
      </body>
    </html>
  );
};

export default AdminLayout;
