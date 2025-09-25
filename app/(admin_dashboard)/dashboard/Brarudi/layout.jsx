import React from "react";
import Sidebar from "../../../ui/dashboard/brarudi/sidebar";
import CardsOverview from "../../../ui/dashboard/brarudi/cards_overview";

function layout({ children }) {
  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-12 space-y-6 xl:col-spa/n-4">
        <CardsOverview />
      </div>
      <div className="col-span-12   space-y-6 ">
        <Sidebar />
      </div>
      <div className="col-span-12 space-y-6  overflow-x-auto">{children}</div>
    </div>
  );
}

export default layout;
