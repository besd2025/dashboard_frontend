"use client";

import React from "react";
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
import { transformSurveyData, MOCK_ILLUSTRATION_DATA } from "./summary_components/utils";

export default function SurveySummaryDashboard({ results }) {
  const isIllustration =
    !results || (Array.isArray(results) && results.length === 0);
  const displayData = isIllustration ? MOCK_ILLUSTRATION_DATA : results;
  const summary = transformSurveyData(displayData);

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
          value={summary.total_quantity_initial_kg}
          unit="Kg"
          icon={Warehouse}
          iconColor="text-blue-600"
          bgColor="bg-blue-50 dark:bg-blue-900/20"
        />
        <KPICard
          title="Collecté"
          value={summary.total_quantity_collected_kg}
          unit="Kg"
          icon={TrendingUp}
          iconColor="text-emerald-600"
          bgColor="bg-emerald-50 dark:bg-emerald-900/20"
        />
        <KPICard
          title="Vendu"
          value={summary.sold.total}
          unit="Kg"
          icon={ShoppingCart}
          iconColor="text-purple-600"
          bgColor="bg-purple-50 dark:bg-purple-900/20"
        />
        <KPICard
          title="Transféré"
          value={summary.transferred.total}
          unit="Kg"
          icon={ArrowUpRight}
          iconColor="text-amber-600"
          bgColor="bg-amber-50 dark:bg-amber-900/20"
        />
        <KPICard
          title="Restant"
          value={summary.quantity_remaining_kg}
          unit="Kg"
          icon={PackageCheck}
          iconColor="text-indigo-600"
          bgColor="bg-indigo-50 dark:bg-indigo-900/20"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        {/* Movements & Infrastructure Column */}
        <div className="xl:col-span-3 space-y-8">
          <MovementSection summary={summary} />
          <InfrastructureSection quality={summary.quality} />
        </div>

        {/* Quality & Losses Column */}
        <LossesSection losses={summary.losses} totalLosses={totalLosses} />
      </div>
    </div>
  );
}
