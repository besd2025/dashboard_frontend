"use client";
import React, { useState, useEffect } from "react";
import Input from "../../../../../ui_elements/form/input/InputField";
import Label from "../../../../../ui_elements/form/Label";
import Button from "../../../../../ui_elements/button/Button";
import Radio from "../../../../../ui_elements/form/input/Radio";
import { fetchData } from "../../../../../../_utils/api";

function EditAchat({ closeModal, achat_id }) {
  const [selectedStatus, setSelectedStatus] = useState("option2");
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [quantite_blanc, setQuantiteBlanc] = useState("");
  const [quantite_jaune, setQuantiteJaune] = useState("");
  const [date_achat, setDateAchat] = useState("");
  const [collector_code, setCollectorCode] = useState("");
  const [numero_recu, setNumeroRecu] = useState("");
  const [photo_recu, setPhotoRecu] = useState([]);
  const [degre_humiliteBranc, setDegreHumiliteBranc] = useState("");
  const [degre_humiliteJaune, setDegreHumiliteJaune] = useState("");
  const handleRadioChangeStatus = (value) => {
    setSelectedStatus(value);
  };
  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("cultivator_code", code);
    formData.append("collector_code", collector_code);
    formData.append("id", achat_id);
    formData.append("date_achat", date_achat);
    formData.append("quantity_blanc", quantite_blanc);
    formData.append("quantity_jaune", quantite_jaune);
    formData.append("himidity_blanc", degre_humiliteBranc);
    formData.append("himidity_jaune", degre_humiliteJaune);
    formData.append("receipt_number", numero_recu);

    if (photo_recu instanceof File) {
      formData.append("receipt_photo", photo_recu);
    }

    try {
      const results = await fetchData("patch", `/achats/${achat_id}/`, {
        params: {},
        additionalHeaders: {},
        body: formData,
      });
      console.log(results);
      if (results == 200) {
        window.location.reload();
      } else {
        console.log("error");
      }
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        const results = await fetchData("get", `/achats/${achat_id}/`, {
          params: {},
          additionalHeaders: {},
          body: {},
        });
        setData(results);
        console.log("Fetched Data:", results);
        const data = results;
        setCode(data?.cultivator?.cultivator_code || "");
        setName(data?.cultivator?.cultivator_last_name || "");
        setFirstName(data?.cultivator?.cultivator_first_name || "");
        setQuantiteBlanc(data?.quantity_blanc || "");
        setQuantiteJaune(data?.quantity_jaune);
        setDateAchat(data?.date_achat);
        setCollectorCode(data?.collector?.unique_code || "");
        setNumeroRecu(data?.receipt_number || "");
        setPhotoRecu(data?.receipt_photo || []); // Assuming photo_recu is an array
        setDegreHumiliteBranc(data?.himidity_blanc);
        setDegreHumiliteJaune(data?.himidity_jaune);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    }
    getData();
  }, [achat_id]);

  return (
    <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Modifier
        </h4>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
          Modifier les informations DE l'achat
        </p>
      </div>
      <form className="flex flex-col">
        <div className="custom-scrollbar h-[450px] md:h-[350px] overflow-y-auto px-2 pb-3">
          <div>
            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
              ID
            </h5>

            <Input
              type="text"
              defaultValue={code}
              onChange={(e) => setCode(e.target.value)}
              disabled
            />
          </div>
          <div className="mt-7">
            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
              Informations personnelles
            </h5>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div className="col-span-2 lg:col-span-1">
                <Label>Nom</Label>
                <Input
                  type="text"
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label>Prenom</Label>
                <Input
                  type="text"
                  defaultValue={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label>Quantité blanc</Label>
                <Input
                  type="text"
                  defaultValue={quantite_blanc}
                  onChange={(e) => setQuantiteBlanc(e.target.value)}
                />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label>Quantité Jaune</Label>
                <Input
                  type="text"
                  defaultValue={quantite_jaune}
                  onChange={(e) => setQuantiteJaune(e.target.value)}
                />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label>Degle d'humilité Blanc</Label>
                <Input
                  type="text"
                  defaultValue={degre_humiliteBranc}
                  onChange={(e) => setDegreHumiliteBranc(e.target.value)}
                />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label>Degle d'humilité Jaune</Label>
                <Input
                  type="text"
                  defaultValue={degre_humiliteJaune}
                  onChange={(e) => setDegreHumiliteJaune(e.target.value)}
                />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label>Numéro de recu</Label>
                <Input
                  type="text"
                  defaultValue={numero_recu}
                  onChange={(e) => setNumeroRecu(e.target.value)}
                />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label>Photo de recu</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setPhotoRecu(file); // Stocke le fichier pour l'aperçu et l'envoi
                    }
                  }}
                />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label>Date d'achat</Label>
                <Input
                  type="date"
                  defaultValue={date_achat}
                  onChange={(e) => setDateAchat(e.target.value)}
                />
              </div>
              <div className="col-span-2 lg:col-span-1">
                {photo_recu && (
                  <div className="mt-2 w-32 h-32 border border-gray-300 rounded overflow-hidden">
                    <img
                      src={
                        photo_recu instanceof File
                          ? URL.createObjectURL(photo_recu)
                          : photo_recu // URL venant du backend
                      }
                      alt="Aperçu du reçu"
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
              </div>
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
        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Button size="sm" variant="outline" onClick={closeModal}>
            Fermer
          </Button>
          <Button size="sm" onClick={handleSave} className=" bg-yellow-500">
            Enregistrer
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditAchat;
