"use client";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../../_utils/api";
export default function CardsOverview() {
  const [data, setData] = useState([]);
  const [quantite_vendu, setQuantiteVendu] = useState(0);
  const [gaptotal, setGapTotat] = useState([]);
  const [quantite_total_achat, setQuantiteTotalAchete] = useState(0);
  const [total_quantite_vendu, setTotalVendu] = useState([]);
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
      <div className="rounded-2xl col-span-4 flex flex-row justify-between border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="">
          <div className="flex items-end justify-between   rounded-2xl">
            <div>
              <div className="flex flex-row items-center gap-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 1.5H5.625c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5Zm6.61 10.936a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 14.47a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                    clipRule="evenodd"
                  />
                  <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                </svg>

                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Livrées
                </span>
              </div>

              <h4 className=" font-semibold text-gray-800 text-lg dark:text-white/90">
                {data?.achats?.achats_blanc >= 1000 ? (
                  <>
                    {(data?.achats?.achats_blanc / 1000).toLocaleString(
                      "de-DE"
                    )}{" "}
                    <span className="text-sm">T</span>
                  </>
                ) : (
                  <>
                    {data?.achats?.achats_blanc?.toLocaleString("fr-FR") || 0}{" "}
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
                  className="size-8 text-red-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Restantes
                </span>
              </div>

              <h4 className=" font-semibold text-gray-800 text-lg dark:text-white/90">
                {data?.achats?.achats_jaune >= 1000 ? (
                  <>
                    {(data?.achats?.achats_jaune / 1000).toLocaleString(
                      "de-DE"
                    )}{" "}
                    <span className="text-sm">T</span>
                  </>
                ) : (
                  <>
                    {data?.achats?.achats_jaune?.toLocaleString("fr-FR") || 0}{" "}
                    <span className="text-sm">KG</span>
                  </>
                )}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
