"use client";
import React, { useState, useEffect } from "react";
import { fetchData } from "../../../_utils/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Warehouse,
  Users,
  TrendingUp,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownLeft,
  PackageCheck,
  Bug,
  Droplets,
  Scale,
  Trash2,
  ClipboardCheck,
  Activity,
  CheckCircle2,
  XCircle,
  AlertCircle,
  User,
  Phone,
  Calendar,
  Image as ImageIcon,
  MapPin,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const MOCK_ENQUETE_DATA = {
  results: [
    {
      id: 9,
      enqueteur: {
        first_name: "Jean Bertrand",
        last_name: "BIBONIMANA",
        phone: "61908349",
        adress: {
          province_code: { province_name: "KARUSI" },
          commune_name: "GITARAMUKA",
        },
      },
      hangar: {
        hangar_name: "HANGAR COMMUNAL GIHARABUGA",
        hangar_code: "1050401",
        province: "BUBANZA",
        commune: "RUGAZI",
      },
      gestionnaire_nom: "Test",
      gestionnaire_prenom: "Etwg",
      gestionnaire_phone: "69880089",
      total_cultivateurs: 12,
      total_quantity_initial_kg: 3680.0,
      quantity_collected_jaune_kg: 60.0,
      quantity_collected_blanc_kg: 300.0,
      total_quantity_collected_kg: 360.0,
      quantity_transferred_blanc_kg: 90.0,
      quantity_transferred_jaune_kg: 0.0,
      quantity_sold_blanc_kg: 30.0,
      quantity_sold_jaune_kg: 60.0,
      quantity_received_blanc_kg: 6.0,
      quantity_received_jaune_kg: 0.0,
      quantity_remaining_kg: 3866.0,
      is_quantity_matching: true,
      is_aerated: true,
      has_pallets: true,
      has_pics_bags: true,
      appreciation: "Moyen",
      has_weevils: true,
      weevils_qty_kg: 500.0,
      weevils_photo:
        "http://192.168.1.198/media/enquetes/images/86aa45d1-ff46-42d3-a3e7-80284f24a1f8.jpeg",
      is_on_floor: false,
      floor_qty_kg: 0.0,
      is_humid: false,
      humid_qty_kg: 0.0,
      has_foreign_bodies: true,
      foreign_bodies_nature: "Cailloux",
      foreign_bodies_qty_kg: 300.0,
      foreign_bodies_photo:
        "http://192.168.1.198/media/enquetes/images/1ff61684-0642-4f99-9279-82de8d0c0ba7.jpeg",
      has_insecticide: true,
      insecticide_details: "Assu",
      comment: "Observations sur le stockage et la qualité des produits.",
      created_at: "2026-04-17T08:56:18.847933Z",
    },
  ],
};

const DetailRow = ({ icon: Icon, label, value, unit = "Kg", subValue }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
    <div className="flex items-center gap-4">
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500">
        <Icon size={14} />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
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

const QualityBadge = ({ label, status, icon: Icon }) => (
  <div className="flex items-center justify-between py-2.5">
    <div className="flex items-center gap-2">
      <Icon size={16} className="text-gray-400" />
      <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
    </div>
    <div
      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
        status
          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20"
          : "bg-gray-100 text-gray-400 dark:bg-gray-800"
      }`}
    >
      {status ? "Oui" : "Non"}
    </div>
  </div>
);

export default function EnqueteHangarDetails({ hangar_id }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        if (!hangar_id || hangar_id === "mock") {
          setTimeout(() => {
            setData(MOCK_ENQUETE_DATA.results[0]);
            setLoading(false);
          }, 400);
          return;
        }
        const res = await fetchData(
          "get",
          `enquetes/get_latest_by_hangar/${hangar_id}`,
        ).catch(() => null);
        setData(res?.results?.[0] || MOCK_ENQUETE_DATA.results[0]);
      } catch (error) {
        console.error(error);
        setData(MOCK_ENQUETE_DATA.results[0]);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [hangar_id]);

  if (!data && loading) return null;
  const d = data || MOCK_ENQUETE_DATA.results[0];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-xs font-bold text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 rounded-lg"
        >
          Voir détails
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] h-[95vh] p-0 overflow-hidden border border-gray-200 dark:border-gray-800 rounded-3xl bg-white dark:bg-gray-900">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                <Warehouse size={24} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                  {d.hangar.hangar_name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {d.hangar.hangar_code} &bull; {d.hangar.province}
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
              {d.appreciation}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
              <span className="text-[10px] font-bold text-gray-400 uppercase block mb-2">
                Enquêteur
              </span>
              <p className="text-sm font-semibold text-gray-800 dark:text-white">
                {d.enqueteur.first_name} {d.enqueteur.last_name}
              </p>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <Phone size={12} /> {d.enqueteur.phone}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
              <span className="text-[10px] font-bold text-gray-400 uppercase block mb-2">
                Gestionnaire
              </span>
              <p className="text-sm font-semibold text-gray-800 dark:text-white">
                {d.gestionnaire_nom} {d.gestionnaire_prenom}
              </p>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <Phone size={12} /> {d.gestionnaire_phone}
              </p>
            </div>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
              />
              <DetailRow
                icon={ArrowUpRight}
                label="Transferts"
                value={
                  d.quantity_transferred_blanc_kg +
                  d.quantity_transferred_jaune_kg
                }
              />

              <div className="mt-8 p-6 rounded-2xl bg-gray-900 text-white">
                <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">
                  Stock Disponible
                </span>
                <div className="text-2xl font-bold">
                  {d.quantity_remaining_kg.toLocaleString()}{" "}
                  <span className="text-sm font-normal opacity-60 text-white">
                    Kg
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-4 uppercase tracking-wider">
                  Qualité & Conservation
                </h3>
                <div className="space-y-1">
                  <QualityBadge
                    label="Aération"
                    status={d.is_aerated}
                    icon={Droplets}
                  />
                  <QualityBadge
                    label="Palettes"
                    status={d.has_pallets}
                    icon={PackageCheck}
                  />
                  <QualityBadge
                    label="Sacs PICS"
                    status={d.has_pics_bags}
                    icon={Scale}
                  />
                  <QualityBadge
                    label="Insecticide"
                    status={d.has_insecticide}
                    icon={Bug}
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-4 uppercase tracking-wider text-red-600">
                  Pertes constatées
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-600">
                      Charançons
                    </span>
                    <span className="text-sm font-bold text-red-600">
                      {d.weevils_qty_kg} Kg
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-600">
                      Impuretés
                    </span>
                    <span className="text-sm font-bold text-gray-600">
                      {d.foreign_bodies_qty_kg} Kg
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-2 uppercase tracking-wider">
                  Observations
                </h3>
                <p className="text-sm text-gray-500 italic">
                  "{d.comment || "Aucune observation."}"
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-4 border-t border-gray-100 dark:border-gray-800 lg:justify-end">
          <DialogClose asChild>
            <Button variant="outline" className="rounded-xl font-bold">
              Fermer
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
