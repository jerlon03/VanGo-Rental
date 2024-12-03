"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  IoNotifications,
  CgProfile,
  IoIosLogOut,
  IoPerson,
} from "@/components/icons/index";
import Drop from "@/components/admin/drop";
import { useLogoutContext } from "@/Provider/context/contextProvider";
import Link from "next/link";
import { useAuth } from "@/Provider/context/authContext";

interface Props {
  children?: React.ReactNode;
}

const AdminHeader: React.FC<Props> = ({ children }) => {
  const { user, loading } = useAuth();
  const { setIsOpen, setIsNotificationOpen } = useLogoutContext();

  const handleLogoutClick = () => {
    setIsOpen(true);
  };

  const handleNotificationClick = () => {
    setIsNotificationOpen(true);
  };

  return (
    <div className="flex justify-between w-full items-center px-[2%] h-[60px] shadow-md">
      <div className="flex items-center gap-[1rem]">{children}</div>
      <div className="flex gap-[5px] items-center">
        <div className="flex items-center relative z-90 gap-[5px]">
          <div className="border-2 p-1 rounded-full border-blackColor ">
            <IoPerson size={20} className="text-blackColor" />
          </div>
          <div className="font-Poppins">
            {loading ? (
              <p>Loading...</p>
            ) : user ? (
              <div>
                <h1 className="">
                  {user.first_name} {user.last_name}
                </h1>
              </div>
            ) : (
              <p>No user data available</p>
            )}
          </div>
          <Drop>
            <div className="flex flex-col w-[120px] z-80">
              {" "}
              {/* Ensure z-80 is applied here */}
              <div
                onClick={handleLogoutClick}
                className="flex w-full gap-[5px] hover:bg-button p-1 hover:text-button hover:rounded-md cursor-pointer"
              >
                <IoIosLogOut size={20} className="text-primaryColor" />
                <span className="text-[14px] text-black">Log Out</span>
              </div>
            </div>
          </Drop>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
