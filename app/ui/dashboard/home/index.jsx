"use client"
import React,{useState, useEffect}from "react";
import CardsOverview from "./cards_overview";
import SalePurchage from "../../charts/home/SalePurchage";
import BenefitsChart from "../../charts/home/benefits";
import Loss from "../../charts/home/loss";
import Cultuvators from "../../charts/cultuvators/cultuvators";
import GenderChart from "../../charts/cultuvators/gender";
import StocksChart from "../../charts/stocks/stocks";
import TotalCultivators from "../../charts/cultuvators/total_cultivators_card";
import TotalStocks from "../../charts/stocks/total_stocks_card";
import TotalHangars from "../../charts/stocks/total_hangars";
import MargeBrut from "../../charts/home/marge_brut";
import BuyPrice from "../../charts/home/buy_price";
import SellPrice from "../../charts/home/sell_price";

function Home_dashboard() {

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-spa/n-4">
        <CardsOverview />
      </div>
      <div className=" col-span-12 space-y-6 lg:col-span-7">
        <SalePurchage />
      </div>
      <div className="col-span-12 lg:col-span-5 space-y-6 xl:col-spa/n-5">
        <div className="grid grid-cols-4 gap-4 ">
          <div className="col-span-4 lg:col-span-4 space-y-/6">
            <BenefitsChart />
          </div>
          <div className="col-span-4 lg:col-span-2 space-y-/6">
            <MargeBrut />
          </div>
          <div className="col-span-4 lg:col-span-2 space-y-/6">
            <BuyPrice />
          </div>
          <div className="col-span-4 lg:col-span-2 space-y-/6">
            <SellPrice />
          </div>
        </div>
      </div>

      <div className=" col-span-12 space-y-6 lg:col-span-8">
        <Cultuvators />
      </div>

      <div className=" col-span-12 lg:col-span-4 space-y-6">
        <TotalCultivators />
        <GenderChart />
      </div>
      <div className=" col-span-12 lg:col-span-3 space-y-6">
        <TotalStocks />
        <TotalHangars />
        <Loss />
      </div>

      <div className=" col-span-12 lg:col-span-9 space-y-6">
        <StocksChart />
      </div>

      {/* <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div> */}
    </div>
  );
}

export default Home_dashboard;
