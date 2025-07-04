import Totalmunicipals from "../../../../ui/charts/stocks/total_municipals";
import municipals from "../../../../ui/provincial/municipals";
import React from "react";
import TotalQtemunicipals from "../../../../ui/provincial/municipals/total_qte_municipals";

function layout({ children }) {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className=" col-span-12 space-y-6 lg:col-span-3">
        <Totalmunicipals />
      </div>
      <div className=" col-span-12 space-y-6 lg:col-span-3">
        <TotalQtemunicipals />
      </div>

      <div className=" col-span-12 space-y-6 lg:col-span-12">{children}</div>
    </div>
  );
}

export default layout;
