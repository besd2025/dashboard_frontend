"use client";
import { usePathname } from "next/navigation";
import Profile from "../../../../ui/provincial/municipals/details/profile";
import React, { useEffect, useState } from "react";
import Link from "next/link";

function layout({ children }) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("achats");

  useEffect(() => {
    if (pathname.includes("/cultivator")) {
      setActiveTab("cultivateurs");
    }
    if (pathname.includes("/achats")) {
      setActiveTab("achats");
    }
    if (pathname.includes("/localisation")) {
      setActiveTab("localisation");
    }
    if (pathname.includes("/synthese")) {
      setActiveTab("synthese");
    }
    if (pathname.includes("/ventes")) {
      setActiveTab("ventes");
    }
  }, [pathname]);
  return (
    <div>
      <Profile />;
      <div className="bg-white dark:bg-white/[0.03]  mt-2 rounded-2xl mb-1">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="w-full">
            {/* <div className="sm:hidden">
              <select
                aria-label="Select a tab"
                className="w-full appearance-none rounded-lg border-none bg-white px-3.5 py-2.5 text-base font-medium text-gray-900 shadow-sm outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-500 focus:ring-0"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
              >
                <option value="cultivateurs">Cultivateurs</option>
                <option value="achats">Achats</option>
              </select>
            </div> */}
            <div className="hidd/en sm:blo/ck block ">
              <div className="">
                <nav
                  aria-label="Tabs"
                  className="-mb-px flex items-end gap-x-8"
                >
                  <Link
                    href="/provincial/municipals/details/cultivator"
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
                    href="/provincial/municipals/details/achats"
                    onClick={() => setActiveTab("achats")}
                    className={`inline-flex border-b-2 px-1 py-3.5 text-sm font-semibold ${
                      activeTab === "achats"
                        ? "border-yellow-500 text-yellow-500"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    Achats
                  </Link>
                  <Link
                    href="/provincial/municipals/details/ventes"
                    onClick={() => setActiveTab("ventes")}
                    className={`inline-flex border-b-2 px-1 py-3.5 text-sm font-semibold ${
                      activeTab === "ventes"
                        ? "border-yellow-500 text-yellow-500"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    Ventes
                  </Link>

                  <Link
                    href="/provincial/municipals/details/synthese"
                    onClick={() => setActiveTab("synthese")}
                    className={`inline-flex border-b-2 px-1 py-3.5 text-sm font-semibold items-center ${
                      activeTab === "synthese"
                        ? "border-yellow-500 text-yellow-500"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
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
                        d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                      />
                    </svg>

                    <span className="ml-1">Synthese</span>
                  </Link>
                  <Link
                    href="/provincial/municipals/details/localisation"
                    onClick={() => setActiveTab("localisation")}
                    className={`inline-flex border-b-2 px-1 py-3.5 text-sm font-semibold items-center ${
                      activeTab === "localisation"
                        ? "border-yellow-500 text-yellow-500"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
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
                        d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
                      />
                    </svg>
                    <span className="ml-1">Localisation</span>
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="shadow-xl">{children}</div>
      </div>
    </div>
  );
}

export default layout;
