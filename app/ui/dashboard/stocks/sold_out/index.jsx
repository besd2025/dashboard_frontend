import React from "react";
import QuantitySolCard from "./quantity_col_card";
import AmountCardSold from "./amount_card_sold";
import QtyVendChart from "../../../charts/stocks/sold_out/qty_vend_chart";
import TopSoldOut from "../../../ui_elements/tables/dashboard/stocks/sold_out/top_soldout";
import QteVendProv from "../../../charts/stocks/sold_out/qte_vend_prov";
import QteVendCategorie from "../../../charts/stocks/sold_out/qte_vend_categorie";
import QteVendSector from "../../../charts/stocks/sold_out/qte_vend_sector";
function SoldOut() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className=" col-span-12 space-y-6 lg:col-span-3">
        <QuantitySolCard />
      </div>
      <div className=" col-span-12 space-y-6 lg:col-span-3">
        <AmountCardSold />
      </div>
      <div className=" col-span-12 space-y-6 lg:col-span-12">
        <QtyVendChart />
      </div>
      <div className=" col-span-12 space-y-6 lg:col-span-12">
        <QteVendCategorie />
      </div>
      <div className=" col-span-12 space-y-6 lg:col-span-12">
        <QteVendProv />
      </div>
      <div className=" col-span-12 space-y-6 lg:col-span-12">
        <QteVendSector />
      </div>

      <div className=" col-span-12 space-y-6 lg:col-span-12">
        <TopSoldOut />
      </div>
    </div>
  );
}

export default SoldOut;
