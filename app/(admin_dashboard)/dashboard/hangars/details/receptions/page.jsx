// import React from "react";
// import HangarReceiptlist from "../../../../../ui/ui_elements/tables/dashboard/hangars/details/hangar_receipt_list";

// function page() {
//   return <HangarReceiptlist />;
// }

// export default page;
import React, { Suspense } from "react";
import HangarReceptionsWrapper from "./wrapper"; // ← Composant client qui utilise useSearchParams

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div>Chargement en cours...</div>}>
      <HangarReceptionsWrapper />
    </Suspense>
  );
}
