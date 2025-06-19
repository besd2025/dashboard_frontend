"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../table_elemets";

import Image from "next/image";
import DropdownItem from "../../../../dropdown/DropdownItem";
import { Dropdown } from "../../../../dropdown/dropdown_cultvators";
import Link from "next/link";
import { useModal } from "../../../../hooks/useModal";
import { MoreDotIcon } from "../../../../../icons";
import { fetchData } from "../../../../../../_utils/api";
export default function TopCultivateurs() {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getData() {
      try {
        const results = await fetchData(
          "get",
          "achats/achats_cinq_cultivateurs_recents/",
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );
        console.log(results);
        setData(results);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    }
    getData();
  }, []);

  function toggleDropdown(rowId) {
    setOpenDropdowns((prev) => {
      // Close all other dropdowns and toggle the clicked one
      const newState = {};
      Object.keys(prev).forEach((id) => {
        newState[id] = false;
      });
      newState[rowId] = !prev[rowId];
      return newState;
    });
  }

  function closeDropdown(rowId) {
    setOpenDropdowns((prev) => ({
      ...prev,
      [rowId]: false,
    }));
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Top cultivateurs
        </h3>
      </div>
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px] ">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] shadow-sm ">
              <TableRow>
                <th></th>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-xs dark:text-gray-400 uppercase "
                >
                  Cultivateur
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-xs dark:text-gray-400 uppercase"
                >
                  Qte vendue
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-xs dark:text-gray-400 uppercase"
                >
                  Province
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-xs dark:text-gray-400 uppercase"
                >
                  Commmune
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
                <TableRow key={order?.cultivator?.id}>
                  <TableCell className="px-0   py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="relative inline-block">
                      <button
                        onClick={() => toggleDropdown(order?.cultivator?.id)}
                        className="dropdown-toggle"
                      >
                        <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
                      </button>
                      <Dropdown
                        isOpen={openDropdowns[order?.cultivator?.id]}
                        onClose={() => closeDropdown(order?.cultivator?.id)}
                        className="w-40 p-2"
                      >
                        <DropdownItem
                          onItemClick={() =>
                            closeDropdown(order?.cultivator?.id)
                          }
                          className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                        >
                          Details
                        </DropdownItem>
                      </Dropdown>
                    </div>
                  </TableCell>

                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        {order?.cultivator_photo == null ? (
                          <Image
                            width={80}
                            height={80}
                            src={order?.cultivator?.cultivator_photo}
                            alt="user"
                          />
                        ) : (
                          <Image
                            width={80}
                            height={80}
                            src="/img/blank-profile.png"
                            alt="user"
                          />
                        )}
                      </div>
                      <div>
                        <span className="block text-gray-800 text-theme-sm dark:text-white/90 font-bold">
                          {order?.cultivator?.cultivator_first_name}{" "}
                          {order?.cultivator?.cultivator_last_name}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {order?.cultivator?.cultivator_code}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order?.total_quantity}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {
                      order?.cultivator?.cultivator_adress?.zone_code
                        ?.commune_code?.province_code?.province_name
                    }
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {
                      order?.cultivator?.cultivator_adress?.zone_code
                        ?.commune_code?.commune_name
                    }
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {order?.cultivator?.collector?.hangar?.hangar_name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
