"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { fetchData } from "../../../_utils/api";
import ChartTab from "../../common/ChartTab";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function StocksChart() {
  const [timePeriod, setTimePeriod] = useState("months");
  const [state, setState] = useState({
    series: [
      {
        name: "stock",
        type: "column",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "line",
        stacked: false,
        fontFamily: "Outfit, sans-serif",
        height: 310,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      stroke: {
        width: [2, 2],
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "39%",
          borderRadius: 4,
          borderRadiusApplication: "end",
        },
      },
      fill: {
        opacity: [0.85],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100],
        },
      },
      labels: [],
      dataLabels: {
        enabled: false,
      },
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      markers: {
        size: 0,
      },
      xaxis: {
        type: "category",
        categories: [],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        title: {
          text: "",
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

  const handleTimePeriodChange = (period) => {
    setTimePeriod(period);
  };

  useEffect(() => {
    async function getData() {
      try {
        const periodParam =
          timePeriod === "days"
            ? "day"
            : timePeriod === "weeks"
            ? "week"
            : timePeriod === "years"
            ? "year"
            : "month";

        const results = await fetchData("get", `stock_evolution?period=${periodParam}`, {
          params: {},
          additionalHeaders: {},
          body: {},
        });

        const categories = results?.map((item) => {
          const date = new Date(item?.period + "T00:00:00");
          return `${date.toLocaleDateString("fr-FR", {
            weekday: "short",
          })} ${item?.period}`;
        });

        const data = results?.map((item) => item?.stock || 0);

        setState((prev) => ({
          ...prev,
          series: [{ name: "stock", data }],
          options: {
            ...prev.options,
            xaxis: {
              ...prev.options.xaxis,
              categories,
            },
          },
        }));
      } catch (error) {
        console.error("Erreur de chargement :", error);
      }
    }

    getData();
  }, [timePeriod]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Stock
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Évolution du stock global
          </p>
        </div>
        <div className="flex items-start w-full gap-3 sm:justify-end">
          <ChartTab handleTimePeriodChange={handleTimePeriodChange} />
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
