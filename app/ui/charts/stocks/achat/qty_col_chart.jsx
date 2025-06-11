"use client";
import React, { useState,useEffect } from "react";
import dynamic from "next/dynamic";
import PeriodTab from "../../../common/period_tab";
import { fetchData } from "../../../../_utils/api";
// Dynamically import to avoid SSR errors
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function QtyColChart() {
    const [data, setData] = useState([]);
            const [error, setError] = useState(null);
    
             useEffect(() => {
              async function getData() {
                try {
          
                  const results = await fetchData('get', 'achats/stats_achats_recents/', {
                    params: {},
                    additionalHeaders: {},
                    body: {}
                  });
          
                  setData(results);
               
                } catch (error) {
                  setError(error);
                  console.error(error);
                }
              }
              getData();
            }, []);
  const [state, setState] = useState({
    series: [
      {
        name: "quantités achetées",
        data: [28, 29, 33, 36, 32, 32, 33, 28, 29, 33, 36, 32],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.1,
        },
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#eab308"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
        width: 4,
      },

      markers: {
        size: 1,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        min: 5,
        max: 40,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 w-max ">
          Quantités achetées
        </h3>
        <div className="flex items-start w-full gap-3 sm:justify-end">
          <PeriodTab />
        </div>
      </div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="line"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default QtyColChart;
