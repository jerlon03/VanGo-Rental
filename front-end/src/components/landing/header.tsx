'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const getNavLinkClass = (path: string) => {
    return pathname === path
      ? 'font-Poppins text-button'
      : 'font-Poppins text-white transition duration-300 hover:text-button';
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="w-full h-[70px] bg-primaryColor sticky top-0 px-[10%] max-sm:px-4 max-md:px-[2%] max-lg:px-[3%] flex items-center z-30">
      <div className="flex items-center justify-between w-full">
        <div className="flex-shrink-0">
          <Link href="/">
            <Image src="/logo.svg" width={61} height={58} alt="VanGo Rental Logo" />
          </Link>
        </div>
        <ul className="hidden md:flex gap-[10%] max-lg:gap-[10%] justify-center flex-grow">
          <li>
            <Link href="/" className={getNavLinkClass('/')}>
              HOME
            </Link>
          </li>
          <li>
            <Link href="/about-us" className={getNavLinkClass('/about-us')}>
              ABOUT US
            </Link>
          </li>
          <li>
            <Link href="/van" className={getNavLinkClass('/van')}>
              VAN
            </Link>
          </li>
          <li>
            <Link href="/blog" className={getNavLinkClass('/blog')}>
              BLOG
            </Link>
          </li>
          <li>
            <Link href="/contact-us" className={getNavLinkClass('/contact-us')}>
              CONTACT US
            </Link>
          </li>
        </ul>
        <div className="hidden md:flex flex-shrink-0">
          <button className="font-Poppins text-white p-1 px-6 rounded-[5px] bg-button hover:bg-white hover:text-button hover:font-semibold transition duration-300">
            SIGN IN
          </button>
        </div>
        <div className="md:hidden flex items-center">
          <button className="text-white focus:outline-none" onClick={toggleMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="absolute top-[72px] right-0 w-[200px] bg-primaryColor md:hidden flex flex-col items-center transition-all duration-300 ease-in-out bg-opacity-90">
          <ul className="flex flex-col">
            <li className="py-2 text-center w-full" onClick={toggleMenu}>
              <Link href="/" className={getNavLinkClass('/')}>
                HOME
              </Link>
            </li>
            <li className="py-2 text-center w-full" onClick={toggleMenu}>
              <Link href="/about-us" className={getNavLinkClass('/about-us')}>
                ABOUT US
              </Link>
            </li>
            <li className="py-2 text-center w-full" onClick={toggleMenu}>
              <Link href="/van" className={getNavLinkClass('/van')}>
                VAN
              </Link>
            </li>
            <li className="py-2 text-center w-full" onClick={toggleMenu}>
              <Link href="/blog" className={getNavLinkClass('/blog')}>
                BLOG
              </Link>
            </li>
            <li className="py-2 text-center w-full" onClick={toggleMenu}>
              <Link href="/contact-us" className={getNavLinkClass('/contact-us')}>
                CONTACT US
              </Link>
            </li>
          </ul>
          <div className="w-full px-2 flex justify-center">
            <button className="font-Poppins text-white w-full p-1 my-4 rounded-[5px] bg-button hover:bg-white hover:text-button hover:font-semibold transition duration-300">
              SIGN IN
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
