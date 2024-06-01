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
          <div className={`w-full transition-margin duration-300 ${isCollapsed ? 'ml-[60px]' : 'ml-[220px]'}`}>
            <div className="w-full p-[3%]">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default AdminLayout;
