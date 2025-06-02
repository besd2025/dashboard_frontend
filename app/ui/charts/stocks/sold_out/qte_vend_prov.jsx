"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
// Dynamically import to avoid SSR errors
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function QteVendProv() {
  const [state, setState] = useState({
    series: [
      {
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 380,
        toolbar: {
          show: false, // Hide chart toolbar
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: "end",
          barHeight: "100%",
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: "center",
          },
        },
      },
      colors: ["#3b82f6", "#10b981", "#f59e0b"],

      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#fff"],
          fontSize: "17px",
          fontWeight: 500,
        },
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
        },
        offsetX: 0,
        dropShadow: {
          enabled: true,
          top: 0,
          left: 0,
          blur: 3,
          opacity: 0.5,
        },
      },

      stroke: {
        width: 0.5,
        colors: ["#fff"],
      },
      xaxis: {
        categories: [
          "Makamba",
          "Ruyigi",
          "Karusi",
          "Kirundo",
          "Muyinga",
          "Muramvya",
          "Gitega",
          "Mwaro",
          "Kayanza",
          "Bujumbura",
        ],
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
        labels: {
          show: false,
        },
      },

      tooltip: {
        theme: "dark",
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function () {
              return "";
            },
          },
        },
      },
    },
  });
  return (
    <div id="chart">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Ventes par province
          </h3>

          <div className="flex items-start w-full gap-3 sm:justify-end">
            {/* <ChartTab /> */}
          </div>
        </div>

        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2 ">
            <ReactApexChart
              options={state.options}
              series={state.series}
              type="bar"
              height={380}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default QteVendProv;
