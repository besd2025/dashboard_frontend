"use client";
import React, { Suspense } from "react";
import HangarAchatList from "../../../../../ui/ui_elements/tables/dashboard/hangars/details/hangar_achats_list";
export const dynamic = "force-dynamic";
export default function Page() {
  return (
    <Suspense fallback={<div>Chargement en cours...</div>}>
      {" "}
      <HangarAchatList />
    </Suspense>
  );
}
