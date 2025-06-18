"use client";
import React from "react";
import Input from "../../../../ui_elements/form/input/InputField";
import Modal from "../../../../ui_elements/modal";

import Label from "../../../../ui_elements/form/Label";
import Button from "../../../../ui_elements/button/Button";
import { useModal } from "../../../../ui_elements/hooks/useModal";
import { fetchData } from "../../../../../_utils/api";
export default function UserAddressCard({hangar_id}) {
  const { isOpen, openModal, closeModal } = useModal();
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };

    useEffect(() => {
            async function getData() {
              try {
                const results = await fetchData('get', `hangars/${hangar_id}/`, {
                  params: {},
                  additionalHeaders: {},
                  body: {}
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
                  {data?.provonce}
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
