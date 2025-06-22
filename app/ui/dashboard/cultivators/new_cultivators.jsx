"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SalePurchaseTimePeriod from "../../common/home/sale_purchase_period";
import { fetchData } from "../../../_utils/api";

// Import dynamique du composant chart
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function NewCultivatorsCharts() {
  const [timePeriod, setTimePeriod] = useState("days");
  const [state, setState] = useState({
    series: [
      {
        name: "Cafeiculteurs",
        data: [],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: { enabled: false },
        toolbar: { show: false },
      },
      dataLabels: { enabled: true },
      markers: { size: 0 },
      stroke: {
        curve: "smooth",
        width: [4, 3],
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
        xaxis: {
          lines: { show: false },
        },
        yaxis: {
          lines: { show: true },
        },
      },
      xaxis: {
        categories: [],
        axisBorder: { show: false },
        axisTicks: { show: false },
        tooltip: { enabled: false },
      },
    },
  });

  const handleTimePeriodChange = (period) => {
    setTimePeriod(period); // On déclenche juste le useEffect
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

        const results = await fetchData(
          "get",
          `cultivators/statistiques_par_temps?period=${periodParam}`,
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );

        const categories = results?.map((item) => {
          const date = new Date(item?.period + "T00:00:00");
          return `${date.toLocaleDateString("fr-FR", { weekday: "short" })} ${
            item?.period
          }`;
        });

        const data = results?.map((item) => item?.nombre || 0);

        setState((prev) => ({
          ...prev,
          series: [{ name: "Cultivateurs", data }],
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
    <div className="rounded-2xl border border-gray-200 bg-white px-3 pb-2 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-4 sm:pt-4">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Cultivateurs
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Enregistrement des cafeiculteurs
          </p>
          <div className="flex items-start w-full gap-3 sm:justify-end">
            <SalePurchaseTimePeriod
              handleTimePeriodChange={handleTimePeriodChange}
            />
          </div>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="line"
            height={350}
          />
        </div>
      </div>
    </div>
  );
}

export default NewCultivatorsCharts;
