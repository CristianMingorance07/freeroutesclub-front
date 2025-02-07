"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (showMenu) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showMenu]);

  const handleCloseMenu = () => {
    if (typeof window !== "undefined" && window.innerWidth > 640) {
      return;
    }

    setIsAnimating(true);
    setShowMenu(false);
    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };

  return (
    <header
      className={`fixed top-0 z-[9000] w-dvw transition duration-300 ${isScrolled ? "border-b border-gray-200 bg-white/80 text-gray-700" : "border-none bg-transparent text-white"} p-4 font-bold`}
    >
      <div className="container flex w-full items-center justify-between sm:mx-auto lg:max-w-6xl">
        <div className="text-xl font-bold">
          <Link href="/">
            <Image
              src="/img/logos/logo-h.png"
              width={100}
              height={100}
              alt="logo"
              className="w-10"
            />
          </Link>
        </div>
        <nav className="sm:w-2/3">
          <ul
            className={`${showMenu ? "animate-slide-in" : isAnimating ? "animate-slide-out" : "hidden"} over absolute left-0 top-0 flex h-dvh w-dvw flex-col items-center justify-center bg-gray-700/90 text-center text-3xl sm:static sm:flex sm:h-auto sm:w-full sm:flex-row sm:gap-4 sm:bg-transparent sm:text-lg`}
          >
            <button
              onClick={handleCloseMenu}
              className="absolute right-7 top-4 text-white sm:hidden"
            >
              <svg
                className="w-10 sm:hidden"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <li className="w-full border-b-2 border-white p-4 sm:border-0 sm:p-0">
              <Link
                onClick={handleCloseMenu}
                href="/trips"
                className={`transition-colors hover:text-black ${isMobile && "text-white"}`}
              >
                Rutas
              </Link>
            </li>
            <li className="w-full border-b-2 border-white p-4 sm:border-0 sm:p-0">
              <Link
                onClick={handleCloseMenu}
                href="/community"
                className={`transition-colors hover:text-black ${isMobile && "text-white"}`}
              >
                Comunidad
              </Link>
            </li>
            <li className="w-full p-4 sm:p-0">
              <Link
                onClick={handleCloseMenu}
                href="/about-us"
                className={`transition-colors hover:text-black ${isMobile && "text-white"}`}
              >
                Quiénes somos
              </Link>
            </li>
          </ul>
          <button
            onClick={() => setShowMenu(true)}
            className="flex h-full items-center justify-center sm:hidden"
          >
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}
