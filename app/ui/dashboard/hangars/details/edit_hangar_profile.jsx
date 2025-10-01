"use client";
import React, { useState, useEffect } from "react";
import Input from "../../../ui_elements/form/input/InputField";
import Label from "../../../ui_elements/form/Label";
import Button from "../../../ui_elements/button/Button";
import { fetchData } from "../../../../_utils/api";
function EditHangarProfile({ closeModal, hangar_id }) {
  const [selectedStatus, setSelectedStatus] = useState("option2");
  const [nom_hangar, setNomHangar] = useState("");
  const [nom_collecteur, setNomCollecteur] = useState("");
  const [prenom_collecteur, setPrenomCollecteur] = useState("");
  const [identiant_collecteur, setIdentifiantCollecteur] = useState("");
  const [Phone_collector, setPhoneCollector] = useState("");
  const [cni_collecteur, setCniCollecteur] = useState("");
  const [password_collecteur, setPasswordCollecteur] = useState("");
  const [Confirm_password_collecteur, setConfirmPasswordCollecteur] =
    useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleRadioChangeStatus = (value) => {
    setSelectedStatus(value);
  };
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!hangar_id) return; // Ne rien faire si l'ID est invalide

    const getData = async () => {
      try {
        const results = await fetchData("get", `hangars/${hangar_id}/`, {
          params: {},
          additionalHeaders: {},
          body: {},
        });
        setData(results);
        console.log("result_update: ", results);
        setNomHangar(results.hangar_name || "");
        const fullName = results.responsable_name || "";
        const [prenom, ...nomParts] = fullName.split(" ");
        const nom = nomParts.join(" "); // s'il y a plusieurs parties pour le nom

        setPrenomCollecteur(prenom);
        setNomCollecteur(nom);
        setIdentifiantCollecteur(results.responsable_identifiant || "");
        setPhoneCollector(results.responsable_phone || "");
        setCniCollecteur(results.responsable_cni || "");
        setPasswordCollecteur(results.password || "");
      } catch (error) {
        setError(error);
        console.error(error);
      }
    };

    getData();
  }, [hangar_id]);

  const handleSave = (e) => {
    // Handle save logic here
    e.preventDefault();
    if (password_collecteur !== Confirm_password_collecteur) {
      setErrorMessage("Les mots de passe ne correspondent pas");
      e.preventDefault();
    } else {
      const formData = {
        hangar_name: nom_hangar,
        first_name: prenom_collecteur,
        last_name: nom_collecteur,
        identifiant: identiant_collecteur,
        phone: Phone_collector,
        cni: cni_collecteur,
        password: password_collecteur,
      };

      fetchData(
        "patch",
        `hangars/${hangar_id}/change_user_collector_information_and_hangar_name/`,
        {
          params: {},
          additionalHeaders: {},
          body: formData,
        }
      ).then((results) => {
        if (results.status === 200) {
          window.location.reload();
        } else {
          console.log("Update failed");
        }
      });
    }
  };
  const [isHangarDes, setHangarDes] = useState(false);
  const handleCheckBoxChange = (e) => {
    setHangarDes(!isHangarDes);
  };
  return (
    <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Modifier
        </h4>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
          Modifier les informations du Hangar
        </p>
      </div>
      <form className="flex flex-col">
        <div className="custom-scrollbar h-[450px] md:h-[350px] overflow-y-auto px-2 pb-3">
          <div>
            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
              Nom du Hangar
            </h5>
            <Input
              type="text"
              defaultValue={nom_hangar}
              onChange={(e) => setNomHangar(e.target.value)}
            />
          </div>
          <div className="mt-7">
            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
              Informations du Collecteur
            </h5>

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div className="col-span-2 lg:col-span-1">
                <Label>Nom</Label>
                <Input
                  type="text"
                  defaultValue={nom_collecteur}
                  onChange={(e) => setNomCollecteur(e.target.value)}
                />
              </div>

              <div className="col-span-2 lg:col-span-1">
                <Label>Prenom</Label>
                <Input
                  type="text"
                  defaultValue={prenom_collecteur}
                  onChange={(e) => setPrenomCollecteur(e.target.value)}
                />
              </div>

              <div className="col-span-2 lg:col-span-1">
                <Label>Identifiant</Label>
                <Input
                  type="text"
                  defaultValue={identiant_collecteur}
                  onChange={(e) => setIdentifiantCollecteur(e.target.value)}
                />
              </div>

              <div className="col-span-2 lg:col-span-1">
                <Label>Phone</Label>
                <Input
                  type="text"
                  defaultValue={Phone_collector}
                  onChange={(e) => setPhoneCollector(e.target.value)}
                />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label>CNI</Label>
                <Input
                  type="text"
                  defaultValue={cni_collecteur}
                  onChange={(e) => setCniCollecteur(e.target.value)}
                />
              </div>
              <br></br>
              <div>
                <span className="text-red-500">{errorMessage}</span>
              </div>
              <br></br>
              <div className="col-span-2 lg:col-span-1">
                <Label>mot de passe</Label>
                <Input
                  type="text"
                  defaultValue={password_collecteur}
                  onChange={(e) => setPasswordCollecteur(e.target.value)}
                />
              </div>

              <div className="col-span-2 lg:col-span-1">
                <Label> confirme le mot de passe</Label>
                <Input
                  type="text"
                  defaultValue={Confirm_password_collecteur}
                  onChange={(e) => setConfirmPasswordCollecteur(e.target.value)}
                />
              </div>
            </div>
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

export default EditHangarProfile;
