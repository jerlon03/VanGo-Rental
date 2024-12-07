"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Container from "./Container";
import { IoMenu, IoCloseSharp } from "react-icons/io5";

import {
  FaFacebook,
  FaInstagramSquare,
  FaPhoneAlt,
  FaTwitter,
  MdEmail,
} from "../icons";

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getNavLinkClass = (path: string) => {
    return pathname === path
      ? " text-websiteBlue border-b-2 border-websiteBlue font-semibold"
      : "font-Poppins text-websiteBlack font-semibold transition duration-300 hover:text-yellow";
  };

  const toggleMenu = () => {
    console.log("Menu toggled");
    setMenuOpen((prev) => !prev);
  };

  const contactDetails = [
    { icon: FaPhoneAlt, text: "+63 9217244169 - Smart" },
    { icon: FaPhoneAlt, text: "+63 9166672391 - Globe" },
    { icon: MdEmail, text: "vango.rental@gmail.com" },
  ];

  const socialMediaIcons = [FaFacebook, FaTwitter, FaInstagramSquare];

  return (
    <div className="w-full">
      <div className="bg-[#f2f2f2]/30 text-[13px] sm:hidden md:block">
        <Container>
          <div className="flex justify-between py-4 text-websiteBlack ">
            <div className="flex gap-4">
              {contactDetails.map(({ icon: Icon, text }, index) => (
                <div className="flex gap-4 items-center" key={index}>
                  <Icon />
                  <p>{text}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-[30px] items-center">
              {socialMediaIcons.map((Icon, index) => (
                <div key={index}>
                  <Icon />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="flex items-center justify-between w-full">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/temporary-logo.png"
                width={100}
                height={58}
                alt="VanGo Rental Logo"
              />
            </Link>
          </div>
          <ul className="hidden md:flex gap-[10%] justify-center flex-grow">
            <li>
              <Link href="/" className={getNavLinkClass("/")}>
                HOME
              </Link>
            </li>
            <li>
              <Link href="/van" className={getNavLinkClass("/van")}>
                VAN
              </Link>
            </li>
            <li>
              <Link href="/blog" className={getNavLinkClass("/blog")}>
                BLOG
              </Link>
            </li>
          </ul>
          {isClient && menuOpen && (
            <div className="absolute top-[40px] right-0 w-[200px] bg-websiteSecondary md:hidden flex flex-col items-center transition-all duration-300 ease-in-out bg-opacity-90 z-50">
              <ul className="flex flex-col text-white">
                {["/", "/van", "/blog"].map((link) => (
                  <li
                    key={link}
                    className="py-2 text-center w-full"
                    onClick={toggleMenu}
                  >
                    <Link href={link} className={getNavLinkClass(link)}>
                      {link.replace("/", "").toUpperCase() || "HOME"}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="sm:block md:hidden flex items-center">
            {isClient && menuOpen ? (
              <IoCloseSharp
                onClick={toggleMenu}
                className="text-[24px] flex justify-end w-full"
              />
            ) : (
              <IoMenu onClick={toggleMenu} className="text-[24px]" />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
