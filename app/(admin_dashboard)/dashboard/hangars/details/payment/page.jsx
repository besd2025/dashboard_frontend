import HangarPaidCultivators from "../../../../../ui/ui_elements/tables/dashboard/hangars/details/hangar-paid-cultivators";
import React from "react";

function page() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        Gestion des paiements
      </h3>
      <div className="space-y-4">
        <div className="w-full">
          <HangarPaidCultivators />
        </div>
      </div>
    </div>
  );
}

export default page;
