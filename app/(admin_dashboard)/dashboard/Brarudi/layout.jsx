import React from "react";
import Sidebar from "../../../ui/dashboard/brarudi/sidebar";

function layout({ children }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-4  space-y-6 ">
        <Sidebar />
      </div>
      <div className="col-span-4 space-y-6  overflow-x-auto">{children}</div>
    </div>
  );
}

export default layout;
