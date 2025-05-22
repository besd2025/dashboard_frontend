"use client";
import React, { useState } from "react";
// import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import ChartTab from "../../../common/ChartTab";
import dynamic from "next/dynamic";

// Dynamically import to avoid SSR errors
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function StocksChart() {
  const [state, setState] = React.useState({
    series: [
      {
        name: "TEAM A",
        type: "column",
        data: [100, 220, 258, 354, 400, 500, 800, 956, 1000, 2000],
      },
      {
        name: "TEAM B",
        type: "area",
        data: [15, 27, 30, 40, 115, 205, 405, 500, 950, 1050],
      },
    ],
    options: {
      chart: {
        type: "line",
        stacked: false,
        fontFamily: "Outfit, sans-serif",
        height: 310,
        toolbar: {
          show: false, // Hide chart toolbar
        },
      },
      stroke: {
        width: [0, 2, 5],
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },

      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100],
        },
      },
      labels: [
        "01/01/2003",
        "02/01/2003",
        "03/01/2003",
        "04/01/2003",
        "05/01/2003",
        "06/01/2003",
        "07/01/2003",
        "08/01/2003",
        "09/01/2003",
        "10/01/2003",
      ],
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "39%",
          borderRadius: 4,
          borderRadiusApplication: "end",
        },
      },
      stroke: {
        curve: "smooth", // Define the line style (straight, smooth, or step)
        width: [2, 2], // Line width for each dataset
      },
      grid: {
        xaxis: {
          lines: {
            show: false, // Hide grid lines on x-axis
          },
        },
        yaxis: {
          lines: {
            show: true, // Show grid lines on y-axis
          },
        },
      },
      markers: {
        size: 0,
      },
      xaxis: {
        type: "datetime",
        axisBorder: {
          show: false, // Hide x-axis border
        },
        axisTicks: {
          show: false, // Hide x-axis ticks
        },
        tooltip: {
          enabled: false, // Disable tooltip for x-axis points
        },
      },
      yaxis: {
        title: {
          text: "", // Remove y-axis title
          style: {
            fontSize: "0px",
          },
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " points";
            }
            return y;
          },
        },
      },
    },
  });

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Stock
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Evolution du stock global
          </p>
        </div>
        <div className="flex items-start w-full gap-3 sm:justify-end">
          <ChartTab />
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="area"
            height={400}
          />
        </div>
      </div>
    </div>
  );
}

export default StocksChart;
