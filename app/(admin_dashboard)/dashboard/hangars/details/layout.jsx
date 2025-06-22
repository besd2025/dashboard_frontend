"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Profile from "../../../../ui/dashboard/hangars/details/profile";
import { HangarProvider } from "../../../../ui/context/DetailContext";

function Layout({ children }) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("achats");
  const [hangarId, setHangarId] = useState(null);

  useEffect(() => {
    const storedHangarId = localStorage.getItem("hangarId");
    setHangarId(storedHangarId);

    if (pathname.includes("/cultivator")) {
      setActiveTab("cultivateurs");
    } else if (pathname.includes("/achats")) {
      setActiveTab("achats");
    } else if (pathname.includes("/localisation")) {
      setActiveTab("localisation");
    } else if (pathname.includes("/transfers")) {
      setActiveTab("transfers");
    } else if (pathname.includes("/receptions")) {
      setActiveTab("receptions");
    }
  }, [pathname]);

  if (!hangarId) return <div>Chargement du hangar...</div>;

  return (
    <HangarProvider hangar_id={hangarId}>
      <div>
        <Profile hangar_id={hangarId} />
        <div className="bg-white dark:bg-white/[0.03] mt-2 rounded-2xl mb-1">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <nav className="-mb-px flex items-end gap-x-8">
              <Link
                href={`/dashboard/hangars/details/cultivator?hangar_id=${hangarId}`}
                className={`inline-flex border-b-2 px-1 py-3.5 text-sm font-semibold ${
                  activeTab === "cultivateurs"
                    ? "border-yellow-500 text-yellow-500"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Cultivateurs
              </Link>
              <Link
                href={`/dashboard/hangars/details/achats?hangar_id=${hangarId}`}
                className={`inline-flex border-b-2 px-1 py-3.5 text-sm font-semibold ${
                  activeTab === "achats"
                    ? "border-yellow-500 text-yellow-500"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Achats
              </Link>
              <Link
                href="/dashboard/hangars/details/transfers"
                onClick={() => setActiveTab("transfers")}
                className={`inline-flex border-b-2 px-1 py-3.5 text-sm font-semibold ${
                  activeTab === "transfers"
                    ? "border-yellow-500 text-yellow-500"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Transfer(désengorgement)
              </Link>
              <Link
                href="/dashboard/hangars/details/receptions"
                onClick={() => setActiveTab("receptions")}
                className={`inline-flex border-b-2 px-1 py-3.5 text-sm font-semibold ${
                  activeTab === "receptions"
                    ? "border-yellow-500 text-yellow-500"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Réception
              </Link>
              <Link
                href={`/dashboard/hangars/details/localisation?hangar_id=${hangarId}`}
                className={`inline-flex border-b-2 px-1 py-3.5 text-sm font-semibold ${
                  activeTab === "localisation"
                    ? "border-yellow-500 text-yellow-500"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
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
          <div className="shadow-xl">{children}</div>
        </div>
      </div>
    </HangarProvider>
  );
}

export default Layout;
