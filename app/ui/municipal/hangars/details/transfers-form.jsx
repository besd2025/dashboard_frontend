"use client";
import React, { useState, useEffect } from "react";
import Label from "../../../ui_elements/form/Label";
import Input from "../../../ui_elements/form/input/InputField";
import DatePicker from "../../../ui_elements/form/date-picker";
import ComponentCard from "../../../common/ComponentCard";
import Button from "../../../ui_elements/button/Button";
import Select from "../../../ui_elements/form/Select";
import { fetchData } from "../../../../_utils/api";
import TextArea from "../../../ui_elements/form/input/TextArea";
import SuccessModal from "./SuccessModal";
import LoadingDots from "../../../ui_elements/loading/loading_dots";

function TransfersForm() {
  const [hangars, setHangars] = useState([]);
  const [provenance, setProvenance] = useState("");
  const [recus, setRecus] = useState("");
  const [qteBlancTransfere, setQteBlancTransfere] = useState("");
  const [qteJauneTransfere, setQteJauneTransfere] = useState("");
  const [qteBlancRecus, setQteBlancRecus] = useState("");
  const [qteJauneRecus, setQteJauneRecus] = useState("");
  const [date, setDate] = useState(new Date());
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getHangars() {
      try {
        const results = await fetchData("get", "/hangars/", {
          params: { limit: 100 },
        });
        setHangars(
          (results.results || []).map((h) => ({
            value: h.id,
            label: h.hangar_name || h.hangar_code || `Hangar ${h.id}`,
          }))
        );
      } catch (e) {
        setHangars([]);
      }
    }
    getHangars();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici tu peux ajouter la logique d’envoi réelle
    setShowSuccess(true);
  };

  return (
    <div className="max-w-3xl p-6">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Rapport de transfert de maïs
        </h3>
        <div>
          <Label
            htmlFor="provenance"
            className="text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Hangar de provenance <span className="text-red-500">*</span>
          </Label>
          <Select
            id="provenance"
            options={hangars}
            value={provenance}
            onChange={setProvenance}
            placeholder="Sélectionner le hangar de provenance"
          />
        </div>
        <div>
          <Label
            htmlFor="recus"
            className="text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Hangar de reçus <span className="text-red-500">*</span>
          </Label>
          <Select
            id="recus"
            options={hangars}
            value={recus}
            onChange={setRecus}
            placeholder="Sélectionner le hangar de reçus"
          />
        </div>
        <div>
          <Label
            htmlFor="qte-blanc-transfere"
            className="text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Qte mais blanc transféré <span className="text-red-500">*</span>
          </Label>
          <Input
            type="number"
            id="qte-blanc-transfere"
            name="qte-blanc-transfere"
            placeholder="Kg"
            value={qteBlancTransfere}
            onChange={(e) => setQteBlancTransfere(e.target.value)}
            min="0"
          />
        </div>
        <div>
          <Label
            htmlFor="qte-jaune-transfere"
            className="text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Qte mais jaune transféré <span className="text-red-500">*</span>
          </Label>
          <Input
            type="number"
            id="qte-jaune-transfere"
            name="qte-jaune-transfere"
            placeholder="Kg"
            value={qteJauneTransfere}
            onChange={(e) => setQteJauneTransfere(e.target.value)}
            min="0"
          />
        </div>
        <div>
          <Label
            htmlFor="qte-blanc-recus"
            className="text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Qte mais blanc reçus <span className="text-red-500">*</span>
          </Label>
          <Input
            type="number"
            id="qte-blanc-recus"
            name="qte-blanc-recus"
            placeholder="Kg"
            value={qteBlancRecus}
            onChange={(e) => setQteBlancRecus(e.target.value)}
            min="0"
          />
        </div>
        <div>
          <Label
            htmlFor="qte-jaune-recus"
            className="text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Qte mais jaune reçus <span className="text-red-500">*</span>
          </Label>
          <Input
            type="number"
            id="qte-jaune-recus"
            name="qte-jaune-recus"
            placeholder="Kg"
            value={qteJauneRecus}
            onChange={(e) => setQteJauneRecus(e.target.value)}
            min="0"
          />
        </div>
        <div>
          <Label
            htmlFor="date-picker"
            className="text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Date <span className="text-red-500">*</span>
          </Label>
          <DatePicker
            id="date-picker"
            label=""
            placeholder="Select a date"
            mode="single"
            defaultDate={date}
            onChange={(dates, currentDateString) => {
              setDate(dates);
            }}
          />
        </div>
        <div>
          <Label
            htmlFor="description"
            className="text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Observation
          </Label>
          <TextArea
            value={message}
            onChange={(value) => setMessage(value)}
            rows={6}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <Button
              className="w-sm bg-yellow-500 hover:bg-yellow-600"
              size="sm"
              type="submit"
            >
              {loading ? <LoadingDots /> : "Envoyer"}
            </Button>
          </div>
        </form>
      </div>
      <SuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Rapport transfert envoyé avec succès !"
      />
    </div>
  );
}

export default TransfersForm;
