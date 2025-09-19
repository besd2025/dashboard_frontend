"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Button from "../../../ui_elements/button/Button";
import { fetchData } from "../../../../_utils/api";
import LoadingDots from "../../../ui_elements/loading/loading_dots";
import SkeletonLoader from "../../../ui_elements/loading/SkeletonLoader";

const MapWithNoSSR = dynamic(
  () => import("../../../localisation/MapComponent"),
  {
    ssr: false,
    loading: () => <p>Loading map...</p>,
  }
);

function GlobalMap() {
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [selectedHangar, setSelectedHangar] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetchData("get", `site_aggregates/`, {
          params: {},
          additionalHeaders: {},
          body: {},
        });
        console.log(response);
        const options = response?.map((item) => ({
          name: item?.hangar?.hangar_name,
          site: item?.site_name,
          quantite_blanc: item?.quantity_total_blanc,
          quantite_jaune: item?.quantity_total_jaune,
          province:
            item.hangar?.hangar_adress?.commune_code?.province_code
              ?.province_name,
          commune: item.hangar?.hangar_adress?.commune_code?.commune_name,
          zone: item.hangar?.hangar_adress?.zone_name,
          latitude: item?.latitude,
          longitude: item?.longitude,
        }));
        setData(options);
        if (options.length > 0) {
          setSelectedHangar(options[0]); // Set the first item as selected
        }
      } catch (error) {
        setError(error);
        console.error(error);
      }
    }
    getData();
  }, []);

  return (
    <div className="lg:p-4 relative space-y-4">
      <div className="space-y-6 lg:absolute top-20 left-16 z-999">
        <div className="flex flex-col top-0 left-0 w-full lg:w-max mt-4 shadow-xl lg:mt-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 transition-all duration-300 ease-in-out z-50 border rounded-2xl border-gray-200">
          <div className="overflow-y-auto overflow-x-auto lg:overflow-x-hidden flex flex-col justify-between flex-grow">
            <ul className="flex flex-col py-4 space-y-1">
              <div className="max-w-full mx-auto rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                  <h3 className="text-gray-600 text-sm dark:text-white/90">
                    Information du Hangar
                  </h3>
                  <h3 className="mt-1 font-bold text-gray-900 dark:text-white/90">
                    {selectedHangar?.name || "-"} /{" "}
                    {selectedHangar?.site || "-"}
                  </h3>
                  <h3 className="mt-1 font-medium text-gray-900 dark:text-white/90">
                    Adresse
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-white/70 text-sm">
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
                        Stock Maïs Blanc
                      </p>
                      <p className="mt-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        {selectedHangar?.quantite_blanc >= 1000 ? (
                          <>
                            {(
                              selectedHangar?.quantite_blanc / 1000
                            ).toLocaleString("fr-FR", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}{" "}
                            <span className="text-sm">T</span>
                          </>
                        ) : (
                          <>
                            {selectedHangar?.quantite_blanc?.toLocaleString(
                              "fr-FR"
                            ) || 0}{" "}
                            <span className="text-sm">Kg</span>
                          </>
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        Stock Maïs Jaune
                      </p>
                      <p className="mt-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        {selectedHangar?.quantite_jaune >= 1000 ? (
                          <>
                            {(
                              selectedHangar?.quantite_jaune / 1000
                            ).toLocaleString("fr-FR", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}{" "}
                            <span className="text-sm">T</span>
                          </>
                        ) : (
                          <>
                            {selectedHangar?.quantite_jaune?.toLocaleString(
                              "fr-FR"
                            ) || 0}{" "}
                            <span className="text-sm">Kg</span>
                          </>
                        )}
                      </p>
                    </div>
                    <div>
                      <Button
                        className="bg-green-600 hover:bg-green-600 disabled:bg-green-600"
                        disabled={!selectedHangar?.name}
                      >
                        Voir détail
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>

      <div className="col-span-4 lg:col-span-3 h-[80vh] space-y-6 overflow-x-auto rounded overflow-hidden">
        {data.length > 0 ? (
          <MapWithNoSSR
            data={data}
            onMarkerClick={setSelectedHangar}
            onFilterClick={setSelectedHangar}
          />
        ) : (
          <SkeletonLoader
            height="100%"
            className="from-gray-300 via-gray-50 to-gray-300"
          />
        )}
      </div>
    </div>
  );
}

export default GlobalMap;
