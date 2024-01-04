"use client";
import { Avatar, Dropdown } from "flowbite-react";
import React, { useState } from "react";
import Image from "next/image";
import { sideData } from "./data/sidebar-data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import books from "../public/books.svg";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  const [showSide, setShowSide] = useState(false);

  const currentPath = usePathname();

  const handleCloseSide = () => setShowSide(false);
  const handleShowSide = () => setShowSide(true);

  function handleMainClick() {
    showSide && handleCloseSide();
  }

  return (
    <div className="antialiased">
      <nav className=" border-b px-4 py-2.5 bg-gray-800 border-gray-700 fixed left-0 right-0 top-0 z-50">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            <button
              data-drawer-target="drawer-navigation"
              data-drawer-toggle="drawer-navigation"
              aria-controls="drawer-navigation"
              className="p-2 mr-2  rounded-lg cursor-pointer md:hidden  focus:bg-gray-700 focus:text-[#F8FAE5] focus:ring-2 0 text-gray-400 hover:bg-gray-700 hover:text-white"
              onClick={showSide ? handleCloseSide : handleShowSide}
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <svg
                aria-hidden="true"
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Toggle sidebar</span>
            </button>
            <Link
              href="/"
              className="flex items-center justify-between mr-4"
            >
              <Image src={books} className=" h-10" alt="book logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                Wun Zinn DB
              </span>
            </Link>
          </div>
        </div>
      </nav>
      <aside
        className={`fixed top-0 left-0 z-40 w-52 h-screen pt-14 transition-transform ${
          showSide ? "" : "-translate-x-full"
        }  border-r md:translate-x-0 bg-gray-800 border-gray-700`}
        aria-label="Sidenav"
        id="drawer-navigation"
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-gray-800">
          <ul className="space-y-2">
            {sideData.map((s) => (
              <li key={s.title}>
                <Link
                  href={s.href ? s.href : "#"}
                  className={`flex items-center p-2 text-base font-medium rounded-lg text-white   hover:bg-gray-700 group  focus:bg-gray-700 focus:text-white focus:ring-2 focus:ring-white
                  ${
                    currentPath === s.href &&
                    "bg-gray-700 text-white ring-2 ring-white"
                  }
                  `}
                >
                  <svg
                    fill="currentColor"
                    viewBox={s.viewBox}
                    className={`w-6 h-6  transition duration-75 text-gray-400 group-hover:text-white group-focus:text-white
                    ${currentPath === s.href && "text-white"}`}
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <path d={s.svg} fill="currentColor"></path>
                  </svg>
                  <span className="ml-3">{s.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <main
        className="p-2 pr-4 md:ml-56 h-auto pt-20 "
        onClick={handleMainClick}
      >
        {children}
      </main>
    </div>
  );
};

export default Navbar;
