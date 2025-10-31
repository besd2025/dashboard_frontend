import React from "react";
import AmountCard from "../amount_card_achat";
import QuantityColCard from "../quantity_col_card";
import QtyColChart from "../../../../charts/stocks/achat/qty_col_chart";
import TopAchat from "../../../../ui_elements/tables/dashboard/stocks/achats/top_achats";
import TopCultivateurs from "../../../../ui_elements/tables/dashboard/stocks/achats/top_cultivateurs";
import QteAchatProv from "../../../../charts/stocks/achat/qte_achat_prov";
function Achats() {
  return (
    <div className="grid grid-cols-12 gap-2">
      <div className=" col-span-12 space-y-2 lg:col-span-3">
        <QuantityColCard />
      </div>
      <div className=" col-span-12 space-y-2 lg:col-span-3">
        <AmountCard />
      </div>
      <div className=" col-span-12 space-y-2 lg:col-span-12">
        <QtyColChart />
      </div>
      <div className=" col-span-12 space-y-2 lg:col-span-12">
        <QteAchatProv />
      </div>
      <div className=" col-span-12 space-y-2 ">
        <TopAchat />
      </div>
      <div className=" col-span-12 space-y-2 ">
        <TopCultivateurs />
      </div>
    </div>
  );
}

export default Achats;
