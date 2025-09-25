"use client";
import React, { useEffect, useRef, useState, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui_elements/tables/table_elemets";

import Image from "next/image";
import { MoreDotIcon } from "../../icons";
import DropdownItem from "../../ui_elements/dropdown/DropdownItem";
import { Dropdown } from "../../ui_elements/dropdown/dropdown_cultvators";
import Pagination from "../../ui_elements/tables/Pagination";
import EditUserProfile from "../../municipal/cultivators/profile/edit_user_profile";
import FilterUserProfile from "../../municipal/cultivators/profile/filter_user_profile";
import { fetchData } from "../../../_utils/api";
import { UserContext } from "../../context/UserContext";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ViewImageModal from "../../ui_elements/modal/ViewImageModal";
import { useModal } from "../../ui_elements/hooks/useModal";
import Modal from "../..//ui_elements/modal";
import ExportButton from "../../ui_elements/button/export_button";
import Badge from "../../ui_elements/badge/Badge";

function ViewPaymentExportList() {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [data, setData] = useState([]);
  const [pointer, setPointer] = useState(0); // index de départ
  const limit = 5; // nombre par page
  const [totalCount, setTotalCount] = useState(5); // pour savoir quand arrêter
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const user = useContext(UserContext);
  const [filterData, setFilterData] = useState({});
  const [searchdata, setSearchData] = useState("");

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingEportBtn, setLoadingEportBtn] = useState(false);

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
  // Fonction pour gérer la recherche
  // Cette fonction est appelée à chaque fois que l'utilisateur tape dans le champ de recherche
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchData(value);
  };
  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        let results;

        if (filterData && Object.keys(filterData).length > 0) {
          // Si des filtres sont appliqués, construire dynamiquement les paramètres
          results = await fetchData("get", "/cultivators/", {
            params: {
              province_name: filterData.province,
              commune_name: filterData.commune,
              zone_name: filterData.zone,
              colline_name: filterData.colline,
              age_min: filterData.ageMin,
              age_max: filterData.ageMax,
              created_at_min: filterData.dateFrom,
              created_at_max: filterData.dateTo,
              search: searchdata,
              offset: pointer,
              limit: limit,
            },
          });
        } else {
          // Sinon, récupération simple sans filtres
          results = await fetchData("get", "/cultivators/", {
            params: {
              search: searchdata,
              offset: pointer,
              limit: limit,
            },
          });
        }

        setData(results.results);
        setTotalCount(results.count);
        console.log(results.results);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [pointer, filterData, searchdata]);

  const totalPages = Math.ceil(totalCount / limit);
  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setPointer((pageNumber - 1) * limit);
  };

  const supprimerCultivateur = async (cultivateurId) => {
    try {
      const response = await fetchData(
        "delete",
        `/cultivators/${cultivateurId}/`
      );

      if (response?.status === 200 || response?.status === 204) {
        // 204 = No Content, souvent utilisé pour DELETE
        window.location.reload();
      } else {
        console.warn("La suppression a échoué :", response);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du cultivateur :", error);
    }
  };
  const exportCultivatorsToExcel = async () => {
    setLoadingEportBtn(true);
    try {
      // Étape 1 : Récupérer le nombre total d'enregistrements
      const initResponse = await fetchData("get", "/cultivators/", {
        params: { limit: 1 },
      });

      const totalCount = initResponse?.count || 0;
      if (totalCount === 0) return;

      // Étape 2 : Charger toutes les données en une seule fois
      const fullResponse = await fetchData("get", "/cultivators/", {
        params: { limit: totalCount },
      });

      const allData = fullResponse?.results || [];

      const formattedData = allData.map((item) => {
        const formattedItem = {
          Nom: item.cultivator_first_name || "",
          Prénom: item.cultivator_last_name || "",
          Genre: item.cultivator_gender || "",
          CNI: item.cultivator_cni || "",
          Code: item.cultivator_code || "",
          Province:
            item.cultivator_adress?.zone_code?.commune_code?.province_code
              ?.province_name || "",
          Commune:
            item.cultivator_adress?.zone_code?.commune_code?.commune_name || "",
          Zone: item.cultivator_adress?.zone_code?.zone_name || "",
          Colline: item.cultivator_adress?.colline_name || "",
          Hangar: item?.collector?.hangar?.hangar_name || "",
          quantité_total: item?.total_quantite || 0,
          quantité_mais_blanc: item?.total_blanc || 0,
          quantité_mais_jaune: item?.total_jaune || 0,
        };

        if (item?.cultivator_bank_name) {
          formattedItem.mode_payement = "BANQUE OU MICROFINANCE";
          formattedItem.Banque_ou_microfinance = item?.cultivator_bank_name;
          formattedItem.Numero_compte = item?.cultivator_bank_account || "";
        } else if (item?.cultivator_mobile_payment) {
          formattedItem.mode_payement = "MOBILE MONEY";
          if (item?.cultivator_mobile_payment?.toString().startsWith("6")) {
            formattedItem.nom_service = "LUMICASH";
          } else if (
            item?.cultivator_mobile_payment?.toString().startsWith("7")
          ) {
            formattedItem.nom_service = "ECOCASH";
          }
          formattedItem.Numero_de_telephone_de_payement =
            item?.cultivator_mobile_payment || "";
          formattedItem.date_enregistrement = item.created_at || "";
        } else {
          formattedItem.mode_payement = "";
        }

        return formattedItem;
      });

      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Cultivateurs");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });

      saveAs(blob, "cultivators.xlsx");
    } catch (error) {
      console.error("Erreur exportation Excel :", error);
    } finally {
      setLoadingEportBtn(false);
    }
  };

  const [id1, getId] = useState(undefined ? "default" : 0);
  console.log(id1);
  const handleFilter = (filterData) => {
    setFilterData(filterData);
  };
  const handleImageClick = (url) => {
    setModalImageUrl(url);
    setIsImageModalOpen(true);
  };
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03]  sm:px-6 sm:pt-6 ">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-3">
        Liste de paiement du 06-05-2024 au 12-05-2024
      </h3>
      <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-2 px-3 py-3 border-b  border-gray-200 dark:border-gray-800 sm:gap-4  lg:border-b-0 lg:px-0 lg:py-4">
        {/* search */}
        <div className="hidden lg:block">
          <form className="">
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
                onChange={handleSearch}
                ref={inputRef}
                type="text"
                placeholder="Rechercher  ..."
                className="dark:bg-dark-900 h-11 w-[450px]  min-w-[250px] rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 max-w-[450px]"
              />
            </div>
          </form>
        </div>
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
        <div className="min-w-[1102px] ">
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
                  Localité
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
                  Numero Compte
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-xs dark:text-gray-400 uppercase"
                >
                  Paiement Mobile
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-xs dark:text-gray-400 uppercase"
                >
                  Nom du Proprietaire
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-xs dark:text-gray-400 uppercase"
                >
                  Total Blanc
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-xs dark:text-gray-400 uppercase"
                >
                  Total Jaune
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-xs dark:text-gray-400 uppercase"
                >
                  Total Quantité
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-xs dark:text-gray-400 uppercase"
                >
                  Créé le
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody
              loading={loading}
              columns={11}
              skeletonRows={totalCount < 5 ? totalCount : 5}
              className="divide-y divide-gray-100 dark:divide-white/[0.05]"
            >
              {data.map((order) => (
                <TableRow key={order.id} className={"group"}>
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
                        {user?.session?.category != "General" && (
                          <DropdownItem
                            onItemClick={() => {
                              closeDropdown(order.id);
                              openModal();
                              getId(order?.id);
                            }}
                            className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                          >
                            Modifier
                          </DropdownItem>
                        )}
                        {user?.session?.category == " Admin" && (
                          <DropdownItem
                            onItemClick={() => {
                              closeDropdown(order.id);
                              supprimerCultivateur(order?.id);
                            }}
                            className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                          >
                            Supprimer
                          </DropdownItem>
                        )}
                      </Dropdown>
                    </div>
                  </TableCell>

                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 overflow-hidden rounded-full cursor-pointer"
                        onClick={() =>
                          handleImageClick(
                            order?.cultivator_photo || "/img/blank-profile.png"
                          )
                        }
                      >
                        {order?.cultivator_photo ? (
                          <Image
                            width={80}
                            height={80}
                            src={order?.cultivator_photo}
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
                          {order.cultivator_last_name}{" "}
                          {order.cultivator_first_name}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {order.cultivator_code}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <span className="block font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                      {
                        order?.cultivator_adress?.zone_code?.commune_code
                          ?.province_code?.province_name
                      }
                    </span>
                    <span className="block">
                      {"/" +
                        order?.cultivator_adress?.zone_code?.commune_code
                          ?.commune_name}
                    </span>
                    <div className="opacity-0 hidden group-hover:block group-hover:opacity-100 transition-all duration-300">
                      <span className="block">
                        {"/" +
                          order?.cultivator_adress?.zone_code?.commune_code
                            ?.commune_name}
                      </span>
                      <span className="block">
                        {"/" + order?.cultivator_adress?.zone_code?.zone_name}
                      </span>
                      <span className="block">
                        {"/" + order?.cultivator_adress?.colline_name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400"></TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400"></TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400"></TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400"></TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400"></TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400"></TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400"></TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400"></TableCell>
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
      {/*<Pagination />*/}

      {/* filtres */}

      <Modal
        isOpen={isOpenFilter}
        onClose={closeModalFilter}
        className="max-w-[700px] m-4"
      >
        <FilterUserProfile
          handleFilter={handleFilter}
          closeModalFilter={closeModalFilter}
        />
      </Modal>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <EditUserProfile cultivateur_id={id1} />
      </Modal>
      <ViewImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageUrl={modalImageUrl}
        alt="Cultivateur photo"
      />
    </div>
  );
}

export default ViewPaymentExportList;
