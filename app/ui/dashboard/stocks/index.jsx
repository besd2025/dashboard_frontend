"use client";
import React, { useState, useEffect } from "react";
import TotalStocks from "../../charts/stocks/total_stocks_card";
import StocksChart from "../../charts/stocks/stocks";
import StocksFilter from "./stocks_filter";
import HangarCapacity from "./hangar_capacity";
import OutStocks from "../../charts/stocks/out_stocks";
import MaizeCategoriesCard from "../../charts/stocks/maize_categories_global";
import CategoriesChart from "./categories_chart";
import { fetchData } from "../../../_utils/api";
function Stocks() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getData() {
      try {
        const results = await fetchData(
          "get",
          "stock/details/pertes_totales/",
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );
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
    <div className="grid grid-cols-12 gap-2">
      <div className=" col-span-12 space-y-6 lg:col-span-3">
        <TotalStocks />
      </div>
      <div className=" col-span-12 space-y-6 lg:col-span-3">
        <MaizeCategoriesCard />
      </div>
      <div className=" col-span-12 space-y-6 lg:col-span-3">
        <OutStocks />
      </div>
      <div className=" col-span-12 space-y-6 lg:col-span-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
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
          <div className="flex items-end justify-between mt-2">
            <div>
              <span className="text-sm text-red-500">
                Taux de perte moyen(GAP)
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-2xl dark:text-white/90">
                {data?.pertes_totales} <span className="text-sm">KG</span>
              </h4>
            </div>
          </div>
        </div>
      </div>

      <div className=" col-span-12 lg:col-span-8 space-y-6">
        <StocksChart />
      </div>
      <div className=" col-span-12 lg:col-span-4 space-y-6">
        <CategoriesChart />
      </div>
      {/* <div className=" col-span-12 lg:col-span-4 space-y-6">
        <Loss />
      </div> */}
      <div className=" col-span-12 lg:col-span-12 space-y-6">
        <StocksFilter />
      </div>
      <div className=" col-span-12 lg:col-span-12 space-y-6">
        <HangarCapacity />
      </div>
    </div>
  );
}

export default Stocks;
