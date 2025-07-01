"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

function Sidebar() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("en_attente");

  useEffect(() => {
    const tabMap = [
      { key: "attente", path: "/en_attente" },
      { key: "valide", path: "/valide" },
      { key: "resultats", path: "/results" },
      { key: "sorties", path: "/sorties" },
      { key: "history", path: "/history" },
      { key: "stocks", path: "/stocks" },
      { key: "orders", path: "/orders" },
    ];
    const found = tabMap.find((tab) => pathname.includes(tab.path));
    if (found) {
      setActiveTab(found.key);
    }
  }, [pathname]);

  return (
    <div className=" max-w-7xl p-4">
      <div className="w-full">
        <nav
          aria-label="Tabs"
          className="flex items-center space-x-1 rounded-xl bg-white/50 p-1 dark:bg-gray-800/50 overflow-x-auto whitespace-nowrap"
        >
          {/* <Link
            href="/brarudi/en_attente"
            onClick={() => setActiveTab("attente")}
            className={`relative flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-bold transition-all duration-200 ease-in-out ${
              activeTab === "attente"
                ? "bg-white text-green-600 shadow-sm dark:bg-gray-900 dark:text-green-500"
                : "text-gray-600 hover:bg-white/50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-900/50 dark:hover:text-gray-300"
            }`}
          >
            <span className="relative z-10">Sorties en attentes</span>
            {activeTab === "attente" && (
              <span className="absolute inset-0 rounded-lg bg-white/50 dark:bg-gray-900/50" />
            )}
          </Link>
          <Link
            href="/brarudi/valide"
            onClick={() => setActiveTab("valide")}
            className={`relative flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-bold transition-all duration-200 ease-in-out ${
              activeTab === "valide"
                ? "bg-white text-green-600 shadow-sm dark:bg-gray-900 dark:text-green-500"
                : "text-gray-600 hover:bg-white/50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-900/50 dark:hover:text-gray-300"
            }`}
          >
            <span className="relative z-10">Sorties validés</span>
            {activeTab === "valide" && (
              <span className="absolute inset-0 rounded-lg bg-white/50 dark:bg-gray-900/50" />
            )}
          </Link> */}
          <Link
            href="/brarudi/stocks"
            onClick={() => setActiveTab("stocks")}
            className={`relative flex items-center justify-center  rounded-lg px-4 py-2.5 text-sm font-bold transition-all duration-200 ease-in-out ${
              activeTab === "stocks"
                ? "bg-white text-green-600 shadow-sm dark:bg-gray-900 dark:text-green-500"
                : "text-gray-600 hover:bg-white/50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-900/50 dark:hover:text-gray-300"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
              />
            </svg>

            <span className="relative z-10">Stocks</span>
            {activeTab === "stocks" && (
              <span className="absolute inset-0 rounded-lg bg-white/50 dark:bg-gray-900/50" />
            )}
          </Link>
          <Link
            href="/brarudi/orders"
            onClick={() => setActiveTab("orders")}
            className={`relative flex items-center justify-center  rounded-lg px-4 py-2.5 text-sm font-bold transition-all duration-200 ease-in-out ${
              activeTab === "orders"
                ? "bg-white text-green-600 shadow-sm dark:bg-gray-900 dark:text-green-500"
                : "text-gray-600 hover:bg-white/50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-900/50 dark:hover:text-gray-300"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
              />
            </svg>

            <span className="relative z-10">Commandes</span>
            {activeTab === "orders" && (
              <span className="absolute inset-0 rounded-lg bg-white/50 dark:bg-gray-900/50" />
            )}
          </Link>
          <Link
            href="/brarudi/sorties"
            onClick={() => setActiveTab("sorties")}
            className={`relative flex items-center justify-center  rounded-lg px-4 py-2.5 text-sm font-bold transition-all duration-200 ease-in-out ${
              activeTab === "sorties"
                ? "bg-white text-green-600 shadow-sm dark:bg-gray-900 dark:text-green-500"
                : "text-gray-600 hover:bg-white/50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-900/50 dark:hover:text-gray-300"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>

            <span className="relative z-10">Resultats(UT)</span>
            {activeTab === "sorties" && (
              <span className="absolute inset-0 rounded-lg bg-white/50 dark:bg-gray-900/50" />
            )}
          </Link>
          <Link
            href="/brarudi/results"
            onClick={() => setActiveTab("resultats")}
            className={`relative flex items-center justify-center space-x-1 rounded-lg px-4 py-2.5 text-sm font-bold transition-all duration-200 ease-in-out ${
              activeTab === "resultats"
                ? "bg-white text-green-600 shadow-sm dark:bg-gray-900 dark:text-green-500"
                : "text-gray-600 hover:bg-white/50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-900/50 dark:hover:text-gray-300"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>

            <span className="relative z-10">Retour</span>
            {activeTab === "resultats" && (
              <span className="absolute inset-0 rounded-lg bg-white/50 dark:bg-gray-900/50" />
            )}
          </Link>

          <Link
            href="/brarudi/history"
            onClick={() => setActiveTab("history")}
            className={`relative flex items-center justify-center  rounded-lg px-4 py-2.5 text-sm font-bold transition-all duration-200 ease-in-out ${
              activeTab === "history"
                ? "bg-white text-green-600 shadow-sm dark:bg-gray-900 dark:text-green-500"
                : "text-gray-600 hover:bg-white/50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-900/50 dark:hover:text-gray-300"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>

            <span className="relative z-10">Historique(sorties)</span>
            {activeTab === "history" && (
              <span className="absolute inset-0 rounded-lg bg-white/50 dark:bg-gray-900/50" />
            )}
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
