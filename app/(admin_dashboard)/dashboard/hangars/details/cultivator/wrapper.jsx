// app/(admin_dashboard)/dashboard/hangars/details/cultivator/wrapper.jsx
"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import HangarCultivatorsList from "../../../../../ui/ui_elements/tables/dashboard/hangars/details/hangar_cultivators_list";

export default function HangarCultivatorWrapper() {
  const searchParams = useSearchParams();
  const hangar_id = searchParams.get("hangar_id");

  useEffect(() => {
    if (hangar_id) {
      localStorage.setItem("hangarId", hangar_id);
    }
  }, [hangar_id]);

  return <HangarCultivatorsList hangar_id={hangar_id} />;
}
