"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

function Sidebar() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("achats");

  useEffect(() => {
    if (pathname.includes("/en_attente")) {
      setActiveTab("attente");
    }
    if (pathname.includes("/valide")) {
      setActiveTab("valide");
    }
    if (pathname.includes("/results")) {
      setActiveTab("resultats");
    }
    if (pathname.includes("/ventes")) {
      setActiveTab("ventes");
    }
    if (pathname.includes("/history")) {
      setActiveTab("history");
    }
  }, [pathname]);

  return (
    <div className=" max-w-7xl p-4">
      <div className="w-full">
        <nav
          aria-label="Tabs"
          className="flex items-center space-x-1 rounded-xl bg-white/50 p-1 dark:bg-gray-800/50 overflow-x-auto whitespace-nowrap"
        >
          <Link
            href="/dashboard/Brarudi/en_attente"
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
            href="/dashboard/Brarudi/valide"
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
          </Link>
          <Link
            href="/dashboard/Brarudi/results"
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

            <span className="relative z-10">Resultats</span>
            {activeTab === "resultats" && (
              <span className="absolute inset-0 rounded-lg bg-white/50 dark:bg-gray-900/50" />
            )}
          </Link>
          <Link
            href="/dashboard/Brarudi/ventes"
            onClick={() => setActiveTab("ventes")}
            className={`relative flex items-center justify-center  rounded-lg px-4 py-2.5 text-sm font-bold transition-all duration-200 ease-in-out ${
              activeTab === "ventes"
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
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v7.5m2.25-6.466a9.016 9.016 0 0 0-3.461-.203c-.536.072-.974.478-1.021 1.017a4.559 4.559 0 0 0-.018.402c0 .464.336.844.775.994l2.95 1.012c.44.15.775.53.775.994 0 .136-.006.27-.018.402-.047.539-.485.945-1.021 1.017a9.077 9.077 0 0 1-3.461-.203M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>

            <span className="relative z-10">Vente(Residus)</span>
            {activeTab === "ventes" && (
              <span className="absolute inset-0 rounded-lg bg-white/50 dark:bg-gray-900/50" />
            )}
          </Link>
          <Link
            href="/dashboard/Brarudi/history"
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

            <span className="relative z-10">Historique(Ventes)</span>
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
