import Totalprovincials from "../../../../ui/charts/stocks/total_provincials";
import provincials from "../../../../ui/regional/provincials";
import React from "react";
import TotalQteprovincials from "../../../../ui/regional/provincials/total_qte_provincials";

function layout({ children }) {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className=" col-span-12 space-y-6 lg:col-span-3">
        <Totalprovincials />
      </div>
      <div className=" col-span-12 space-y-6 lg:col-span-3">
        <TotalQteprovincials />
      </div>

      <div className=" col-span-12 space-y-6 lg:col-span-12">{children}</div>
    </div>
  );
}

export default layout;
