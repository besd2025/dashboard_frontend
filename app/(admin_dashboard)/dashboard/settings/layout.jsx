import Sidebar from "../../../ui/dashboard/settings/sidebar";
import React from "react";

function layout({ children }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-4 lg:col-span-1 space-y-6 ">
        <Sidebar />
      </div>
      <div className="col-span-4 lg:col-span-3 space-y-6  overflow-x-auto">
        {children}
      </div>
    </div>
  );
}

export default layout;
