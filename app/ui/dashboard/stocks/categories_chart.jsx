"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { fetchData } from "../../../_utils/api";
// Dynamically import to avoid SSR errors
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function CategoriesChart() {
  const [error, setError] = useState(null);

  const [state, setState] = useState({
    series: [],
    options: {
      chart: {
        type: "donut",
      },
      labels: ["Maïs blanc", "Maïs jaune"],
      colors: ["#4ade80", "#fde047"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    async function getData() {
      try {
        const results = await fetchData("get", "stock_resume/", {
          params: {},
          additionalHeaders: {},
          body: {},
        });

        const blanc = results?.stock?.blanc || 0;
        const jaune = results?.stock?.jaune || 0;

        setState((prev) => ({
          ...prev,
          series: [blanc, jaune],
        }));
      } catch (error) {
        setError(error);
        console.error(error);
      }
    }
    getData();
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Categories
        </h3>
      </div>
      <div className="max-w-full   overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2 ">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>
    </div>
  );
}

export default CategoriesChart;
