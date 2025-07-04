"use client";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../_utils/api";
import Badge from "../../ui/ui_elements/badge/Badge";
export default function CardsOverview() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getData() {
      try {
        const results = await fetchData("get", "command/stats_commandes/", {
          params: {},
          additionalHeaders: {},
          body: {},
        });

        setData(results);
        console.log(results);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    }
    getData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-18 md:gap-6">
      {/* <!-- Metric Item Start quantity collected --> */}

      <div className="rounded-2xl col-span-6 flex flex-row justify-between border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div>
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            {/* <GroupIcon className="text-gray-800 size-6 dark:text-white/90" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor "
              className="size-6 text-gray-800  dark:text-white/90"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3"
              />
            </svg>
          </div>
          <div className="flex items-end justify-between mt-2">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Qté Approuvée
              </span>
              <h4 className="mt-2 font-semibold text-gray-800 text-xl dark:text-white/90">
                {data?.totaux?.total_quantite_approuvee +
                  data?.totaux?.total_quantite_non_approuvee >=
                1000 ? (
                  <>
                    {(
                      (data?.totaux?.total_quantite_approuvee +
                        data?.totaux?.total_quantite_non_approuvee) /
                      1000
                    ).toLocaleString("de-DE")}{" "}
                    <span className="text-sm">T</span>
                  </>
                ) : (
                  <>
                    {(
                      data?.totaux?.total_quantite_approuvee +
                      data?.totaux?.total_quantite_non_approuvee
                    )?.toLocaleString("fr-FR") || 0}{" "}
                    <span className="text-sm">KG</span>
                  </>
                )}
              </h4>
            </div>
            {/* <Badge color="success">
            <ArrowUpIcon />
            2.0%
          </Badge> */}
          </div>
        </div>
        <div className="w-px bg-gray-200 h-full dark:bg-gray-800"></div>

        <div className="">
          <div className="flex items-end justify-between   rounded-2xl">
            <div>
              <div className="flex flex-row items-center gap-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-8 text-green-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Approuvées
                </span>
              </div>

              <h4 className=" font-semibold text-gray-800 text-lg dark:text-white/90">
                {data?.totaux?.total_quantite_approuvee >= 1000 ? (
                  <>
                    {(
                      data?.totaux?.total_quantite_approuvee / 1000
                    ).toLocaleString("de-DE")}{" "}
                    <span className="text-sm">T</span>
                  </>
                ) : (
                  <>
                    {data?.totaux?.total_quantite_approuvee?.toLocaleString(
                      "fr-FR"
                    ) || 0}{" "}
                    <span className="text-sm">KG</span>
                  </>
                )}
              </h4>
            </div>
          </div>
          <div className="flex items-end justify-between mt-2 rounded-2xl">
            <div>
              <div className="flex flex-row items-center gap-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  En attente
                </span>
              </div>

              <h4 className=" font-semibold text-gray-800 text-lg dark:text-white/90">
                {data?.totaux?.total_quantite_non_approuvee >= 1000 ? (
                  <>
                    {(
                      data?.totaux?.total_quantite_non_approuvee / 1000
                    ).toLocaleString("de-DE")}{" "}
                    <span className="text-sm">T</span>
                  </>
                ) : (
                  <>
                    {data?.totaux?.total_quantite_non_approuvee?.toLocaleString(
                      "fr-FR"
                    ) || 0}{" "}
                    <span className="text-sm">KG</span>
                  </>
                )}
              </h4>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> quantity bought */}

      <div className="rounded-2xl border col-span-4 border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-gray-800  dark:text-white/90"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
            />
          </svg>
        </div>

        <div className="flex items-end justify-between mt-2">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Montant
            </span>

            <h4 className="mt-2 font-bold text-gray-800 text-xl dark:text-white/90">
              {data?.totaux?.total_montant_approuve > 1000000
                ? (
                    data?.totaux?.total_montant_approuve / 1000000
                  ).toLocaleString("de-DE") + " M"
                : data?.totaux?.total_montant_approuve?.toLocaleString("de-DE")}
              <span className="text-sm"> FBU</span>
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
      <div className="rounded-2xl  col-span-5 flex  flex-row justify-between border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div>
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            {/* <GroupIcon className="text-gray-800 size-6 dark:text-white/90" /> */}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 text-yellow-500"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm6-2.438c0-.724.588-1.312 1.313-1.312h4.874c.725 0 1.313.588 1.313 1.313v4.874c0 .725-.588 1.313-1.313 1.313H9.564a1.312 1.312 0 0 1-1.313-1.313V9.564Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex items-end justify-between mt-2 gap-x-3">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Gruau
              </span>
              <h4 className="mt-2 font-semibold text-gray-800 text-xl dark:text-white/90">
                {data?.totaux?.total_montant_approuve >= 1000 ? (
                  <>
                    {(
                      data?.totaux?.total_montant_approuve / 1000
                    ).toLocaleString("de-DE")}{" "}
                    <span className="text-sm">T</span>
                  </>
                ) : (
                  <>
                    {data?.totaux?.total_montant_approuve?.toLocaleString(
                      "fr-FR"
                    ) || 0}{" "}
                    <span className="text-sm">KG</span>
                  </>
                )}
              </h4>
            </div>
            <Badge color="success">
              {/* <ArrowUpIcon /> */}
              2.0%
            </Badge>
          </div>
        </div>
        <div className="w-px bg-gray-200 h-full dark:bg-gray-800"></div>

        <div className="">
          <div className="flex items-end justify-between rounded-2xl">
            <div>
              <div className="flex flex-row items-center gap-x-1 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-slate-500 dark:text-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 2.25a.75.75 0 0 0 0 1.5H3v10.5a3 3 0 0 0 3 3h1.21l-1.172 3.513a.75.75 0 0 0 1.424.474l.329-.987h8.418l.33.987a.75.75 0 0 0 1.422-.474l-1.17-3.513H18a3 3 0 0 0 3-3V3.75h.75a.75.75 0 0 0 0-1.5H2.25Zm6.54 15h6.42l.5 1.5H8.29l.5-1.5Zm8.085-8.995a.75.75 0 1 0-.75-1.299 12.81 12.81 0 0 0-3.558 3.05L11.03 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l2.47-2.47 1.617 1.618a.75.75 0 0 0 1.146-.102 11.312 11.312 0 0 1 3.612-3.321Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Prévision (%)
                </span>
              </div>

              <h4 className=" font-semibold text-gray-800 text-lg dark:text-white/90">
                <span className="inline-flex items-center px-1 py-0.5 justify-center gap-1 rounded font-semibold text-md bg-amber-50  text-yellow-600">
                  2.0%
                </span>
              </h4>
            </div>
          </div>
          <div className="flex items-end justify-between mt-2 rounded-2xl">
            <div>
              <div className="flex flex-row items-center gap-x-1">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Montant
                </span>
              </div>

              <h4 className=" font-semibold text-gray-800 text-lg dark:text-white/90">
                {data?.totaux?.total_montant_approuve > 1000000
                  ? (
                      data?.totaux?.total_montant_approuve / 1000000
                    ).toLocaleString("de-DE") + " M"
                  : data?.totaux?.total_montant_approuve?.toLocaleString(
                      "de-DE"
                    )}
                <span className="text-sm"> FBU</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
