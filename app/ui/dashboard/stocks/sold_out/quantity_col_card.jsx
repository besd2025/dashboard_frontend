"use client";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../_utils/api";
function QuantitySolCard() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getData() {
      try {
        const results = await fetchData(
          "get",
          "sorties/somme_totale_sorties/",
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
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
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
            Qté Vendue
          </span>
          <h4 className="mt-2 font-semibold text-gray-800 text-2xl dark:text-white/90">
            {data?.somme_quantity && data?.somme_quantity >= 1000 ? (
              <>
                {(data?.somme_quantity / 1000)?.toLocaleString("fr-FR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) || 0}{" "}
                <span className="text-sm">T</span>
              </>
            ) : (
              <>
                {(data?.somme_quantity &&
                  data?.somme_quantity?.toLocaleString("fr-FR")) ||
                  0}{" "}
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
  );
}

export default QuantitySolCard;
