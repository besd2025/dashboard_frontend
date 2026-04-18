import React from "react";
import { Activity, TrendingUp, ShoppingCart, ArrowUpRight } from "lucide-react";

const DetailRow = ({ icon: Icon, label, value, unit = "Kg", subValue }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
    <div className="flex items-center gap-4">
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500">
        <Icon size={14} />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-700 dark:text-gray-400 uppercase tracking-wider">
          {label}
        </p>
        {subValue && <div className="mt-1">{subValue}</div>}
      </div>
    </div>
    <div className="text-right">
      <span className="text-base font-bold text-gray-800 dark:text-white">
        {typeof value === "number" ? value.toLocaleString("fr-FR") : value}
      </span>
      {unit && (
        <span className="ml-1 text-[10px] font-bold text-gray-400 uppercase">
          {unit}
        </span>
      )}
    </div>
  </div>
);

const DetailsStocks = ({ data: d }) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-4 uppercase tracking-wider">
        Stocks & Flux
      </h3>

      <DetailRow
        icon={Activity}
        label="Stock Initial"
        value={d.total_quantity_initial_kg}
      />
      <DetailRow
        icon={TrendingUp}
        label="Collecté"
        value={d.total_quantity_collected_kg}
        subValue={
          <div className="flex gap-2 text-[11px] font-normal mt-2">
            <span className="text-gray-400">
              Blanc: {d.quantity_collected_blanc_kg} kg
            </span>
            <span className="text-amber-500">
              Jaune: {d.quantity_collected_jaune_kg} kg
            </span>
          </div>
        }
      />
      <DetailRow
        icon={ShoppingCart}
        label="Ventes"
        value={d.quantity_sold_blanc_kg + d.quantity_sold_jaune_kg}
        subValue={
          <div className="flex gap-2 text-[11px] font-normal mt-2">
            <span className="text-gray-400">
              Blanc: {d.quantity_sold_blanc_kg} kg
            </span>
            <span className="text-amber-500">
              Jaune: {d.quantity_sold_jaune_kg} kg
            </span>
          </div>
        }
      />
      <DetailRow
        icon={ArrowUpRight}
        label="Transferts(Sortie)"
        value={
          d.quantity_transferred_blanc_kg + d.quantity_transferred_jaune_kg
        }
        subValue={
          <div className="flex gap-2 text-[11px] font-normal mt-2">
            <span className="text-gray-400">
              Blanc: {d.quantity_transferred_blanc_kg} kg
            </span>
            <span className="text-amber-500">
              Jaune: {d.quantity_transferred_jaune_kg} kg
            </span>
          </div>
        }
      />
      <DetailRow
        icon={ArrowUpRight}
        label="Transferts(Entree)"
        value={d.quantity_received_blanc_kg + d.quantity_received_jaune_kg}
        subValue={
          <div className="flex gap-2 text-[11px] font-normal mt-2">
            <span className="text-gray-400">
              Blanc: {d.quantity_received_blanc_kg} kg
            </span>
            <span className="text-amber-500">
              Jaune: {d.quantity_received_jaune_kg} kg
            </span>
          </div>
        }
      />

      <div className="mt-8 p-6 rounded-2xl bg-gray-900 text-white">
        <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">
          Stock Disponible
        </span>
        <div className="text-2xl font-bold">
          {d.quantity_remaining_kg.toLocaleString()}{" "}
          <span className="text-sm font-normal opacity-60 text-white">Kg</span>
        </div>
      </div>
    </div>
  );
};

export default DetailsStocks;
