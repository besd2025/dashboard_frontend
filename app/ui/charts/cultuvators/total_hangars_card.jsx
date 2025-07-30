"use client";
import { ArrowUpIcon, HangarBoldIcon, HangarIcon } from "../../icons";
import React, { useState, useEffect } from "react";
import { fetchData } from "../../../_utils/api";
function TotalHangarsCard() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const results = await fetchData(
          "get",
          "cultivators/total_cultivators/",
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
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-center justify-ce/nter bg-gr/ay-100 rounded-xl dark:bg-g/ray-800">
        {/* <GroupIcon className="text-gray-800 size-6 dark:text-white/90" /> */}
        <HangarBoldIcon className="size-6 text-gray-600 dark:text-white/70" />
        <h4 className="ml-2 font-semibold text-gray-800 text-2xl dark:text-white/90">
          {loading ? (
            <SkeletonLoader width="80px" height="14px" borderRadius="4px" />
          ) : (
            data.total_cultivators || 0
          )}
        </h4>
      </div>

      <div className="flex items-end justify-between mt-2">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Total des Hangars
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

export default TotalHangarsCard;
