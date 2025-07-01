"use client";
import Input from "../../ui_elements/form/input/InputField";
import Label from "../../ui_elements/form/Label";
import React, { useState } from "react";
import TextArea from "../../ui_elements/form/input/TextArea";
import Select from "../../ui_elements/form/Select";
import { ChevronDownIcon } from "../../icons";
import DatePicker from "../../ui_elements/form/date-picker";
import Button from "../../ui_elements/button/Button";

function Ventes() {
  const [message, setMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const productOptions = [
    { value: "farine_blanc", label: "Farine (blanc)" },
    { value: "farine_jaune", label: "Farine (jaune)" },
    { value: "son_mais_blanc", label: "Son de maïs (blanc)" },
    { value: "son_mais_jaune", label: "Son de maïs (jaune)" },
    { value: "Gruau", label: "Gruau" },
    // Ajoute d'autres produits ici si besoin
  ];
  const achatType = [
    { value: "Rango", label: "Rango" },
    { value: "Butanganzwa", label: "Butanganzwa" },
    { value: "Matongo", label: "Matongo" },
  ];
  const handleSelectChange = (value) => {
    setSelectedProduct(value);
    setQuantity("");
    setPrice("");
  };
  return (
    <div className=" p-6 bg-white rounded-2xl   px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div>
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Ventes des residus resultants de l'unite de transformation
          </h3>

          <div className="grid grid-cols-1 gap-x-6 gap-y-5 max-w-3xl">
            <div className="col-span-1">
              <Label>Produit</Label>
              <Select
                options={productOptions}
                placeholder="Sélectionner le produit"
                onChange={handleSelectChange}
                className="dark:bg-dark-900"
              />
            </div>
            {selectedProduct && (
              <>
                <div className="col-span-1">
                  <Label>
                    Quantité (
                    {
                      productOptions.find(
                        (opt) => opt.value === selectedProduct
                      )?.label
                    }
                    )
                  </Label>
                  <Input
                    type="number"
                    placeholder={`Quantité de ${
                      productOptions.find(
                        (opt) => opt.value === selectedProduct
                      )?.label
                    } en kg`}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="col-span-1">
                  <Label>
                    Prix (
                    {
                      productOptions.find(
                        (opt) => opt.value === selectedProduct
                      )?.label
                    }
                    )
                  </Label>
                  <Input
                    type="number"
                    placeholder={`Prix de ${
                      productOptions.find(
                        (opt) => opt.value === selectedProduct
                      )?.label
                    } en Fbu`}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="col-span-1">
                  <Label>
                    Prix/kg (
                    {
                      productOptions.find(
                        (opt) => opt.value === selectedProduct
                      )?.label
                    }
                    )
                  </Label>
                  <Input
                    type="number"
                    placeholder={`Prix/kg ${
                      productOptions.find(
                        (opt) => opt.value === selectedProduct
                      )?.label
                    } en Fbu`}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="col-span-1">
              <Label>Téléphone</Label>
              <Input type="number" placeholder="76545454" />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <div className="space-y-6">
                <div>
                  <Label>Type d'acheteur</Label>
                  <div className="relative">
                    <Select
                      options={achatType}
                      placeholder="Selectionner l'acheteur"
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
      <div className="flex items-center  w-full gap-3 mt-6 sticky -bottom-8  pt-2">
        <Button size="sm" className="bg-green-500">
          Enregistrer
        </Button>
      </div>
    </div>
  );
}

export default Ventes;
