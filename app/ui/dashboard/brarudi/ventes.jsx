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
  const [image_facture, setImageFacture] = useState(null);
  const [date_sortie, setDateSortie] = useState("");
  const [error, setError] = useState(null);
  const productOptions = [
    { value: "farine", label: "Farine" },
    { value: "son_mais", label: "Son de maïs " },
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
  // Nouveaux états pour identification acheteur
  const [typeAcheteur, setTypeAcheteur] = useState("");
  const [sousTypeAcheteur, setSousTypeAcheteur] = useState("");
  const [acheteurFields, setAcheteurFields] = useState({});
  const [autrePreciser, setAutrePreciser] = useState("");
  const [imageBordereau, setImageBordereau] = useState(null);
  const [numeroFacture, setNumeroFacture] = useState("");
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
    if (fieldsToShow.some((f) => f.type === "photo")) return false;
    return true;
  }

  // Mapping dynamique des sous-types et des champs d'identification
  const optionsSousType = {
    private: [
      { label: "Cultivateur individuel", value: "cultivateur" },
      //{ label: "BRARUDI", value: "brarudi" },
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
  const Enregistrer = async () => {
    if (selectedProduct && quantity && price && typeAcheteur) {
      const formData = new FormData();

      formData.append("quantity_type", selectedProduct || "");
      formData.append("quantity", quantity || "");
      formData.append("numero_facture", numeroFacture || "");
      formData.append("price", price || "");
      formData.append("type_acheteur", typeAcheteur || "");
      formData.append("sous_type_acheteur", sousTypeAcheteur || "");
      formData.append("autre_preciser", autrePreciser || "");
      formData.append("nom_acheteur", acheteurFields.nom || "");
      formData.append("telephone_acheteur", acheteurFields.telephone || "");
      formData.append(
        "carte_identite_acheteur",
        acheteurFields.carteIdentite || ""
      );
      formData.append("raison_sociale", acheteurFields.raisonSociale || "");
      formData.append("nif", acheteurFields.nif || "");
      formData.append("representant", acheteurFields.representant || "");
      formData.append("nom_institution", acheteurFields.nomInstitution || "");
      formData.append("fonction_responsable", acheteurFields.fonction || "");
      formData.append("contact_autre", acheteurFields.contactAutre || "");
      formData.append("date_sortie", date_sortie || "");
      formData.append(
        "numero_bordereau",
        acheteurFields.numero_bordereau || ""
      );
      if (image_facture) formData.append("photo_facture", image_facture);
      if (imageBordereau) formData.append("image_bordereau", imageBordereau);

      console.log("Form data to submit:", formData);
      try {
        const response = await fetchData("post", `/vente_produits/`, {
          params: {},
          additionalHeaders: {},
          body: formData, // Utilisation de FormData ici
        });
        if (response === 201) {
          window.location.reload();
        } else {
          setError("Erreur d'enregistrement");
        }
      } catch (error) {
        console.error("Error during submission:", error);
        setError("Erreur lors de l'enregistrement des données");
      }
    } else {
      setError("Complétez d'abord tous les champs");
    }
  };
  return (
    <div className=" p-6 bg-white rounded-2xl   px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div>
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Ventes des residus resultants de l'unite de transformation
          </h3>
          <form action="" encType="multipart/form-data">
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
              {/* <div className="col-span-1">
              <Label>Commande</Label>
              <Select
                options={ListeCommandes}
                placeholder="commande"
                onChange={handleSelectCommandChange}
                className="dark:bg-dark-900 cursor-pointer"
              />
            </div> */}
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
                </>
              )}

              <div className="col-span-1">
                <Label>Numero du facture</Label>
                <Input
                  onChange={(e) => setNumeroFacture(e.target.value)}
                  type="number"
                  placeholder="76545454"
                />
              </div>
              <div className="col-span-1">
                <Label>Image du facture</Label>
                <Input
                  onChange={(e) => setImageFacture(e.target.files[0])}
                  type="file"
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
                      onChange={(dates, currentDateString, e) => {
                        // Vérifiez si une date a été sélectionnée
                        if (dates && dates.length > 0) {
                          const selectedDate = dates[0]; // En supposant que dates est un tableau
                          const formattedDate = selectedDate
                            .toISOString()
                            .split("T")[0]; // Format YYYY-MM-DD
                          setDateSortie(formattedDate);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="flex items-center  w-full gap-3 mt-6 sticky -bottom-8  pt-2">
        <Button
          onClick={Enregistrer}
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
