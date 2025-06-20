import React, { useState } from "react";
import Label from "../../../../ui_elements/form/Label";
import Input from "../../../../ui_elements/form/input/InputField";
import Button from "../../../../ui_elements/button/Button";
import DatePicker from "../../../../ui_elements/form/date-picker";
import Select from "../../../../ui_elements/form/Select";
import { ChevronDownIcon } from "../../../../icons";
import TextArea from "../../../../ui_elements/form/input/TextArea";

function ResultsForm({ closeModalDetails, onBack }) {
  const [message, setMessage] = useState("");
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
            Résultats liés à la sortie
          </h4>

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 ">
            <div className="col-span-1">
              <Label>Quantité farine (blanc)</Label>
              <Input
                type="number"
                placeholder="Quantité farine (blanc) en kg"
              />
            </div>

            <div className="col-span-1">
              <Label>Quantité son de maïs (blanc)</Label>
              <Input
                type="number"
                placeholder="Quantité son de maïs (blanc) en kg"
              />
            </div>

            <div className="col-span-1">
              <Label>Quantité farine (jaune)</Label>
              <Input
                type="number"
                placeholder="Quantité farine (jaune) en kg"
              />
            </div>

            <div className="col-span-1">
              <Label>Quantité son de maïs (jaune)</Label>
              <Input
                type="number"
                placeholder="Quantité son de maïs (jaune) en kg"
              />
            </div>

            <div className="col-span-1">
              <Label>GAP (en fonction de taux de transformation)</Label>
              <p className="text-sm font-medium text-red-800 dark:text-white/90">
                454
              </p>
            </div>

            <div className="col-span-1">
              <Label>Charges</Label>
              <Input type="number" placeholder="Charges en Fbu" />
            </div>

            <div>
              <Label
                htmlFor="description"
                className="text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Observation
              </Label>
              <TextArea
                value={message}
                onChange={(value) => setMessage(value)}
                rows={6}
              />
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
                    id="date-sortie"
                    label="Date de sortie"
                    placeholder="Sélectionner la date de sortie"
                    mode="single"
                    defaultDate={new Date()}
                    onChange={(dates, currentDateString) => {
                      // Traiter la date de sortie ici
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center  w-full gap-3 mt-6 sticky -bottom-8 bg-white pt-2">
        <Button size="sm" variant="outline" onClick={closeModalDetails}>
          Annuler
        </Button>
        <Button size="sm" className="bg-green-500">
          Enregistrer
        </Button>
      </div>
    </div>
  );
}

export default ResultsForm;
