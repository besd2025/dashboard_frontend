"use client";
import Button from "../../../ui_elements/button/Button";
import Input from "../../../ui_elements/form/input/InputField";
import Label from "../../../ui_elements/form/Label";
import React, { useEffect, useState } from "react";
import Select from "../../../ui_elements/form/Select";
import { fetchData } from "../../../../_utils/api";

function AddHangar() {
  const [formData, setFormData] = useState({
    name: "",
    initialStock: "",
    province: "",
    commune: "",
    zone: "",
  });
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [communeOptions, setCommuneOptions] = useState([]);
  const [zoneOptions, setZoneOptions] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectProvinceChange = async (value) => {
    setFormData((prev) => ({
      ...prev,
      province: value,
      commune: "",
      zone: "",
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

  const handleSelectZoneChange = (value) => {
    setFormData((prev) => ({ ...prev, zone: value }));
  };

  useEffect(() => {
    async function getProvinces() {
      try {
        const provinces = await fetchData("get", `adress/province/`, {
          params: { offset: 0, limit: 18 },
          additionalHeaders: {},
          body: {},
        });
        const options = provinces?.results?.map((item) => ({
          value: item.province_name,
          label: item.province_name,
        }));
        setProvinceOptions(options);
      } catch (err) {
        setError(err);
      }
    }
    getProvinces();
  }, []);

  return (
    <div className="max-w-3xl p-6 bg-white rounded-2xl">
      <div>
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Ajouter un Hangar
          </h3>
          <div>
            <Label htmlFor="hangar-name">Hangar nom</Label>
            <Input
              type="text"
              id="hangar-name"
              name="name"
              placeholder="Nom du hangar"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="hangar-code">Hangar code</Label>
            <Input
              type="text"
              id="hangar-code"
              name="code"
              placeholder="Code du hangar"
              value={formData.code}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="initial-stock">Stock initial</Label>
            <Input
              type="number"
              id="initial-stock"
              name="initialStock"
              placeholder="Stock initial"
              value={formData.initialStock}
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
            <Button
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

export default AddHangar;
