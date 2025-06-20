import React from "react";
import Label from "../../../ui_elements/form/Label";
import Input from "../../../ui_elements/form/input/InputField";
import Button from "../../../ui_elements/button/Button";
import DatePicker from "../../../ui_elements/form/date-picker";
import Select from "../../../ui_elements/form/Select";
import { ChevronDownIcon } from "../../../icons";

function ConfirmationForm({ closeModalDetails, onBack }) {
  const optionUT = [
    { value: "Rango", label: "Rango" },
    { value: "Butanganzwa", label: "Butanganzwa" },
    { value: "Matongo", label: "Matongo" },
  ];
  const handleSelectChange = (value) => {
    // console.log("Selected value:", value);
  };
  return (
    <div className="no-scrollbar relative w-full max-w-[700px] max-h-[600px]  overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 z-0">
      <div className="flex flex-col gap-6  lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6  ">
            Confirmation
          </h4>

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            <div className="col-span-1">
              <Label>Destinataire</Label>
              <Input type="text" placeholder="Nom du destinataire" />
            </div>

            <div className="col-span-1">
              <Label>Motif</Label>
              <Input type="text" placeholder="Motif de la sortie" />
            </div>

            <div className="col-span-1">
              <Label>Téléphone du destinataire</Label>
              <Input type="text" placeholder="Téléphone du destinataire" />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <div className="space-y-6">
                <div>
                  <Label>Unité de transformation</Label>
                  <div className="relative">
                    <Select
                      options={optionUT}
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
                    label="Date entrer Unite de Transformation"
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
          </div>
        </div>
      </div>
      <div className="flex items-center  w-full gap-3 mt-6 sticky -bottom-8 bg-white pt-2">
        <Button size="sm" variant="outline" onClick={onBack}>
          Retour
        </Button>
        <Button size="sm" variant="outline" onClick={closeModalDetails}>
          Annuler
        </Button>
        <Button size="sm" className="bg-green-500">
          Confirmer
        </Button>
      </div>
    </div>
  );
}

export default ConfirmationForm;
