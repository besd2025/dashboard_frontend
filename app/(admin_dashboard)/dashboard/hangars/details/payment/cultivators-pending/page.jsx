import HangarPendingCultivators from "../../../../../../ui/ui_elements/tables/dashboard/hangars/details/hangar-pending-cultivators";
import React from "react";

function page() {
  return (
    <div className="rounded-2xl  bg-white   dark:bg-white/[0.03] ">
      <div className="space-y-4">
        <div className="w-full">
          <HangarPendingCultivators />
        </div>
      </div>
    </div>
  );
}

export default page;
