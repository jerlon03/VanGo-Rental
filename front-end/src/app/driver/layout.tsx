"use client";
import React, { useEffect, useState } from "react";
import DriverSidebar from "@/components/driver/DriverSidebar";
import { LogoutProvider } from "@/Provider/context/contextProvider";
import LogoutModal from "@/components/modals/logoutModal";
import NotificationModal from "@/components/modals/notificationModal";
import ProtectedRoute from "@/Provider/protectedRoutes/protectedRoutes";
import { PrimeReactProvider } from "primereact/api";
import { AuthProvider } from "@/Provider/context/authContext";
import DriverHeader from "@/components/driver/DriverHeader";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // State for mobile view

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call on mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <html lang="en">
      <body className="flex flex-col h-screen">
        <ProtectedRoute allowedRoles={["driver"]}>
          <AuthProvider>
            <LogoutProvider>
              <LogoutModal />
              <PrimeReactProvider>
                <NotificationModal />
                <div className="flex-grow flex flex-col w-full">
                  <div
                    className={`transition-margin duration-300 px-[2%] pt-[1%] ${isCollapsed ? "ml-[60px]" : "ml-[220px]"}`}
                  >
                    <DriverHeader />
                    {children}
                  </div>
                  {isMobile && (
                    <div className="mt-auto">
                      <DriverSidebar
                        isCollapsed={isCollapsed}
                        toggleSidebar={toggleSidebar}
                      />
                    </div>
                  )}
                </div>
                {!isMobile && (
                  <DriverSidebar
                    isCollapsed={isCollapsed}
                    toggleSidebar={toggleSidebar}
                  />
                )}
              </PrimeReactProvider>
            </LogoutProvider>
          </AuthProvider>
        </ProtectedRoute>
      </body>
    </html>
  );
};

export default AdminLayout;
