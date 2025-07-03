"use client";
import Input from "../../ui_elements/form/input/InputField";
import Label from "../../ui_elements/form/Label";
import React, { useState, useEffect } from "react";
import { fetchData } from "../../../_utils/api";
import Select from "../../ui_elements/form/Select";
import { ChevronDownIcon } from "../../icons";
import DatePicker from "../../ui_elements/form/date-picker";
import Button from "../../ui_elements/button/Button";
import FileInput from "../../ui_elements/form/input/FileInput";

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

  // Nouveaux états pour identification acheteur
  const [typeAcheteur, setTypeAcheteur] = useState("");
  const [sousTypeAcheteur, setSousTypeAcheteur] = useState("");
  const [acheteurFields, setAcheteurFields] = useState({});
  const [autrePreciser, setAutrePreciser] = useState("");
  const [imageBordereau, setImageBordereau] = useState(null);

  // Validation des champs obligatoires
  const fieldsToShow = getIdentificationFields(typeAcheteur, sousTypeAcheteur);
  function areRequiredFieldsFilled() {
    for (const field of fieldsToShow) {
      if (field.required && !acheteurFields[field.key]) {
        return false;
      }
      if (
        field.type === "phone" &&
        phoneNumberErrorMsg(acheteurFields[field.key])
      ) {
        return false;
      }
    }
    if (!typeAcheteur) return false;
    if (typeAcheteur && !sousTypeAcheteur) return false;
    if (fieldsToShow.some((f) => f.type === "photo") && !imageBordereau)
      return false;
    return true;
  }

  // Mapping dynamique des sous-types et des champs d'identification
  const optionsSousType = {
    private: [
      { label: "Cultivateur individuel", value: "cultivateur" },
      { label: "BRARUDI", value: "brarudi" },
      { label: "Entreprise / Société privée", value: "entreprise" },
    ],
    public: [
      { label: "Prison", value: "prison" },
      { label: "École", value: "ecole" },
      { label: "PNB (Police Nationale du Burundi)", value: "pnb" },
      { label: "FDNB (Force de Défense Nationale du Burundi)", value: "fdnb" },
      {
        label: "Autre institution publique (à préciser)",
        value: "autre_public",
      },
    ],
  };

  function getIdentificationFields(typeAcheteur, sousTypeAcheteur) {
    if (typeAcheteur === "private") {
      if (sousTypeAcheteur === "cultivateur") {
        return [
          { key: "nom", label: "Nom complet du cultivateur", required: true },
          {
            key: "telephone",
            label: "Numéro de téléphone",
            type: "phone",
            required: true,
          },
          {
            key: "carteIdentite",
            label: "Numéro de la carte d'identité",
            required: true,
          },
        ];
      }
      if (sousTypeAcheteur === "entreprise") {
        return [
          {
            key: "raisonSociale",
            label: "Nom officiel de l'entreprise",
            required: true,
          },
          {
            key: "nif",
            label: "Numéro d'identification fiscale (NIF)",
            required: true,
          },
          {
            key: "representant",
            label: "Nom et prenom du représentant",
            required: true,
          },
          {
            key: "telephone",
            label: "Numéro de téléphone",
            type: "phone",
            required: true,
          },
        ];
      }
      if (sousTypeAcheteur === "brarudi") {
        return [
          {
            key: "representant",
            label: "Nom et prénom du représentant",
            required: true,
          },
          {
            key: "telephone",
            label: "Numéro de téléphone",
            type: "phone",
            required: true,
          },
          {
            key: "bordereau",
            label: "Bordereau de versement (numero)",
            required: true,
          },
          {
            key: "image_bordereau",
            label: "Bordereau de versement (photo)",
            required: true,
            type: "photo",
          },
        ];
      }
    }
    if (typeAcheteur === "public") {
      if (["prison", "ecole", "pnb", "fdnb"].includes(sousTypeAcheteur)) {
        return [
          {
            key: "nomInstitution",
            label: "Nom de l'institution",
            required: true,
          },
          { key: "responsable", label: "Nom du responsable", required: true },
          { key: "fonction", label: "Fonction du responsable", required: true },
          {
            key: "telephone",
            label: "Numéro de téléphone du responsable",
            type: "phone",
            required: true,
          },
        ];
      }
      if (sousTypeAcheteur === "autre_public") {
        return [
          {
            key: "nomInstitution",
            label: "Nom de l'institution",
            required: true,
          },
          { key: "typePrecise", label: "Précisez le type", required: true },
          { key: "responsable", label: "Nom du responsable", required: true },
          {
            key: "telephone",
            label: "Numéro de téléphone du responsable",
            type: "phone",
            required: true,
          },
        ];
      }
    }
    return [];
  }

  function phoneNumberErrorMsg(num) {
    if (!num) return null;
    if (!/^\d{8}$/.test(num)) return "Numéro invalide (8 chiffres)";
    return null;
  }

  return (
    <div className=" p-6 bg-white rounded-2xl   px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div>
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Ventes des residus resultants de l'unite de transformation
          </h3>

          {/* Identification Acheteur */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 max-w-3xl mb-6">
            <div className="col-span-1">
              <Label>Type d'acheteur</Label>
              <Select
                options={[
                  { label: "Secteur privé", value: "private" },
                  { label: "Institution publique", value: "public" },
                ]}
                placeholder="-- Sélectionnez le type d'acheteur --"
                onChange={setTypeAcheteur}
                value={typeAcheteur}
              />
            </div>
            {typeAcheteur && (
              <div className="col-span-1">
                <Label>Catégorie</Label>
                <Select
                  options={optionsSousType[typeAcheteur] || []}
                  placeholder="-- Sélectionnez la catégorie --"
                  onChange={setSousTypeAcheteur}
                  value={sousTypeAcheteur}
                />
              </div>
            )}
            {/* Champs dynamiques identification */}
            {fieldsToShow.map((field) => {
              if (field.type === "photo") {
                return (
                  <div key={field.key} className="col-span-1">
                    <Label>{field.label}</Label>
                    <FileInput
                      onChange={(e) => {
                        setImageBordereau(e.target.files[0]);
                        setAcheteurFields((prev) => ({
                          ...prev,
                          [field.key]: e.target.files[0],
                        }));
                      }}
                    />
                    {imageBordereau && (
                      <span className="text-xs text-green-600">
                        Image sélectionnée
                      </span>
                    )}
                  </div>
                );
              }
              return (
                <div key={field.key} className="col-span-1">
                  <Label>
                    {field.label}
                    {field.required ? " *" : ""}
                  </Label>
                  <Input
                    type={field.type === "phone" ? "tel" : "text"}
                    placeholder={field.label}
                    value={acheteurFields[field.key] || ""}
                    onChange={(e) => {
                      const txt = e.target.value;
                      if (field.type === "phone") {
                        setAcheteurFields((current) => ({
                          ...current,
                          [field.key]: txt.replace(/[^0-9]/g, "").slice(0, 8),
                        }));
                      } else {
                        setAcheteurFields((current) => ({
                          ...current,
                          [field.key]: txt,
                        }));
                      }
                    }}
                    maxLength={field.type === "phone" ? 8 : undefined}
                  />
                  {field.type === "phone" &&
                    phoneNumberErrorMsg(acheteurFields[field.key]) && (
                      <span style={{ color: "red", fontSize: 12 }}>
                        {phoneNumberErrorMsg(acheteurFields[field.key])}
                      </span>
                    )}
                </div>
              );
            })}
          </div>

          {/* Partie produit/quantité/prix (inchangée) */}
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
        <Button
          size="sm"
          className="bg-green-500"
          disabled={!areRequiredFieldsFilled()}
        >
          Enregistrer
        </Button>
      </div>
    </div>
  );
}

export default Ventes;
