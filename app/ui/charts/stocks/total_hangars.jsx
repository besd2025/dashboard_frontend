"use client";
import React, { useState, useEffect } from "react";
import { fetchData } from "../../../_utils/api";
import SkeletonLoader from "../../ui_elements/loading/SkeletonLoader";
function TotalHangars() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [hangar_en_activite, setHangarEnActivite] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const results = await fetchData("get", "hangars/total/", {
          params: {},
          additionalHeaders: {},
          body: {},
        });
        const hangar_en_activit = await fetchData("get", "hangar_with_stats/", {
          params: {},
          additionalHeaders: {},
          body: {},
        });
        setData(results);

        setHangarEnActivite(hangar_en_activit);
        console.log(hangar_en_activit);
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
    <>
      <div className="flex flex-row space-x-4 md:space-x-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-c/enter  bg-gr/ay-100 rounded-xl dark:bg-gr/ay-800">
            {/* <GroupIcon className="text-gray-800 size-6 dark:text-white/90" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 text-gray-600  dark:text-white/90"
            >
              <path
                fillRule="evenodd"
                d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 9h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z"
                clipRule="evenodd"
              />
            </svg>
            <h4 className="ml-2 font-semibold text-gray-800 text-2xl dark:text-white/90">
              {hangar_en_activite?.total_hangars || 0}
            </h4>
          </div>

          <div className="flex items-end justify-between mt-2">
            <div className="flex flex-row justify-center items-center">
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
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 relative">
          <div className="flex items-center justify-ce/nter bg-gr/ay-100 rounded-xl dark:bg-g/ray-800 ">
            {/* <GroupIcon className="text-gray-800 size-6 dark:text-white/90" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 text-gray-600  dark:text-white/90"
            >
              <path
                fillRule="evenodd"
                d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 9h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z"
                clipRule="evenodd"
              />
            </svg>
            <h4 className="ml-2 font-semibold text-gray-800 text-2xl dark:text-white/90">
              {" "}
              {loading ? (
                <SkeletonLoader width="80px" height="14px" borderRadius="4px" />
              ) : (
                hangar_en_activite?.hangars_avec_collecteur
              )}
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
                Hangars en activite
              </span>
            </div>
            {/* <Badge color="success">
          <ArrowUpIcon />
          2.0%
        </Badge> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default TotalHangars;
