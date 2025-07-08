"use client";
import React, { useState, useEffect } from "react";
import Input from "../../../ui_elements/form/input/InputField";
import Label from "../../../ui_elements/form/Label";
import Button from "../../../ui_elements/button/Button";
import Radio from "../../../ui_elements/form/input/Radio";
import Select from "../../../ui_elements/form/Select";
import { ChevronDownIcon } from "../../..//icons";
import DatePicker from "../../../ui_elements/form/date-picker";
import { fetchData } from "../../../../_utils/api";
function FilterUserProfile({ handleDataSortieFilter, closeModalFilter }) {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [province, setProvince] = useState([]);
  const [commune, setCommune] = useState([]);
  const [zones, setZones] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCommune, setSelectedCommune] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  const [error, setError] = useState(null);
  const [quantiteMinSortie, setQuantiteMinSortie] = useState("");
  const [quantiteMaxSortie, setQuantiteMaxSortie] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [dateSortie, setDateSortie] = useState("");
  const handleRadioChangeStatus = (value) => {
    setSelectedStatus(value);
  };
  const handleSelectProvinceChange = async (value) => {
    //console.log("Selected value:", value);
    if (!value) {
      setCommune([]);
      return;
    }
    const communes = await fetchData("get", `adress/commune/`, {
      params: {},
      additionalHeaders: {},
      body: {},
    });
    const options = communes?.results?.map((item) => ({
      value: item.commune_name,
      label: item.commune_name,
    }));
    setCommune(options);
    setSelectedProvince(value);
  };
  const handleSelectCommuneChange = async (value) => {
    if (!value) {
      setCommune([]);
      return;
    }
    const zones = await fetchData("get", `adress/zone/`, {
      params: {},
      additionalHeaders: {},
      body: {},
    });
    const options = zones?.results?.map((item) => ({
      value: item.zone_name,
      label: item.zone_name,
    }));
    setZones(options);
    setSelectedCommune(value);
  };
  const handleSelectZoneChange = async (value) => {
    setSelectedZone(value);
  };
  const handleFilter = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModalFilter();
  };
  useEffect(() => {
    async function getData() {
      try {
        const provinces = await fetchData("get", `adress/province/`, {
          params: {},
          additionalHeaders: {},
          body: {},
        });
        const options = provinces?.results?.map((item) => ({
          value: item.province_name,
          label: item.province_name,
        }));
        setProvince(options);
        setZones(zones);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    }
    getData();
  }, []);

  const handleFilters = (e) => {
    e.preventDefault();
    const filterData = {
      province: selectedProvince,
      commune: selectedCommune,
      zone: selectedZone,
      QtMax: quantiteMaxSortie,
      QtMin: quantiteMinSortie,
      dateSortie: dateSortie,
      dateTo: dateTo,
      dateFrom: dateFrom,
    };
    console.log("Filter Data:", filterData);
    handleDataSortieFilter(filterData);
    closeModalFilter();
  };

  return (
    <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 z-0">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Filtrage
        </h4>
      </div>
      <form className="flex flex-col">
        <div className="custom-scrollbar h-max overflow-y-auto px-2 pb-3">
          <div className="mt-7">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div className="col-span-2 lg:col-span-1">
                <div className="space-y-6">
                  <div>
                    <Label>Province</Label>
                    <div className="relative">
                      <Select
                        options={province}
                        placeholder="Selectionner province"
                        onChange={handleSelectProvinceChange}
                        className="dark:bg-dark-900"
                      />
                      <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                        <ChevronDownIcon />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-2 lg:col-span-1">
                <div className="space-y-6">
                  <div>
                    <Label>Commune</Label>
                    <div className="relative">
                      <Select
                        options={commune}
                        placeholder="Selectionner Commune"
                        onChange={handleSelectCommuneChange}
                        className="dark:bg-dark-900"
                      />
                      <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                        <ChevronDownIcon />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <div className="space-y-6">
                  <div>
                    <Label>Zone</Label>
                    <div className="relative">
                      <Select
                        options={zones}
                        placeholder="Selectionner zone"
                        onChange={handleSelectZoneChange}
                        className="dark:bg-dark-900"
                      />
                      <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                        <ChevronDownIcon />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1 z-[9999]">
                <div className="space-y-6">
                  <div>
                    <DatePicker
                      id="date-picker"
                      label="Date de sortie"
                      placeholder="Select a date"
                      mode="single"
                      value={dateFrom ? [new Date(dateFrom)] : undefined}
                      onChange={(date) => {
                        // if (dates && dates.length > 0) {
                        const selectedDat = date[0]; // En supposant que dates est un tableau
                        const formattedDat = selectedDat
                          .toISOString()
                          .split("T")[0]; // Format YYYY-MM-DD
                        setDateSortie(formattedDat);
                        //}
                        //setDateFrom(dates[0]);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <div className="space-y-6">
                  <div>
                    <Label>Quantite min </Label>
                    <div className="relative">
                      <Input
                        type="number"
                        options={quantiteMinSortie}
                        placeholder="Quantite min sortie"
                        onChange={(e) => setQuantiteMinSortie(e.target.value)}
                        className="dark:bg-dark-900"
                      />
                      <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                        <ChevronDownIcon />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <div className="space-y-6">
                  <div>
                    <Label>Quantite max </Label>
                    <div className="relative">
                      <Input
                        type="number"
                        options={quantiteMaxSortie}
                        placeholder="Quantite min sortie"
                        onChange={(e) => setQuantiteMaxSortie(e.target.value)}
                        className="dark:bg-dark-900"
                      />
                      <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                        <ChevronDownIcon />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1 z-[9999]">
                <div className="space-y-6">
                  <div>
                    <DatePicker
                      id="date-picker"
                      label="Depuis"
                      placeholder="Select a date"
                      mode="single"
                      value={dateFrom ? [new Date(dateFrom)] : undefined}
                      onChange={(date) => {
                        // if (dates && dates.length > 0) {
                        const selectedDat = date[0]; // En supposant que dates est un tableau
                        const formattedDat = selectedDat
                          .toISOString()
                          .split("T")[0]; // Format YYYY-MM-DD
                        setDateFrom(formattedDat);
                        //}
                        //setDateFrom(dates[0]);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1 z-[9999]">
                <div className="space-y-6">
                  <div>
                    <DatePicker
                      id="date-picker"
                      label="jusqu'à"
                      placeholder="Select a date"
                      mode="single"
                      value={dateFrom ? [new Date(dateFrom)] : undefined}
                      onChange={(date) => {
                        // if (dates && dates.length > 0) {
                        const selectedDat = date[0]; // En supposant que dates est un tableau
                        const formattedDat = selectedDat
                          .toISOString()
                          .split("T")[0]; // Format YYYY-MM-DD
                        setDateTo(formattedDat);
                        //}
                        //setDateFrom(dates[0]);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Button size="sm" variant="outline" onClick={closeModalFilter}>
            Fermer
          </Button>
          <Button size="sm" onClick={handleFilters}>
            rechercher
          </Button>
        </div>
      </form>
    </div>
  );
}

export default FilterUserProfile;
