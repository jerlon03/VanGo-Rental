'use client'
import React, { useState } from 'react';
import DriverSidebar from '@/components/driver/DriverSidebar';
import { LogoutProvider } from '@/Provider/context/contextProvider';
import LogoutModal from '@/components/modals/logoutModal';
import NotificationModal from '@/components/modals/notificationModal';
import ProtectedRoute from '@/Provider/protectedRoutes/protectedRoutes';
import { PrimeReactProvider } from 'primereact/api'
import { AuthProvider } from '@/Provider/context/authContext';
import DriverHeader from '@/components/driver/DriverHeader';


const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <html lang="en">
      <body>
        <ProtectedRoute allowedRoles={['driver']}>
          <AuthProvider>
            <LogoutProvider>
              <LogoutModal />
              <PrimeReactProvider >
                <NotificationModal />
                <div className="w-full flex">
                  <DriverSidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
                  <div className={`w-full transition-margin duration-300 px-[2%] pt-[1%] ${isCollapsed ? 'ml-[60px]' : 'ml-[220px]'}`}>
                    <DriverHeader />
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
