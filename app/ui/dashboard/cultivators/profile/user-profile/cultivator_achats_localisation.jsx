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

function CultivatorAchatsLocalisation() {
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
    <div
      className={`${
        !data.length > 0 ? "bg-bla/ck/50 opac/ity-50" : ""
      } lg:p-4 relative space-y-4`}
    >
      <div className="col-span-4 lg:col-span-3 h-[80vh] space-y-6 overflow-x-auto rounded overflow-hidden">
        {data.length > 0 ? (
          <MapWithNoSSR
            data={data}
            onMarkerClick={setSelectedHangar}
            onFilterClick={setSelectedHangar}
          />
        ) : (
          <SkeletonLoader height="100%" />
        )}
      </div>
    </div>
  );
}

export default CultivatorAchatsLocalisation;
