"use client";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";

function layout({ children }) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("achats");
  const [hangarId, setHangarId] = useState(null);

  useEffect(() => {
    const savedId = localStorage.getItem("hangarId");
    if (savedId) {
      setHangarId(savedId);
    }
  }, []);
  useEffect(() => {
    if (pathname.includes("/cultivators-achats")) {
      setActiveTab("cultivators");
    }
    if (pathname.includes("/transfers")) {
      setActiveTab("transfers");
    }
    if (pathname.includes("/ventes")) {
      setActiveTab("ventes");
    }
  }, [pathname]);

  return (
    <div>
      <div className="bg-white dark:bg-white/[0.03]  mt-2 rounded-2xl mb-1">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="w-full">
            <div className="block">
              <div className="overflow-x-auto scrollbar-hide">
                <nav
                  aria-label="Tabs"
                  className="-mb-px flex items-end gap-x-8 min-w-max"
                >
                  <Link
                    href={`/municipal/hangars/reports/details/cultivators-achats?hangar_id=${hangarId}`}
                    onClick={() => setActiveTab("cultivators")}
                    className={`inline-flex border-b-2 px-1 py-3.5 text-sm font-semibold items-center ${
                      activeTab === "cultivators"
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

                    <span className="ml-1">Cultivateurs/Achats</span>
                  </Link>
                  <Link
                    href={`/municipal/hangars/reports/details/ventes?hangar_id=${hangarId}`}
                    onClick={() => setActiveTab("ventes")}
                    className={`inline-flex border-b-2 px-1 py-3.5 text-sm font-semibold items-center ${
                      activeTab === "ventes"
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

                    <span className="ml-1">Ventes</span>
                  </Link>
                  <Link
                    href={`/municipal/hangars/reports/details/transfers?hangar_id=${hangarId}`}
                    onClick={() => setActiveTab("transfers")}
                    className={`inline-flex border-b-2 px-1 py-3.5 text-sm font-semibold items-center ${
                      activeTab === "transfers"
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

                    <span className="ml-1">Transfers</span>
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
