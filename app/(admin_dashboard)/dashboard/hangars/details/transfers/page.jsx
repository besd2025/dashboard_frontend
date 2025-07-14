// "use client";
// import React from "react";
// import { useSearchParams } from "next/navigation";
// import HangarTranfersList from "../../../../../ui/ui_elements/tables/dashboard/hangars/details/hangar_tranfers_list";
// export const dynamic = "force-dynamic";
// function page() {
//   const searchParams = useSearchParams();
//   const hangar_id = searchParams.get("hangar_id");
//   return <HangarTranfersList hangar_id={hangar_id} />;
// }

// export default page;
import React, { Suspense } from "react";
import HangarTransfertWrapper from "./wrapper"; // ← Composant client qui utilise useSearchParams

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div>Chargement en cours...</div>}>
      <HangarTransfertWrapper />
    </Suspense>
  );
}
