"use client";
import React, { useEffect, useState } from "react";
import { ArrowUpIcon } from "../../icons";
import Badge from "../../ui_elements/badge/Badge";
import { fetchData } from "../../../_utils/api";
function MaizeCategoriesCard() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getData() {
      try {
        const results = await fetchData("get", "stock_resume/", {
          params: {},
          additionalHeaders: {},
          body: {},
        });
        console.log(results);
        setData(results.stock);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    }
    getData();
  }, []);
  return (
    <div className="">
      <div className="flex items-end justify-between bg-white py-3 px-4 dark:border-gray-800 dark:bg-white/[0.03] rounded-2xl">
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
            {data?.blanc && data?.blanc >= 1000 ? (
              <>
                {(data?.blanc / 1000)?.toLocaleString("de-DE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                <span className="text-sm">T</span>
              </>
            ) : (
              <>
                {(data?.blanc && data?.blanc?.toLocaleString("fr-FR")) || 0}{" "}
                <span className="text-sm">Kg</span>
              </>
            )}
          </h4>
        </div>
      </div>
      <div className="flex items-end justify-between mt-2 bg-white py-3 px-4 dark:border-gray-800 dark:bg-white/[0.03] rounded-2xl">
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
            {data?.jaune && data?.jaune >= 1000 ? (
              <>
                {(data?.jaune / 1000)?.toLocaleString("de-DE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                <span className="text-sm">T</span>
              </>
            ) : (
              <>
                {(data?.jaune && data?.jaune?.toLocaleString("fr-FR")) || 0}{" "}
                <span className="text-sm">Kg</span>
              </>
            )}
          </h4>
        </div>
      </div>
    </div>
  );
}

export default MaizeCategoriesCard;
