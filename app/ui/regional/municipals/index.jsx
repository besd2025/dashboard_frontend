import React from "react";
import Totalmunicipals from "../../charts/stocks/total_municipals";
import HangarList from "../../ui_elements/tables/provincial/municipals/municipal_list_enatt";
import AllCultivator from "../cultivators/list";
import AllCultivatorsList from "../../ui_elements/tables/provincial/cultivators/all_cultivators_list";
import TotalQtemunicipals from "./total_qte_municipals";

function municipals() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className=" col-span-12 space-y-6 lg:col-span-3">
        <Totalmunicipals />
      </div>
      <div className=" col-span-12 space-y-6 lg:col-span-5">
        <TotalQtemunicipals />
      </div>

      <div className=" col-span-12 space-y-6 lg:col-span-12">
        <HangarList />
        {/* <AllCultivatorsList /> */}
      </div>
    </div>
  );
}

export default municipals;
