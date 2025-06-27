"use client";
import React, { useState, useEffect } from "react";
import { fetchData } from "../../../_utils/api";
import { HangarBoldIcon } from "../../icons";
function ActifCultivators() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getData() {
      try {
        const results = await fetchData(
          "get",
          "achats/nombre_cultivateurs_ayant_achete/",
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );

        setData(results);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    }
    getData();
  }, []);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 relative">
      <div className="flex items-center justify-ce/nter bg-gr/ay-100 rounded-xl dark:bg-g/ray-800 ">
        {/* <GroupIcon className="text-gray-800 size-6 dark:text-white/90" /> */}
        <HangarBoldIcon className="size-6 text-gray-600 dark:text-white/70" />

        <h4 className="ml-2 font-semibold text-gray-800 text-2xl dark:text-white/90">
          {data.nombre_cultivateurs_ayant_achete || 0}
        </h4>
        <span
          className={`absolute -left-1 -top-1 z-10 h-4 w-4 rounded-full bg-green-600 `}
        >
          <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"></span>
        </span>
      </div>

      <div className="flex items-end justify-between mt-2">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Hangars actif
          </span>
        </div>
        {/* <Badge color="success">
          <ArrowUpIcon />
          2.0%
        </Badge> */}
      </div>
    </div>
  );
}

export default ActifCultivators;
