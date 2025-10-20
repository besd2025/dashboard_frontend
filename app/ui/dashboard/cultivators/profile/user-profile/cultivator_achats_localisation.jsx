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
        const response = await fetchData(
          "get",
          `/cultivators/${cultivateur_id}/get_cultivators_purchases/`,
          {
            params: {},
            additionalHeaders: {},
            body: {},
          }
        );
        const options = response?.results?.map((item) => ({
          name: item?.collector?.hangar?.hangar_name,
          site: "",
          quantite_blanc: item?.quantity_blanc,
          quantite_jaune: item?.quantity_jaune,
          province: item.collector?.hangar?.province,
          commune: item?.collector?.hangar?.commune,
          zone: item.collector?.hangar?.zone,
          latitude: item?.latitude,
          longitude: item?.longitude,
        }));

        setAchatData(options);
        if (options.length > 0) {
          setSelectedCultivator(options[0]);
        }
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
