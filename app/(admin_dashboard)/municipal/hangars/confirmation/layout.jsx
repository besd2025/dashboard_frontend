"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Profile from "../../../../ui/municipal/hangars/details/profile";

function layout({ children }) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("achats");

  useEffect(() => {
    if (pathname.includes("/en_attente")) {
      setActiveTab("attente");
    }
    if (pathname.includes("/approuve")) {
      setActiveTab("approuve");
    }
  }, [pathname]);
  return (
    <div>
      <Profile />;
      <div className="bg-white dark:bg-white/[0.03]  mt-2 rounded-2xl mb-1">
        {/* en attente/approuver  */}
        <div className=" max-w-7xl p-4">
          <div className="w-full">
            <nav
              aria-label="Tabs"
              className="flex items-center space-x-1 rounded-xl bg-gray-100 p-1 dark:bg-gray-800/50"
            >
              <Link
                href="/provincial/municipals/en_attente"
                onClick={() => setActiveTab("attente")}
                className={`relative flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-bold transition-all duration-200 ease-in-out ${
                  activeTab === "attente"
                    ? "bg-white text-green-600 shadow-sm dark:bg-gray-900 dark:text-green-500"
                    : "text-gray-600 hover:bg-white/50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-900/50 dark:hover:text-gray-300"
                }`}
              >
                <span className="relative z-10">En attentes</span>
                {activeTab === "attente" && (
                  <span className="absolute inset-0 rounded-lg bg-white/50 dark:bg-gray-900/50" />
                )}
              </Link>
              <Link
                href="/provincial/municipals/approuve"
                onClick={() => setActiveTab("approuve")}
                className={`relative flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-bold transition-all duration-200 ease-in-out ${
                  activeTab === "approuve"
                    ? "bg-white text-green-600 shadow-sm dark:bg-gray-900 dark:text-green-500"
                    : "text-gray-600 hover:bg-white/50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-900/50 dark:hover:text-gray-300"
                }`}
              >
                <span className="relative z-10">Approuvés</span>
                {activeTab === "approuve" && (
                  <span className="absolute inset-0 rounded-lg bg-white/50 dark:bg-gray-900/50" />
                )}
              </Link>
            </nav>
          </div>
        </div>

        <div className="shadow-xl">{children}</div>
      </div>
    </div>
  );
}

export default layout;
