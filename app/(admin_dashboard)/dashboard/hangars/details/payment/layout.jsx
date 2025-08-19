import Sidebar from "../../../../../ui/dashboard/hangars/details/payment/sidebar";
import React from "react";

function layout({ children }) {
  return (
    <div className="grid grid-cols-6">
      <div className="col-span-6 lg:col-span-1 space-y-6 ">
        <Sidebar />
      </div>
      <div className="col-span-6 lg:col-span-5 space-y-6  overflow-x-auto">
        {children}
      </div>
    </div>
  );
}

export default layout;
