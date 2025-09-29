"use client";
import React, { useEffect, useRef, useState, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../table_elemets";

import Image from "next/image";
import { useSidebar } from "../../../../context/SidebarContext";
import EditUserProfile from "../../../../dashboard/cultivators/profile/edit_user_profile";
import FilterUserProfile from "../../../../dashboard/cultivators/profile/filter_user_profile";
import { fetchData } from "../../../../../_utils/api";
import Pagination from "../../Pagination";
import Modal from "../../../modal";
import { useModal } from "../../../hooks/useModal";
import DropdownItem from "../../../dropdown/DropdownItem";
import { Dropdown } from "../../../dropdown/dropdown_cultvators";
import { MoreDotIcon } from "../../../../icons";
import { UserContext } from "../../../../context/UserContext";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ViewImageModal from "../../../modal/ViewImageModal";
import SkeletonLoader from "../../../loading/SkeletonLoader";
import ExportButton from "../../../button/export_button";

function AllCultivatorsList() {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [data, setData] = useState([]);
  const [pointer, setPointer] = useState(0); // index de départ
  const [limit, setLimit] = useState(5);
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
  const [activedownloadBtn, setActivedownloadBtn] = useState(false);
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
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
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
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [pointer, filterData, searchdata, limit]);

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
      const initial_export = await fetchData(
        "post",
        "/cultivators/export_excel/",
        {
          params: {},
          additionalHeaders: {},
          body: {},
        }
      );

      if (initial_export.status == 202) {
        setLoadingEportBtn(true);
        const task_id = initial_export?.data?.task_id;
        const intervalId = setInterval(async () => {
          const export_excel = await fetchData(
            "get",
            "/cultivators/check_task/",
            {
              params: { task_id: task_id },
            }
          );

          if (export_excel.status === "done") {
            clearInterval(intervalId); // Arrêtez l'intervalle
            setLoadingEportBtn(false);
            setActivedownloadBtn(true);
          }
        }, 2000);
      }

      // Vérifier toutes les 6 secondes
    } catch (error) {
      console.error("Erreur exportation Excel :", error);
    } finally {
      //setLoadingEportBtn(false);
    }
  };
  const DownloadCultivatorsToExcel = async () => {
    setLoadingEportBtn(true);
    try {
      const response = await fetchData("get", "/cultivators/download_excel/", {
        isBlob: true,
      });

      // Créer le blob avec le bon type MIME
      const blob = new Blob([response.data], {
        type:
          response.headers["content-type"] ||
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const now = new Date();
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      const timestamp = `${day}_${month}_${year}_${hours}_${minutes}_${seconds}`;
      // Nom du fichier par défaut
      let filename = `cultivator_list_${timestamp}.xlsx`;

      const contentDisposition = response.headers["content-disposition"];
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+)"?/);
        if (match && match[1]) filename = match[1];
      }

      // Création du <a> temporaire
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      // Nettoyage
      link.remove();
      window.URL.revokeObjectURL(url);

      setActivedownloadBtn(true);
    } catch (error) {
      console.error("Erreur lors de l'exportation Excel :", error);
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

  const onLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPointer(0);
    setCurrentPage(1);
  };
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03]  sm:px-6 sm:pt-6 ">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-2 px-3 py-3 border-b  border-gray-200 dark:border-gray-800 sm:gap-4  lg:border-b-0 lg:px-0 lg:py-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Liste des cultivateurs
        </h3>
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
        <div className="flex flex-row justify-between gap-x-3">
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
          <div className="flex items-center gap-3 text-gray-700">
            <ExportButton
              onClickExportButton={exportCultivatorsToExcel}
              onClickDownloadButton={DownloadCultivatorsToExcel}
              loading={loadingEportBtn}
              activedownloadBtn={activedownloadBtn}
            />
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
                  Zone
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-semibold text-gray-500 text-start text-theme-xs dark:text-gray-400 uppercase"
                >
                  Colline
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
            <TableBody
              loading={loading}
              columns={7}
              skeletonRows={totalCount < 5 ? totalCount : 5}
              className="divide-y divide-gray-100 dark:divide-white/[0.05]"
            >
              {data.map((order) => (
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
                    {
                      order?.cultivator_adress?.zone_code?.commune_code
                        ?.province_code?.province_name
                    }
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {
                      order?.cultivator_adress?.zone_code?.commune_code
                        ?.commune_name
                    }
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {order?.cultivator_adress?.zone_code?.zone_name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {order?.cultivator_adress?.colline_name}
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

      {/* Pagination */}
      <Pagination
        totalCount={totalCount}
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalPages}
        pointer={pointer}
        onLimitChange={onLimitChange}
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

export default AllCultivatorsList;
