import React from "react";
import Sidebar from "../../../../ui/dashboard/stocks/out/sidebar";

function layout({ children }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="col-span-4  space-y-2 ">
        <Sidebar />
      </div>
      <div className="col-span-4 space-y-2  overflow-x-auto">{children}</div>
    </div>
  );
}

export default layout;
