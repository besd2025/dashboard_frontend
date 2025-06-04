"use client";
import { usePathname } from "next/navigation";
import Profile from "../../../../ui/dashboard/hangars/details/profile";
import React, { useEffect, useState } from "react";
import Link from "next/link";

function layout({ children }) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("achats");

  useEffect(() => {
    if (pathname.includes("/cultivator")) {
      setActiveTab("cultivateurs");
    } else {
      setActiveTab("achats");
    }
  }, [pathname]);
  return (
    <div>
      <Profile />;
      <div className="bg-white mt-2 rounded-2xl mb-1">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="w-full">
            <div className="sm:hidden">
              <select
                aria-label="Select a tab"
                className="w-full appearance-none rounded-lg border-none bg-white px-3.5 py-2.5 text-base font-medium text-gray-900 shadow-sm outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-500 focus:ring-0"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
              >
                <option value="cultivateurs">Cultivateurs</option>
                <option value="achats">Achats</option>
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav
                  aria-label="Tabs"
                  className="-mb-px flex items-end gap-x-8"
                >
                  <Link
                    href="/dashboard/hangars/details/cultivator"
                    onClick={() => setActiveTab("cultivateurs")}
                    className={`inline-flex border-b-2 px-1 py-3.5 text-sm font-semibold ${
                      activeTab === "cultivateurs"
                        ? "border-yellow-500 text-yellow-500"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    Cultivateurs
                  </Link>
                  <Link
                    href="/dashboard/hangars/details/achats"
                    onClick={() => setActiveTab("achats")}
                    className={`inline-flex border-b-2 px-1 py-3.5 text-sm font-semibold ${
                      activeTab === "achats"
                        ? "border-yellow-500 text-yellow-500"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    Achats
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default layout;
