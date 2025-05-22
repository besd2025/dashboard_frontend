import React from "react";
import CardsOverview from "./cards_overview";
import SalePurchage from "../../charts/home/SalePurchage";
import BenefitsChart from "../../charts/home/benefits";
import Loss from "../../charts/home/loss";
import Cultuvators from "../../charts/home/cultuvators/cultuvators";
import GenderChart from "../../charts/home/cultuvators/gender";
import StocksChart from "../../charts/home/stocks/stocks";
import TotalCultivators from "../../charts/home/cultuvators/total_cultivators";
import TotalStocks from "../../charts/home/stocks/total_stocks";
import TotalHangars from "../../charts/home/stocks/total_hangars";
function Home_dashboard() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-spa/n-4">
        <CardsOverview />
      </div>
      <div className=" col-span-12 space-y-6 lg:col-span-7">
        <SalePurchage />
      </div>
      <div className=" col-span-12 lg:col-span-5 space-y-6 xl:col-spa/n-5">
        <BenefitsChart />
        <Loss />
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
