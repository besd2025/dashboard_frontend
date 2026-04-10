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
import ViewImageModal from "../../../../modal/ViewImageModal";
export default function TopCultivateurs() {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [pointer, setPointer] = useState(0); // index de départ
  const limit = 5; // nombre par page
  const [totalCount, setTotalCount] = useState(5); // pour savoir quand arrêter
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);

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

        setData(results);
        console.log(results);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setLoading(false);
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

  function handleImageClick(url) {
    setSelectedImage(url);
    setModalOpen(true);
  }
  function handleCloseModal() {
    setModalOpen(false);
    setSelectedImage(null);
  }
  const imag_profile = "/img/user-profile.png";
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Top cultivateurs
        </h3>
        <Link
          href="/dashboard/stocks/achats/liste"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
        >
          voir tous
        </Link>
      </div>
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px] ">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] shadow-sm ">
              <TableRow>
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
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-xs dark:text-gray-400 uppercase"
                >
                  Hangar
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
                  Qte Maïs Blanc
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-xs dark:text-gray-400 uppercase"
                >
                  Qte Maïs Jaune
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody
              loading={loading}
              columns={7}
              skeletonRows={5}
              menu={false}
              className="divide-y divide-gray-100 dark:divide-white/[0.05]"
            >
              {data.map((order) => (
                <TableRow key={order?.cultivator?.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 overflow-hidden rounded-full cursor-pointer"
                        onClick={() =>
                          handleImageClick(
                            order?.cultivator?.cultivator_photo
                              ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${order?.cultivator?.cultivator_photo}`
                              : "/img/blank-profile.png"
                          )
                        }
                      >
                        {order?.cultivator?.cultivator_photo ? (
                          <Image
                            width={80}
                            height={80}
                            //src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${order?.cultivator?.cultivator_photo}`}
                            src={imag_profile}
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
                          {order?.cultivator?.cultivator_last_name}{" "}
                          {order?.cultivator?.cultivator_first_name}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {order?.cultivator?.cultivator_code}
                        </span>
                      </div>
                    </div>
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
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order?.cultivator?.total_quantite >= 1000 ? (
                      <>
                        {(
                          order?.cultivator?.total_quantite / 1000
                        ).toLocaleString("de-DE")}{" "}
                        <span className="text-sm">T</span>
                      </>
                    ) : (
                      <>
                        {order?.cultivator?.total_quantite?.toLocaleString(
                          "fr-FR"
                        ) || 0}{" "}
                        <span className="text-sm">Kg</span>
                      </>
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order?.cultivator?.total_blanc >= 1000 ? (
                      <>
                        {(order?.cultivator?.total_blanc / 1000).toLocaleString(
                          "de-DE"
                        )}{" "}
                        <span className="text-sm">T</span>
                      </>
                    ) : (
                      <>
                        {order?.cultivator?.total_blanc?.toLocaleString(
                          "fr-FR"
                        ) || 0}{" "}
                        <span className="text-sm">Kg</span>
                      </>
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order?.cultivator?.total_jaune >= 1000 ? (
                      <>
                        {(order?.cultivator?.total_jaune / 1000).toLocaleString(
                          "de-DE"
                        )}{" "}
                        <span className="text-sm">T</span>
                      </>
                    ) : (
                      <>
                        {order?.cultivator?.total_jaune?.toLocaleString(
                          "fr-FR"
                        ) || 0}{" "}
                        <span className="text-sm">Kg</span>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <ViewImageModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        imageUrl={selectedImage}
      />
    </div>
  );
}
