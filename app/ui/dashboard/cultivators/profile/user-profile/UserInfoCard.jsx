"use client";
import React, { useState, useEffect } from "react";
import { useModal } from "../../../../ui_elements/hooks/useModal";
import { fetchData } from "../../../../../_utils/api";
import { useSearchParams } from "next/navigation";
export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const cultivateur_id = searchParams.get("cult_id");
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
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Information Personnelle
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Nom
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {data?.cultivator_last_name}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Prénom
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {data?.cultivator_first_name}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Hangar
              </p>
              <p className="text-sm  text-gray-800 dark:text-white/90 font-bold">
                {data?.collector?.hangar?.hangar_name}
              </p>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Information de Paiement
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="text-xs leading-normal text-gray-500 dark:text-gray-400">
                Type
              </p>
              {data?.cultivator_mobile_payment ? (
                data.cultivator_mobile_payment.slice(0, 2) === "7" ? (
                  <p className="text-sm text-gray-800 dark:text-white/90 font-semibold">
                    ECOCASH
                  </p>
                ) : (
                  <p className="text-sm text-gray-800 dark:text-white/90 font-semibold">
                    LUMICASH
                  </p>
                )
              ) : data?.cultivator_bank_name ? (
                <p className="text-sm text-gray-800 dark:text-white/90 font-semibold">
                  BANK / {data.cultivator_bank_name}
                </p>
              ) : (
                ""
              )}
            </div>

            <div>
              <p className=" text-xs leading-normal text-gray-500 dark:text-gray-400">
                No
              </p>

              {data?.cultivator_mobile_payment ? (
                <p className="text-sm text-gray-800 dark:text-white/90 font-semibold">
                  {data?.cultivator_mobile_payment}
                </p>
              ) : data?.cultivator_bank_name ? (
                <p className="text-sm text-gray-800 dark:text-white/90 font-semibold">
                  {data?.cultivator_bank_account}
                </p>
              ) : (
                ""
              )}
            </div>
            {data?.cultivator_mobile_payment ? (
              <div>
                <p className=" text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Nom et Prenom
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data?.cultivator_mobile_payment_user_name}
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
