// app/(admin_dashboard)/dashboard/hangars/details/cultivator/page.jsx
"use client";

import React, { Suspense } from "react";
import HangarCultivatorsList from "../../../../../ui/ui_elements/tables/dashboard/hangars/details/hangar_cultivators_list";

export default function Page({ searchParams }) {
  const hangar_id = searchParams?.hangar_id;
  localStorage.setItem("hangarId", hangar_id);
  return (
    <Suspense fallback={<div>Chargement en cours...</div>}>
      <HangarCultivatorsList hangar_id={hangar_id} />
    </Suspense>
  );
}
