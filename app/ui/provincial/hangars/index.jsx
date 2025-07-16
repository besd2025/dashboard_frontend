import React from "react";
import TotalHangars from "../../charts/stocks/total_hangars";
import HangarList from "../../ui_elements/tables/municipal/hangars/hangar_list";
import TotalQteHangars from "./total_qte_hangars";
import TotalCultivatorsMunicipal from "../cultivators/total_Munic_cultivators_card";

function Hangars() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className=" col-span-12 space-y-6 lg:col-span-3">
        <TotalHangars />
      </div>
      <div className=" col-span-12 space-y-6 lg:col-span-5">
        <TotalQteHangars />
      </div>
      <div className=" col-span-12 space-y-6 lg:col-span-3">
        <TotalCultivatorsMunicipal />
      </div>
      <div className=" col-span-12 space-y-6 lg:col-span-12">
        <HangarList />
      </div>
    </div>
  );
}

export default Hangars;
