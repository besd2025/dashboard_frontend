import React from "react";

const KPICard = ({ title, value, unit, icon: Icon, iconColor, bgColor }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] transition-all hover:shadow-xs">
    <div className="flex items-center justify-between mb-3">
      <div
        className={`flex items-center justify-center w-12 h-12 rounded-xl ${bgColor}`}
      >
        <Icon className={`size-6 ${iconColor}`} />
      </div>
    </div>
    <div>
      <h4 className="mt-1 font-bold text-gray-800 text-2xl dark:text-white/90">
        {value?.toLocaleString("fr-FR")}
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
          {unit}
        </span>
      </h4>
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </span>
    </div>
  </div>
);

export default KPICard;
