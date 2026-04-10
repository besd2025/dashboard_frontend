"use client";
import React, { useState } from "react";
import PaymentChart from "./payment_chart";
import Link from "next/link";
import { Item } from "@radix-ui/react-select";

function Payment() {
  const liste = [
    {
      title: "Liste de paiement du 06-05-2024 au 12-05-2024",
      date: "Sortie le 06-05-2024",
    },
    {
      title: "Liste de paiement du 06-05-2024 au 12-05-2024",
      date: "Sortie le 06-05-2024",
    },
    {
      title: "Liste de paiement du 06-05-2024 au 12-05-2024",
      date: "Sortie le 06-05-2024",
    },
    {
      title: "Liste de paiement du 06-05-2024 au 12-05-2024",
      date: "Sortie le 06-05-2024",
    },
  ];
  const [viewList, setViewList] = useState(false);
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 md:p-6 relative">
      <div className="grid grid-cols-6 gap-4 ">
        <div className=" col-span-6 space-y-6 lg:col-span-4">
          <PaymentChart />
        </div>
        <div className=" col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-10 ">
            <Link
              href="/dashboard/payment/export_payment"
              className="col-span-2 md:col-span-2 flex gap-4 items-start border border-gray-200 rounded-2xl dark:border-gray-800 p-5 cursor-pointer hover:shadow-lg transition"
            >
              <span className="text-green-600 bg-green-500/10 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <div>
                <h3 className="font-semibold text-lg text-gray-500 dark:text-gray-200">
                  Exporter une liste des paiements
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Exportez les données de paiement au format Excel pour le
                  paiement.
                </p>
              </div>
            </Link>
            <div
              onClick={() => setViewList(!viewList)}
              className="col-span-2 md:col-span-2 flex gap-4 items-start  border border-gray-200 rounded-2xl dark:border-gray-800 p-5 cursor-pointer hover:shadow-lg transition"
            >
              <span className="text-green-600 bg-green-500/10 p-3 rounded-full">
                {!viewList ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path
                      fillRule="evenodd"
                      d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                    <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                    <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                  </svg>
                )}
              </span>
              <div>
                <h3 className="font-semibold text-lg text-gray-500 dark:text-gray-200">
                  Consulter les listes des paiements
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Afficher les listes des paiements déjà effectués par période.
                </p>
              </div>
            </div>
          </div>
        </div>

        {viewList && (
          <div className=" col-span-6 space-y-4 mt-10 transition duration-300">
            <div className="flex items-center justify-between  w-full px-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                Listes des paiements par periode
              </h3>
            </div>
            <div className="flex flex-wrap gap-4 px-6 justify-center text-lg font-serif">
              {liste.map((item, index) => (
                <Link
                  key={index}
                  href="/dashboard/payment/payment_list"
                  className="bg-gray-100 dark:bg-white/[0.03] flex-grow text-black border-l-8 border-green-500 rounded-md px-3 py-2 w-full md:w-5/12 lg:w-3/12 hover:shadow-lg transition"
                >
                  <span className="font-semibold text-sm text-gray-700 dark:text-gray-200 ">
                    {item.title}
                  </span>

                  <div className="text-gray-500 dark:text-gray-400  text-sm pt-1">
                    <span>{item.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;
