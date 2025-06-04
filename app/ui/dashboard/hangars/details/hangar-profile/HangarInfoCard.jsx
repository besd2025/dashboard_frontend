"use client";
import React from "react";
import Input from "../../../../ui_elements/form/input/InputField";
import Modal from "../../../../ui_elements/modal";

import Label from "../../../../ui_elements/form/Label";
import Button from "../../../../ui_elements/button/Button";
import { useModal } from "../../../../ui_elements/hooks/useModal";
import CardsOverview from "../../../home/cards_overview";

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <CardsOverview />
      </div>
    </div>
  );
}
