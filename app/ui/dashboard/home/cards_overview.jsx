"use client";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../../_utils/api";
import SkeletonLoader from "../../ui_elements/loading/SkeletonLoader";
import Button from "../../ui_elements/button/Button";
import { AlertIcon } from "../../icons";
export default function CardsOverview() {
  const [data, setData] = useState([]);
  const [quantite_vendu, setQuantiteVendu] = useState(0);
  const [gaptotal, setGapTotat] = useState([]);
  const [quantite_total_achat, setQuantiteTotalAchete] = useState(0);
  const [montant_total_achat, setmontantTotalAchete] = useState(0);
  const [total_quantite_vendu, setTotalVendu] = useState([]);
  const [gap_total_en_prix, setGapTotalPrix] = useState(0);
  const [stock_initial, setStockInitial] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const results = await fetchData("get", "stock_resume/", {
          params: {},
          additionalHeaders: {},
          body: {},
        });

        const quantite_vendu_jaune_blanc = await fetchData(
          "get",
          "sorties/somme_totale_sorties/",
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );
        const montant__achat = await fetchData(
          "get",
          "achats/quantite_totale/",
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );
        const pertetotal = await fetchData(
          "get",
          "stock/details/pertes_totales/",
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );
        const prix_achat = await fetchData(
          "get",
          "admin/prices/get_prix_achat/",
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );
        const stock_initial = await fetchData("get", "stock_resume_initial/", {
          params: {},
          additionalHeaders: {},
          body: {},
        });

        setGapTotalPrix(prix_achat?.prix_achat * pertetotal?.pertes_totales);
        setTotalVendu(quantite_vendu_jaune_blanc);
        setGapTotat(pertetotal);
        setData(results);
        setStockInitial(stock_initial);
        setQuantiteVendu(
          results?.sorties?.sorties_blanc + results?.sorties?.sorties_jaune
        );

        setQuantiteTotalAchete(
          results?.achats?.achats_blanc + results?.achats?.achats_jaune
        );
        setmontantTotalAchete(montant__achat);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-18">
      {/* <!-- Metric Item Start quantity collected --> */}

      <div className="rounded-2xl col-span-5 flex flex-row justify-between border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
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
                {loading ? (
                  <SkeletonLoader
                    width="80px"
                    height="14px"
                    borderRadius="4px"
                  />
                ) : (
                  "Qté Collectée"
                )}
              </span>
              <h4 className="mt-2 font-semibold text-gray-800 text-xl dark:text-white/90">
                {loading ? (
                  <SkeletonLoader
                    width="120px"
                    height="24px"
                    borderRadius="4px"
                  />
                ) : quantite_total_achat >= 1000 ? (
                  <>
                    {(quantite_total_achat / 1000).toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    <span className="text-sm">T</span>
                  </>
                ) : (
                  <>
                    {quantite_total_achat?.toLocaleString("fr-FR") || 0}{" "}
                    <span className="text-sm">Kg</span>
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
                  className="size-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Maïs Blanc
                </span>
              </div>

              <h4 className=" font-semibold text-gray-800 text-lg dark:text-white/90">
                {loading ? (
                  <SkeletonLoader
                    width="80px"
                    height="20px"
                    borderRadius="4px"
                  />
                ) : data?.achats?.achats_blanc >= 1000 ? (
                  <>
                    {(data?.achats?.achats_blanc / 1000).toLocaleString(
                      "fr-FR",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}{" "}
                    <span className="text-sm">T</span>
                  </>
                ) : (
                  <>
                    {data?.achats?.achats_blanc?.toLocaleString("fr-FR") || 0}{" "}
                    <span className="text-sm">Kg</span>
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
                  className="size-8 text-yellow-500 "
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Maïs Jaune
                </span>
              </div>

              <h4 className=" font-semibold text-yellow-600 text-lg dark:text-white/90">
                {loading ? (
                  <SkeletonLoader
                    width="80px"
                    height="20px"
                    borderRadius="4px"
                  />
                ) : data?.achats?.achats_jaune >= 1000 ? (
                  <>
                    {(data?.achats?.achats_jaune / 1000).toLocaleString(
                      "fr-FR",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}{" "}
                    <span className="text-sm">T</span>
                  </>
                ) : (
                  <>
                    {data?.achats?.achats_jaune?.toLocaleString("fr-FR") || 0}{" "}
                    <span className="text-sm">Kg</span>
                  </>
                )}
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> quantity bought */}
      <div className="rounded-2xl col-span-5 flex flex-row justify-between border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div>
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            {/* <GroupIcon className="text-gray-800 size-6 dark:text-white/90" /> */}
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
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v7.5m2.25-6.466a9.016 9.016 0 0 0-3.461-.203c-.536.072-.974.478-1.021 1.017a4.559 4.559 0 0 0-.018.402c0 .464.336.844.775.994l2.95 1.012c.44.15.775.53.775.994 0 .136-.006.27-.018.402-.047.539-.485.945-1.021 1.017a9.077 9.077 0 0 1-3.461-.203M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
          </div>

          <div className="flex items-end justify-between mt-2">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {loading ? (
                  <SkeletonLoader
                    width="80px"
                    height="14px"
                    borderRadius="4px"
                  />
                ) : (
                  "Qté Vendue"
                )}
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-xl dark:text-white/90">
                {loading ? (
                  <SkeletonLoader
                    width="120px"
                    height="24px"
                    borderRadius="4px"
                  />
                ) : quantite_vendu >= 1000 ? (
                  <>
                    {(quantite_vendu / 1000).toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    <span className="text-sm">T</span>
                  </>
                ) : (
                  <>
                    {quantite_vendu.toLocaleString("fr-FR") || 0}{" "}
                    <span className="text-sm">Kg</span>
                  </>
                )}
              </h4>
            </div>
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
                  className="size-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Maïs Blanc
                </span>
              </div>

              <h4 className=" font-semibold text-gray-800 text-lg dark:text-white/90">
                {loading ? (
                  <SkeletonLoader
                    width="80px"
                    height="20px"
                    borderRadius="4px"
                  />
                ) : data?.sorties?.sorties_blanc >= 1000 ? (
                  <>
                    {(data?.sorties?.sorties_blanc / 1000).toLocaleString(
                      "fr-FR",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}{" "}
                    <span className="text-sm">T</span>
                  </>
                ) : (
                  <>
                    {data?.sorties?.sorties_blanc?.toLocaleString("fr-FR") || 0}{" "}
                    <span className="text-sm">Kg</span>
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
                  className="size-8 text-yellow-500 "
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Maïs Jaune
                </span>
              </div>

              <h4 className=" font-semibold text-yellow-600 text-lg dark:text-white/90">
                {loading ? (
                  <SkeletonLoader
                    width="80px"
                    height="20px"
                    borderRadius="4px"
                  />
                ) : data?.sorties?.sorties_jaune >= 1000 ? (
                  <>
                    {(data?.sorties?.sorties_jaune / 1000).toLocaleString(
                      "fr-FR",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}{" "}
                    <span className="text-sm">T</span>
                  </>
                ) : (
                  <>
                    {data?.sorties?.sorties_jaune?.toLocaleString("fr-FR") || 0}{" "}
                    <span className="text-sm">Kg</span>
                  </>
                )}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border col-span-5 lg:col-span-4 border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="">
          <div className="flex items-end justify-between   rounded-2xl">
            <div>
              <div className="flex flex-row items-center gap-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8 text-yellow-400  "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Montant
                </span>
              </div>

              <h4 className=" font-bold text-gray-800 text-xl dark:text-white/90">
                {loading ? (
                  <SkeletonLoader
                    width="120px"
                    height="24px"
                    borderRadius="4px"
                  />
                ) : montant_total_achat?.prix_achat ? (
                  montant_total_achat?.prix_achat.toLocaleString("fr-FR")
                ) : (
                  "0"
                )}
                {!loading && <span className="text-sm"> FBU</span>}
              </h4>
            </div>
          </div>
          <div className="flex items-end justify-between mt-2 rounded-2xl">
            <div>
              <div className="flex flex-row items-center gap-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8 text-green-400 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                  />
                </svg>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Revenue
                </span>
              </div>

              <h4 className=" font-bold text-gray-800 text-xl dark:text-white/90">
                {loading ? (
                  <SkeletonLoader
                    width="120px"
                    height="24px"
                    borderRadius="4px"
                  />
                ) : (
                  total_quantite_vendu?.somme_total_price?.toLocaleString(
                    "fr-FR"
                  )
                )}
                {!loading && <span className="text-sm"> FBU</span>}
              </h4>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl col-span-5 lg:col-span-4 border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          {/* <BoxIconLine className="text-gray-800 dark:text-white/90" /> */}
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
              d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
            />
          </svg>
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-red-500">GAP</span>
            <div className="flex flex-row  gap-x-2">
              <h4 className="mt-2 font-bold text-gray-800 text-2xl dark:text-white/90">
                {loading ? (
                  <SkeletonLoader
                    width="80px"
                    height="28px"
                    borderRadius="4px"
                  />
                ) : (
                  <>
                    {gaptotal?.pertes_totales}{" "}
                    <span className="text-sm">KG</span>
                  </>
                )}
              </h4>

              <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

              <h4 className="mt-2 font-bold text-gray-500 text-md dark:text-white/90">
                {loading ? (
                  <SkeletonLoader
                    width="100px"
                    height="20px"
                    borderRadius="4px"
                  />
                ) : (
                  <>
                    {(gap_total_en_prix?.somme_total_price || 0).toLocaleString(
                      "fr-FR"
                    )}
                    <span className="text-sm"> Fbu</span>
                  </>
                )}
              </h4>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
      {/* <!-- Metric Item Start quantity collected --> */}

      <div className="rounded-2xl hid/den col-span-5 lg:col-span-18  border border-gray-200 bg-yellow-50 p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:gap-6  justify-betw/een">
          <div className="col-span-5 lg:col-span-1">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-xl dark:bg-gray-800">
              {/* <GroupIcon className="text-gray-800 size-6 dark:text-white/90" /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 text-gray-800  dark:text-white/90"
              >
                <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                <path
                  fillRule="evenodd"
                  d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087ZM12 10.5a.75.75 0 0 1 .75.75v4.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72v-4.94a.75.75 0 0 1 .75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex items-end justify-between mt-2">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {loading ? (
                    <SkeletonLoader
                      width="80px"
                      height="14px"
                      borderRadius="4px"
                    />
                  ) : (
                    <div>
                      <span className="block text-lg font-semibold text-gray-800 dark:text-white/90">
                        Stock Initial
                      </span>
                      <span className="text-xs">(Avant campagne)</span>
                    </div>
                  )}
                </span>
                <h4 className="mt-2 font-semibold text-gray-800 text-xl dark:text-white/90">
                  {loading ? (
                    <SkeletonLoader
                      width="120px"
                      height="24px"
                      borderRadius="4px"
                    />
                  ) : stock_initial?.total >= 1000 ? (
                    <>
                      {(stock_initial?.total / 1000).toLocaleString("fr-FR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      <span className="text-sm">T</span>
                    </>
                  ) : (
                    <>
                      {stock_initial?.total?.toLocaleString("fr-FR") || 0}{" "}
                      <span className="text-sm">Kg</span>
                    </>
                  )}
                </h4>
              </div>
            </div>
            {/* alert information */}
            <div className="mt-3 flex flex-row items-center gap-x-2 bo/rder-2 border-red-500/70  rounded-lg overflow-hidden bg-red-100/80 dark:bg-red-900/30 ">
              <div className="bg-black/80  dark:border-gray-800 p-1">
                <span className="relative block h-10 rounded-full z-1 w-10 ">
                  <AlertIcon className="size-full text-red-500" />
                  <span
                    className={`absolute right-0 top-0.5 z-10 h-2.5 w-2.5 rounded-full bg-red-400 flex`}
                  >
                    <span className="absolute inline-flex w-full h-full bg-red-300 rounded-full opacity-75 animate-ping"></span>
                  </span>
                </span>
              </div>

              <span className="">
                <span className="block space-x-1  text-sm text-red-600 dark:text-red-400 ">
                  <span>Stock Initial à être confirmé par ANAGESSA</span>
                </span>
              </span>
            </div>
          </div>
          <div className="lg:col-span-1 lg:w-px h-px bg-gray-200 w-full lg:h-full dark:bg-gray-800"></div>
          <div className="col-span-5 lg:col-span-1 flex flex-col gap-y-4">
            <div className="HZ flex items-end justify-between   rounded-2xl">
              <div>
                <div className="flex flex-row items-center gap-x-1 mb-2 ">
                  <div className="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6 text-gray-800  dark:text-white/90"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 9h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  <span className="text-gray-800 text-sm dark:text-white/90 font-semibold">
                    Hangar zonale
                  </span>
                </div>

                <h4 className=" font-semibold text-gray-800 text-sm dark:text-white/90">
                  {loading ? (
                    <SkeletonLoader
                      width="80px"
                      height="20px"
                      borderRadius="4px"
                    />
                  ) : (
                    <>
                      {" "}
                      <div className="flex flex-row gap-x-3">
                        <div>
                          <span className=" text-gray-500 dark:text-gray-400">
                            QB :{" "}
                          </span>
                          {stock_initial?.blanc >= 1000 ? (
                            <>
                              {(stock_initial?.blanc / 1000).toLocaleString(
                                "fr-FR",
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}{" "}
                              <span className="text-sm">T</span>
                            </>
                          ) : (
                            <>
                              {stock_initial?.blanc?.toLocaleString("fr-FR") ||
                                0}{" "}
                              <span className="text-sm">Kg</span>
                            </>
                          )}
                        </div>
                        <div className="w-px bg-yellow-600  h-6 dark:bg-gray-800"></div>
                        <div>
                          <span className=" text-gray-500 dark:text-gray-400">
                            QJ :{" "}
                          </span>
                          {stock_initial?.blanc >= 1000 ? (
                            <>
                              {(stock_initial?.blanc / 1000).toLocaleString(
                                "fr-FR",
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}{" "}
                              <span className="text-sm">T</span>
                            </>
                          ) : (
                            <>
                              {stock_initial?.blanc?.toLocaleString("fr-FR") ||
                                0}{" "}
                              <span className="text-sm">Kg</span>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </h4>
              </div>
            </div>
            <div className="HDZ flex items-end justify-between   rounded-2xl">
              <div>
                <div className="flex flex-row items-center gap-x-1 mb-2 ">
                  <div className="flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6 text-gray-800  dark:text-white/90"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5H15v-18a.75.75 0 0 0 0-1.5H3ZM6.75 19.5v-2.25a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 0 1.5h-.75A.75.75 0 0 1 6 6.75ZM6.75 9a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM6 12.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 6a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75Zm-.75 3.75A.75.75 0 0 1 10.5 9h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 12a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM16.5 6.75v15h5.25a.75.75 0 0 0 0-1.5H21v-12a.75.75 0 0 0 0-1.5h-4.5Zm1.5 4.5a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 2.25a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75h-.008ZM18 17.25a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  <span className="text-gray-800 text-sm dark:text-white/90 font-semibold">
                    Hangar de desengorgement
                  </span>
                </div>

                <h4 className=" font-semibold text-gray-800 text-sm dark:text-white/90">
                  {loading ? (
                    <SkeletonLoader
                      width="80px"
                      height="20px"
                      borderRadius="4px"
                    />
                  ) : (
                    <>
                      {" "}
                      <div className="flex flex-row gap-x-3">
                        <div>
                          <span className=" text-gray-500 dark:text-gray-400">
                            QB :{" "}
                          </span>
                          {stock_initial?.blanc >= 1000 ? (
                            <>
                              {(stock_initial?.blanc / 1000).toLocaleString(
                                "fr-FR",
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}{" "}
                              <span className="text-sm">T</span>
                            </>
                          ) : (
                            <>
                              {stock_initial?.blanc?.toLocaleString("fr-FR") ||
                                0}{" "}
                              <span className="text-sm">Kg</span>
                            </>
                          )}
                        </div>
                        <div className="w-px bg-yellow-600  h-6 dark:bg-gray-800"></div>
                        <div>
                          <span className=" text-gray-500 dark:text-gray-400">
                            QJ :{" "}
                          </span>
                          {stock_initial?.blanc >= 1000 ? (
                            <>
                              {(stock_initial?.blanc / 1000).toLocaleString(
                                "fr-FR",
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}{" "}
                              <span className="text-sm">T</span>
                            </>
                          ) : (
                            <>
                              {stock_initial?.blanc?.toLocaleString("fr-FR") ||
                                0}{" "}
                              <span className="text-sm">Kg</span>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </h4>
              </div>
            </div>
          </div>
          <div className="col-span-5 lg:col-span-1 ">
            <div className="flex items-end justify-between rounded-2xl ">
              <div>
                <div className="flex flex-row items-center gap-x-1 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-yellow-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-semibold text-gray-800 text-md dark:text-white/90">
                    ANAGESSA
                  </span>
                </div>

                <h4 className=" font-semibold text-gray-800 text-sm dark:text-white/90">
                  {loading ? (
                    <SkeletonLoader
                      width="80px"
                      height="20px"
                      borderRadius="4px"
                    />
                  ) : (
                    <>
                      {" "}
                      <div className="flex flex-row gap-x-3">
                        <div>
                          <span className=" text-gray-500 dark:text-gray-400">
                            QT :{" "}
                          </span>
                          {stock_initial?.blanc >= 1000 ? (
                            <>
                              {(stock_initial?.blanc / 1000).toLocaleString(
                                "fr-FR",
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}{" "}
                              <span className="text-sm">T</span>
                            </>
                          ) : (
                            <>
                              {stock_initial?.blanc?.toLocaleString("fr-FR") ||
                                0}{" "}
                              <span className="text-sm">Kg</span>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </h4>
              </div>
            </div>
            <div className="flex items-end justify-between mt-2 rounded-2xl">
              <div>
                <div className="flex flex-row items-center gap-x-1 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-green-500 "
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-semibold text-gray-800 text-md dark:text-white/90">
                    CIAP
                  </span>
                </div>

                <h4 className=" font-semibold text-gray-800 text-sm dark:text-white/90">
                  {loading ? (
                    <SkeletonLoader
                      width="80px"
                      height="20px"
                      borderRadius="4px"
                    />
                  ) : (
                    <>
                      {" "}
                      <div className="flex flex-row gap-x-3">
                        <div>
                          <span className=" text-gray-500 dark:text-gray-400">
                            QT :{" "}
                          </span>
                          {stock_initial?.blanc >= 1000 ? (
                            <>
                              {(stock_initial?.blanc / 1000).toLocaleString(
                                "fr-FR",
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}{" "}
                              <span className="text-sm">T</span>
                            </>
                          ) : (
                            <>
                              {stock_initial?.blanc?.toLocaleString("fr-FR") ||
                                0}{" "}
                              <span className="text-sm">Kg</span>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </h4>
              </div>
            </div>
          </div>

          <div className="col-span-5 lg:col-span-1 hidden">
            <div className="flex items-end justify-between   rounded-2xl">
              <div>
                <div className="flex flex-row items-center gap-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-8 text-yellow-400  dark:text-white/90"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>

                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Montant stock initial
                  </span>
                </div>

                <h4 className=" font-bold text-gray-800 text-xl dark:text-white/90">
                  {loading ? (
                    <SkeletonLoader
                      width="120px"
                      height="24px"
                      borderRadius="4px"
                    />
                  ) : stock_initial?.montant_total ? (
                    stock_initial?.montant_total?.toLocaleString("fr-FR")
                  ) : (
                    "0"
                  )}
                  {!loading && <span className="text-sm"> FBU</span>}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
