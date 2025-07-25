"use client";
import React, { useState, useEffect, useContext } from "react";

import Modal from "../../../../ui_elements/modal";
import ViewImageModal from "../../../../ui_elements/modal/ViewImageModal";

import { useModal } from "../../../../ui_elements/hooks/useModal";

import Image from "next/image";
import EditUserProfile from "../edit_user_profile";
import CardsOverview from "./cards_overview";
import { fetchData } from "../../../../../_utils/api";
import { UserContext } from "../../../../context/UserContext";
export default function UserMetaCard({ cultivateur_id }) {
  const { isOpen, openModal, closeModal } = useModal();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const user = useContext(UserContext);
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  useEffect(() => {
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
      } catch (error) {
        setError(error);
        console.error(error);
      }
    }
    getData();
  }, []);

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between mb-4">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div
              className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800 cursor-pointer"
              onClick={() => setImageModalOpen(true)}
            >
              {data?.cultivator_photo ? (
                <Image
                  width={80}
                  height={80}
                  src={data?.cultivator_photo}
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
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {data?.cultivator_last_name} {data?.cultivator_first_name}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                  cultivateur
                </p>
                <p className="text-sm text-green-500 dark:text-gray-400">
                  {data?.cultivator_code}
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {
                    data?.cultivator_adress?.zone_code?.commune_code
                      ?.province_code?.province_name
                  }
                  /
                  {
                    data?.cultivator_adress?.zone_code?.commune_code
                      ?.commune_name
                  }
                </p>
              </div>
            </div>
          </div>
          {user?.session?.category != "General" && (
            <button
              onClick={openModal}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
            >
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                  fill=""
                />
              </svg>
              Edit
            </button>
          )}
        </div>
        <CardsOverview cultivateur_id={cultivateur_id} />
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <EditUserProfile closeModal={closeModal} cultivateur_id={data.id} />
      </Modal>
      <ViewImageModal
        isOpen={isImageModalOpen}
        onClose={() => setImageModalOpen(false)}
        imageUrl={data?.cultivator_photo || "/img/blank-profile.png"}
        alt={data?.cultivator_last_name + " " + data?.cultivator_first_name}
      />
    </>
  );
}
