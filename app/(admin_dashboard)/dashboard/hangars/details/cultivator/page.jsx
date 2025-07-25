// // app/(admin_dashboard)/dashboard/hangars/details/cultivator/page.jsx
// "use client";

// import React, { Suspense, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import HangarCultivatorsList from "../../../../../ui/ui_elements/tables/dashboard/hangars/details/hangar_cultivators_list";
// export const dynamic = "force-dynamic";
// export default function Page() {
//   const searchParams = useSearchParams();
//   const hangar_id = searchParams.get("hangar_id");

//   // Stocker dans le localStorage après que le composant soit monté
//   useEffect(() => {
//     if (hangar_id) {
//       localStorage.setItem("hangarId", hangar_id);
//     }
//   }, [hangar_id]);

//   return (
//     <Suspense fallback={<div>Chargement en cours...</div>}>
//       <HangarCultivatorsList hangar_id={hangar_id} />
//     </Suspense>
//   );
// }
// app/(admin_dashboard)/dashboard/hangars/details/cultivator/page.jsx
import React, { Suspense } from "react";
import HangarCultivatorWrapper from "./wrapper"; // ← Composant client qui utilise useSearchParams

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div>Chargement en cours...</div>}>
      <HangarCultivatorWrapper />
    </Suspense>
  );
}
