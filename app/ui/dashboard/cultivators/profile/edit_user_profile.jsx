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
  const [date_naissance, setDateNaissance] = useState("");
  const [mode_payment, setPaymentMode] = useState("");
  const [bank_name, setBankName] = useState("");
  const [bank_acount, setBankAcount] = useState("");
  const [payment_phone, setPaymentPhone] = useState("");
  const [proprietaire, setProprietaire] = useState("");
  const [genre, setGenre] = useState("");
  const [address_code, setAdressCode] = useState("");
  const [collector_code, setCollectorCode] = useState("");
  const handleRadioChangeStatus = (value) => {
    setSelectedStatus(value);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = {
      cultivator_code: code,
      cultivator_first_name: firstName,
      cultivator_last_name: name,
      cultivator_cni: cullivator_cni,
      cultivator_gender: genre,
      date_naissance: date_naissance,
      cultivator_mobile_payment_name: mode_payment,
      cultivator_bank_name: bank_name,
      cultivator_bank_account: bank_acount,
      cultivator_mobile_payment: payment_phone,
      cultivator_mobile_payment_user_name: proprietaire,
      cultivator_adress_code: address_code,
      collector_code: collector_code,
    };

    try {
      const results = await fetchData(
        "patch",
        `/cultivators/${cultivateur_id}/`,
        {
          params: {},
          additionalHeaders: {},
          body: formData,
        }
      );
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
        const results = await fetchData(
          "get",
          `/cultivators/${cultivateur_id}/`,
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );
        setData(results);
        const data = results;
        setCode(data?.cultivator_code || "");
        setName(data?.cultivator_last_name || "");
        setFirstName(data?.cultivator_first_name || "");
        setCNI(data?.cultivator_cni || "");
        setGenre(data?.cultivator_gender);
        setDateNaissance(data?.date_naissance);
        setPaymentMode(data?.cultivator_mobile_payment_name);
        setBankName(data?.cultivator_bank_name);
        setBankAcount(data?.cultivator_bank_account);
        setPaymentPhone(data?.cultivator_mobile_payment);
        setProprietaire(data?.cultivator_mobile_payment_user_name);
        setAdressCode(data?.cultivator_adress?.colline_code);
        setCollectorCode(data?.collector?.unique_code);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    }
    getData();
  }, [cultivateur_id]);

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
                <Label>CNI</Label>
                <Input
                  type="text"
                  defaultValue={cullivator_cni}
                  onChange={(e) => setCNI(e.target.value)}
                />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label>Date de naissance</Label>
                <Input type="date" defaultValue={date_naissance} />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label>Sexe</Label>
                <Input type="text" defaultValue={genre} />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label>Mode de payement</Label>
                <Input type="text" defaultValue={mode_payment} />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label>Nom de Banque</Label>
                <Input type="text" defaultValue={bank_name} />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label>Numéro de compte Bancaire</Label>
                <Input type="text" defaultValue={bank_acount} />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label>Numéro de telephone de paiement</Label>
                <Input type="text" defaultValue={payment_phone || ""} />
              </div>
              <div className="col-span-2 lg:col-span-1">
                <Label>propriétaire</Label>
                <Input type="text" defaultValue={proprietaire || ""} />
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

export default EditUserProfile;
