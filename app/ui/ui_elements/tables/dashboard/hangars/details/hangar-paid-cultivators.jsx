"use client";
import React, { useEffect, useRef, useState, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../table_elemets";

import Image from "next/image";

import { MoreDotIcon } from "../../../../../icons";
import DropdownItem from "../../../../dropdown/DropdownItem";
import { Dropdown } from "../../../../dropdown/dropdown_cultvators";
import Modal from "../../../../modal";
import { useModal } from "../../../../hooks/useModal";
import Pagination from "../../../Pagination";
// import EditUserProfile from "../../../../../dashboard/cultivators/profile/edit_user_profile";
// import FilterUserProfile from "../../../../../dashboard/cultivators/profile/filter_user_profile";
import FilterHangarDetails from "../../../../../ui_elements/tables/dashboard/hangars/details/filtrer_hangar_details";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { fetchData } from "../../../../../../_utils/api";
import { UserContext } from "../../../../../context/UserContext";
import ViewImageModal from "../../../../modal/ViewImageModal";
import Search_Form from "../../../../form/search_form";

function HangarPaidCultivators() {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [pointer, setPointer] = useState(0); // index de départ
  const limit = 5; // nombre par page
  const [totalCount, setTotalCount] = useState(5); // pour savoir quand arrêter
  const [currentPage, setCurrentPage] = useState(1);
  const user = useContext(UserContext);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");
  //const searchParams = useSearchParams();
  let hangar_id = 0;
  if (typeof window !== "undefined") {
    hangar_id = localStorage.getItem("hangarId");
    // ...
  }
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
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const inputRef = useRef(null);

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: isOpenFilter,
    openModal: openModalFilter,
    closeModal: closeModalFilter,
  } = useModal();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      if (hangar_id) {
        setLoading(true);
        try {
          const results = await fetchData(
            "get",
            `hangars/${hangar_id}/achats_paid_or_pending/?is_paid=true/`,
            {
              params: {
                offset: pointer,
                limit: limit,
              },
            }
          );

          setData(results.results.items);
          console.log("resultat_payed:", results.results.items);
          setTotalCount(results.count); // si l'API retourne un `count` total
        } catch (error) {
          setError(error);
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    }

    getData();
  }, [pointer, hangar_id]); // ← relance quand `pointer` change

  const totalPages = Math.ceil(totalCount / limit);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setPointer((pageNumber - 1) * limit);
  };

  // const exportCultivatorsToExcel = async () => {
  //   try {
  //     const initResponse = await fetchData(
  //       "get",
  //       `hangars/${hangar_id}/achats_paid_or_pending/?is_paid=true`,
  //       { params: { limit: 1 } }
  //     );

  //     const totalCount = initResponse?.count || 0;
  //     if (totalCount === 0) return;

  //     const response = await fetchData(
  //       "get",
  //       `hangars/${hangar_id}/achats_paid_or_pending/?is_paid=true`,
  //       {
  //         params: {
  //           limit: totalCount,
  //         },
  //       }
  //     );

  //     const allData = response.results || [];
  //     const uniqueData = Array.from(
  //       new Map(allData.map((item) => [item.id, item])).values()
  //     );

  //     const formattedData = uniqueData.map((item) => {
  //       const formattedItem = {
  //         Nom: item.cultivator_first_name || "",
  //         Prénom: item.cultivator_last_name || "",
  //         Genre: item.cultivator_gender || "",
  //         CNI: item.cultivator_cni || "",
  //         Code: item.cultivator_code || "",
  //         Province:
  //           item.cultivator_adress?.zone_code?.commune_code?.province_code
  //             ?.province_name || "",
  //         Commune:
  //           item.cultivator_adress?.zone_code?.commune_code?.commune_name || "",
  //         Zone: item.cultivator_adress?.zone_code?.zone_name || "",
  //         Colline: item.cultivator_adress?.colline_name || "",
  //         Hangar: item?.collector?.hangar?.hangar_name || "",
  //         quantité_total: item?.total_quantite || 0,
  //         quantité_mais_blanc: item?.total_blanc || 0,
  //         quantité_mais_jaune: item?.total_jaune || 0,
  //       };

  //       // Mode de paiement
  //       if (item?.cultivator_bank_name) {
  //         formattedItem.mode_payement = "BANQUE OU MICROFINANCE";
  //         formattedItem.Banque_ou_microfinance = item?.cultivator_bank_name;
  //         formattedItem.Numero_compte = item?.cultivator_bank_account || "";
  //       } else if (item?.cultivator_mobile_payment) {
  //         formattedItem.mode_payement = "MOBILE MONEY";
  //         const phone = item.cultivator_mobile_payment.toString();
  //         if (phone.startsWith("6")) {
  //           formattedItem.nom_service = "LUMICASH";
  //         } else if (phone.startsWith("7")) {
  //           formattedItem.nom_service = "ECOCASH";
  //         }
  //         formattedItem.Numero_de_telephone_de_payement = phone;
  //         formattedItem.date_enregistrement = item.created_at || "";
  //       } else {
  //         formattedItem.mode_payement = "";
  //       }

  //       return formattedItem;
  //     });

  //     // Génération du fichier Excel
  //     const worksheet = XLSX.utils.json_to_sheet(formattedData);
  //     const workbook = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(workbook, worksheet, "Cultivateurs");

  //     const excelBuffer = XLSX.write(workbook, {
  //       bookType: "xlsx",
  //       type: "array",
  //     });

  //     const blob = new Blob([excelBuffer], {
  //       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  //     });

  //     saveAs(
  //       blob,
  //       `cultivateurs_${new Date().toISOString().split("T")[0]}.xlsx`
  //     );
  //   } catch (error) {
  //     console.error("Erreur exportation Excel :", error);
  //   }
  // };
  const [id1, getId] = useState(undefined ? "default" : 0);
  const handleImageClick = (url) => {
    console.log("Image clicked:", url);
    setModalImageUrl(url);
    setIsImageModalOpen(true);
  };
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03]  sm:px-6 sm:pt-6 ">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-2 px-3 py-3 border-b  border-gray-200 dark:border-gray-800 sm:gap-4  lg:border-b-0 lg:px-0 lg:py-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 line-clamp-1 animate-sl">
          Cultivateurs payés
        </h3>
        {/* search */}
        <Search_Form />

        {/* <div className="flex items-center gap-3">
          <button
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
            onClick={exportCultivatorsToExcel}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
              />
            </svg>
            Export
          </button>
        </div> */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => openModalFilter()}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
            <svg
              className="stroke-current fill-white dark:fill-gray-800"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.29004 5.90393H17.7067"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.7075 14.0961H2.29085"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
              <path
                d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
            </svg>
            Filtrage
          </button>
        </div>

        <button
          onClick={toggleApplicationMenu}
          className="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg z-99999 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.99902 10.4951C6.82745 10.4951 7.49902 11.1667 7.49902 11.9951V12.0051C7.49902 12.8335 6.82745 13.5051 5.99902 13.5051C5.1706 13.5051 4.49902 12.8335 4.49902 12.0051V11.9951C4.49902 11.1667 5.1706 10.4951 5.99902 10.4951ZM17.999 10.4951C18.8275 10.4951 19.499 11.1667 19.499 11.9951V12.0051C19.499 12.8335 18.8275 13.5051 17.999 13.5051C17.1706 13.5051 16.499 12.8335 16.499 12.0051V11.9951C16.499 11.1667 17.1706 10.4951 17.999 10.4951ZM13.499 11.9951C13.499 11.1667 12.8275 10.4951 11.999 10.4951C11.1706 10.4951 10.499 11.1667 10.499 11.9951V12.0051C10.499 12.8335 11.1706 13.5051 11.999 13.5051C12.8275 13.5051 13.499 12.8335 13.499 12.0051V11.9951Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      <div
        className={`${
          isApplicationMenuOpen ? "flex" : "hidden"
        } items-center justify-between w-full gap-4 px-5 py-4 lg:flex  lg:justify-end lg:px-0 lg:shadow-none`}
      >
        <div className=" block lg:hidden">
          <form>
            <div className="relative ">
              <span className="absolute -translate-y-1/2 left-4 top-1/2 pointer-events-none">
                <svg
                  className="fill-gray-500 dark:fill-gray-400"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                  />
                </svg>
              </span>
              <input
                ref={inputRef}
                type="text"
                placeholder="Rechercher  ..."
                className="dark:bg-dark-900 h-11 w-full  rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[250px]"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto ">
        <div className="min-w-max ">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]  shadow-theme-xs ">
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
                  CNI
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-xs dark:text-gray-400 uppercase"
                >
                  Banque
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
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody
              loading={loading}
              columns={6}
              skeletonRows={totalCount < 5 ? totalCount : 5}
              className="divide-y divide-gray-100 dark:divide-white/[0.05]"
            >
              {data?.map((order) => (
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
                          tag="a"
                          href={`/dashboard/cultivators/profile?cult_id=${order?.id}`}
                          className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                        >
                          Profile
                        </DropdownItem>
                      </Dropdown>
                    </div>
                  </TableCell>

                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 overflow-hidden rounded-full cursor-pointer"
                        onClick={() =>
                          handleImageClick(
                            process.env.NEXT_PUBLIC_IMAGE_URL +
                              order?.purchase?.cultivator?.cultivator_photo ||
                              "/img/no-image.png"
                          )
                        }
                      >
                        {order?.purchase?.cultivator?.cultivator_photo ? (
                          <Image
                            width={80}
                            height={80}
                            src={
                              process.env.NEXT_PUBLIC_IMAGE_URL +
                              order?.purchase?.cultivator?.cultivator_photo
                            }
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
                          {order?.purchase?.cultivator?.cultivator_last_name}{" "}
                          {order?.purchase?.cultivator?.cultivator_first_name}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {order?.purchase?.cultivator?.cultivator_code}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order?.purchase?.cultivator?.cultivator_cni}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {order?.purchase?.cultivator?.cultivator_mobile_payment ? (
                      order?.purchase?.cultivator?.cultivator_mobile_payment.slice(
                        0,
                        2
                      ) === "7" ? (
                        <p className="text-sm text-gray-800 dark:text-white/90 font-semibold">
                          ECOCASH
                        </p>
                      ) : (
                        <p className="text-sm text-gray-800 dark:text-white/90 font-semibold">
                          LUMICASH
                        </p>
                      )
                    ) : order?.purchase?.cultivator?.cultivator_bank_name ? (
                      <p className="text-sm text-gray-800 dark:text-white/90 font-semibold">
                        {" "}
                        {order?.purchase?.cultivator?.cultivator_bank_name}
                      </p>
                    ) : (
                      ""
                    )}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order?.purchase?.quantity_blanc +
                      order?.purchase?.quantity_jaune}{" "}
                    Kg
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order?.purchase?.total_price} Fbu
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}

      <Pagination
        totalCount={totalCount}
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalPages}
        pointer={pointer}
        limit={limit}
      />
      <Modal
        isOpen={isOpenFilter}
        onClose={closeModalFilter}
        className="max-w-[700px] m-4"
      >
        <FilterHangarDetails />
      </Modal>
      <ViewImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageUrl={modalImageUrl}
      />
    </div>
  );
}

export default HangarPaidCultivators;
