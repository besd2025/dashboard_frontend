"use client";
import React from "react";
import dynamic from "next/dynamic";

import { ChevronRightIcon } from "../../../../icons";
import { useState } from "react";
const MapWithNoSSR = dynamic(
  () => import("../../../../localisation/HangarMapComponent"),
  {
    ssr: false,
    loading: () => <p>Loading map...</p>,
  }
);
export default function LocalisationHangar() {
  const data = [
    {
      name: "Salle Communal",
      province: "Bubanza",
      commune: "Bubanza",
      zone: "Bubanza",
      latitude: -3.08449,
      longitude: 29.39367,
    },
  ];
  const [selectedHangar, setSelectedHangar] = useState(data[0]);
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-4 lg:col-span-1 space-y-6">
        <div className="flex flex-col top-0 left-0 w-full lg:w-64 mt-4 lg:mt-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 transition-all duration-300 ease-in-out z-50 border rounded-xl border-gray-200">
          <div className="overflow-y-auto overflow-x-auto lg:overflow-x-hidden flex flex-col justify-between flex-grow">
            <ul className="flex flex-col py-4 space-y-1">
              <div>
                <div className="max-w-full mx-auto rounded-lg overflow-hidden">
                  <div className="px-6 py-4">
                    <h3 className=" text-gray-600 text-sm dark:text-white/90">
                      Information du Hangar
                    </h3>
                    <h3 className="mt-1 font-bold text-gray-900 dark:text-white/90">
                      {selectedHangar?.name || "-"}
                    </h3>
                    <h3 className="mt-1 font-medium text-gray-900 dark:text-white/90">
                      Adresse
                    </h3>
                    <p className="mt-1 text-gray-600 dark:text-white/70 text-sm">
                      {/* Replace with real address if available */}
                      {selectedHangar?.province || "-"} /{" "}
                      {selectedHangar?.commune || "-"} /{" "}
                      {selectedHangar?.zone || "-"}
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                          Longitude
                        </p>
                        <p className="mt-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                          {selectedHangar?.longitude || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                          Latitude
                        </p>
                        <p className="mt-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                          {selectedHangar?.latitude || "-"}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                          Capacite actuelle
                        </p>
                        <p className="mt-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                          {/* Replace with real data if available */}-
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                          Capacite maximale
                        </p>
                        <p className="mt-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                          {/* Replace with real data if available */}-
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mb-8 md:mb-auto gap-2 flex-1 p-4 ">
                <h2 className="font-bold text-gray-800 dark:text-white/90">
                  Site proches
                </h2>
                <ul className="flex flex-col gap-2 w-full sm:max-w-md m-auto">
                  {["Hangar 1", "Hangar 2", "Hangar 3"].map((name, index) => (
                    <button
                      key={index}
                      className="w-full flex flex-row justify-between text-sm font-medium text-gray-800 dark:text-white/90 bg-gray-100 dark:bg-white/[0.003] hover:bg-gray-200 dark:hover:bg-gray-700 py-1 px-2 rounded-md"
                    >
                      <span>{name}</span>
                      <ChevronRightIcon className="size-4" />
                    </button>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col mb-8 md:mb-auto gap-2 flex-1 p-4">
                <h2 className="font-bold text-gray-800 dark:text-white/90">
                  Hangar proches
                </h2>
                <ul className="flex flex-col gap-2 w-full sm:max-w-md m-auto">
                  {["Hangar 1", "Hangar 2", "Hangar 3"].map((name, index) => (
                    <button
                      key={index}
                      className="w-full flex flex-row justify-between text-sm font-medium text-gray-800 dark:text-white/90 bg-gray-100 dark:bg-white/[0.003] hover:bg-gray-200 dark:hover:bg-gray-700 py-1 px-2 rounded-md"
                    >
                      <span>{name}</span>
                      <ChevronRightIcon className="size-4" />
                    </button>
                  ))}
                </ul>
              </div>
            </ul>
          </div>
        </div>
      </div>

      <div className="col-span-4 lg:col-span-3 space-y-6 overflow-x-auto rounded-2xl">
        <MapWithNoSSR
          data={data}
          onMarkerClick={setSelectedHangar}
          selectedHangar={selectedHangar}
        />
      </div>
    </div>
  );
}
