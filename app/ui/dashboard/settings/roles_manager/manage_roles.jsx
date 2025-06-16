"use client";
import Modal from "../../../ui_elements/modal";
import { useModal } from "../../../ui_elements/hooks/useModal";
import LoginHistory from "../../../ui_elements/tables/dashboard/settings/login_history";
import Link from "next/link";
import React, { useState } from "react";
import Input from "../../../ui_elements/form/input/InputField";
import Button from "../../../ui_elements/button/Button";
import Label from "../../../ui_elements/form/Label";
import Radio from "../../../ui_elements/form/input/Radio";
import Select from "../../../ui_elements/form/Select";
import { ChevronDownIcon } from "../../../icons";
import AdminUserList from "../../../ui_elements/tables/dashboard/settings/admin_user_list";

function ManageRoles() {
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedStatus, setSelectedStatus] = useState("");
  const handleRadioChangeStatus = (value) => {
    setSelectedStatus(value);
  };
  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };
  const optionRole = [
    { value: "Super admin", label: "Super admin" },
    { value: "Lecteur", label: "Lecteur" },
    { value: "Editeur", label: "Editeur" },
  ];
  const handleSelectChange = (value) => {
    // console.log("Selected value:", value);
  };
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Gestion des roles
        </h3>
        <div className="space-y-4">
          <Button
            onClick={openModal}
            className="flex flex-row items-center bg-gray-100 hover:bg-gray-200 rounded-md dark:bg-white/[0.03] text-yellow-500 w-max font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            </svg>
            <span className="text-sm tracking-wide truncate">Ajouter</span>
          </Button>

          <div className="w-full">
            <AdminUserList />
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Nouvel utilisateur
            </h4>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-max overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Nom</Label>
                    <Input type="text" placeholder="Entrer le nom" />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Prenom</Label>
                    <Input type="text" placeholder="Entrer le prenom" />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Telephone</Label>
                    <Input type="text" placeholder="Entrer le Telephone" />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <div className="space-y-6">
                      <div>
                        <Label>Role</Label>
                        <div className="relative">
                          <Select
                            options={optionRole}
                            placeholder="Selectionner role"
                            onChange={handleSelectChange}
                            className="dark:bg-dark-900"
                          />
                          <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                            <ChevronDownIcon />
                          </span>
                        </div>
                      </div>
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
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Fermer
              </Button>
              <Button size="sm" onClick={handleSave}>
                Enregistrer
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default ManageRoles;
