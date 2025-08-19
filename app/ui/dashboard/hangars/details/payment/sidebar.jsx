"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Sidebar() {
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col top-0 left-0  w-full lg:w-48   mt-4  lg:mt-0   bg-wh/ite dark:bg-gray-900 dark:border-gray-800 text-gray-900 transition-all duration-300 ease-in-out z-50 bord/er rounded-xl bg-gra/y-200">
      <div className="overflow-y-auto overflow-x-auto lg:overflow-x-hidden flex flex-col justify-between flex-grow">
        <ul className="flex flex-row lg:flex-col py-4 space-y-1">
          <li>
            <Link
              href="/dashboard/hangars/details/payment/cultivators-paid"
              className={`relative flex flex-row items-center h-11 focus:outline-none ${
                isActive("/dashboard/hangars/details/payment/cultivators-paid")
                  ? "bg-brand-50 dark:bg-gray-600 border-l-4 border-green-300 dark:border-green-500"
                  : "hover:bg-brand-50 dark:hover:bg-gray-600 border-l-4 border-transparent hover:border-green-300 dark:hover:border-gray-800"
              } pr-6`}
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-gray-600 dark:text-white/70"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12"
                  />
                </svg>
              </span>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 tracking-wide truncate">
                Payés
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/hangars/details/payment/cultivators-pending"
              className={`relative flex flex-row items-center h-11 focus:outline-none ${
                isActive(
                  "/dashboard/hangars/details/payment/cultivators-pending"
                )
                  ? "bg-brand-50 dark:bg-gray-600 border-l-4 border-green-300 dark:border-green-500"
                  : "hover:bg-brand-50 dark:hover:bg-gray-600 border-l-4 border-transparent hover:border-green-300 dark:hover:border-gray-800"
              } pr-6`}
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-gray-600 dark:text-white/70"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </span>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 tracking-wide truncate">
                En attente
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
