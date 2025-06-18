"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SalePurchaseTimePeriod from "../../common/home/sale_purchase_period";
import { fetchData } from "../../../_utils/api";
// Dynamically import to avoid SSR errors
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function NewCultivatorsCharts() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const [state, setState] = React.useState({
    series: [
      {
        name: "Cafeiculteurs",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: true,
      },
      markers: {
        size: 0,
      },
      stroke: {
        curve: "smooth", // Define the line style (straight, smooth, or step)
        width: [4, 3], // Line width for each dataset
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
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
        ],
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
    },
  });

  const handleTimePeriodChange = (period) => {
    setTimePeriod(period);
    const newData = getChartData(period);
    setState((prevState) => ({
      ...prevState,
      series: [
        {
          name: "Achats",
          data: newData.achats,
        },
        {
          name: "Ventes",
          data: newData.ventes,
        },
      ],
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: newData.categories,
        },
      },
    }));
  };
  useEffect(() => {
    async function getData() {
      try {
        const results = await fetchData(
          "get",
          "cultivators/statistiques_par_temps/",
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );

        setData(results);
        console.log(results);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    }
    getData();
  }, []);
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-3 pb-2 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-4 sm:pt-4">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Hangars
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
