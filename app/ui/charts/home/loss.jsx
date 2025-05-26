"use client";
import React, { useState } from "react";
//import ReactApexChart from "react-apexcharts";
import ChartTab from "../../common/ChartTab";
import dynamic from "next/dynamic";

// Dynamically import to avoid SSR errors
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function Loss() {
  const dates = [
    [new Date("2025-01-01").getTime(), 1500],
    [new Date("2025-02-02").getTime(), 2800000],
    [new Date("2025-03-03").getTime(), 1700000],
    [new Date("2025-06-04").getTime(), 1000000],
    [new Date("2025-06-05").getTime(), 300000],
    [new Date("2025-09-06").getTime(), 20000],
    [new Date("2025-11-07").getTime(), 3500000],
  ];

  const [state, setState] = useState({
    series: [
      {
        name: "XYZ MOTORS",
        data: dates,
      },
    ],
    options: {
      colors: ["#f43f5e"],
      chart: {
        type: "area",
        stacked: false,
        fontFamily: "Outfit, sans-serif",
        height: 200,
        toolbar: {
          show: false,
        },
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
        // toolbar: {
        //   autoSelected: "zoom",
        // },
      },

      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      //   title: {
      //     text: "Stock Price Movement",
      //     align: "left",
      //   },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.7,
          opacityTo: 0,
        },
        markers: {
          size: 0, // Size of the marker points
          strokeColors: "#fff", // Marker border color
          strokeWidth: 2,
          hover: {
            size: 6, // Marker size on hover
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth", // Define the line style (straight, smooth, or step)
        width: [3, 3], // Line width for each dataset
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
      yaxis: {
        labels: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0);
          },
          style: {
            fontSize: "12px", // Adjust font size for y-axis labels
            colors: ["#6B7280"], // Color of the labels
          },
        },
        // title: {
        //   text: "Price",
        // },
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
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0);
          },
        },
      },
    },
  });

  return (
    <div id="chart">
      <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-0 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-4 sm:pt-4">
        <div className="flex flex-col gap-5  sm:flex-row sm:justify-between">
          <div className="w-full">
            <h3 className="text-md font-semibold text-gray-800 dark:text-white/90">
              Perte/GAP
            </h3>
          </div>
          <div className="flex items-start w-full gap-3 sm:justify-end">
            {/* <ChartTab /> */}
          </div>
        </div>

        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2 ">
            <ReactApexChart
              options={state.options}
              series={state.series}
              type="area"
              height={150}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loss;
