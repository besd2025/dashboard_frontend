import HangarCultivatorsList from "../../../../../../../ui/ui_elements/tables/municipal/hangars/details/hangar_cultivators_list";
import React, { Suspense } from "react";
export const dynamic = "force-dynamic";
function page() {
  return (
    <Suspense fallback={<p>Chargement des cultivateurs…</p>}>
      <HangarCultivatorsList />;
    </Suspense>
  );
}

export default page;
