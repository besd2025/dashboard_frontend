"use client";
import React, { useState, useEffect } from "react";
import { fetchData } from "../../../../_utils/api";
export default function CardsOverview({ hangar_id }) {
  const [actats, setAchats] = useState({});
  const [ventes, setVentes] = useState({});
  const [transfers, setTransfers] = useState({});
  const [stock_initial, setStockInitial] = useState({});
  const [cultivateurs, setACultivateurs] = useState({});
  const [error, setError] = useState(null);
  const [qte_blanc_restante, setBlancRestante] = useState(0);
  const [qte_jaune_restante, setJauneRestante] = useState(0);
  useEffect(() => {
    if (!hangar_id) return; // Ne rien faire si l'ID est invalide

    const getData = async () => {
      try {
        const achats = await fetchData(
          "get",
          `hangars/${hangar_id}/get_total_achat_par_hangar`,
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );
        const ventes = await fetchData(
          "get",
          `hangars/${hangar_id}/get_total_vent_par_hangar`,
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );
        const transfert = await fetchData(
          "get",
          `hangars/${hangar_id}/get_quantity_transferer`,
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );
        const stock_initial = await fetchData(
          "get",
          `hangars/${hangar_id}/get_inital_stock_per_hangar`,
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );
        const cultivatuers = await fetchData(
          "get",
          `hangars/${hangar_id}/get_cultivator_number_per_hangar`,
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );

        setAchats(achats);
        setVentes(ventes);
        setTransfers(transfert);
        setStockInitial(stock_initial);
        setACultivateurs(cultivatuers);
        const qte_blanc_restante =
          achats?.total_blanc - (ventes?.total_blanc + transfert?.total_blanc);
        const qte_jaune_restante =
          achats?.total_jaune - (ventes?.total_jaune + transfert?.total_jaune);
        setBlancRestante(qte_blanc_restante);
        setJauneRestante(qte_jaune_restante);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    };

    getData();
  }, [hangar_id]);
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-16 md:gap-4">
      {/* <!-- Metric Item Start quantity collected --> */}
      <div className="rounded-2xl col-span-2 border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-4">
        <div className="flex items-end justify-between mb-2">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Cultivateurs
            </span>
          </div>
        </div>
        <div className="flex">
          {/* <GroupIcon className="text-gray-800 size-6 dark:text-white/90" /> */}
          <div className="flex items-center justify-center p-2 bg-gray-100 rounded-xl dark:bg-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 text-gray-600  dark:text-white/70"
            >
              <path
                fillRule="evenodd"
                d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
                clipRule="evenodd"
              />
              <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
            </svg>
          </div>

          <h4 className="ml-3 font-bold text-gray-800 text-lg dark:text-white/90">
            {cultivateurs?.nbr_cultivators || 0}
          </h4>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
      {/* <!-- Metric Item Start --> */}

      <div className="rounded-2xl col-span-6 flex flex-row justify-between border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-4">
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
                Qté Collectée
              </span>
              <h4 className="mt-2 font-semibold text-gray-800 text-lg dark:text-white/90">
                {actats?.total_blanc + actats?.total_jaune >= 1000 ? (
                  <>
                    {(
                      (actats?.total_blanc + actats?.total_jaune) /
                      1000
                    ).toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    <span className="text-sm">T</span>
                  </>
                ) : (
                  <>
                    {(
                      actats?.total_blanc + actats?.total_jaune
                    )?.toLocaleString("fr-FR") || 0}{" "}
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

              <h4 className=" font-semibold text-gray-800 text-xl dark:text-white/90">
                {actats?.total_blanc >= 1000 ? (
                  <>
                    {(actats?.total_blanc / 1000).toLocaleString("fre-FR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    <span className="text-sm">T</span>
                  </>
                ) : (
                  <>
                    {actats?.total_blanc?.toLocaleString("fr-FR") || 0}{" "}
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

              <h4 className=" font-semibold text-yellow-600 text-xl dark:text-white/90">
                {actats?.total_jaune >= 1000 ? (
                  <>
                    {(actats?.total_jaune / 1000).toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    <span className="text-sm">T</span>
                  </>
                ) : (
                  <>
                    {actats?.total_jaune?.toLocaleString("fr-FR") || 0}{" "}
                    <span className="text-sm">Kg</span>
                  </>
                )}
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Metric Item End --> */}
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl col-span-6 flex flex-row justify-between border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-4">
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
                d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
              />
            </svg>
          </div>
          <div className="flex items-end justify-between mt-2">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Qté Restante
              </span>

              <h4 className="ml-3  font-semibold text-gray-800 text-lg dark:text-white/90">
                {qte_blanc_restante + qte_jaune_restante >= 1000 ? (
                  <>
                    {(
                      (qte_blanc_restante + qte_jaune_restante) /
                      1000
                    ).toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    <span className="text-sm">T</span>
                  </>
                ) : (
                  <>
                    {(qte_blanc_restante + qte_jaune_restante)?.toLocaleString(
                      "fr-FR"
                    ) || 0}{" "}
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

              <h4 className=" font-semibold text-gray-800 text-xl dark:text-white/90">
                {qte_blanc_restante >= 1000 ? (
                  <>
                    {(qte_blanc_restante / 1000).toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    <span className="text-sm">T</span>
                  </>
                ) : (
                  <>
                    {qte_blanc_restante?.toLocaleString("fr-FR") || 0}{" "}
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

              <h4 className=" font-semibold text-yellow-600 text-xl dark:text-white/90">
                {qte_jaune_restante >= 1000 ? (
                  <>
                    {(qte_jaune_restante / 1000)?.toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    <span className="text-sm">T</span>
                  </>
                ) : (
                  <>
                    {qte_jaune_restante?.toLocaleString("fr-FR") || 0}{" "}
                    <span className="text-sm">Kg</span>
                  </>
                )}
              </h4>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl col-span-6 flex flex-row justify-between border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-4">
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
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
          </div>
          <div className="flex items-end justify-between mt-2">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Qté Transferer
              </span>

              <h4 className="ml-3  font-semibold text-gray-800 text-lg dark:text-white/90">
                {transfers.total_blanc + transfers?.total_jaune >= 1000 ? (
                  <>
                    {(
                      (transfers.total_blanc + transfers?.total_jaune) /
                      1000
                    ).toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    <span className="text-sm">T</span>
                  </>
                ) : (
                  <>
                    {(
                      transfers.total_blanc + transfers?.total_jaune
                    )?.toLocaleString("fr-FR") || 0}{" "}
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

              <h4 className=" font-semibold text-gray-800 text-xl dark:text-white/90">
                {transfers?.total_blanc >= 1000 ? (
                  <>
                    {(transfers?.total_blanc / 1000).toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    <span className="text-sm">T</span>
                  </>
                ) : (
                  <>
                    {transfers?.total_blanc?.toLocaleString("fr-FR") || 0}{" "}
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

              <h4 className=" font-semibold text-yellow-600 text-xl dark:text-white/90">
                {transfers?.total_jaune >= 1000 ? (
                  <>
                    {(transfers?.total_jaune / 1000)?.toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    <span className="text-sm">T</span>
                  </>
                ) : (
                  <>
                    {transfers?.total_jaune?.toLocaleString("fr-FR") || 0}{" "}
                    <span className="text-sm">Kg</span>
                  </>
                )}
              </h4>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
            {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl col-span-6 flex flex-row justify-between border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-4">
        <div>
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            {/* <GroupIcon className="text-gray-800 size-6 dark:text-white/90" /> */}

          
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"  className="size-6 text-gray-800  dark:text-white/90">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
</svg>

          </div>
          <div className="flex items-end justify-between mt-2">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Qté Recus
              </span>

              <h4 className="ml-3  font-semibold text-gray-800 text-lg dark:text-white/90">
                {ventes.total_blanc + ventes?.total_jaune >= 1000 ? (
                  <>
                    {(
                      (ventes.total_blanc + ventes?.total_jaune) /
                      1000
                    ).toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    <span className="text-sm">T</span>
                  </>
                ) : (
                  <>
                    {(ventes.total_blanc + ventes?.total_jaune)?.toLocaleString(
                      "fr-FR"
                    ) || 0}{" "}
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

              <h4 className=" font-semibold text-gray-800 text-xl dark:text-white/90">
                {ventes?.total_blanc >= 1000 ? (
                  <>
                    {(ventes?.total_blanc / 1000).toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    <span className="text-sm">T</span>
                  </>
                ) : (
                  <>
                    {ventes?.total_blanc?.toLocaleString("fr-FR") || 0}{" "}
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

              <h4 className=" font-semibold text-yellow-600 text-xl dark:text-white/90">
                {ventes?.total_jaune >= 1000 ? (
                  <>
                    {(ventes?.total_jaune / 1000)?.toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    <span className="text-sm">T</span>
                  </>
                ) : (
                  <>
                    {ventes?.total_jaune?.toLocaleString("fr-FR") || 0}{" "}
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

      <div className="rounded-2xl col-span-5 flex flex-row justify-between border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-4">
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
                Qté Vendue
              </span>

              <h4 className="ml-3  font-semibold text-gray-800 text-lg dark:text-white/90">
                {ventes.total_blanc + ventes?.total_jaune >= 1000 ? (
                  <>
                    {(
                      (ventes.total_blanc + ventes?.total_jaune) /
                      1000
                    ).toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    <span className="text-sm">T</span>
                  </>
                ) : (
                  <>
                    {(ventes.total_blanc + ventes?.total_jaune)?.toLocaleString(
                      "fr-FR"
                    ) || 0}{" "}
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

              <h4 className=" font-semibold text-gray-800 text-xl dark:text-white/90">
                {ventes?.total_blanc >= 1000 ? (
                  <>
                    {(ventes?.total_blanc / 1000).toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    <span className="text-sm">T</span>
                  </>
                ) : (
                  <>
                    {ventes?.total_blanc?.toLocaleString("fr-FR") || 0}{" "}
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

              <h4 className=" font-semibold text-yellow-600 text-xl dark:text-white/90">
                {ventes?.total_jaune >= 1000 ? (
                  <>
                    {(ventes?.total_jaune / 1000)?.toLocaleString("fr-FR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    <span className="text-sm">T</span>
                  </>
                ) : (
                  <>
                    {ventes?.total_jaune?.toLocaleString("fr-FR") || 0}{" "}
                    <span className="text-sm">Kg</span>
                  </>
                )}
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}

      <div className="rounded-2xl col-span-4 border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-4">
        <div className="flex items-end justify-between mb-2">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Montant achats
            </span>
          </div>
          {/* <Badge color="success">
            <ArrowUpIcon />
            2.0%
          </Badge> */}
        </div>
        <div className="flex">
          {/* <GroupIcon className="text-gray-800 size-6 dark:text-white/90" /> */}
          <div className="flex items-center justify-center p-2 bg-gray-100 rounded-xl dark:bg-gray-800">
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
          <h4 className="ml-3 font-bold text-gray-800 text-lg dark:text-white/90">
            {((actats?.total_blanc + actats.total_jaune) * 1700).toLocaleString(
              "fr-FR"
            )}
            <span className="text-sm"> FBU</span>
          </h4>
        </div>
      </div>

      {/* <!-- Metric Item End --> */}
      {/* <!-- Metric Item Start --> */}

      <div className="rounded-2xl col-span-3 border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-4">
        <div className="flex items-end justify-between mb-2">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Montant ventes
            </span>
          </div>
          {/* <Badge color="success">
            <ArrowUpIcon />
            2.0%
          </Badge> */}
        </div>
        <div className="flex">
          {/* <GroupIcon className="text-gray-800 size-6 dark:text-white/90" /> */}
          <div className="flex items-center justify-center p-2 bg-gray-100 rounded-xl dark:bg-gray-800">
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

          <h4 className="ml-3 font-bold text-gray-800 text-lg dark:text-white/90">
            {(
              (ventes.total_blanc + ventes.total_jaune) * 2000 ?? 0
            ).toLocaleString("fr-FR")}
            <span className="text-sm"> FBU</span>
          </h4>
        </div>
      </div>

      {/* <!-- Metric Item End --> */}
      {/* <!-- Metric Item Start --> */}

      <div className="rounded-2xl col-span-4 border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-4">
        <div className="flex items-end justify-between mb-2">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Stock initial
            </span>
          </div>
          {/* <Badge color="success">
            <ArrowUpIcon />
            2.0%
          </Badge> */}
        </div>
        <div className="flex">
          {/* <GroupIcon className="text-gray-800 size-6 dark:text-white/90" /> */}
          <div className="flex items-center justify-center p-2 bg-gray-100 rounded-xl dark:bg-gray-800">
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

          <h4 className="ml-3 font-bold text-gray-800 text-lg dark:text-white/90">
            {stock_initial?.quantite_initial >= 1000 ? (
              <>
                {(stock_initial?.quantite_initial / 1000).toLocaleString(
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
                {stock_initial?.total_initial?.toLocaleString("fr-FR") || 0}{" "}
                <span className="text-sm">Kg</span>
              </>
            )}
          </h4>
        </div>
      </div>

      {/* <!-- Metric Item End --> */}
    </div>
  );
}
