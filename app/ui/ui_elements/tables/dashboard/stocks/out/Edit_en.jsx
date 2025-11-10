"use client";
import React, { useState, useEffect } from "react";
import Input from "../../../../form/input/InputField";
import Label from "../../../../form/Label";
import Button from "../../../../button/Button";
import Radio from "../../../../form/input/Radio";
import { fetchData } from "../../../../../../_utils/api";
import ViewImageModal from "../../../../modal/ViewImageModal";
function EditTransfertEn({ closeModal, achat_id }) {
  const [selectedStatus, setSelectedStatus] = useState("option2");
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [nom_choffeur, setNomChoffeur] = useState("");
  const [prenom_choffeur, setPreNomChoffeur] = useState("");
  const [phone_choffeur, setPhoneChoffeur] = useState("");
  const [nom_accompagn, setNomAccompagn] = useState("");
  const [prenom_accompag, setPreNomAccompagn] = useState("");
  const [phone_accompag, setPhoneAccompagn] = useState("");
  const [plaque_voiture, setPlaqueVoiture] = useState("");
  const [hangar_transfert, setHangarTransfert] = useState("");
  const [quantite_blanc, setQuantiteBlanc] = useState("");
  const [quantite_jaune, setQuantiteJaune] = useState("");
  const [date_transfert, setTransfertDate] = useState("");
  const [numero_recu, setNumeroRecu] = useState("");
  const [collector_code, setCollectorCode] = useState("");
  const [photo_recu, setPhotoRecu] = useState([]);
  const [degre_humiliteBranc, setDegreHumiliteBranc] = useState("");
  const [degre_humiliteJaune, setDegreHumiliteJaune] = useState("");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);
  const handleRadioChangeStatus = (value) => {
    setSelectedStatus(value);
  };
  const handleSave = async (e) => {
    setLoadingSearch(true);
    e.preventDefault();
    const formData = new FormData();

    formData.append("chauffeur_nom", nom_choffeur);
    formData.append("chauffeur_prenom", prenom_choffeur);
    formData.append("chauffeur_telephone", phone_choffeur);
    formData.append("accompagnateur_nom", nom_accompagn);
    formData.append("accompagnateur_prenom", prenom_accompag);
    formData.append("accompagnateur_telephone", phone_accompag);
    formData.append("plaque_voiture", plaque_voiture);
    formData.append("collector_code", collector_code);
    formData.append("id", achat_id);
    formData.append("transfer_date", date_transfert);
    formData.append("quantity_blanc", quantite_blanc);
    formData.append("quantity_jaune", quantite_jaune);
    formData.append("himidity_blanc", degre_humiliteBranc);
    formData.append("himidity_jaune", degre_humiliteJaune);
    formData.append("transfer_number", numero_recu);

    if (photo_recu instanceof File) {
      formData.append("transfer_receipt", photo_recu);
    }

    try {
      const results = await fetchData("patch", `/transfert/${achat_id}/`, {
        params: {},
        additionalHeaders: {},
        body: formData,
      });
      if (results.status == 200) {
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
        const results = await fetchData("get", `/transfert/${achat_id}/`, {
          params: {},
          additionalHeaders: {},
          body: {},
        });
        setData(results);
        console.log("Fetched data:", results);
        const data = results;
        setNomChoffeur(data?.chauffeur_nom || "");
        setPreNomChoffeur(data?.chauffeur_prenom || "");
        setPhoneChoffeur(data?.chauffeur_telephone || "");
        setNomAccompagn(data?.accompagnateur_nom || "");
        setPreNomAccompagn(data?.accompagnateur_prenom || "");
        setPhoneAccompagn(data?.accompagnateur_telephone || "");
        setHangarTransfert(data?.to_hangar?.hangar_name || "");
        setPlaqueVoiture(data?.plaque_voiture || "");
        setQuantiteBlanc(data?.quantity_blanc || "");
        setQuantiteJaune(data?.quantity_jaune);
        setTransfertDate(data?.transfer_date);
        setCollectorCode(data?.collector?.unique_code || "");
        setNumeroRecu(data?.transfer_number || "");
        setPhotoRecu(data?.transfer_receipt || []); // Assuming photo_recu is an array
        setDegreHumiliteBranc(data?.himidity_blanc);
        setDegreHumiliteJaune(data?.himidity_jaune);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    }
    getData();
  }, [achat_id]);
  const handleImageClick = (url) => {
    console.log("Image clicked:", url);
    setModalImageUrl(url);
    setIsImageModalOpen(true);
  };

  return (
    <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Modifier
        </h4>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
          Modifier les informations du Transfer
        </p>
      </div>
      <form className="flex flex-col">
        <div className="custom-scrollbar h-[450px] md:h-[350px] overflow-y-auto px-2 pb-3">
          <div className="mt-7">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div className="col-span-2 lg:col-span-1">
                <Label>Hangar de destination </Label>
                <Input
                  type="text"
                  defaultValue={hangar_transfert}
                  onChange={(e) => setHangarTransfert(e.target.value)}
                />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label> nom du chauffeur </Label>
                <Input
                  type="text"
                  defaultValue={nom_choffeur}
                  onChange={(e) => setNomChoffeur(e.target.value)}
                />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label> prenom du chauffeur </Label>
                <Input
                  type="text"
                  defaultValue={prenom_choffeur}
                  onChange={(e) => setPreNomChoffeur(e.target.value)}
                />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label> telephone du chauffeur </Label>
                <Input
                  type="text"
                  defaultValue={phone_choffeur}
                  onChange={(e) => setPhoneChoffeur(e.target.value)}
                />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label> plaque du voiture </Label>
                <Input
                  type="text"
                  defaultValue={plaque_voiture}
                  onChange={(e) => setPlaqueVoiture(e.target.value)}
                />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label> nom d'accompagnateur </Label>
                <Input
                  type="text"
                  defaultValue={nom_accompagn}
                  onChange={(e) => setNomAccompagn(e.target.value)}
                />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label> prenom d'accompagnateur </Label>
                <Input
                  type="text"
                  defaultValue={prenom_accompag}
                  onChange={(e) => setPreNomAccompagn(e.target.value)}
                />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label> telephone d'accompagnateur </Label>
                <Input
                  type="text"
                  defaultValue={phone_accompag}
                  onChange={(e) => setPhoneAccompagn(e.target.value)}
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
                <Label>Date de transfert</Label>
                <Input
                  type="date"
                  defaultValue={date_transfert}
                  onChange={(e) => setTransfertDate(e.target.value)}
                />
              </div>
              <div
                className="col-span-2 lg:col-span-1"
                onClick={() =>
                  handleImageClick(
                    photo_recu instanceof File
                      ? URL.createObjectURL(photo_recu)
                      : photo_recu // URL venant du backend
                  )
                }
              >
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
          <Button
            size="sm"
            onClick={handleSave}
            className=" bg-yellow-500"
            loading={loadingSearch}
          >
            Enregistrer
          </Button>
        </div>
      </form>
      <ViewImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageUrl={modalImageUrl}
      />
    </div>
  );
}

export default EditTransfertEn;
