"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PeriodTab from "../../../common/period_tab";
import { fetchData } from "../../../../_utils/api";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function QtyVendChart() {
  const [timePeriod, setTimePeriod] = useState("day");
  const [state, setState] = useState({
    series: [
      {
        name: "Quantités Vendues",
        data: [],
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
        categories: [],
      },
      yaxis: {
        min: 0,
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

        const results = await fetchData(
          "get",
          `sorties/stats_sorties_recents?period=${periodParam}`,
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );

        const categories = results?.map((item) => {
          const date = new Date(item?.period + "T00:00:00");
          return `${date.toLocaleDateString("fr-FR", {
            weekday: "short",
          })} ${item?.period}`;
        });

        const data = results?.map((item) => item?.nombre || 0);

        setState((prev) => ({
          ...prev,
          series: [{ name: "vente", data }],
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
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 w-max ">
          Quantités Vendues
        </h3>
        <div className="flex items-start w-full gap-3 sm:justify-end">
          <PeriodTab handleTimePeriodChange={handleTimePeriodChange} />
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

export default QtyVendChart;
