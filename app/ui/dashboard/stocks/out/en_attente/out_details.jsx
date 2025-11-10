import React, { useState, useEffect } from "react";
import Label from "../../../../ui_elements/form/Label";
import Input from "../../../../ui_elements/form/input/InputField";
import Button from "../../../../ui_elements/button/Button";
import ViewImageModal from "../../../../ui_elements/modal/ViewImageModal";
import { fetchData } from "../../../../../_utils/api";
function OutDetails({ closeModalDetails, id, onConfirm, validated = false }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});
  useEffect(() => {
    async function getData() {
      try {
        const results = await fetchData("get", `/transfert/${id}/`, {
          params: {},
          additionalHeaders: {},
          body: {},
        });
        setData(results);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    }
    getData();
  }, [id]);
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
                {data?.from_hangar?.hangar_name}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Responsable
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {data.responsable}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Fonction
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {data.fonction}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Téléphone
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {data.phone}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Date
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {data.date}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Catégorie Maïs
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {data.categorie_mais}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Motif
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {data.motif}
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
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {data.prix} Fbu
              </p>
            </div>

            <div className="relative group  w-max">
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Billet
              </p>
              <img
                src={data.billet}
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
