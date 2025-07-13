// app/(admin_dashboard)/dashboard/hangars/details/cultivator/wrapper.jsx
"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import HangarReceiptlist from "../../../../../ui/ui_elements/tables/dashboard/hangars/details/hangar_receipt_list";
export default function HangarReceptionsWrapper() {
  const searchParams = useSearchParams();
  const hangar_id = searchParams.get("hangar_id");

  return <HangarReceiptlist hangar_id={hangar_id} />;
}
