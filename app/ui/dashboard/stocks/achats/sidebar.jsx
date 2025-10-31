"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

function Sidebar() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("achats");

  useEffect(() => {
    if (pathname.includes("/achats_analytics")) {
      setActiveTab("details");
    }
    if (pathname.includes("/liste")) {
      setActiveTab("liste");
    }
  }, [pathname]);

  return (
    <div className=" max-w-7xl p-4">
      <div className="w-full  mb-4">
        <nav
          aria-label="Tabs"
          className="flex items-center space-x-1 rounded-xl border bg-gray-50 p-1 dark:bg-gray-800"
        >
          <Link
            href="/dashboard/stocks/achats/liste"
            onClick={() => setActiveTab("liste")}
            className={`relative flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-bold transition-all duration-200 ease-in-out ${
              activeTab === "liste"
                ? "bg-yellow-500 text-white shadow-sm  "
                : "text-gray-600 hover:bg-white/50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-900/50 dark:hover:text-gray-300"
            }`}
          >
            <p className="relative z-10">Liste des achats</p>
          </Link>
          <Link
            href="/dashboard/stocks/achats/achats_analytics"
            onClick={() => setActiveTab("details")}
            className={`relative flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-bold transition-all duration-200 ease-in-out ${
              activeTab === "details"
                ? "bg-yellow-500 text-white shadow-sm "
                : "text-gray-600 hover:bg-white/50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-900/50 dark:hover:text-gray-300"
            }`}
          >
            <span className="relative z-10">Details</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
