"use client";
import React, { useState } from "react";
import Label from "../../../ui_elements/form/Label";
import Input from "../../../ui_elements/form/input/InputField";
import Button from "../../../ui_elements/button/Button";
import DatePicker from "../../../ui_elements/form/date-picker";
import Select from "../../../ui_elements/form/Select";
import { ChevronDownIcon } from "../../../icons";
import TextArea from "../../../ui_elements/form/input/TextArea";

function QtyReturnedForm({ closeModalDetails, onBack }) {
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
    <div className=" p-6 bg-white rounded-2xl   px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-6  lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6  ">
            Quantite retournée
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
              <Label>Prix/kg (farine/son de maïs)</Label>
              <Input type="number" placeholder="Charges en Fbu" />
            </div>

            <div className="col-span-1">
              <Label>Prix total</Label>
              <Input type="number" placeholder="Charges en Fbu" />
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
      <div className="flex items-center  w-full gap-3 mt-6   pt-2">
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

export default QtyReturnedForm;
