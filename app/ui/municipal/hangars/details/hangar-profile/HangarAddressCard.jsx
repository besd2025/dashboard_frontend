"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useModal } from "../../../../ui_elements/hooks/useModal";
import { fetchData } from "../../../../../_utils/api";
export default function UserAddressCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const search_params = useSearchParams();
  const hangar_id = search_params?.get("hangar_id");
  useEffect(() => {
    async function getData() {
      try {
        const results = await fetchData("get", `hangars/${hangar_id}/`, {
          params: {},
          additionalHeaders: {},
          body: {},
        });
        setData(results);
        console.log(results);
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
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Addresse
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Pays
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  Burundi
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Province
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data?.province}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Commune
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {data?.commune}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
