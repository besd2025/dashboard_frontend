import React from "react";
import { Droplets, PackageCheck, Scale, Bug, Warehouse } from "lucide-react";

const QualityBadge = ({ label, status, icon: Icon, detail }) => (
  <div className="flex flex-col py-2.5 border-b border-gray-50 dark:border-gray-800 last:border-0">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon size={16} className="text-gray-400" />
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {label}
        </span>
      </div>
      <div
        className={`px-3 py-1 rounded-full text-[10px]  uppercase ${
          status
            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20"
            : "bg-gray-100 text-gray-400 dark:bg-gray-800"
        }`}
      >
        {status ? "Oui" : "Non"}
      </div>
    </div>
    {detail && status && (
      <p className="mt-1 ml-6 text-xs text-green-500 font-medium ">{detail}</p>
    )}
  </div>
);

const DetailsQuality = ({ data: d }) => {
  return (
    <div>
      <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-4 uppercase tracking-wider">
        Qualité & Conservation
      </h3>
      <div className="space-y-1">
        <QualityBadge label="Aération" status={d.is_aerated} icon={Droplets} />
        <QualityBadge
          label="Palettes"
          status={d.has_pallets}
          icon={PackageCheck}
        />
        <QualityBadge label="Sacs PICS" status={d.has_pics_bags} icon={Scale} />
        <QualityBadge
          label="Insecticide"
          status={d.has_insecticide}
          icon={Bug}
          detail={d.insecticide_details}
        />
        <QualityBadge label="Humidité" status={d.is_humid} icon={Droplets} />
        <QualityBadge
          label="Stockage au sol"
          status={d.is_on_floor}
          icon={Warehouse}
        />
      </div>
    </div>
  );
};

export default DetailsQuality;
