import React from "react";
import HangarList from "../../../ui/dashboard/enquetes/hangar_list";
import SurveySummaryDashboard from "../../../ui/dashboard/enquetes/survey_summary";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../../../components/ui/tabs";
export default function page() {
  return (
    <div className="grid grid-cols-12 gap-2">
      <div className=" col-span-12 space-y-6 lg:col-span-12">
        <Tabs defaultValue="enquetes" className="w-full">
          <TabsList className="w-sm h-14">
            <TabsTrigger value="enquetes">Enquetes</TabsTrigger>
            <TabsTrigger value="hangars">Hangars</TabsTrigger>
          </TabsList>
          <TabsContent value="enquetes">
            <SurveySummaryDashboard />
          </TabsContent>
          <TabsContent value="hangars">
            <HangarList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
