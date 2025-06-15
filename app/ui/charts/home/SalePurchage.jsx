"use client";
import React, { useState,useEffect } from "react";
// import Chart from "react-apexcharts";
// import { ApexOptions } from "apexcharts";
import ChartTab from "../../common/ChartTab";
import dynamic from "next/dynamic";
import SalePurchaseTimePeriod from "../../common/home/sale_purchase_period";
import { fetchData } from "../../../_utils/api";
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
          categories: [],
          achats: [],
          ventes: [],
        };
      case "weeks":
        return {
          categories: [],
          achats: [],
          ventes: [],
        };
      case "months":
        return {
          categories: [],
          achats: [],
          ventes: [],
        };
      case "years":
        return {
          categories: [],
          achats: [],
          ventes: [],
        };
      default:
        return {
          categories: [],
          achats: [],
          ventes: [],
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
useEffect(() => {
  async function getData() {
    try {
      let results;
      if (timePeriod === "days") {
        results = await fetchData("get", `achat_vente?period=day`, {
          params: {},
          additionalHeaders: {},
          body: {},
        });
      } else if (timePeriod === "weeks") {
        results = await fetchData("get", `achat_vente?period=week`, {
          params: {},
          additionalHeaders: {},
          body: {},
        });
      } else if (timePeriod === "months") {
        results = await fetchData("get", `achat_vente?period=month`, {
          params: {},
          additionalHeaders: {},
          body: {},
        });
      } else if (timePeriod === "years") {
        results = await fetchData("get", `achat_vente?period=year`, {
          params: {},
          additionalHeaders: {},
          body: {},
        });
      } else {
        console.error("Invalid time period");
        return;
      }

      const categories = results?.map((item) => {
        const date = new Date(item?.period + "T00:00:00");
        return (date.toLocaleDateString("fr-FR", { weekday: "short" }) + " " +item?.period);
      });
      const achats = results?.map((item) => item?.purchases || 0);
      const ventes = results?.map((item) => item?.sales || 0);

      setState((prev) => ({
        ...prev,
        series: [
          { name: "Achats", data: achats },
          { name: "Ventes", data: ventes },
        ],
        options: {
          ...prev.options,
          xaxis: {
            ...prev.options.xaxis,
            categories: categories,
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
