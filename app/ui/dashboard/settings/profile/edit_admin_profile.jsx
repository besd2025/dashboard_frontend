"use client";
import React, { useState } from "react";
import Input from "../../../ui_elements/form/input/InputField";
import Label from "../../../ui_elements/form/Label";
import Button from "../../../ui_elements/button/Button";
import Radio from "../../../ui_elements/form/input/Radio";

function EditAdminProfile({ closeModal }) {
  const [selectedStatus, setSelectedStatus] = useState("option2");

  const handleRadioChangeStatus = (value) => {
    setSelectedStatus(value);
  };

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };
  return (
    <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Modifier
        </h4>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
          Modifier les informations personnelles
        </p>
      </div>
      <form className="flex flex-col">
        <div className="custom-scrollbar h-[450px] md:h-[350px] overflow-y-auto px-2 pb-3">
          <div>
            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
              ID
            </h5>
            <Input type="text" defaultValue="id54254Hkhjk6" disabled />
          </div>
          <div className="mt-7">
            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
              Personal Information
            </h5>

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div className="col-span-2 lg:col-span-1">
                <Label>Nom</Label>
                <Input type="text" defaultValue="Musharof" />
              </div>

              <div className="col-span-2 lg:col-span-1">
                <Label>Prenom</Label>
                <Input type="text" defaultValue="Chowdhury" />
              </div>

              <div className="col-span-2 lg:col-span-1">
                <Label>Email Address</Label>
                <Input type="text" defaultValue="randomuser@pimjo.com" />
              </div>

              <div className="col-span-2 lg:col-span-1">
                <Label>Phone</Label>
                <Input type="text" defaultValue="+09 363 398 46" />
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
          <Button size="sm" onClick={handleSave}>
            Enregistrer
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditAdminProfile;
