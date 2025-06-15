"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import PeriodTab from "../../../common/period_tab";

// Dynamically import to avoid SSR errors
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function QteVendCategorie() {
  const [timePeriod, setTimePeriod] = useState("months");

  const getChartData = (period) => {
    switch (period) {
      case "days":
        return {
          categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          blancs: [120, 150, 180, 90, 160, 200, 170],
          jaune: [80, 100, 120, 70, 110, 150, 130],
        };
      case "weeks":
        return {
          categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
          blancs: [800, 950, 1100, 900],
          jaune: [600, 750, 850, 700],
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
          blancs: [180, 190, 170, 160, 175, 165, 170, 205, 40, 210, 240, 235],
          jaune: [40, 30, 50, 40, 55, 40, 70, 100, 110, 120, 150, 140],
        };
      case "years":
        return {
          categories: ["2020", "2021", "2022", "2023", "2024"],
          blancs: [1500, 1800, 2100, 2400, 2700],
          jaune: [1000, 1200, 1500, 1800, 2100],
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
          blancs: [180, 190, 170, 160, 175, 165, 170, 205, 40, 210, 240, 235],
          jaune: [40, 30, 50, 40, 55, 40, 70, 100, 110, 120, 150, 140],
        };
    }
  };
  const chartData = getChartData(timePeriod);

  const [state, setState] = useState({
    series: [
      {
        name: "Blancs",
        data: chartData.blancs,
      },
      {
        name: "jaune",
        data: chartData.jaune,
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
          name: "blancs",
          data: newData.blancs,
        },
        {
          name: "jaune",
          data: newData.jaune,
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
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 w-max ">
          Qté vendue/categorie
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
      <div id="html-dist"></div>
    </div>
  );
}

export default QteVendCategorie;
