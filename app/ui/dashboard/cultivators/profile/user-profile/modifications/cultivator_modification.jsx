"use client";
import React, { useState, useEffect } from "react";
import { useModal } from "../../../../../ui_elements/hooks/useModal";
import { fetchData } from "../../../../../../_utils/api";
import Identification from "./identification";
import ModificationAchat from "./achat";

export default function CultivatorModifications({ cultivateur_id }) {
  const { isOpen, openModal, closeModal } = useModal();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState("identification");

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
  const tableData = [
    {
      id: 1,
      date: "2024-03-20 14:30:45",
      qte: "102",
      montant: "70526",
      hangar: "CEM",
    },
    {
      id: 2,
      date: "2024-03-20 14:30:45",
      qte: "192",
      montant: "70526",
      hangar: "CEM",
    },
  ];

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col ">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Modifications effectués
          </h4>
          <div className="bg-white dark:bg-white/[0.03] mt-2 rounded-2xl mb-1">
            <div className="mx-auto max-w-7xl mb-4 ">
              <ul className="-mb-px flex items-end gap-x-8">
                <li
                  onClick={() => setActiveTab("identification")}
                  className={`inline-flex border-b-2 px-1 py-3.5 text-sm font-semibold ${
                    activeTab === "identification"
                      ? "border-yellow-500 text-yellow-500"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Identification
                </li>
                <li
                  onClick={() => setActiveTab("achats")}
                  className={`inline-flex border-b-2 px-1 py-3.5 text-sm font-semibold ${
                    activeTab === "achats"
                      ? "border-yellow-500 text-yellow-500"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Achats
                </li>
              </ul>
            </div>
            {activeTab === "identification" ? (
              <Identification tableData={tableData} />
            ) : (
              <ModificationAchat tableData={tableData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
