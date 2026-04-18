import React from "react";
import { Scale } from "lucide-react";
import { Separator } from "../../../../../components/ui/separator";
import BreakdownItem from "./breakdown_item";

const MovementSection = ({ summary }) => {
  console.log(summary);
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-800">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-4">
        <div className="size-8 rounded-lg bg-blue-500 flex items-center justify-center text-white">
          <Scale size={18} />
        </div>
        Détails des Mouvements
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase block mb-4">
              Collecte par Type
            </span>
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-gray-200 border border-gray-300"></div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Maïs Blanc
                    </span>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {summary.collected?.blanc?.toLocaleString()} Kg
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-yellow-400"></div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Maïs Jaune
                    </span>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {summary.collected?.jaune?.toLocaleString()} Kg
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Separator orientation="vertical" className="hidden md:block" />
          <div className="space-y-6 w-full">
            <BreakdownItem
              label="Ventes"
              total={summary.sold?.total}
              blanc={summary.sold?.blanc}
              jaune={summary.sold?.jaune}
            />
            <BreakdownItem
              label="Transferts (Sorties)"
              total={summary.transferred?.total}
              blanc={summary.transferred?.blanc}
              jaune={summary.transferred?.jaune}
            />
            <BreakdownItem
              label="Transferts (reçus)"
              total={summary.received?.total}
              blanc={summary.received?.blanc}
              jaune={summary.received?.jaune}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovementSection;
