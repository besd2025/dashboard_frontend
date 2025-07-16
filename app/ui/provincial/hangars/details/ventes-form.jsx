"use client";
import React, { useState } from "react";
import Label from "../../../ui_elements/form/Label";
import Input from "../../../ui_elements/form/input/InputField";

import DatePicker from "../../../ui_elements/form/date-picker";
import ComponentCard from "../../../common/ComponentCard";
import TextArea from "../../../ui_elements/form/input/TextArea";
import Button from "../../../ui_elements/button/Button";
import SuccessModal from "./SuccessModal";

function VentesForm() {
  const [message, setMessage] = useState("");
  const [nbAcheteurs, setNbAcheteurs] = useState("");
  const [qteMaisBlancs, setQteMaisBlancs] = useState("");
  const [qteMaisJaune, setQteMaisJaune] = useState("");
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici tu peux ajouter la logique d’envoi réelle
    setShowSuccess(true);
  };
  return (
    <div className="max-w-3xl p-6">
      <div>
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Rapport synthese journalier
          </h3>

          <div>
            <Label
              htmlFor="nb-acheteurs"
              className="text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Nombre d'acheteur <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              id="nb-acheteurs"
              name="nb-acheteurs"
              placeholder="Nombre"
              value={nbAcheteurs}
              onChange={(e) => setNbAcheteurs(e.target.value)}
              min="0"
            />
          </div>

          <div>
            <Label
              htmlFor="qte-mais-blancs"
              className="text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Qte mais blanc (Kg) <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              id="qte-mais-blancs"
              name="qte-mais-blancs"
              placeholder="Kg"
              value={qteMaisBlancs}
              onChange={(e) => setQteMaisBlancs(e.target.value)}
              min="0"
            />
          </div>

          <div>
            <Label
              htmlFor="qte-mais-jaune"
              className="text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Qte mais jaune (Kg) <span className="text-red-500">*</span>
            </Label>
            <Input
              type="number"
              id="qte-mais-jaune"
              name="qte-mais-jaune"
              placeholder="Kg"
              value={qteMaisJaune}
              onChange={(e) => setQteMaisJaune(e.target.value)}
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
                console.log({ dates, currentDateString });
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
          message="Rapport vente envoyé avec succès !"
        />
      </div>
    </div>
  );
}

export default VentesForm;
