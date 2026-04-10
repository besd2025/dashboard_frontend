import React from "react";
import HangarList from "../../../ui/dashboard/enquetes/hangar_list";

export default function page() {
  return (
    <div className="grid grid-cols-12 gap-2">
      <div className=" col-span-12 space-y-6 lg:col-span-12">
        <HangarList />
      </div>
    </div>
  );
}
