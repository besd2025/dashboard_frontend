"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { fetchData } from "../../../_utils/api";
// Dynamically import to avoid SSR errors
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function Cultuvators() {
  const [error, setError] = useState(null);

  const [state, setState] = useState({
    series: [
      {
        data: [],
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
            position: "bottom",
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
        categories: [],
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
  useEffect(() => {
    async function getData() {
      try {
        const results = await fetchData(
          "get",
          "cultivators/classement_par_province/",
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );

        const data = results.classement_par_province;

        const categories = data.map((item) => item.province);
        const values = data.map((item) => item.nombre);
        console.log(categories);
        // Mettre à jour le graphique avec les vraies données
        setState((prev) => ({
          ...prev,
          series: [{ data: values }],
          options: {
            ...prev.options,
            xaxis: {
              ...prev.options.xaxis,
              categories: categories,
            },
          },
        }));
      } catch (error) {
        setError(error);
        console.error(error);
      }
    }
    getData();
  }, []);

  return (
    <div id="chart">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Hangars
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

export default Cultuvators;
