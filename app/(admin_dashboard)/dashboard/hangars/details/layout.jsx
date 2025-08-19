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
    } else if (pathname.includes("payment")) {
      setActiveTab("paiement");
    }
  }, [pathname]);

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
              <Link
                href={`/dashboard/hangars/details/payment/cultivators-paid?hangar_id=${hangarId}`}
                className={`inline-flex border-b-2 px-1 py-3.5 text-sm font-semibold ${
                  activeTab === "paiement"
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
                    d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                  />
                </svg>

                <span className="ml-1">Paiement</span>
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
