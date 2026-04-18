"use client";

import React, { useEffect, useState } from "react";
import {
  Warehouse,
  TrendingUp,
  ArrowUpRight,
  ShoppingCart,
  PackageCheck,
} from "lucide-react";

// Sub-components
import KPICard from "./summary_components/kpi_card";
import SummaryHeader from "./summary_components/summary_header";
import MovementSection from "./summary_components/movement_section";
import InfrastructureSection from "./summary_components/infrastructure_section";
import LossesSection from "./summary_components/losses_section";

// Logic & Data
import {
  transformSurveyData,
  MOCK_ILLUSTRATION_DATA,
} from "./summary_components/utils";
import { VisitedHangarStats } from "./summary_components/visited-hangar-stats";
import { ProvinceVisitedStats } from "./summary_components/province-visited";
import { fetchData } from "../../../_utils/api";

export default function SurveySummaryDashboard({ results }) {
  const isIllustration =
    !results || (Array.isArray(results) && results.length === 0);
  const displayData = isIllustration ? MOCK_ILLUSTRATION_DATA : results;
  const summary = transformSurveyData(displayData);


  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const total_quantity_collected = await fetchData(
          "get",
          `/tous_enquetes/anagessa/enquete/get_quantity_collected_stats/`,
          {
            params: {},
            additionalHeaders: {},
            body: {},
          },
        );       
                const Qte_restante = await fetchData(
          "get",
          `/tous_enquetes/anagessa/enquete/get_quantity_remaining_stats/`,
          {
            params: {},
            additionalHeaders: {},
            body: {},
          },
        ); 
     const Qte_initial = await fetchData(
          "get",
          `/tous_enquetes/anagessa/enquete/get_total_initial_quantity_stats/`,
          {
            params: {},
            additionalHeaders: {},
            body: {},
          },
        ); 
     const Qte_vendue = await fetchData(
          "get",
          `/tous_enquetes/anagessa/enquete/get_total_sales/`,
          {
            params: {},
            additionalHeaders: {},
            body: {},
          },
        ); 
     const Qte_transferee = await fetchData(
          "get",
          `/tous_enquetes/anagessa/enquete/get_total_transfers/`,
          {
            params: {},
            additionalHeaders: {},
            body: {},
          },
        ); 
     const Qte_recue = await fetchData(
          "get",
          `/tous_enquetes/anagessa/enquete/get_total_received/`,
          {
            params: {},
            additionalHeaders: {},
            body: {},
          },
        ); 
        const nombre_hangar_aeree = await fetchData(
          "get",
          `/tous_enquetes/anagessa/enquete/get_quantity_remaining_stats/`,
          {
            params: {},
            additionalHeaders: {},
            body: {},
          },
        ); 
        const total_visited = await fetchData(
          "get",
          `/tous_enquetes/anagessa/enquete/get_total_hangars_visited/`,
          {
            params: {},
            additionalHeaders: {},
            body: {},
          },
        ); 
        const total_parettes= await fetchData(
          "get",
          `/tous_enquetes/anagessa/enquete/get_total_pallets/`,
          {
            params: {},
            additionalHeaders: {},
            body: {},
          },
        ); 
        const total_pics_bags= await fetchData(
          "get",
          `/tous_enquetes/anagessa/enquete/get_total_pics_bags/`,
          {
            params: {},
            additionalHeaders: {},  
            body: {},
          },
        ); 
        const total_insertitudes= await fetchData(
          "get",
          `/tous_enquetes/anagessa/enquete/get_total_insecticide/`,
          {
            params: {},
            additionalHeaders: {},  
            body: {},
          },
        ); 
        const Qte_himidite= await fetchData(
          "get",
          `/tous_enquetes/anagessa/enquete/get_total_humid/`,
          {
            params: {},
            additionalHeaders: {},  
            body: {},
          },
        ); 
        const Qte_floor= await fetchData(
          "get",
          `/tous_enquetes/anagessa/enquete/get_total_floor/`,
          {
            params: {},
            additionalHeaders: {},  
            body: {},
          },
        ); 
        const Qte_foreign_bodies= await fetchData(
          "get",
          `/tous_enquetes/anagessa/enquete/get_total_foreign_bodies/`,
          {
            params: {},
            additionalHeaders: {},  
            body: {},
          },
        ); 
        const Qte_weevils= await fetchData(
          "get",
          `/tous_enquetes/anagessa/enquete/get_total_weevils/`,
          {
            params: {},
            additionalHeaders: {},  
            body: {},
          },
        ); 
        const Enquetes= await fetchData(
          "get",
          `/tous_enquetes/anagessa/enquete/stats_hangars_par_jour/`,
          {
            params: {},
            additionalHeaders: {},  
            body: {},
          },
        ); 
        setData({
        total_quantity_collected_kg:total_quantity_collected.total_quantity_collected_kg,
        total_quantity_initial_kg:Qte_initial.total_quantity_initial_kg,
        total_quantity_sold_kg:Qte_vendue.total_sales_qty,
        total_quantity_transferred_kg:Qte_transferee.total_transfers_qty,
        total_quantity_remaining_kg:Qte_restante.total_quantity_remaining_kg,
        collected:{
          total:total_quantity_collected.total_quantity_collected_kg,
          blanc:total_quantity_collected.total_quantity_collected_blanc_kg,
          jaune:total_quantity_collected.total_quantity_collected_jaune_kg,
        },
        sold:{
          total:Qte_vendue.total_sales_qty,
          blanc:Qte_vendue.total_sales_qty_blanc,
          jaune:Qte_vendue.total_sales_qty_jaune,
        },
        transferred:{
          total:Qte_transferee.total_transfers_qty,
          blanc:Qte_transferee.total_transfers_qty_blanc,
          jaune:Qte_transferee.total_transfers_qty_jaune,
        },
        received:{
          total:Qte_recue.total_received_qty,
          blanc:Qte_recue.total_received_qty_blanc,
          jaune:Qte_recue.total_received_qty_jaune,
        },
        quality:{
          total_hangars:total_visited.total_hangars_visited,
          aeration_rate:nombre_hangar_aeree.total_hangar_no_aerated,
          pallets_rate:total_parettes.total_hangar_no_pallets,
          pics_bags_rate:total_pics_bags.total_hangars_no_pics_bags,
          insecticide_rate:total_insertitudes.total_hangars_no_insecticide,   
        },
        losses:{
          weevils:Qte_weevils.total_weevils_qty_kg,
          foreign_bodies:Qte_foreign_bodies.total_foreign_bodies_qty_kg,
          humid:Qte_himidite.total_humid_qty_kg,
          floor:Qte_floor.total_qty_on_floor_qty_kg,
          totalLosses:Qte_weevils.total_weevils_qty_kg+Qte_foreign_bodies.total_foreign_bodies_qty_kg+Qte_himidite.total_humid_qty_kg,
        },
       total_enquetes:Enquetes,
        });

      } catch (error) {
        setError(error);
        console.error(error)
      }
    };

    getData();
  }, []);

  if (!summary)
    return (
      <div className="flex items-center justify-center p-12 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 dark:bg-gray-900/50 dark:border-gray-800">
        <p className="text-gray-500 font-medium italic">
          Aucune donnée disponible pour le résumé.
        </p>
      </div>
    );

  const totalLosses =
    summary.losses.weevils +
    summary.losses.foreign_bodies +
    summary.losses.humid +
    summary.losses.floor;

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Info */}
      <SummaryHeader summary={summary} />

      {/* Main KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          title="Stock Initial"
          value={data.total_quantity_initial_kg}
          unit="Kg"
          icon={Warehouse}
          iconColor="text-blue-600"
          bgColor="bg-blue-50 dark:bg-blue-900/20"
        />
        <KPICard
          title="Collecté"
          value={data.total_quantity_collected_kg}
          unit="Kg"
          icon={TrendingUp}
          iconColor="text-emerald-600"
          bgColor="bg-emerald-50 dark:bg-emerald-900/20"
        />
        <KPICard
          title="Vendu"
          value={data.total_quantity_sold_kg}
          unit="Kg"
          icon={ShoppingCart}
          iconColor="text-purple-600"
          bgColor="bg-purple-50 dark:bg-purple-900/20"
        />
        <KPICard
          title="Transféré"
          value={data.total_quantity_transferred_kg}
          unit="Kg"
          icon={ArrowUpRight}
          iconColor="text-amber-600"
          bgColor="bg-amber-50 dark:bg-amber-900/20"
        />
        <KPICard
          title="Restant"
          value={data.total_quantity_remaining_kg}
          unit="Kg"
          icon={PackageCheck}
          iconColor="text-indigo-600"
          bgColor="bg-indigo-50 dark:bg-indigo-900/20"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        {/* Movements & Infrastructure Column */}
        <div className="xl:col-span-3 space-y-8">
          <MovementSection summary={data} />
          <InfrastructureSection quality={data?.quality} />
        </div>

        {/* Quality & Losses Column */}
        <LossesSection losses={data.losses} totalLosses={data?.losses?.totalLosses} />
      </div>
      {/* <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <VisitedHangarStats totalVisited={data?.total_enquetes} />
        <ProvinceVisitedStats />
      </div> */}
    </div>
  );
}
