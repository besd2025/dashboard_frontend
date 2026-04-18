import React from "react";

const DetailsLosses = ({ data: d }) => {
  return (
    <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
      <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-4 uppercase tracking-wider text-red-600">
        Pertes constatées
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Charançons
            </span>
          </div>
          <span className="text-sm font-bold text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-lg">
            {d.weevils_qty_kg} Kg
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Impuretés
            </span>
            {d.foreign_bodies_nature && (
              <span className="text-[11px] text-amber-600">
                Nature: {d.foreign_bodies_nature}
              </span>
            )}
          </div>
          <span className="text-sm font-bold text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-lg">
            {d.foreign_bodies_qty_kg} Kg
          </span>
        </div>
        {d.is_humid && (
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Humidité (Perte)
            </span>
            <span className="text-sm font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-lg">
              {d.humid_qty_kg} Kg
            </span>
          </div>
        )}
        {d.is_on_floor && (
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Stockage au sol
            </span>
            <span className="text-sm font-bold text-gray-600 bg-gray-50 dark:bg-gray-800 px-2 py-0.5 rounded-lg">
              {d.floor_qty_kg} Kg
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsLosses;
