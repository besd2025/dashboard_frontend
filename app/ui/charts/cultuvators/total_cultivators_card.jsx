"use client";
import { ArrowUpIcon } from "../../icons";
import Badge from "../../ui_elements/badge/Badge";
import React, { useState, useEffect } from "react";
import { fetchData } from "../../../_utils/api";
function TotalCultivators() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
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
      }
    }
    getData();
  }, []);
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-center justify-ce/nter bg-gr/ay-100 rounded-xl dark:bg-g/ray-800">
        {/* <GroupIcon className="text-gray-800 size-6 dark:text-white/90" /> */}
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
        <h4 className="ml-2 font-semibold text-gray-800 text-2xl dark:text-white/90">
          {data.total_cultivators || 0}
        </h4>
      </div>

      <div className="flex items-end justify-between mt-2">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Total des cultivateurs
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

export default TotalCultivators;
