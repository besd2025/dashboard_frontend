"use client"
import React ,{useState,useEffect}from "react";
import { List, Users } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { fetchData } from "../../../../_utils/api";

const SummaryHeader = ({ summary }) => {

  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const total_enquetes = await fetchData(
          "get",
          `/tous_enquetes/anagessa/enquete/`,
          {
            params: {},
            additionalHeaders: {},
            body: {},
          },
        );       
                const total_hangars = await fetchData(
          "get",
          `/hangars/`,
          {
            params: {},
            additionalHeaders: {},
            body: {},
          },
        ); 

        setData({
          total_enquetes:total_enquetes.count,
          total_hangars:total_hangars.count
        });
      } catch (error) {
        setError(error);
        console.error(error)
      }
    };

    getData();
  }, []);


  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-800/50 ">
        <div className="size-2 rounded-full bg-blue-500 animate-pulse"></div>
        <span className="text-sm font-medium text-gray-500">
          Total Enquêtes:{" "}
          <span className="text-gray-900 dark:text-white font-bold">
            {data.total_enquetes} / {data.total_hangars}
          </span>
        </span>
      </div>
      {/* <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-800/50 ">
        <Users size={20} className="text-gray-700 dark:text-gray-300" />
        <span className="text-sm font-medium text-gray-500">
          Cultivateurs:{" "}
          <span className="text-gray-900 dark:text-white font-bold">
            {summary.total_cultivateurs.toLocaleString()}
          </span>
        </span>
      </div>
       */}
    </div>
  );
};

export default SummaryHeader;
