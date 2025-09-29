"use client";
import ReactApexChart from "react-apexcharts";
import React, { useState } from "react";

function PaymentChart() {
  const [state] = useState({
    series: [2040, 1402, 510], // valeurs
    options: {
      chart: {
        type: "donut",
      },
      labels: ["Payé en totalité", "Payé en moyenne", "Pas encore payé "],
      colors: ["#a16207", "#facc15", "#fef08a"], // Tailwind yellow-600, yellow-400, yellow-200
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false, // on gère la légende à la main en Tailwind
      },
      plotOptions: {
        pie: {
          donut: {
            size: "65%",
            labels: {
              show: true,
              total: {
                show: true,
                label: "Totale 3.5K",
                fontSize: "15px",
                fontWeight: 600,
                color: "#000",
              },
            },
          },
        },
      },
    },
  });

  const legend = [
    {
      color: "bg-[#ca8a04]",
      label: "Payé en totalité",
      percent: "48%",
      Cultivateurs: "2,040 Cultivateurs",
    },
    {
      color: "bg-[#facc15]",
      label: "Payé en moyenne",
      percent: "33%",
      Cultivateurs: "1,402 Cultivateurs",
    },
    {
      color: "bg-[#fef08a]",
      label: "Pas encore payé ",
      percent: "19%",
      Cultivateurs: "510 Cultivateurs",
    },
  ];

  return (
    <div className="rounded-2xl bo/rder border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6 flex flex-col items-center gap-8">
      <div className="flex items-center justify-between mb-5 w-full">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Statut des paiements
        </h3>
      </div>
      <div className="flex flex-col items-center gap-8 xl:flex-row ">
        {/* Donut Chart */}
        <div className="w-[240px] h-[240px]">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="donut"
            height="250"
          />
        </div>
        {/* Custom Legend */}
        <div className="flex flex-col gap-6">
          {legend.map((item, index) => (
            <div key={index} className="flex items-start gap-2.5">
              <div className={`mt-1.5 h-2 w-2 rounded-full ${item.color}`} />
              <div>
                <h5 className="mb-1 font-medium text-gray-800 text-sm dark:text-white/90">
                  {item.label}
                </h5>
                <div className="flex items-center gap-2 text-sm">
                  <p className="font-medium text-gray-700 dark:text-gray-400">
                    {item.percent}
                  </p>
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <p className="text-gray-500 dark:text-gray-400">
                    {item.Cultivateurs}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PaymentChart;
