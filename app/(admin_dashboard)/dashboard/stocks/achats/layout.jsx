import React from "react";
import Sidebar from "../../../../ui/dashboard/stocks/achats/sidebar";

function layout({ children }) {
  return (
    <div className="grid grid-cols-4 gap-2 relative">
      <div className="col-span-4  space-y-2  sticky top-16 z-10">
        <Sidebar />
      </div>
      <div className="col-span-4 space-y-2  overflow-x-auto">{children}</div>
    </div>
  );
}

export default layout;
