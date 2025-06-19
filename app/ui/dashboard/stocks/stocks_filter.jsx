"use client";
import React, { useState, useEffect } from "react";
import { ChevronDownIcon } from "../../icons";
import { Dropdown } from "../../ui_elements/dropdown/Dropdown";
import DropdownItem from "../../ui_elements/dropdown/DropdownItem";
import dynamic from "next/dynamic";
import Label from "../../ui_elements/form/Label";
import Select from "../../ui_elements/form/Select";
import { fetchData } from "../../../_utils/api";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function StocksFilter() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [state, setState] = useState({
    series: [
      { name: "Stock", data: [] },
      { name: "Perte", data: [] },
    ],
    options: {
      colors: ["#16a34a", "#F44336"],
      chart: {
        fontFamily: "Outfit, sans-serif",
        type: "bar",
        height: 200,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "39%",
          borderRadius: 4,
          borderRadiusApplication: "end",
        },
      },
      dataLabels: { enabled: false },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [],
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "left",
        fontFamily: "Outfit",
      },
      yaxis: {
        title: { text: undefined },
        labels: {
          style: {
            fontSize: "12px",
            colors: ["#6B7280"],
          },
        },
      },
      grid: {
        yaxis: {
          lines: { show: true },
        },
      },
      fill: { opacity: 1 },
      tooltip: {
        x: { show: false },
        y: {
          formatter: (val) => `${val}`,
        },
      },
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const optionProvince = [
    { value: "Bujumbura", label: "Bujumbura" },
    { value: "Kayanza", label: "Kayanza" },
    { value: "Ngozi", label: "Ngozi" },
  ];

  const optionCommune = [
    { value: "Rango", label: "Rango" },
    { value: "Butanganzwa", label: "Butanganzwa" },
    { value: "Matongo", label: "Matongo" },
  ];

  const handleSelectChange = (value) => {
    // TODO: handle filter logic here
  };

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    async function getData() {
      try {
        const results = await fetchData(
          "get",
          "stock/details/stock_vs_pertes_province/",
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );

        const categories = results.map((item) => item.province);
        const stocks = results.map((item) => item.stock_total || 0);
        const pertes = results.map((item) => item.pertes || 0);

        setState((prev) => ({
          ...prev,
          series: [
            { name: "Stock", data: stocks },
            { name: "Perte", data: pertes },
          ],
          options: {
            ...prev.options,
            xaxis: {
              ...prev.options.xaxis,
              categories,
            },
          },
        }));
      } catch (error) {
        setError("Erreur lors de la récupération des données");
        console.error(error);
      }
    }

    getData();
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Stocks/Province
        </h3>

        <div className="relative inline-block">
          <button
            onClick={toggleDropdown}
            className="dropdown-toggle border border-gray-200 dark:border-gray-800 p-2 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <path
                fillRule="evenodd"
                d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-max p-2"
          >
            <DropdownItem className="flex w-max font-normal text-left text-gray-500 rounded-lg dark:text-gray-400 hover:bg-transparent">
              <div className="space-y-6">
                <div>
                  <Label>Province</Label>
                  <div className="relative">
                    <Select
                      options={optionProvince}
                      placeholder="Sélectionner province"
                      onChange={handleSelectChange}
                      className="dark:bg-dark-900 cursor-pointer"
                    />
                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                      <ChevronDownIcon />
                    </span>
                  </div>
                </div>
              </div>
            </DropdownItem>

            <DropdownItem className="flex w-max font-normal text-left text-gray-500 rounded-lg dark:text-gray-400 hover:bg-transparent">
              <div className="space-y-6">
                <div>
                  <Label>Commune</Label>
                  <div className="relative">
                    <Select
                      options={optionCommune}
                      placeholder="Sélectionner commune"
                      onChange={handleSelectChange}
                      className="dark:bg-dark-900 cursor-pointer"
                    />
                    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-100">
                      <ChevronDownIcon />
                    </span>
                  </div>
                </div>
              </div>
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
          {isMounted && (
            <ReactApexChart
              options={state.options}
              series={state.series}
              type="bar"
              height={390}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default StocksFilter;
