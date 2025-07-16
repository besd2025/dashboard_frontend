"use client";
import React, { useState } from "react";
import HangarMetaCard from "./hangar-profile/HangarMetaCard";
import HangarInfoCard from "./hangar-profile/HangarInfoCard";
import HangarAddressCard from "./hangar-profile/HangarAddressCard";
import CardsOverview from "./cards_overview";
import AllCultivatorsList from "../../../ui_elements/tables/municipal/cultivators/all_cultivators_list";
import HangarCultivatorsList from "../../../ui_elements/tables/municipal/hangars/details/hangar_cultivators_list";

function Profile() {
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Details Hangar
        </h3>
        <div className="space-y-6">
          <HangarMetaCard />
          <CardsOverview />
        </div>
      </div>
    </div>
  );
}

export default Profile;
