"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { fetchData } from "../../../_utils/api";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function Loss() {
  const [state, setState] = useState({
    series: [],
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
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.7,
          opacityTo: 0,
        },
        markers: {
          size: 0,
          strokeColors: "#fff",
          strokeWidth: 2,
          hover: {
            size: 6,
          },
        },
      },
      stroke: {
        curve: "smooth",
        width: [3],
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
      yaxis: {
        labels: {
          formatter: function (val) {
            return val >= 1000 ? `${(val / 1000).toFixed(2)} t` : `${val} kg`;
          },
          style: {
            fontSize: "12px",
            colors: ["#6B7280"],
          },
        },
      },
      xaxis: {
        type: "datetime",
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
    },
  });

  useEffect(() => {
    async function getData() {
      try {
        const results = await fetchData(
          "get",
          "stock/details/pertes_par_intervalles/",
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );

        // results est un tableau [{ period: string, pertes: number }]
        const seriesData = results?.map((item) => [
          new Date(item.period).getTime(),
          item.pertes || 0,
        ]);

        setState((prev) => ({
          ...prev,
          series: [
            {
              name: "Pertes",
              data: seriesData,
            },
          ],
        }));
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    }

    getData();
  }, []);

  return (
    <div id="chart">
      <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-0 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-4 sm:pt-4">
        <div className="flex flex-col gap-5 sm:flex-row sm:justify-between">
          <div className="w-full">
            <h3 className="text-md font-semibold text-gray-800 dark:text-white/90">
              Perte / GAP
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
