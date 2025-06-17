"use client";
import React, { useState } from "react";
import Input from "../../ui_elements/form/input/InputField";
import Label from "../../ui_elements/form/Label";
import Button from "../../ui_elements/button/Button";
import Radio from "../../ui_elements/form/input/Radio";
import Select from "../../ui_elements/form/Select";
import { ChevronDownIcon } from "../../icons";
import DatePicker from "../../ui_elements/form/date-picker";

function FilterHangarList({ closeModalFilter }) {
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleRadioChangeStatus = (value) => {
    setSelectedStatus(value);
  };

  const handleFilter = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModalFilter();
  };

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

  const [selectedValues, setSelectedValues] = useState([]);

  const handleSelectChange = (value) => {
    // console.log("Selected value:", value);
  };

  return (
    <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
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
                        options={optionProvince}
                        placeholder="Selectionner province"
                        onChange={handleSelectChange}
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
                        options={optionCommune}
                        placeholder="Selectionner Commune"
                        onChange={handleSelectChange}
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
                      label="Date "
                      placeholder="Select a date"
                      mode="single"
                      defaultDate={new Date()}
                      onChange={(dates, currentDateString) => {
                        console.log({ dates, currentDateString });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label>Phone</Label>
                <Input type="text" defaultValue="+09 363 398 46" />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-8 mt-6">
              <Label>Status :</Label>
              <Radio
                id="radio1"
                name="group1"
                value="option1"
                checked={selectedStatus === "option1"}
                onChange={handleRadioChangeStatus}
                label="Active"
              />
              <Radio
                id="radio2"
                name="group1"
                value="option2"
                checked={selectedStatus === "option2"}
                onChange={handleRadioChangeStatus}
                label="Pending"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Button size="sm" variant="outline" onClick={closeModalFilter}>
            Fermer
          </Button>
          <Button size="sm" onClick={handleFilter}>
            rechercher
          </Button>
        </div>
      </form>
    </div>
  );
}

export default FilterHangarList;
