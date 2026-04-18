import React from "react";

const BreakdownItem = ({ label, total, blanc, jaune }) => (
  <div className="space-y-2 pb-4 border-b border-gray-100 last:border-0 dark:border-gray-800">
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold text-gray-800 dark:text-gray-300">
        {label}
      </span>
      <span className="text-sm font-bold text-gray-900 dark:text-white">
        {total?.toLocaleString()} Kg
      </span>
    </div>
    <div className="flex gap-4">
      <div className="flex items-center gap-2 text-[11px] font-medium text-gray-500">
        <div className="size-2 rounded-full bg-gray-200 border border-gray-300"></div>
        Blanc:{" "}
        <span className="font-bold text-gray-900 dark:text-white">
          {blanc?.toLocaleString()} Kg
        </span>
      </div>
      <div className="flex items-center gap-2 text-[11px] font-medium text-gray-500">
        <div className="size-2 rounded-full bg-yellow-400"></div>
        Jaune:{" "}
        <span className="font-bold text-gray-900 dark:text-white">
          {jaune?.toLocaleString()} Kg
        </span>
      </div>
    </div>
  </div>
);

export default BreakdownItem;
