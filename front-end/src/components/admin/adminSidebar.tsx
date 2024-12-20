"use client";
import React, { useState, CSSProperties, useEffect } from "react";
import Image from "next/image";
import {
  MdDashboard,
  FaCar,
  AiFillBook,
  FaUserCog,
  GrArticle,
  FiSettings,
  VscFeedback,
} from "@/components/icons/index";
import Link from "next/link";
import { usePathname } from "next/navigation";
import router from "next/router";

interface AdminSidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isCollapsed,
  toggleSidebar,
}) => {
  const pathname = usePathname();

  const getNavLinkClass = (path: string): string => {
    return pathname === path ? "text-yellow font-medium bg-white " : "";
  };
  const getNavLinkStyle = (path: string): CSSProperties => {
    let styles: CSSProperties = {};

    if (pathname === path) {
      styles = {
        color: "F8B946",
      };
    }

    return styles;
  };

  return (
    <div
      className={`bg-primaryColor h-screen fixed left-0 transition-width duration-300 ${isCollapsed ? "w-[60px]" : "w-[220px]"}`}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div
            className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"} px-[3%] py-5 border-b-2`}
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
          <div className="w-full text-white py-[50px] flex flex-col gap-[.3rem] cursor-pointer xl:py-[10px] xl:gap-[2px]">
            <Link href="/dashboard" className={getNavLinkClass("/dashboard")}>
              <div className="flex items-center gap-[1rem] w-full hover:bg-white  p-2 group">
                <MdDashboard
                  size={20}
                  className={`text-yellow group-hover:text-yellow`}
                  style={getNavLinkStyle("/dashboard")}
                />
                {!isCollapsed && (
                  <p className="font-Poppins group-hover:font-medium text-[16px] group-hover:text-yellow tracking-[1px]">
                    Dashboard
                  </p>
                )}
              </div>
            </Link>
            <Link
              href="/dashboard/manage-booking"
              className={getNavLinkClass("/dashboard/manage-booking")}
            >
              <div className="flex items-center gap-[1rem] w-full hover:bg-white  p-2 group">
                <AiFillBook
                  size={20}
                  className={`text-yellow group-hover:text-yellow`}
                  style={getNavLinkStyle("/dashboard/manage-booking")}
                />
                {!isCollapsed && (
                  <p className="font-Poppins group-hover:font-medium text-[16px] group-hover:text-yellow tracking-[1px]">
                    Manage Booking
                  </p>
                )}
              </div>
            </Link>
            <Link
              href="/dashboard/post"
              className={getNavLinkClass("/dashboard/post")}
            >
              <div className="flex items-center gap-[1rem] w-full hover:bg-white  p-2 group">
                <GrArticle
                  size={20}
                  className={`text-yellow group-hover:text-yellow`}
                  style={getNavLinkStyle("/dashboard/post")}
                />
                {!isCollapsed && (
                  <p className="font-Poppins group-hover:font-medium text-[16px] group-hover:text-yellow tracking-[1px]">
                    Blog
                  </p>
                )}
              </div>
            </Link>
            <Link
              href="/dashboard/van-inventory "
              className={getNavLinkClass("/dashboard/van-inventory")}
            >
              <div className="flex items-center gap-[1rem] w-full hover:bg-white  p-2 group">
                <FaCar
                  size={20}
                  className={`text-yellow group-hover:text-yellow`}
                  style={getNavLinkStyle("/dashboard/van-inventory")}
                />
                {!isCollapsed && (
                  <p className="font-Poppins group-hover:font-medium text-[16px] group-hover:text-yellow tracking-[1px]">
                    Van
                  </p>
                )}
              </div>
            </Link>
            <Link
              href="/dashboard/users "
              className={getNavLinkClass("/dashboard/users")}
            >
              <div className="flex items-center gap-[1rem] w-full hover:bg-white  p-2 group">
                <FaUserCog
                  size={20}
                  className={`text-yellow group-hover:text-yellow`}
                  style={getNavLinkStyle("/dashboard/users")}
                />
                {!isCollapsed && (
                  <p className="font-Poppins group-hover:font-medium text-[16px] group-hover:text-yellow tracking-[1px]">
                    Drivers
                  </p>
                )}
              </div>
            </Link>
            <Link
              href="/dashboard/feedback "
              className={getNavLinkClass("/dashboard/feedback")}
            >
              <div className="flex items-center gap-[1rem] w-full hover:bg-white  p-2 group">
                <VscFeedback
                  size={20}
                  className={`text-yellow group-hover:text-yellow`}
                  style={getNavLinkStyle("/dashboard/feedback")}
                />
                {!isCollapsed && (
                  <p className="font-Poppins group-hover:font-medium text-[16px] group-hover:text-yellow tracking-[1px]">
                    Feedback
                  </p>
                )}
              </div>
            </Link>
            <Link
              href="/dashboard/settings "
              className={getNavLinkClass("/dashboard/settings")}
            >
              <div className="flex items-center gap-[1rem] w-full hover:bg-white  p-2 group">
                <FiSettings
                  size={20}
                  className={`text-yellow group-hover:text-yellow`}
                  style={getNavLinkStyle("/dashboard/settings")}
                />
                {!isCollapsed && (
                  <p className="font-Poppins group-hover:font-medium text-[16px] group-hover:text-yellow tracking-[1px]">
                    Settings
                  </p>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
