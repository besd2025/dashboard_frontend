import React from "react";
import CardsOverview from "./cards_overview";

function Home_dashboard() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-s/pan-7">
        {/* <EcommerceMetrics />

          <MonthlySalesChart /> */}

        <CardsOverview />
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
