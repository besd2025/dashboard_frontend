import React, { useState } from "react";

const PeriodTab = ({ handleTimePeriodChange }) => {
  const [timePeriod, setTimePeriod] = useState("month");

  const getButtonClass = (period) =>
    timePeriod === period
      ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
      : "text-gray-500 dark:text-gray-400";

  return (
    <div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
      <button
        onClick={() => {
          setTimePeriod("day");
          handleTimePeriodChange("day");
        }}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          "day"
        )}`}
      >
        jours
      </button>

      <button
        onClick={() => {
          setTimePeriod("week");
          handleTimePeriodChange("week");
        }}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          "week"
        )}`}
      >
        semaines
      </button>

      <button
        onClick={() => {
          setTimePeriod("month");
          handleTimePeriodChange("month");
        }}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          "month"
        )}`}
      >
        mois
      </button>
      <button
        onClick={() => {
          setTimePeriod("year");
          handleTimePeriodChange("year");
        }}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          "year"
        )}`}
      >
        années
      </button>
    </div>
  );
};

export default PeriodTab;
