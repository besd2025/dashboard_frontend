"use client";
import React from "react";
import ReactApexChart from "react-apexcharts";

function GenderChart() {
  const [state, setState] = React.useState({
    series: [4000, 1000],
    options: {
      chart: {
        width: 380,
        type: "pie",
        fontFamily: "Outfit, sans-serif",
        toolbar: {
          show: false, // Hide chart toolbar
        },
      },
      stroke: {
        colors: ["#fff"],
        width: 8,
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#fff"],
        },
        offsetX: 30,
      },
      labels: ["Homme 4000", "Femme 1000"],
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
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Genre
        </h3>
      </div>
      <div className="max-w-full   overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2 flex justify-center items-center">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="pie"
            width={380}
          />
        </div>
      </div>
    </div>
  );
}

export default GenderChart;
