"use client";
import React, { useState, useEffect } from "react";
import { ArrowUpIcon } from "../../icons";
import Badge from "../../ui_elements/badge/Badge";
import { fetchData } from "../../../_utils/api";
import SkeletonLoader from "../../ui_elements/loading/SkeletonLoader";
function TotalStocks() {
  const [data, setData] = useState([]);
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
        setData(results.stock);
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
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
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
            Total du stock
          </span>
          <h4 className="mt-2 font-semibold text-gray-800 text-2xl dark:text-white/90">
            {loading ? (
              <SkeletonLoader width="80px" height="14px" borderRadius="4px" />
            ) : data?.total >= 1000 ? (
              <>
                {(data?.total / 1000).toLocaleString("fr-FR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                <span className="text-sm">T</span>
              </>
            ) : (
              <>
                {data?.total?.toLocaleString("fr-FR") || 0}{" "}
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

export default TotalStocks;
