"use client";
import React, { useState } from "react";
import Input from "../input/InputField";
import Label from "../Label";
import ComponentCard from "../../../common/ComponentCard";

const InputStates = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  // Simulate a validation check
  const validateEmail = (value) => {
    const isValidEmail =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    setError(!isValidEmail);
    return isValidEmail;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  return (
    <ComponentCard
      title="Input States"
      desc="Validation styles for error, success and disabled states on form controls."
    >
      <div className="space-y-5 sm:space-y-6">
        {/* Error Input */}
        <div>
          <Label
            htmlFor="email-error"
            className="text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Email
          </Label>
          <Input
            type="email"
            id="email-error"
            name="email-error"
            defaultValue={email}
            error={error}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            hint={error ? "This is an invalid email address." : ""}
            min=""
            max=""
            step=""
          />
        </div>

        {/* Success Input */}
        <div>
          <Label
            htmlFor="email-success"
            className="text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Email
          </Label>
          <Input
            type="email"
            id="email-success"
            name="email-success"
            defaultValue={email}
            success={!error}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            hint={!error ? "Valid email!" : ""}
            min=""
            max=""
            step=""
          />
        </div>

        {/* Disabled Input */}
        <div>
          <Label
            htmlFor="email-disabled"
            className="text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Email
          </Label>
          <Input
            type="text"
            id="email-disabled"
            name="email-disabled"
            defaultValue="disabled@example.com"
            disabled={true}
            placeholder="Disabled email"
            hint="This field is disabled."
            min=""
            max=""
            step=""
            onChange={() => {}}
          />
        </div>
      </div>
    </ComponentCard>
  );
};

export default InputStates;
