"use client";
import React,{useEffect,useState} from "react";
import dynamic from "next/dynamic";
import { fetchData } from "../../../_utils/api";
// Dynamically import to avoid SSR errors
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function GenderChart() {
    const [error, setError] = useState(null);

  const [state, setState] = React.useState({
    series: [],
    options: {
      chart: {
        width: 300,
        type: "pie",
        fontFamily: "Outfit, sans-serif",
        toolbar: {
          show: false, // Hide chart toolbar
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
      labels: [],
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
            const results = await fetchData('get', 'cultivators/stats_genre/', {
              params: {},
              additionalHeaders: {},
              body: {}
            });
        
          const hommes = results.hommes || 0;
        const femmes = results.femmes || 0;
  
      setState(prev => ({
        ...prev,
        series: [hommes,femmes],
        options: {
            ...prev.options,
            labels: [`Hommes: ${hommes}`, `Femmes: ${femmes}`],
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
          Genre
        </h3>
      </div>
      <div className="max-w-full   overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2 ">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="pie"
          />
        </div>
      </div>
    </div>
  );
}

export default GenderChart;
