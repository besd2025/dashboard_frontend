import HangarCultivatorsList from "../../../../../ui/ui_elements/tables/dashboard/hangars/details/hangar_cultivators_list";
import React from "react";

function page({ searchParams }) {
  const hangar_id = searchParams?.hangar_id;
  return (
    <>
      <HangarCultivatorsList hangar_id={hangar_id} />;
    </>
  );
}

export default page;
