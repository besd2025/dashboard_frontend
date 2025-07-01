"use client";
import TransformUnit from "../../../../ui/brarudi/stocks/transform_unit";
import Stocks from "../../../../ui/brarudi/stocks/stocks";

function page() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-spa/n-4">
        <Stocks />
      </div>
      <div className="col-span-12 space-y-6 xl:col-spa/n-4">
        <TransformUnit />
      </div>
    </div>
  );
}

export default page;
