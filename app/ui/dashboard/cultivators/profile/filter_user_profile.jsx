"use client";
import React, { useState, useEffect } from "react";
import Input from "../../../ui_elements/form/input/InputField";
import Label from "../../../ui_elements/form/Label";
import Button from "../../../ui_elements/button/Button";
import Select from "../../../ui_elements/form/Select";
import { ChevronDownIcon } from "../../..//icons";
import DatePicker from "../../../ui_elements/form/date-picker";
import { fetchData } from "../../../../_utils/api";
function FilterUserProfile({ handleFilter, closeModalFilter }) {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [province, setProvince] = useState([]);
  const [commune, setCommune] = useState([]);
  const [zones, setZones] = useState([]);
  const [error, setError] = useState(null);
  const [collines, setColline] = useState([]);
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCommune, setSelectedCommune] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedColline, setSelectedColline] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);

  const handleSelectProvinceChange = async (value) => {
    //console.log("Selected value:", value);
    if (!value) {
      setCommune([]);
      return;
    }
    const communes = await fetchData(
      "get",
      `adress/commune/get_communes_by_province`,
      {
        params: { province: value },
        additionalHeaders: {},
        body: {},
      }
    );
    const options = communes?.map((item) => ({
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
    const zones = await fetchData("get", `adress/zone/get_zones_by_commune/`, {
      params: { commune: value },
      additionalHeaders: {},
      body: {},
    });
    const options = zones?.map((item) => ({
      value: item.zone_name,
      label: item.zone_name,
    }));
    setZones(options);
    setSelectedCommune(value);
  };
  const handleSelectZoneChange = async (value) => {
    if (!value) {
      setCommune([]);
      return;
    }
    const collines = await fetchData("get", `adress/colline/`, {
      params: {},
      additionalHeaders: {},
      body: {},
    });
    const options = collines?.results?.map((item) => ({
      value: item.colline_name,
      label: item.colline_name,
    }));
    setColline(options);
    setSelectedZone(value);
  };
  const handleSelectCollineChange = (value) => {
    setSelectedColline(value);
  };
  useEffect(() => {
    async function getData() {
      try {
        const provinces = await fetchData("get", `adress/province/`, {
          params: {
            offset: 0,
            limit: 18,
          },
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
    setLoadingSearch(true);
    const filterData = {
      province: selectedProvince,
      commune: selectedCommune,
      zone: selectedZone,
      colline: selectedColline,
      ageMin: ageMin,
      ageMax: ageMax,
      dateFrom: dateFrom,
      dateTo: dateTo,
    };
    handleFilter(filterData);
    closeModalFilter();
  };
  return (
    <div className="no-scrollbar relative w-full max-w-[700px]  overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 ">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Filtrage
        </h4>
      </div>
      <form className="flex flex-col max-h-[80vh]">
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
              <div className="col-span-2 lg:col-span-1">
                <div className="space-y-6">
                  <div>
                    <Label>Colline</Label>
                    <div className="relative">
                      <Select
                        options={collines}
                        placeholder="Selectionner Colline"
                        onChange={handleSelectCollineChange}
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
                    <Label>AGE MIN</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="Entrer l'age minimum"
                        onChange={(e) => setAgeMin(e.target.value)}
                        className="dark:bg-dark-900"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <div className="space-y-6">
                  <div>
                    <Label>AGE MAX</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="Entrer l'age minimum"
                        onChange={(e) => setAgeMax(e.target.value)}
                        className="dark:bg-dark-900"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-2 lg:col-span-1 ">
                <div className="space-y-6">
                  <div className="relative z-40">
                    <div className="mt-6">
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Depuis
                      </label>
                      <div className="relative">
                        <input
                          id="event-start-date"
                          type="date"
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
                          className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-2 lg:col-span-1 z-[9999]">
                <div className="space-y-6">
                  <div>
                    <div className="mt-6">
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Jusqu'à
                      </label>
                      <div className="relative">
                        <input
                          id="event-start-date"
                          type="date"
                          value={dateTo ? [new Date(dateFrom)] : undefined}
                          //defaultDate={new Date()}
                          onChange={(date) => {
                            if (date && date.length > 0) {
                              const selectedDate = date[0]; // En supposant que dates est un tableau
                              const formattedDate = selectedDate
                                .toISOString()
                                .split("T")[0]; // Format YYYY-MM-DD
                              setDateTo(formattedDate);
                            }
                            //setDateTo(date[0]);
                          }}
                          className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                        />
                      </div>
                    </div>
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
          <Button
            size="sm"
            onClick={handleFilters}
            loading={loadingSearch}
            variant="primary"
            className="text-white"
          >
            rechercher
          </Button>
        </div>
      </form>
    </div>
  );
}

export default FilterUserProfile;
