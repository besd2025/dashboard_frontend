"use client";
import dynamic from "next/dynamic";
import { Dropdown } from "../../ui_elements/dropdown/Dropdown";
import { MoreDotIcon } from "../../icons";
import { useState, useEffect } from "react";
import DropdownItem from "../../ui_elements/dropdown/DropdownItem";
import { fetchData } from "../../../_utils/api";
// Dynamically import both ApexCharts and ReactApexChart
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function Synthese() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [state, setState] = useState({
    series: [],

    options: {
      chart: {
        fontFamily: "Outfit, sans-serif",
        type: "radialBar",
        height: 330,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -85,
          endAngle: 85,
          hollow: {
            size: "75%",
          },
          track: {
            background: "#E4E7EC",
            strokeWidth: "100%",
            margin: 5, // margin is in pixels
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              fontSize: "25px",
              fontWeight: "600",
              offsetY: -40,
              color: "#1D2939",
              formatter: function (val) {
                return val + "%";
              },
            },
          },
        },
      },
      fill: {
        type: "solid",
        colors: ["#eab308"],
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Progress"],
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
      async function getData() {
        try {
  
          const results = await fetchData('get', 'hangar_with_stats/', {
            params: {},
            additionalHeaders: {},
            body: {}
          });
          setData(results);
          const pourcentage = results.pct_avec_collecteur || 0;
        
          setState((prev) => ({
          ...prev,
          series: [pourcentage],

        }));
          
        } catch (error) {
          setError(error);
          console.error(error);
        }
      }
      getData();
    }, []);
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex items-center justify-between gap-5 p-6 sm:gap-8 ">
        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            HANGAR ciblés
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {data?.total_hangars ||0}
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            HANGAR en activités
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {data?.hangars_avec_collecteur ||0}
          </p>
        </div>

        <div className="relative inline-block">
          <button onClick={toggleDropdown} className="dropdown-toggle">
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            <DropdownItem
              tag="a"
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Details
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      <div className="px-5  bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 ">
        <div className="relative ">
          <div className="max-h-[330px]">
            {isMounted && (
              <ReactApexChart
                options={state.options}
                series={state.series}
                type="radialBar"
                height={300}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
