"use client";
import React, { useState } from "react";
import Label from "../../../ui_elements/form/Label";
import Input from "../../../ui_elements/form/input/InputField";

import DatePicker from "../../../ui_elements/form/date-picker";
import ComponentCard from "../../../common/ComponentCard";
import TextArea from "../../../ui_elements/form/input/TextArea";
import Button from "../../../ui_elements/button/Button";

function Synthese() {
  const [message, setMessage] = useState("");
  return (
    <div className="max-w-3xl p-6">
      <div>
        <div className="space-y-6">
          <div>
            <Label
              htmlFor="input-placeholder"
              className="text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Quantités collectées
            </Label>
            <Input
              type="text"
              id="input-placeholder"
              name="input-placeholder"
              placeholder="Kg"
              defaultValue=""
              onChange={() => {}}
              min=""
              max=""
              step=""
              hint=""
            />
          </div>

          <div>
            <DatePicker
              id="date-picker"
              label="Date"
              placeholder="Select a date"
              mode="single"
              defaultDate={new Date()}
              onChange={(dates, currentDateString) => {
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
          <div>
            <Button
              className="w-sm bg-yellow-500 hover:bg-yellow-600"
              size="sm"
            >
              Envoyer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Synthese;
