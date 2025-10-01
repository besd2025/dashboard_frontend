"use client";
import React, { useState, useEffect } from "react";
import Input from "../../../../../ui_elements/form/input/InputField";
import Label from "../../../../../ui_elements/form/Label";
import Button from "../../../../../ui_elements/button/Button";
import Radio from "../../../../../ui_elements/form/input/Radio";
import { fetchData } from "../../../../../../_utils/api";
import Checkbox from "../../../../../ui_elements/form/input/Checkbox";
function EditHangarTransfer({ closeModal, hangar_id, hangar_name }) {
  const [nom_hangar, setNomHangar] = useState(hangar_name || "");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = (e) => {
    // Handle save logic here
    e.preventDefault();
    if (nom_hangar === "") {
      setErrorMessage("saisir le nom du hangar");
      e.preventDefault();
    } else {
      const formData = {
        hangar_name: nom_hangar,
        for_transfert: isHangarDes,
      };

      fetchData(
        "patch",
        `hangars/${hangar_id}/`,

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
              defaultValue={hangar_name}
              onChange={(e) => setNomHangar(e.target.value)}
            />
          </div>
          <div>
            <Label>Hangar de desangorgement ?</Label>
            <Checkbox
              placeholder="Sélectionner la zone"
              onChange={handleCheckBoxChange}
              className="dark:bg-dark-900"
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

export default EditHangarTransfer;
