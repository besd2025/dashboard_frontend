import React from "react";
import { Warehouse } from "lucide-react";

const DetailsHeader = ({ data: d }) => {
  return (
    <div className="flex items-center mb-6 gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
          <Warehouse size={24} />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {d.hangar.hangar_name}
          </h2>
          {d?.hangar?.new_hangar_real_name && (
            <p className="text-xs font-medium">
              {d?.hangar?.new_hangar_real_name}{" "}
              <sup className="text-green-600 dark:text-green-400 px-2 py-0.5 bg-green-100 dark:bg-green-900/20 rounded-full">
                *Nom réel du hangar
              </sup>
            </p>
          )}
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {d.hangar.hangar_code} &bull; {d.hangar.province} &bull;{" "}
            {d.hangar.commune} &bull; {d.hangar.zone}
          </p>
        </div>
      </div>
      <div
        className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase ${
          d.appreciation === "Bon"
            ? "bg-emerald-50 text-emerald-600"
            : d.appreciation === "Moyen"
              ? "bg-amber-50 text-amber-600"
              : "bg-red-50 text-red-600"
        }`}
      >
        <span className="text-xs">Appreciation: {d.appreciation}</span>
      </div>
    </div>
  );
};

export default DetailsHeader;
