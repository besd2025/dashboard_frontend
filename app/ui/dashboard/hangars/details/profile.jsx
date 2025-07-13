"use client";
import React, { useState } from "react";
import HangarMetaCard from "./hangar-profile/HangarMetaCard";
import CardsOverview from "./cards_overview";

function Profile({ hangar_id }) {
  console.log("Hangar ID in Profile:", hangar_id);
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Details Hangar
        </h3>
        <div className="space-y-6">
          <HangarMetaCard hangar_id={hangar_id} />
          <CardsOverview hangar_id={hangar_id} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
