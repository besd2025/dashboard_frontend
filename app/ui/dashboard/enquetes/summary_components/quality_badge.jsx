import React from "react";

const QualityBadge = ({ label, rate, icon: Icon, color }) => (
  <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 transition-all hover:border-blue-200 dark:hover:border-blue-900/30">
    <div
      className={`p-3 rounded-xl bg-white dark:bg-gray-900 shadow-sm ${color}`}
    >
      <Icon size={20} />
    </div>
    <div className="text-center">
      <span className="text-[10px] font-medium text-gray-400 uppercase block">
        {label}
      </span>
      <span className="text-sm font-bold text-gray-900 dark:text-white">
        {rate.toFixed(0)}{" "}
        <span className="text-xs font-normal text-gray-600 dark:text-gray-400">
          / 42 visités
        </span>
      </span>
    </div>
  </div>
);

export default QualityBadge;
