import HangarAchatList from "../../../../../ui/ui_elements/tables/hangars/details/hangar_achats_list";
import React from "react";
import { useHangar } from "../../../../../ui/context/DetailContext";
function page({ searchParams }) {
  // const { hangar_id } = useHangar();
  const hangar_id = searchParams?.hangar_id;
  console.log(hangar_id);
  return (
    <>
      <HangarAchatList hangar_id={hangar_id} />;
    </>
  );
}

export default page;
