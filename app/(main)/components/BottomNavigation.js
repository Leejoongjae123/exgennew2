"use client";
// components/BottomNavigationBar.js
import Image from "next/image";
import { FaPen } from "react-icons/fa";
import { RiHome6Fill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
export default function BottomNavigationBar() {
  const router = useRouter();

  return (
    <div className="fixed z-50 w-[90vw] h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-2 left-1/2 dark:bg-gray-700 dark:border-gray-600 shadow-md md:hidden">
      <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
        <button
          data-tooltip-target="tooltip-home"
          type="button"
          onClick={() => router.push("/")}
          className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <svg
            className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
          </svg>
          <span className="sr-only">Home</span>
        </button>
        <div
          id="tooltip-home"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Home
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>

        <div className="flex items-center justify-center pp5">
          <button
            data-tooltip-target="tooltip-new"
            type="button"
            className="inline-flex items-center justify-center w-10 h-10 font-medium bg-primary rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => router.push("/write")}
          >
            <svg
              className="w-4 h-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
            <span className="sr-only">New item</span>
          </button>
        </div>
        <div
          id="tooltip-new"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Create new item
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>

        <button
          data-tooltip-target="tooltip-profile"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
          onClick={() => router.push("/mypage")}
        >
          <svg
            className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          <span className="sr-only">Profile</span>
        </button>
        <div
          id="tooltip-profile"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Profile
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>
    </div>

    // <nav className="bg-gray-700 text-white fixed bottom-0 w-full block md:hidden z-50">
    //   <ul className="flex justify-around items-center">
    //     <li className="py-2">
    //       <a href="#" className="flex flex-col items-center">
    //         <span>
    //           <RiHome6Fill />
    //         </span>
    //         <span className="text-sm">HOME</span>
    //       </a>
    //     </li>
    //     {/* <li className="py-2">
    //       <a href="#" className="flex flex-col items-center">
    //         <span>🔍</span>
    //         <span className="text-sm">Search</span>
    //       </a>
    //     </li> */}
    //     <li className="py-2">
    //       <a href="#" className="flex flex-col items-center">
    //         <span>
    //           <FaPen />
    //         </span>
    //         <span className="text-sm">ADD</span>
    //       </a>
    //     </li>
    //     <li className="py-2">
    //       <a href="#" className="flex flex-col items-center">
    //         <div className="w-6 h-6 relative rounded-full overflow-hidden">
    //           <Image fill src="/images/avatars/avatar-2.jpg" alt="" />
    //         </div>
    //         <span className="text-sm">MY</span>
    //       </a>
    //     </li>
    //   </ul>
    // </nav>
  );
}
