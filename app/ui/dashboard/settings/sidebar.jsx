"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Sidebar() {
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <div className="flex flex-col top-0 left-0  w-14 hover:w-64 md:w-64   mt-4  lg:mt-0   bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 transition-all duration-300 ease-in-out z-50 border rounded-xl border-gray-200">
      <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          <div className="px-5 hidden md:block">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
                Parametre
              </div>
            </div>
          </div>
          <li>
            <Link
              href="/dashboard/settings/profile"
              className={`relative flex flex-row items-center h-11 focus:outline-none ${
                isActive("/dashboard/settings/profile")
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
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </span>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 tracking-wide truncate">
                Admin
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings/security"
              className={`relative flex flex-row items-center h-11 focus:outline-none ${
                isActive("/dashboard/settings/security")
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
                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                  />
                </svg>
              </span>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 tracking-wide truncate">
                Sécurité
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings/users"
              className={`relative flex flex-row items-center h-11 focus:outline-none ${
                isActive("/dashboard/settings/users")
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
                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                  />
                </svg>
              </span>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 tracking-wide truncate">
                Gestion des utilisateurs
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings/preferences"
              className={`relative flex flex-row items-center h-11 focus:outline-none ${
                isActive("/dashboard/settings/preferences")
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
                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
              </span>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 tracking-wide truncate">
                Préférences
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings/sync"
              className={`relative flex flex-row items-center h-11 focus:outline-none ${
                isActive("/dashboard/settings/sync")
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
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </span>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 tracking-wide truncate">
                Synchronisation
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
