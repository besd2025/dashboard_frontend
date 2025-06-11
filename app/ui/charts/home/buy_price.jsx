"use client";
import React, { useState,useEffect } from "react";
import Badge from "../../ui_elements/badge/Badge";
import { ArrowUpIcon, MoreDotIcon } from "../../icons";
import DropdownItem from "../../ui_elements/dropdown/DropdownItem";
import { Dropdown } from "../../ui_elements/dropdown/Dropdown";
import { fetchData } from "../../../_utils/api";
function BuyPrice() {
  const [isOpen, setIsOpen] = useState(false);
      const [data, setData] = useState([]);
      const [error, setError] = useState(null);
  useEffect(() => {
          async function getData() {
            try {
              const results = await fetchData('get', 'admin/prices/get_prix_achat/', {
                params: {},
                additionalHeaders: {},
                body: {}
              });
               
              setData(results)

      
            } catch (error) {
              setError(error);
              console.error(error);
            }
          }
          getData();
        }, []);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }
  return (
    <div className="rounded-2xl border border-gray-200 bg-green-600/80 p-5 dark:border-gray-800  md:p-6">
      <div className="flex items-center   bg-g/ray-100 rounded-xl dark:bg-gra/y-800">
        {/* <GroupIcon className="text-gray-800 size-6 dark:text-white/90" /> */}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6 text-white/80"
        >
          <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z"
            clipRule="evenodd"
          />
        </svg>

        <h4 className="ml-2 font-semibold  text-2xl dark:text-white/90">
          {data?.prix_achat} <span className="text-sm">FBU/kg</span>
        </h4>
      </div>

      <div className="flex items-center justify-between mt-2 ">
        <div>
          <span className="text-md text-white/90  font-semi/bold">
            Prix d'Achat
          </span>
        </div>
        
        <div className="relative inline-block">
          <button onClick={toggleDropdown} className="dropdown-toggle">
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Modifier
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default BuyPrice;
