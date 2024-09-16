'use client'
import React, { useState } from 'react';
import AdminSidebar from "@/components/admin/adminSidebar";
import { LogoutProvider } from '@/Provider/context/contextProvider';
import LogoutModal from '@/components/modals/logoutModal';
import NotificationModal from '@/components/modals/notificationModal';
import ProtectedRoute from '@/Provider/protectedRoutes/protectedRoutes';
import { PrimeReactProvider } from 'primereact/api'
import CustomerSidebar from '@/components/customer/customerSidebar'
import { AuthProvider } from '@/Provider/context/authContext';
import CustomerHeader from '@/components/customer/customerHeader'

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <html lang="en">
      <body>
        <ProtectedRoute allowedRoles={['customer']}>
          <AuthProvider>
            <LogoutProvider>
              <LogoutModal />
              <PrimeReactProvider >
                <NotificationModal />
                <div className="w-full flex">
                  <CustomerSidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
                  <div className={`w-full transition-margin duration-300 px-[2%] py-[1%] ${isCollapsed ? 'ml-[60px]' : 'ml-[220px]'}`}>
                    <CustomerHeader/>
                    {children}
                  </div>
                </div>
              </PrimeReactProvider>
            </LogoutProvider>
          </AuthProvider>
        </ProtectedRoute>
      </body>
    </html>
  );
};

export default AdminLayout;
