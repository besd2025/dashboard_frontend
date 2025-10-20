"use client";
import Button from "../../../ui_elements/button/Button";
import Input from "../../../ui_elements/form/input/InputField";
import Label from "../../../ui_elements/form/Label";
import Select from "../../../ui_elements/form/Select";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../_utils/api";
function AddCollecor() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    phone: "",
    cni: "",
    identifiant: "",
    adress_code: "",
    password: "",
    hangar_code: "",
    colline: "",
  });
  const [error, setError] = useState(null);
  const [hangarlist, setHangarList] = useState([]);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [communeOptions, setCommuneOptions] = useState([]);
  const [zoneOptions, setZoneOptions] = useState([]);
  const [collineOptions, setCollineOptions] = useState([]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectProvinceChange = async (value) => {
    setFormData((prev) => ({
      ...prev,
      province: value,
      commune: "",
      zone: "",
      colline: "",
    }));
    if (!value) {
      setCommuneOptions([]);
      setZoneOptions([]);
      return;
    }
    try {
      const communes = await fetchData(
        "get",
        `adress/commune/get_communes_by_province`,
        {
          params: { province: value },
          additionalHeaders: {},
          body: {},
        }
      );
      const options = communes?.map((item) => ({
        value: item.commune_name,
        label: item.commune_name,
      }));
      setCommuneOptions(options);
      setZoneOptions([]);
    } catch (err) {
      setError(err);
    }
  };

  const handleSelectCommuneChange = async (value) => {
    setFormData((prev) => ({ ...prev, commune: value, zone: "" }));
    if (!value) {
      setZoneOptions([]);
      return;
    }
    try {
      const zones = await fetchData(
        "get",
        `adress/zone/get_zones_by_commune/`,
        {
          params: { commune: value },
          additionalHeaders: {},
          body: {},
        }
      );
      const options = zones?.map((item) => ({
        value: item.zone_name,
        label: item.zone_name,
      }));
      setZoneOptions(options);
    } catch (err) {
      setError(err);
    }
  };

  const handleSelectZoneChange = async (value) => {
    setFormData((prev) => ({ ...prev, zone: value }));
    if (!value) {
      setCollineOptions([]);
      return;
    }
    try {
      const collines = await fetchData(
        "get",
        `adress/colline/get_collines_by_zone/`,
        {
          params: { zone: value },
          additionalHeaders: {},
          body: {},
        }
      );
      const options = collines?.map((item) => ({
        value: item.colline_code,
        label: item.colline_name,
      }));
      setCollineOptions(options);
    } catch (err) {
      setError(err);
    }
  };
  const handleSelectCollineChange = (value) => {
    setFormData((prev) => ({ ...prev, colline: value }));
  };

  useEffect(() => {
    async function getHangarList() {
      try {
        const hangars = await fetchData(
          "get",
          `hangars/get_hangars_for_transfert/`,
          {
            params: { offset: 0, limit: 18 },
            additionalHeaders: {},
            body: {},
          }
        );
        const options = hangars?.map((item) => ({
          value: item.hangar_code,
          label: item.hangar_name,
        }));
        setHangarList(options);

        const provinces = await fetchData("get", `adress/province/`, {
          params: { offset: 0, limit: 18 },
          additionalHeaders: {},
          body: {},
        });
        const optionsrovinces = provinces?.results?.map((item) => ({
          value: item.province_name,
          label: item.province_name,
        }));
        setProvinceOptions(optionsrovinces);
      } catch (err) {
        setError(err);
      }
    }
    getHangarList();
  }, []);
  const handleHangarChange = (value) => {
    setFormData((prev) => ({ ...prev, hangar_code: value }));
  };
  const Create_Collector = async () => {
    if (formData) {
      const formdata = {
        last_name: formData.nom,
        first_name: formData.prenom,
        phone: formData.phone,
        cni: formData.cni,
        identifiant: formData.identifiant,
        adress_code: formData.colline,
        password: formData.password,
        hangar_code: formData.hangar_code,
      };

      const response = await fetchData("post", `/collecteur_registration/`, {
        params: {},
        additionalHeaders: {},
        body: formdata,
      });
      if (response.status == 201) {
        window.location.reload();
      } else {
        setError("erreur d'enregistrement");
      }
    } else {
      setError("complete d'abord tous les cases ");
    }
  };

  return (
    <div className="max-w-3xl p-6 bg-white rounded-2xl">
      <div>
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Ajouter un Collecteur
          </h3>
          <div>
            <Label htmlFor="collector-name">Nom du Collecteur</Label>
            <Input
              type="text"
              id="collector-name"
              name="nom"
              placeholder="Nom du Collecteur"
              value={formData.nom}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="collector-frist_name">Prenom du Collecteur</Label>
            <Input
              type="text"
              id="hangar-frist_name"
              name="prenom"
              placeholder="Prenom du Collecteur"
              value={formData.prenom}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="collector-phone">Téléphone</Label>
            <Input
              type="text"
              id="collector-phone"
              name="phone"
              placeholder="Téléphone Du Collecteur"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="collctor-cni">CNI Du Collecteur</Label>
            <Input
              type="text"
              id="cni"
              name="cni"
              placeholder="CNI Du Collecteur"
              value={formData.prenom}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="Collector-identifiant">Identifiant</Label>
            <Input
              type="text"
              id="Collector-identifiant"
              name="identifiant"
              placeholder="Identifiant du Collecteur"
              value={formData.identifiant}
              onChange={handleChange}
            />
          </div>
          {/* <div>
            <Label htmlFor="collector-adress">Adresse du Collecteur</Label>
            <Input
              type="text"
              id="collector-adress"
              name="adress_code"
              placeholder="Adresse du Collecteur"
              value={formData.adress_code}
              onChange={handleChange}
            />
          </div> */}
          <div>
            <Label htmlFor="collector-password">Mot de paasse</Label>
            <Input
              type="text"
              id="collector-password"
              name="password"
              placeholder="Mot de paasse du Collecteur"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Province</Label>
            <Select
              options={provinceOptions}
              placeholder="Sélectionner la province"
              onChange={handleSelectProvinceChange}
              className="dark:bg-dark-900"
            />
          </div>
          <div>
            <Label>Commune</Label>
            <Select
              options={communeOptions}
              placeholder="Sélectionner la commune"
              onChange={handleSelectCommuneChange}
              className="dark:bg-dark-900"
            />
          </div>
          <div>
            <Label>Zone</Label>
            <Select
              options={zoneOptions}
              placeholder="Sélectionner la zone"
              onChange={handleSelectZoneChange}
              className="dark:bg-dark-900"
            />
          </div>
          <div>
            <Label>Colline</Label>
            <Select
              options={collineOptions}
              placeholder="Sélectionner la zone"
              onChange={handleSelectCollineChange}
              className="dark:bg-dark-900"
            />
          </div>
          <div>
            <Label>Hangar</Label>
            <Select
              options={hangarlist}
              placeholder="Sélectionner le hangar"
              onChange={handleHangarChange}
              className="dark:bg-dark-900"
            />
          </div>
          <div>
            <Button
              onClick={Create_Collector}
              className="w-sm bg-yellow-500 hover:bg-yellow-600"
              size="sm"
            >
              Ajouter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCollecor;
