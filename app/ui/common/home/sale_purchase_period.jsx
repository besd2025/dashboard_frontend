import React, { useState } from "react";
function SalePurchaseTimePeriod({ handleTimePeriodChange }) {
  // const [selected, setSelected] = useState("optionOne");
  const [timePeriod, setTimePeriod] = useState("months");

  const getButtonClass = (period) =>
    timePeriod === period
      ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
      : "text-gray-500 dark:text-gray-400";

  return (
    <div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
      <button
        onClick={() => {
          setTimePeriod("days");
          handleTimePeriodChange("days");
        }}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          "days"
        )}`}
      >
        jours
      </button>

      <button
        onClick={() => {
          setTimePeriod("weeks");
          handleTimePeriodChange("weeks");
        }}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          "weeks"
        )}`}
      >
        semaines
      </button>

      <button
        onClick={() => {
          setTimePeriod("months");
          handleTimePeriodChange("months");
        }}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          "months"
        )}`}
      >
        mois
      </button>
      <button
        onClick={() => {
          setTimePeriod("years");
          handleTimePeriodChange("years");
        }}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          "years"
        )}`}
      >
        années
      </button>
    </div>
  );
}

export default SalePurchaseTimePeriod;
