"use client";
import Input from "../../ui_elements/form/input/InputField";
import Label from "../../ui_elements/form/Label";
import React, { useState, useEffect } from "react";
import { fetchData } from "../../../_utils/api";
import Select from "../../ui_elements/form/Select";
import { ChevronDownIcon } from "../../icons";
import DatePicker from "../../ui_elements/form/date-picker";
import Button from "../../ui_elements/button/Button";

function Ventes() {
  const [message, setMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [quantite_farine_blanc, setQuantiteFarineBlanc] = useState(0);
  const [quantite_farine_jaune, setQuantiteFarineJaune] = useState(0);
  const [quantite_son_blanc, setQuantiteSonBlanc] = useState(0);
  const [quantite_son_jaune, setQuantiteSonJaune] = useState(0);
  const [prix_farine, setPrixFarine] = useState(0);
  const [prix_son, setPrixSon] = useState(0);
  const [date_transformation, setDateTransformation] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCommandOption, setSelectedCommandOption] = useState(null);
  const [error, setError] = useState(null);
  const [ListeCommandes, setListeCommandes] = useState([]);
  const productOptions = [
    { value: "farine_blanc", label: "Farine (blanc)" },
    { value: "farine_jaune", label: "Farine (jaune)" },
    { value: "son_mais_blanc", label: "Son de maïs (blanc)" },
    { value: "son_mais_jaune", label: "Son de maïs (jaune)" },
    // Ajoute d'autres produits ici si besoin
  ];
  const achatType = [
    { value: "prive", label: "SECTEUR PRIVE" },
    { value: "public", label: "INSTITUTION PUBLIQUE" },
    { value: "Autres", label: "Autres" },
  ];
  const handleSelectChange = (value) => {
    setSelectedProduct(value);
    setQuantity("");
    setPrice("");
  };
  const handleSelectCommandChange = async (option) => {
    setSelectedCommandOption(option);
  };
  useEffect(() => {
    async function getData() {
      try {
        const commandes = await fetchData("get", `command/`, {
          params: {},
          additionalHeaders: {},
          body: {},
        });
        const commands = commandes?.results?.map((commande) => ({
          value: commande.id,
          label:
            "commande de " +
            commande?.quantite +
            " KG ENVOYE LE " +
            new Date(commande?.date_commande).toLocaleDateString(),
        }));
        setListeCommandes(commands);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    }
    getData();
  }, []);
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
            <div className="col-span-1">
              <Label>Commande</Label>
              <Select
                options={ListeCommandes}
                placeholder="commande"
                onChange={handleSelectCommandChange}
                className="dark:bg-dark-900 cursor-pointer"
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
            <div className="col-span-1">
              <Label>Téléphone</Label>
              <Input
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                placeholder="76545454"
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
      <div className="flex items-center  w-full gap-3 mt-6 sticky -bottom-8  pt-2">
        <Button size="sm" className="bg-green-500">
          Enregistrer
        </Button>
      </div>
    </div>
  );
}

export default Ventes;
