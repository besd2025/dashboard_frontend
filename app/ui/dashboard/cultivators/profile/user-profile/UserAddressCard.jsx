"use client";
import React, { useState, useEffect } from "react";
import { useModal } from "../../../../ui_elements/hooks/useModal";
import { fetchData } from "../../../../../_utils/api";

export default function UserAddressCard({ cultivateur_id }) {
  const { isOpen, openModal, closeModal } = useModal();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!cultivateur_id) return; // ✅ Ne fait rien si l'ID est indéfini

    async function getData() {
      try {
        const results = await fetchData(
          "get",
          `/cultivators/${cultivateur_id}`,
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );
        setData(results);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement de l'adresse");
      }
    }

    getData();
  }, [cultivateur_id]);

  if (!data) {
    return (
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Chargement...
        </p>
      </div>
    );
  }

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Adresse
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Pays
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                Burundi
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Province
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {data?.cultivator_adress?.zone_code?.commune_code?.province_code
                  ?.province_name || "—"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Commune
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {data?.cultivator_adress?.zone_code?.commune_code
                  ?.commune_name || "—"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
