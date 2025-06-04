"use client";
import React, { useState } from "react";
import ComponentCard from "../../../common/ComponentCard";
import TextArea from "../input/TextArea";
import Label from "../Label";

export default function TextAreaInput() {
  const [message, setMessage] = useState("");
  const [messageTwo, setMessageTwo] = useState("");
  return (
    <ComponentCard title="Textarea input field">
      <div className="space-y-6">
        {/* Default TextArea */}
        <div>
          <Label
            htmlFor="description"
            className="text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Description
          </Label>
          <TextArea
            value={message}
            onChange={(value) => setMessage(value)}
            rows={6}
          />
        </div>

        {/* Disabled TextArea */}
        <div>
          <Label
            htmlFor="description-disabled"
            className="text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Description
          </Label>
          <TextArea rows={6} disabled onChange={() => {}} value="" />
        </div>

        {/* Error TextArea */}
        <div>
          <Label
            htmlFor="description-error"
            className="text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Description
          </Label>
          <TextArea
            rows={6}
            value={messageTwo}
            error
            onChange={(value) => setMessageTwo(value)}
            hint="Please enter a valid message."
          />
        </div>
      </div>
    </ComponentCard>
  );
}
