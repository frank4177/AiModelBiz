"use client"

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="container mx-auto px-4 py-5 flex items-center justify-between">
      <div className="logo">
        <Link href="/">
          <div className="cursor-pointer">
            <Image
              src="/images/logo.svg"
              alt="Company Logo"
              width={40}
              height={40}
            />
          </div>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-4 lg:space-x-8 text-white text-[16px] min-w-[50%]  justify-end ">
        <Link href="/models" className="hover:text-blue-300">
          Models
        </Link>
        <Link href="/pricing" className="hover:text-blue-300">
          Pricing
        </Link>
        <Link href="/about" className="hover:text-blue-300">
          About Us
        </Link>
        <Link href="/contact" className="hover:text-blue-300">
          Contact Us
        </Link>
        <Link href="/custom" className="hover:text-blue-300">
          Custom Models
        </Link>
      </nav>

      {/* Desktop Buttons */}
      <div className="hidden md:flex space-x-4">
        <Link href="/login">
          <button className="rounded border border-white text-white hover:bg-white hover:text-navy-900 transition w-[88px] h-[37px] text-[14px]">
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className="rounded bg-white text-[#03061D] hover:bg-blue-100 transition font-medium w-[128px] h-[37px] text-[14px]">
            Get Started Now
          </button>
        </Link>
      </div>

      {/* Hamburger Menu Button */}
      <button 
        className="md:hidden text-white flex flex-col justify-center items-center w-8 h-8"
        onClick={toggleMenu}
      >
        <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-white my-1 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
        <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0  bg-[#04142B] border-t border-gray-800 p-4 !z-50">
          <nav className="flex flex-col space-y-4 text-white">
            <Link href="/models" className="hover:text-blue-300 py-2">
              Models
            </Link>
            <Link href="/pricing" className="hover:text-blue-300 py-2">
              Pricing
            </Link>
            <Link href="/about" className="hover:text-blue-300 py-2">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-blue-300 py-2">
              Contact Us
            </Link>
            <Link href="/custom" className="hover:text-blue-300 py-2">
              Custom Models
            </Link>
            <div className="flex flex-col space-y-3 pt-4 border-t border-gray-700">
              <Link href="/login" className="w-full">
                <button className="rounded border border-white text-white hover:bg-white hover:text-navy-900 transition w-full py-2 text-[14px]">
                  Login
                </button>
              </Link>
              <Link href="/signup" className="w-full">
                <button className="rounded bg-white text-[#03061D] hover:bg-blue-100 transition font-medium w-full py-2 text-[14px]">
                  Get Started Now
                </button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;