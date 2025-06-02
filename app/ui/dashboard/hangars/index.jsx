import React from "react";
import TotalHangars from "../../charts/stocks/total_hangars";
import HangarList from "./hangar_list";

function Hangars() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className=" col-span-12 space-y-6 lg:col-span-3">
        <TotalHangars />
      </div>
      <div className=" col-span-12 space-y-6 lg:col-span-12">
        <HangarList />
      </div>
    </div>
  );
}

export default Hangars;
