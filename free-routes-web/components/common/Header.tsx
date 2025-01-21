"use client";

import { useState } from "react";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCloseMenu = () => {
    if (window.innerWidth > 640) return;

    setIsAnimating(true);
    setShowMenu(false);
    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white p-4">
      <div className="container flex w-full items-center justify-between sm:mx-auto lg:max-w-7xl">
        <div className="text-xl font-bold">
          <a href="/">Free Routes Club</a>
        </div>
        <nav className="sm:w-2/3">
          <ul
            className={`${showMenu ? "animate-slide-in" : isAnimating ? "animate-slide-out" : "hidden"} absolute left-0 top-0 flex h-dvh w-dvw flex-col items-center justify-center bg-white/90 text-center text-3xl sm:static sm:flex sm:h-auto sm:w-full sm:flex-row sm:gap-4 sm:bg-transparent sm:text-sm`}
          >
            <button
              onClick={handleCloseMenu}
              className="absolute right-7 top-4 sm:hidden"
            >
              <svg
                className="w-10 text-gray-700 sm:hidden"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />{" "}
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <li className="w-full border-b-2 border-gray-700 p-4 sm:border-0 sm:p-0">
              <a
                onClick={handleCloseMenu}
                href="/trips"
                className="text-gray-700 hover:text-black"
              >
                Trips
              </a>
            </li>
            <li className="w-full border-b-2 border-gray-700 p-4 sm:border-0 sm:p-0">
              <a
                onClick={handleCloseMenu}
                href="/courses"
                className="text-gray-700 hover:text-black"
              >
                Courses
              </a>
            </li>
            <li className="w-full border-b-2 border-gray-700 p-4 sm:border-0 sm:p-0">
              <a
                onClick={handleCloseMenu}
                href="/merch"
                className="text-gray-700 hover:text-black"
              >
                Merch
              </a>
            </li>
            <li className="w-full border-b-2 border-gray-700 p-4 sm:border-0 sm:p-0">
              <a
                onClick={handleCloseMenu}
                href="/community"
                className="text-gray-700 hover:text-black"
              >
                Community
              </a>
            </li>
            <li className="w-full p-4 sm:p-0">
              <a
                onClick={handleCloseMenu}
                href="/social-media"
                className="text-gray-700 hover:text-black"
              >
                Social Media
              </a>
            </li>
          </ul>
          <button onClick={() => setShowMenu(true)} className="sm:hidden">
            <svg
              className="h-8 w-8 text-black"
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
