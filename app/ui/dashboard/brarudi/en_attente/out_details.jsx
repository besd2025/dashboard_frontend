"use client";
import React, { useState, useEffect } from "react";
import Button from "../../../ui_elements/button/Button";
import ViewImageModal from "../../../ui_elements/modal/ViewImageModal";
import Select from "../../../ui_elements/form/Select";
import { ChevronDownIcon } from "../../../icons";
import { fetchData } from "../../../../_utils/api";
function OutDetails({
  closeModalDetails,
  onConfirm,
  validated = false,
  idSortie,
}) {
  const [values, setValues] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const tableData = [
    {
      id: 1,
      hangar: "Hangar1",
      responsable: "Brave",
      fonction: "DG",
      phone: "6875425",
      date: "8/8/2025",
      categorie_mais: "jaune",
      motif: "Desangorgement",
      observation: "RAS observation",
      prix: "564 556",
      billet: "/img/billet_example.jpg",
    },
  ];
  const data = tableData[0];
  useEffect(() => {
    async function getData() {
      try {
        const results = await fetchData(
          "get",
          `sorties/detail_sortie/?sortie_id=${idSortie}`,
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );

        setValues(results);
        console.log(results);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    }
    getData();
  }, []);
  const unite_transformation = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    // Ajoutez d'autres options ici
  ];
  return (
    <div className="no-scrollbar relative w-full max-w-[700px] max-h-[600px]  overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 z-0">
      <div className="flex flex-col gap-6  lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6  ">
            Detailles
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Hangar de provenance
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {values?.nom_hangar}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Responsable
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {values?.nom_responsable}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Date
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {values?.date_sortie}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Qte Maïs
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {values?.quantite}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Motif
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {values?.raison_sociale}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Observation
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {data.observation}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Prix
              </p>
              {/* <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {data.observation}
              </p> */}
            </div>
            <div className="relative group  w-max">
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Billet
              </p>
              <img
                src={values?.photo_facture}
                alt="Billet"
                className="w-32 h-32 rounded-md object-cover cursor-pointer group-hover:brightness-75 transition"
                onClick={() => setIsModalOpen(true)}
              />
              <span className="absolute top-5 left-0 inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 drop-shadow-2xl"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </span>
            </div>
            <div className="space-y-6 flex flex-row gap-x-2 items-center">
              <div>
                <p className="mb-2 text-sm font-medium text-gray-800 dark:text-white/90">
                  Transformation
                </p>
                <div className="relative">
                  <Select
                    options={unite_transformation}
                    placeholder="Transformation"
                    //onChange={handleSelectChange}
                    className="dark:bg-dark-900 cursor-pointer"
                  />
                  <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                    <ChevronDownIcon />
                  </span>
                </div>
              </div>
              <Button variant="outline" className="h-max">
                +
              </Button>
            </div>
          </div>
        </div>
      </div>
      {!validated && (
        <div className="flex items-center  w-full gap-3 mt-6 sticky -bottom-8 bg-white pt-2">
          <Button size="sm" variant="outline" onClick={closeModalDetails}>
            Annuler
          </Button>
          <Button size="sm" className="bg-green-500" onClick={onConfirm}>
            Confirmer
          </Button>
        </div>
      )}

      <ViewImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={data.billet}
        alt="Billet"
      />
    </div>
  );
}

export default OutDetails;
