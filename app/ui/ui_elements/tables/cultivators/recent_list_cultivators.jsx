"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../table_elemets";

import Image from "next/image";
import { MoreDotIcon } from "../../../icons";
import DropdownItem from "../../dropdown/DropdownItem";
import { Dropdown } from "../../dropdown/dropdown_cultvators";
import Link from "next/link";

// Define the table data
const tableData = [
  {
    id: 1,
    user: {
      image: "/img/users/user-17.jpg",
      name_cultivator: "MPAWENAYO Charles",
      id_cultivator: "id54254Hkhjk6",
    },
    Province: "Kayanza",
    Commune: "Butanganzwa",

    budget: "3.9K",
    status: "Active",
  },
  {
    id: 2,
    user: {
      image: "/img/users/user-17.jpg",
      name_cultivator: "MPAWENAYO Charles",
      id_cultivator: "id54254Hkhjk6",
    },
    Province: "Kayanza",
    Commune: "Butanganzwa",

    budget: "3.9K",
    status: "Active",
  },
  {
    id: 3,
    user: {
      image: "/img/users/user-17.jpg",
      name_cultivator: "MPAWENAYO Charles",
      id_cultivator: "id54254Hkhjk6",
    },
    Province: "Kayanza",
    Commune: "Butanganzwa",

    budget: "3.9K",
    status: "Active",
  },
  {
    id: 4,
    user: {
      image: "/img/users/user-17.jpg",
      name_cultivator: "MPAWENAYO Charles",
      id_cultivator: "id54254Hkhjk6",
    },
    Province: "Kayanza",
    Commune: "Butanganzwa",

    budget: "3.9K",
    status: "Active",
  },
  {
    id: 5,
    user: {
      image: "/img/users/user-17.jpg",
      name_cultivator: "MPAWENAYO Charles",
      id_cultivator: "id54254Hkhjk6",
    },
    Province: "Kayanza",
    Commune: "Butanganzwa",

    budget: "3.9K",
    status: "Active",
  },
];

export default function RecentCultivatorsList() {
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
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Cultivateurs recents
        </h3>
        <Link
          href=""
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
                  Cultivateur
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
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData.map((order) => (
                <TableRow key={order.id}>
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
                        <DropdownItem
                          onItemClick={() => closeDropdown(order.id)}
                          className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                        >
                          Modifier
                        </DropdownItem>
                      </Dropdown>
                    </div>
                  </TableCell>

                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <Image
                          width={40}
                          height={40}
                          src={order.user.image}
                          alt={order.user.name_cultivator}
                        />
                      </div>
                      <div>
                        <span className="block text-gray-800 text-theme-sm dark:text-white/90 font-bold">
                          {order.user.name_cultivator}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {order.user.id_cultivator}
                        </span>
                      </div>
                    </div>
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
