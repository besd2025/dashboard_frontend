import React from "react";
import Totalprovincials from "../../charts/stocks/total_provincials";
import HangarList from "../../ui_elements/tables/regional/provincials/provincial_list_enatt";
import AllCultivator from "../cultivators/list";
import AllCultivatorsList from "../../ui_elements/tables/regional/cultivators/all_cultivators_list";
import TotalQteprovincials from "./total_qte_provincials";

function provincials() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className=" col-span-12 space-y-6 lg:col-span-3">
        <Totalprovincials />
      </div>
      <div className=" col-span-12 space-y-6 lg:col-span-3">
        <TotalQteprovincials />
      </div>

      <div className=" col-span-12 space-y-6 lg:col-span-12">
        <HangarList />
        {/* <AllCultivatorsList /> */}
      </div>
    </div>
  );
}

export default provincials;
