"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PeriodTab from "../../../common/period_tab";
import { fetchData } from "../../../../_utils/api";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function QteVendCategorie() {
  const [timePeriod, setTimePeriod] = useState("day");
  const [state, setState] = useState({
    series: [],
    options: {
      chart: {
        fontFamily: "Outfit, sans-serif",
        height: 310,
        type: "area",
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      fill: {
        type: "gradient",
        gradient: { opacityFrom: 0.7, opacityTo: 0 },
        markers: {
          size: 0,
          strokeColors: "#fff",
          strokeWidth: 2,
          hover: { size: 6 },
        },
      },
      dataLabels: { enabled: false },
      stroke: {
        curve: "smooth",
        width: [3, 3],
      },
      grid: {
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: true } },
      },
      xaxis: {
        type: "category",
        categories: [],
        axisBorder: { show: false },
        axisTicks: { show: false },
        tooltip: { enabled: false },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "12px",
            colors: ["#6B7280"],
          },
        },
        title: {
          text: "",
          style: { fontSize: "0px" },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  });

  const formatCategory = (item, period) => {
    const date = new Date(item?.period + "T00:00:00");
    switch (period) {
      case "day":
        return date.toLocaleDateString("fr-FR", {
          weekday: "short",
          day: "2-digit",
          month: "short",
        });
      case "week":
        return `Semaine ${item?.period || ""}`;
      case "month":
        return date.toLocaleDateString("fr-FR", {
          month: "short",
          year: "numeric",
        });
      case "year":
        return item?.period;
      default:
        return item?.period;
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        const results = await fetchData(
          "get",
          `sorties/stats_sorties_recents?period=${timePeriod}`,
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );

        const categories = results?.map((item) =>
          formatCategory(item, timePeriod)
        );
        const blanc = results?.map((item) => item?.blanc || 0);
        const jaune = results?.map((item) => item?.jaune || 0);

        setState((prev) => ({
          ...prev,
          series: [
            { name: "Blancs", data: blanc },
            { name: "Jaunes", data: jaune },
          ],
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

  const handleTimePeriodChange = (period) => {
    setTimePeriod(period);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 w-max">
          Qté vendue / catégorie
        </h3>
        <div className="flex items-start w-full gap-3 sm:justify-end">
          <PeriodTab handleTimePeriodChange={handleTimePeriodChange} />
        </div>
      </div>

      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
}

export default QteVendCategorie;
