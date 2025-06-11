"use client";
import React, { useState, useEffect } from "react";
import Input from "../../../ui_elements/form/input/InputField";
import Label from "../../../ui_elements/form/Label";
import Button from "../../../ui_elements/button/Button";
import Radio from "../../../ui_elements/form/input/Radio";
import { fetchData } from "../../../../_utils/api";

function EditUserProfile({ closeModal, cultivateur_id }) {
  const [selectedStatus, setSelectedStatus] = useState("option2");
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [cullivator_cni, setCNI] = useState("");

  const handleRadioChangeStatus = (value) => {
    setSelectedStatus(value);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = {
      // cultivator_code: code,
      cultivator_first_name: firstName,
      cultivator_last_name: name,
      cultivator_cni: cullivator_cni,
    };

    try {
      const results= await fetchData("patch", `/cultivators/${cultivateur_id}/`, {
        params: {},
        additionalHeaders: {},
        body: formData,
      });
    
      if(results==200){
        closeModal();
      }
      else{
        console.log("error")
      }
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        const results = await fetchData("get", `/cultivators/${cultivateur_id}/`, {
          params: {},
          additionalHeaders: {},
          body: {},
        });
        setData(results);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    }
    getData();
  }, [cultivateur_id]);

  // Met à jour les champs quand data change
  useEffect(() => {
    setCode(data?.cultivator_code || "");
    setName(data?.cultivator_last_name || "");
    setFirstName(data?.cultivator_first_name || "");
    setCNI(data?.cultivator_cni || "");
  }, [data]);

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

            <Input
              type="text"
              defaultValue={code}
              onChange={e => setCode(e.target.value)}
              disabled 
            />

          </div>
          <div className="mt-7">
            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
              Personal Information
            </h5>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div className="col-span-2 lg:col-span-1">
                <Label>Nom</Label>
                <Input
                  type="text"
                  defaultValue={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label>Prenom</Label>
                <Input
                  type="text"
                  defaultValue={firstName}
                  onChange={e => setFirstName(e.target.value)}
                />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label>CNI</Label>
                <Input
                  type="text"
                  defaultValue={cullivator_cni}
                  onChange={e => setCNI(e.target.value)}
                />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label>Phone</Label>
                <Input type="text" value={data?.cultivator_phone || ""} readOnly />
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

export default EditUserProfile;