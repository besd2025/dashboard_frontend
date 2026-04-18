import React from "react";
import { Bug, Trash2, Droplets } from "lucide-react";

const LossesSection = ({ losses, totalLosses }) => {
  return (
    <div className="xl:col-span-2 h-max bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
        <div className="size-8 rounded-lg bg-red-500 flex items-center justify-center text-white">
          <Bug size={18} />
        </div>
        Qualité & Pertes
      </h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-2xl bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/20">
          <div className="flex items-center gap-3">
            <Bug className="text-red-500" size={20} />
            <span className="text-sm font-semibold text-red-700 dark:text-red-400">
              Charançons
            </span>
          </div>
          <span className="font-bold text-red-900 dark:text-red-200">
            {losses?.weevils?.toLocaleString()} Kg
          </span>
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-orange-50/50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-800/20">
          <div className="flex items-center gap-3">
            <Trash2 className="text-orange-500" size={20} />
            <span className="text-sm font-semibold text-orange-700 dark:text-orange-400">
              Impuretés
            </span>
          </div>
          <span className="font-bold text-orange-900 dark:text-red-200">
            {losses?.foreign_bodies?.toLocaleString()} Kg
          </span>
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/20">
          <div className="flex items-center gap-3">
            <Droplets className="text-blue-500" size={20} />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">
              Humidité
            </span>
          </div>
          <span className="font-bold text-blue-900 dark:text-blue-200">
            {losses?.humid?.toLocaleString()} Kg
          </span>
        </div>

        <div className="mt-8 relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase block mb-1">
              Impact Total des Pertes
            </span>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold">
                {totalLosses?.toLocaleString()}
              </h3>
              <span className="text-sm text-gray-600">Kg</span>
            </div>
          </div>
          <div className="absolute -right-2 -bottom-2 size-20 bg-red-500/20 rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default LossesSection;
