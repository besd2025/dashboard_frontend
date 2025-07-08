"use client";
import React, { useState, useEffect } from "react";
import Label from "../../../ui_elements/form/Label";
import Input from "../../../ui_elements/form/input/InputField";
import Button from "../../../ui_elements/button/Button";
import DatePicker from "../../../ui_elements/form/date-picker";
import Select from "../../../ui_elements/form/Select";
import { ChevronDownIcon } from "../../../icons";
import TextArea from "../../../ui_elements/form/input/TextArea";
import { fetchData } from "../../../../_utils/api";
function QtyReturnedForm({ closeModalDetails, onBack }) {
  const [message, setMessage] = useState("");
  const optionUT = [
    { value: "Rango", label: "Rango" },
    { value: "Butanganzwa", label: "Butanganzwa" },
    { value: "Matongo", label: "Matongo" },
  ];
  const [quantite_farine_blanc, setQuantiteFarineBlanc] = useState(0);
  const [quantite_farine_jaune, setQuantiteFarineJaune] = useState(0);
  const [quantite_son_blanc, setQuantiteSonBlanc] = useState(0);
  const [quantite_son_jaune, setQuantiteSonJaune] = useState(0);
  const [prix_farine, setPrixFarine] = useState(0);
  const [prix_son, setPrixSon] = useState(0);
  const [date_transformation, setDateTransformation] = useState("");
  const [selectedCommandOption, setSelectedCommandOption] = useState(null);
  const [error, setError] = useState(null);
  const [ListeCommandes, setListeCommandes] = useState([]);
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
  const Enregistre = async (e) => {
    e.preventDefault();
    if (selectedCommandOption) {
      const formdata = {
        command: selectedCommandOption,
        quantite_farine_blanc: quantite_farine_blanc,
        quantite_farine_jaune: quantite_farine_jaune,
        quantite_son_blanc: quantite_son_blanc,
        quantite_son_jaune: quantite_son_jaune,
        prix_kg_farine: prix_farine,
        prix_kg_son: prix_son,
      };
      const response = await fetchData("post", `/retour/`, {
        params: {},
        additionalHeaders: {},
        body: formdata,
      });
      if (response == 200) {
        window.location.reload();
      } else {
        setError("erreur d'enregistrement");
      }
    } else {
      setError("complete d'abord tous les cases ");
    }
  };

  const handleSelectCommandChange = async (option) => {
    setSelectedCommandOption(option);
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
              <Label>Commande</Label>
              <Select
                options={ListeCommandes}
                placeholder="commande"
                onChange={handleSelectCommandChange}
                className="dark:bg-dark-900 cursor-pointer"
              />
            </div>

            <div className="col-span-1">
              <Label>Quantité farine (blanc)</Label>
              <Input
                onChange={(e) => setQuantiteFarineBlanc(e.target.value)}
                type="number"
                placeholder="Quantité farine (blanc) en kg"
              />
            </div>
            <div className="col-span-1">
              <Label>Quantité farine (jaune)</Label>
              <Input
                onChange={(e) => setQuantiteFarineJaune(e.target.value)}
                type="number"
                placeholder="Quantité farine (jaune) en kg"
              />
            </div>
            <div className="col-span-1">
              <Label>Quantité son de maïs (blanc)</Label>
              <Input
                onChange={(e) => setQuantiteSonBlanc(e.target.value)}
                type="number"
                placeholder="Quantité son de maïs (blanc) en kg"
              />
            </div>

            <div className="col-span-1">
              <Label>Quantité son de maïs (jaune)</Label>
              <Input
                onChange={(e) => setQuantiteSonJaune(e.target.value)}
                type="number"
                placeholder="Quantité son de maïs (jaune) en kg"
              />
            </div>

            <div className="col-span-1">
              <Label>Prix/kg (farine)</Label>
              <Input
                onChange={(e) => setPrixFarine(e.target.value)}
                type="number"
                placeholder="Charges en Fbu"
              />
            </div>

            <div className="col-span-1">
              <Label>Prix/kg (son de maïs)</Label>
              <Input
                onChange={(e) => setPrixSon(e.target.value)}
                type="number"
                placeholder="Charges en Fbu"
              />
            </div>
            {/* <div className="col-span-2 lg:col-span-1 z-[9999]">
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
            </div> */}
          </div>
        </div>
      </div>
      <div className="flex items-center  w-full gap-3 mt-6   pt-2">
        <Button size="sm" variant="outline" onClick={closeModalDetails}>
          Annuler
        </Button>
        <Button size="sm" className="bg-green-500" onClick={Enregistre}>
          Enregistrer
        </Button>
      </div>
    </div>
  );
}

export default QtyReturnedForm;
