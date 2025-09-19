"use client";
import React, { useState, useEffect } from "react";
import { useModal } from "../../../../ui_elements/hooks/useModal";
import { fetchData } from "../../../../../_utils/api";
import CultivatorAchatsLocalisation from "../../../../../ui/dashboard/cultivators/profile/user-profile/cultivator_achats_localisation";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../ui_elements/tables/table_elemets";

export default function CultivatorAchats({ cultivateur_id }) {
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
            Achats effectués
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-8  w-full">
            <div className="max-w-full overflow-x-auto col-span-8 lg:col-span-5 ">
              <div className="min-w-max max-h-[25rem] lg:h-full lg:max-h-full">
                <Table>
                  {/* Table Header */}
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] shadow-sm ">
                    <TableRow>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-xs dark:text-gray-400 uppercase "
                      >
                        Date
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-xs dark:text-gray-400 uppercase"
                      >
                        Quantite
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-xs dark:text-gray-400 uppercase"
                      >
                        Montant
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-xs dark:text-gray-400 uppercase"
                      >
                        Hangar
                      </TableCell>
                    </TableRow>
                  </TableHeader>

                  {/* Table Body */}
                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {tableData.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {order.date}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          {order.qte}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          {order.montant}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          {order.hangar}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="h-[25rem] lg:h-full overflow-hidden col-span-8 lg:col-span-3  ">
              <CultivatorAchatsLocalisation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
