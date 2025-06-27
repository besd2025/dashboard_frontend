"use client";
import Input from "../ui_elements/form/input/InputField";
import Label from "../ui_elements/form/Label";
import React, { useState } from "react";
import Select from "../ui_elements/form/Select";
import { ChevronDownIcon } from "../icons";
import DatePicker from "../ui_elements/form/date-picker";
import Button from "../ui_elements/button/Button";

function Sorties() {
  const [message, setMessage] = useState("");
  const achatType = [
    { value: "Rango", label: "Rango" },
    { value: "Butanganzwa", label: "Butanganzwa" },
    { value: "Matongo", label: "Matongo" },
  ];
  return (
    <div className=" p-6 bg-white rounded-2xl border border-gray-200  px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div>
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Resultants de l'unite de transformation
          </h3>

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 max-w-3xl">
            <div className="col-span-1">
              <Label>Les dépenses liées à la transformation</Label>
              <Input
                type="number"
                placeholder="Qte transformée par jour en kg"
              />
            </div>
            <div className="col-span-1">
              <Label>Qte transformée par jour</Label>
              <Input
                type="number"
                placeholder="Qte transformée par jour en kg"
              />
            </div>
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
              <Label>Quantité gruau (farine blanc)</Label>
              <Input
                type="number"
                placeholder="Quantité gruau (farine blanc) en kg"
              />
            </div>
            <div className="col-span-1">
              <Label>Quantité gruau (farine jaune)</Label>
              <Input
                type="number"
                placeholder="Quantité gruau (farine jaune) en kg"
              />
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
      <div className="flex items-center  w-full gap-3 mt-6 sticky -bottom-8 pt-2">
        <Button size="sm" className="bg-green-500">
          Enregistrer
        </Button>
      </div>
    </div>
  );
}

export default Sorties;
