// app/(admin_dashboard)/dashboard/hangars/details/cultivator/wrapper.jsx
"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import HangarTranfersList from "../../../../../ui/ui_elements/tables/dashboard/hangars/details/hangar_tranfers_list";
export default function HangarTransfertWrapper() {
  const searchParams = useSearchParams();
  const hangar_id = searchParams.get("hangar_id");

  return <HangarTranfersList hangar_id={hangar_id} />;
}
