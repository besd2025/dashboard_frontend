"use client";
import React from "react";
import TotalCultivators from "../../charts/cultuvators/total_cultivators_card";
import GenderChart from "../../charts/cultuvators/gender";
import AgeRange from "../../charts/cultuvators/age_range";
import Cultuvators from "../../charts/cultuvators/cultuvators";
import NewCultivatorsCharts from "./new_cultivators";
import RecentCultivatorsList from "../../ui_elements/tables/dashboard/cultivators/recent_list_cultivators";
import ActifCultivators from "./actif_cultivators";

function CultivatorsHome() {
  return (
    <div className="grid grid-cols-12 gap-2">
      <div className=" col-span-12 space-y-6 lg:col-span-3">
        <TotalCultivators />
      </div>
      <div className=" col-span-12 space-y-6 lg:col-span-2">
        <ActifCultivators />
      </div>

      <div className="col-span-12 space-y-6 xl:col-spa/n-5">
        <div className="grid grid-cols-12 gap-2 ">
          <div className=" col-span-12 space-y-6 lg:col-span-8">
            <Cultuvators />
          </div>
          <div className=" col-span-12 lg:col-span-4 space-y-2">
            <GenderChart />
          </div>
          <div className=" col-span-12  space-y-2">
            <AgeRange />
          </div>
        </div>
      </div>
      <div className=" col-span-12 space-y-6 lg:col-span-12">
        <NewCultivatorsCharts />
      </div>
      <div className=" col-span-12 space-y-6 lg:col-span-12">
        <RecentCultivatorsList />
      </div>
    </div>
  );
}

export default CultivatorsHome;
