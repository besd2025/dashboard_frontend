"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Button from "../../../../ui_elements/button/Button";
import { fetchData } from "../../../../../_utils/api";
import LoadingDots from "../../../../ui_elements/loading/loading_dots";
import SkeletonLoader from "../../../../ui_elements/loading/SkeletonLoader";

const MapWithNoSSR = dynamic(
  () => import("../../../../localisation/cultivator_Map"),
  {
    ssr: false,
    loading: () => <p>Loading map...</p>,
  }
);

function CultivatorAchatsLocalisation({ cultivateur_id }) {
  const [error, setError] = useState("");
  const [AchatData, setAchatData] = useState([]);
  const [CultivatorData, setCultivatorData] = useState();
  const [selectedCultivator, setSelectedCultivator] = useState(null);

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
        setAchatData(options);
        if (options.length > 0) {
          setSelectedCultivator(options[0]); // Set the first item as selected
        }
      } catch (error) {
        setError(error);
        console.error(error);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetchData(
          "get",
          `cultivators/${cultivateur_id}`,
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );
        console.log(response);
        const options = response;
        setCultivatorData(options);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    }
    getData();
  }, []);

  return (
    <div
      className={`${
        !AchatData.length > 0 ? "bg-bla/ck/50 opac/ity-50" : ""
      } lg:p-4 relative space-y-4`}
    >
      <div className="col-span-4 lg:col-span-3 h-[80vh] space-y-6 overflow-x-auto rounded overflow-hidden">
        {AchatData.length > 0 ? (
          <MapWithNoSSR
            data={AchatData}
            CultivatorData={CultivatorData}
            onMarkerClick={setSelectedCultivator}
            onFilterClick={setSelectedCultivator}
          />
        ) : (
          <SkeletonLoader height="100%" />
        )}
      </div>
    </div>
  );
}

export default CultivatorAchatsLocalisation;
