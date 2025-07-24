"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { fetchData } from "../../../_utils/api";

// Chargement dynamique de ReactApexChart
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => (
    <p className="text-gray-500 text-sm">Chargement du graphique...</p>
  ),
});

function GenderChart() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [state, setState] = useState({
    series: [0, 0],
    options: {
      chart: {
        width: 300,
        type: "pie",
        fontFamily: "Outfit, sans-serif",
        toolbar: {
          show: false,
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
      labels: ["Hommes", "Femmes"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 280,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    async function getData() {
      try {
        const results = await fetchData("get", "cultivators/stats_genre/", {
          params: {},
          additionalHeaders: {},
          body: {},
        });

        const hommes = results.hommes || 0;
        const femmes = results.femmes || 0;

        setState((prev) => ({
          ...prev,
          series: [hommes, femmes],
        }));
      } catch (err) {
        setError("Erreur lors du chargement des données.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Genre
        </h3>
      </div>

      {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
          {loading ? (
            <div className="py-10 text-center text-gray-500">
              Chargement du graphique...
            </div>
          ) : (
            <>
              <ReactApexChart
                options={state.options}
                series={state.series}
                type="pie"
              />
              <div className="mt-4 text-sm text-gray-700 dark:text-white/80 text-center">
                Hommes : {state.series[0]} | Femmes : {state.series[1]}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default GenderChart;
