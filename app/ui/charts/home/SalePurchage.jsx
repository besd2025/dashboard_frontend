"use client";
import React, { useState } from "react";
// import Chart from "react-apexcharts";
// import { ApexOptions } from "apexcharts";
import ChartTab from "../../common/ChartTab";
import dynamic from "next/dynamic";
import SalePurchaseTimePeriod from "../../common/home/sale_purchase_period";

// Dynamically import to avoid SSR errors
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function SalePurchage() {
  const [timePeriod, setTimePeriod] = useState("months");

  const getChartData = (period) => {
    switch (period) {
      case "days":
        return {
          categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          achats: [120, 150, 180, 90, 160, 200, 170],
          ventes: [80, 100, 120, 70, 110, 150, 130],
        };
      case "weeks":
        return {
          categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
          achats: [800, 950, 1100, 900],
          ventes: [600, 750, 850, 700],
        };
      case "months":
        return {
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
          achats: [180, 190, 170, 160, 175, 165, 170, 205, 40, 210, 240, 235],
          ventes: [40, 30, 50, 40, 55, 40, 70, 100, 110, 120, 150, 140],
        };
      case "years":
        return {
          categories: ["2020", "2021", "2022", "2023", "2024"],
          achats: [1500, 1800, 2100, 2400, 2700],
          ventes: [1000, 1200, 1500, 1800, 2100],
        };
      default:
        return {
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
          achats: [180, 190, 170, 160, 175, 165, 170, 205, 40, 210, 240, 235],
          ventes: [40, 30, 50, 40, 55, 40, 70, 100, 110, 120, 150, 140],
        };
    }
  };

  const chartData = getChartData(timePeriod);

  const [state, setState] = useState({
    series: [
      {
        name: "Achats",
        data: chartData.achats,
      },
      {
        name: "Ventes",
        data: chartData.ventes,
      },
    ],
    options: {
      chart: {
        fontFamily: "Outfit, sans-serif",
        height: 310,
        type: "area",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      // colors: ["#465FFF", "#9CB9FF"], // Define line colors
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
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: [3, 3],
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
      xaxis: {
        type: "category",
        categories: chartData.categories,
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
        labels: {
          style: {
            fontSize: "12px",
            colors: ["#6B7280"],
          },
        },
        title: {
          text: "",
          style: {
            fontSize: "0px",
          },
        },
      },
      tooltip: {
        enabled: true,
        x: {
          format: "dd MMM yyyy",
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

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-3 pb-2 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-4 sm:pt-4">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Achats & Ventes
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Evolution des achats et des ventes
          </p>
        </div>
        <div className="flex items-start w-full gap-3 sm:justify-end">
          {/* <div className="flex gap-2">
            <button
              onClick={() => handleTimePeriodChange("days")}
              className={`px-3 py-1 rounded-md text-sm ${
                timePeriod === "days"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Jours
            </button>
            <button
              onClick={() => handleTimePeriodChange("weeks")}
              className={`px-3 py-1 rounded-md text-sm ${
                timePeriod === "weeks"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Semaines
            </button>
            <button
              onClick={() => handleTimePeriodChange("months")}
              className={`px-3 py-1 rounded-md text-sm ${
                timePeriod === "months"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Mois
            </button>
            <button
              onClick={() => handleTimePeriodChange("years")}
              className={`px-3 py-1 rounded-md text-sm ${
                timePeriod === "years"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Années
            </button>
          </div> */}
          <SalePurchaseTimePeriod
            handleTimePeriodChange={handleTimePeriodChange}
          />
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

export default SalePurchage;
