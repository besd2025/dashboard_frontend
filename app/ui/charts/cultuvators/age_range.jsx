"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { fetchData } from "../../../_utils/api";
// Dynamically import to avoid SSR errors
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function AgeRange() {
  const [state, setState] = React.useState({
    series: [
      {
        name: "",
        data: [],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        dropShadow: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 0,
          horizontal: true,
          distributed: true,
          barHeight: "80%",
          isFunnel: true,
        },
      },
      colors: [
        "#F44F5E",
        "#E55A89",
        "#D863B1",
        "#CA6CD8",
        "#B57BED",
        "#8D95EB",
        "#62ACEA",
        "#4BC3E6",
      ],
      dataLabels: {
        enabled: true,
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":   " + val;
        },
        style: {
          fontSize: "12px",
          colors: ["#fff"],
        },
        dropShadow: {
          enabled: true,
        },
      },

      xaxis: {
        categories: [],
      },
      legend: {
        show: false,
      },
    },
  });
  useEffect(() => {
    async function getData() {
      try {
        const results = await fetchData(
          "get",
          "cultivators/repartition_par_age/",
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );

        const categories = results?.map((item) => item.tranche_age);
        const values = results?.map((item) => item.nombre);

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
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Tranche d'age
        </h3>
      </div>
      <div className="max-w-full   overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2 ">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
}

export default AgeRange;
