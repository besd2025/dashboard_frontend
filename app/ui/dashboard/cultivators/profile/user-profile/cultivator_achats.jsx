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
import { useSearchParams } from "next/navigation";
export default function CultivatorAchats() {
  const { isOpen, openModal, closeModal } = useModal();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const cultivateur_id = searchParams.get("cult_id");
  useEffect(() => {
    if (!cultivateur_id) return;

    async function getData() {
      try {
        const response = await fetchData(
          "get",
          `/cultivators/${cultivateur_id}/get_cultivators_purchases/`,
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );
        setData(response.results);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement de l'adresse");
      }
    }

    getData();
  }, [cultivateur_id]);

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
                        Quantite Blanc
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-xs dark:text-gray-400 uppercase"
                      >
                        Quantite Jaune
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
                    {data.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {order?.date_achat}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          {order?.quantity_blanc}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          {order?.quantity_jaune}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          {order?.total_price}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          {order?.collector?.hangar?.hangar_name}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="h-[25rem] lg:h-full overflow-hidden col-span-8 lg:col-span-3  ">
              <CultivatorAchatsLocalisation cultivateur_id={cultivateur_id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
