"use client";
import React from "react";
import Input from "../../../../ui_elements/form/input/InputField";
import Modal from "../../../../ui_elements/modal";

import Label from "../../../../ui_elements/form/Label";
import Button from "../../../../ui_elements/button/Button";
import { useModal } from "../../../../ui_elements/hooks/useModal";

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
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Information Personnelle
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                MPAWENAYO
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                Musharof
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Prénom
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                Charles
              </p>
            </div>

            {/* <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Email address
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                randomuser@pimjo.com
              </p>
            </div> */}

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Hangar
              </p>
              <p className="text-sm  text-gray-800 dark:text-white/90 font-bold">
                Hangar 1
              </p>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Information de Paiement
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="text-xs leading-normal text-gray-500 dark:text-gray-400">
                Type
              </p>
              <p className="text-sm  text-gray-800 dark:text-white/90 font-semibold">
                LUMICASH
              </p>
            </div>

            <div>
              <p className=" text-xs leading-normal text-gray-500 dark:text-gray-400">
                No
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                68456125
              </p>
            </div>
            <div>
              <p className=" text-xs leading-normal text-gray-500 dark:text-gray-400">
                Nom et Prenom
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                Charles
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
