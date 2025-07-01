import React, { useState } from "react";
import Label from "../../ui_elements/form/Label";
import Input from "../../ui_elements/form/input/InputField";
import Select from "../../ui_elements/form/Select";
import FileInput from "../../ui_elements/form/input/FileInput";

function AddOrderModal() {
  const [paymentMode, setPaymentMode] = useState("");

  return (
    <div className="overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
      <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
        Informations de la commande
      </h5>
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
        <div className="col-span-2 lg:col-span-1">
          <Label>Date de commande</Label>
          <Input type="date" />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Label>Quantité</Label>
          <Input type="number" min={1} />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Label>Prix unitaire</Label>
          <Input type="number" min={0} step={0.01} />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Label>Mode de paiement</Label>
          <Select
            options={[
              { value: "bank", label: "Banque" },
              { value: "mobile", label: "Mobile Money" },
            ]}
            placeholder="Choisir le mode de paiement"
            onChange={setPaymentMode}
          />
        </div>
        {paymentMode === "bank" && (
          <div className="col-span-2 lg:col-span-1">
            <Label>Numéro de compte bancaire</Label>
            <Input type="text" />
          </div>
        )}
        {paymentMode === "mobile" && (
          <>
            <div className="col-span-2 lg:col-span-1">
              <Label>Numéro Mobile Money</Label>
              <Input type="text" />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <Label>Nom du propriétaire</Label>
              <Input type="text" />
            </div>
          </>
        )}
        <div className="col-span-2 lg:col-span-1">
          <Label>Bordereau de commande</Label>
          <FileInput />
        </div>
      </div>
    </div>
  );
}

export default AddOrderModal;
