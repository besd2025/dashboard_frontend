"use client";
import React, { useState,useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../table_elemets";

import DropdownItem from "../../../dropdown/DropdownItem";
import { Dropdown } from "../../../dropdown/dropdown_cultvators";
import Link from "next/link";
import { useModal } from "../../../hooks/useModal";
import { MoreDotIcon } from "../../../../icons";
import { fetchData } from "../../../../../_utils/api";
// Define the table data

export default function TopSoldOut() {
   const [data, setData] = useState([]);
    const [error, setError] = useState(null);
  
           useEffect(() => {
            async function getData() {
              try {
        
                const results = await fetchData('get', 'hangars/cinq_plus_vendus/', {
                  params: {},
                  additionalHeaders: {},
                  body: {}
                });
        
                setData(results);
               console.log(results)
              } catch (error) {
                setError(error);
                console.error(error);
              }
            }
            getData();
          }, []);
  const [openDropdowns, setOpenDropdowns] = useState({});

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

  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Top ventes
        </h3>
        <Link
          href="/dashboard/stocks/sold_out/list"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
        >
          See all
        </Link>
        {/* <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
          See all
        </button> */}
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
                  Hangar
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-xs dark:text-gray-400 uppercase"
                >
                  Qte
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-xs dark:text-gray-400 uppercase"
                >
                  Prix
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
                  Commune
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data.map((order,id=1) => (
                
                <TableRow key={id}>
                  <TableCell className="px-0   py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="relative inline-block">
                      <button
                        onClick={() => toggleDropdown(order.id)}
                        className="dropdown-toggle"
                      >
                        <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
                      </button>
                      <Dropdown
                        isOpen={openDropdowns[order.id]}
                        onClose={() => closeDropdown(order.id)}
                        className="w-40 p-2"
                      >
                        <DropdownItem
                          onItemClick={() => closeDropdown(order.id)}
                          className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                        >
                          Details
                        </DropdownItem>
                      </Dropdown>
                    </div>
                  </TableCell>

                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6 text-gray-600  dark:text-white/90"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 9h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <span className="block text-gray-800 text-theme-sm dark:text-white/90 font-bold">
                          {order.hangar}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                           test
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order.kg}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order.Prix}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order.Province}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {order.Commune}
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
