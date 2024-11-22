"use client";
import React, { useState, CSSProperties, useEffect } from "react";
import Image from "next/image";
import {
  MdDashboard,
  FaMapLocationDot,
  LuCalendarCheck,
} from "@/components/icons/index";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLogoutContext } from "@/Provider/context/contextProvider";

interface AdminSidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const DriverSidebar: React.FC<AdminSidebarProps> = ({
  isCollapsed,
  toggleSidebar,
}) => {
  const [showMenuText, setShowMenuText] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setShowMenuText(
      pathname === "/driver" ||
        pathname === "/driver/calendar" ||
        pathname === "/driver/assigned-trips"
    );
  }, [pathname]);

  const getNavLinkClass = (path: string): string => {
    return pathname === path ? "text-button font-medium bg-white " : "";
  };
  const getNavLinkStyle = (path: string): CSSProperties => {
    let styles: CSSProperties = {};

    if (pathname === path) {
      styles = {
        color: "#00A8E8",
      };
    }

    return styles;
  };

  return (
    <div
      className={`bg-primaryColor fixed transition-width duration-300 ${
        isCollapsed ? "w-[60px]" : "w-[220px]"
      } md:h-screen md:left-0 bottom-0 w-full h-16 md:w-auto`}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="w-full">
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "justify-between"
            } px-[3%] py-5 border-b-2 md:flex hidden`}
          >
            {!isCollapsed && (
              <div className="flex items-center">
                <Image src="/logo.svg" width={45} height={43} alt="Logo" />
                <p className="font-Poppins text-[16px] text-white ml-2">
                  VanGo Rental
                </p>
              </div>
            )}
            <button onClick={toggleSidebar}>
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
          <div></div>
          <div className="w-full text-white py-[50px] sm:py-[10px] flex gap-[.3rem] cursor-pointer xl:py-[10px] xl:gap-[2px] md:flex-col flex-row md:justify-around sm:justify-evenly">
            <Link href="/driver" className={getNavLinkClass("/driver")}>
              <div className="flex items-center gap-[1rem] w-full hover:bg-white p-2 group">
                <MdDashboard
                  size={20}
                  className={`text-white group-hover:text-button`}
                  style={getNavLinkStyle("/driver")}
                />
                {!isCollapsed && (
                  <p className="font-Poppins group-hover:font-medium text-[16px] group-hover:text-button tracking-[1px] md:block hidden">
                    Dashboard
                  </p>
                )}
                {showMenuText && (pathname === "/driver" || isCollapsed) && (
                  <span className={`md:hidden sm:block`}>Dashboard</span>
                )}
              </div>
            </Link>
            <Link
              href="/driver/calendar"
              className={getNavLinkClass("/driver/calendar")}
            >
              <div className="flex items-center gap-[1rem] w-full hover:bg-white p-2 group">
                <LuCalendarCheck
                  size={20}
                  className={`text-white group-hover:text-button`}
                  style={getNavLinkStyle("/driver/calendar")}
                />
                {!isCollapsed && (
                  <p className="font-Poppins group-hover:font-medium text-[16px] group-hover:text-button tracking-[1px] md:block hidden">
                    Calendar
                  </p>
                )}
                {showMenuText &&
                  (pathname === "/driver/calendar" || isCollapsed) && (
                    <span className={`md:hidden sm:block`}>Calendar</span>
                  )}
              </div>
            </Link>
            <Link
              href="/driver/assigned-trips"
              className={getNavLinkClass("/driver/assigned-trips")}
            >
              <div className="flex items-center gap-[1rem] w-full hover:bg-white p-2 group">
                <FaMapLocationDot
                  size={20}
                  className={`text-white group-hover:text-button`}
                  style={getNavLinkStyle("/driver/assigned-trips")}
                />
                {!isCollapsed && (
                  <p className="font-Poppins group-hover:font-medium text-[16px] group-hover:text-button tracking-[1px] md:block hidden">
                    Assigned Trips
                  </p>
                )}
                {showMenuText &&
                  (pathname === "/driver/assigned-trips" || isCollapsed) && (
                    <span className={`md:hidden sm:block`}>Assigned Trips</span>
                  )}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverSidebar;
