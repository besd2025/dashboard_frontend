import React from "react";
import { List, Users } from "lucide-react";
import { Button } from "../../../../../components/ui/button";

const SummaryHeader = ({ summary }) => {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-800/50 ">
        <div className="size-2 rounded-full bg-blue-500 animate-pulse"></div>
        <span className="text-sm font-medium text-gray-500">
          Total Enquêtes:{" "}
          <span className="text-gray-900 dark:text-white font-bold">
            {summary.total_enquetes} / 395
          </span>
        </span>
      </div>
      <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-800/50 ">
        <Users size={20} className="text-gray-700 dark:text-gray-300" />
        <span className="text-sm font-medium text-gray-500">
          Cultivateurs:{" "}
          <span className="text-gray-900 dark:text-white font-bold">
            {summary.total_cultivateurs.toLocaleString()}
          </span>
        </span>
      </div>
      {/* <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <span className="text-[11px] font-bold text-gray-500 uppercase">
          Appréciation:{" "}
        </span>
        <span
          className={`text-[11px] font-black uppercase ${
            summary.quality.appreciation === "Bon"
              ? "text-emerald-500"
              : summary.quality.appreciation === "Moyen"
                ? "text-amber-500"
                : "text-red-500"
          }`}
        >
          {summary.quality.appreciation}
        </span>
      </div> */}
      <Button className="flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 p-4 rounded-2xl ">
        <List size={20} className="text-gray-700 dark:text-gray-300" />
        <span className="text-sm font-medium text-gray-500">
          Listes des hangars
        </span>
      </Button>
    </div>
  );
};

export default SummaryHeader;
