import React from "react";
import { Warehouse, Droplets, PackageCheck, Scale, Bug } from "lucide-react";
import QualityBadge from "./quality_badge";

const InfrastructureSection = ({ quality }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-8">
        <div className="size-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white">
          <Warehouse size={18} />
        </div>
        Infrastructure & Conformité
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <QualityBadge
          label="Non Aération"
          rate={quality.aeration_rate}
          icon={Droplets}
          color="text-cyan-500"
        />
        <QualityBadge
          label="Non Palettes"
          rate={quality.pallets_rate}
          icon={PackageCheck}
          color="text-amber-600"
        />
        <QualityBadge
          label="Non Sacs PICS"
          rate={quality.pics_bags_rate}
          icon={Scale}
          color="text-emerald-500"
        />
        <QualityBadge
          label="Non Insecticide"
          rate={quality.insecticide_rate}
          icon={Bug}
          color="text-purple-500"
        />
      </div>
    </div>
  );
};

export default InfrastructureSection;
