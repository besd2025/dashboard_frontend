import EditAchat from "../../../../../../ui/ui_elements/tables/dashboard/stocks/achats/Edit";

import React from "react";

function page(searchParams) {
  const achat_id = searchParams?.achat_id;
  return <EditAchat achat_id={achat_id} />;
}

export default page;
