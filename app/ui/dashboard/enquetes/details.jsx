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

const DetailItem = ({ icon, label, total, blanc, jaune, unit = "Kg" }) => {
  const formatValue = (val) => {
    if (val >= 1000) {
      return (
        <>
          {(val / 1000).toLocaleString("fr-FR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          <span className="text-sm">T</span>
        </>
      );
    }
    return (
      <>
        {val?.toLocaleString("fr-FR") || 0}{" "}
        <span className="text-sm">{unit}</span>
      </>
    );
  };

  return (
    <div className="py-1 first:pt-0 last:pb-0">
      <div className="flex items-center justify-between group">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-11 h-11 bg-gray-50 rounded-xl dark:bg-gray-800 transition-all group-hover:scale-105 group-hover:bg-gray-100 dark:group-hover:bg-gray-700">
            {React.cloneElement(icon, {
              className: "size-6 text-gray-700 dark:text-gray-300",
            })}
          </div>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {label}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-md font-medium text-gray-900 dark:text-white">
            {formatValue(total)}
          </div>
          {(blanc !== undefined || jaune !== undefined) && (
            <div className="flex items-center gap-4 mt-1.5 transition-opacity group-hover:opacity-100">
              <div className="flex items-center gap-2 px-2 py-0.5 rounded-md bg-green-50/50 dark:bg-green-900/10 border border-green-100/50 dark:border-green-800/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-gray-200"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-[11px] font-medium text-green-600/80 dark:text-green-400/80">
                  Blanc: {formatValue(blanc)}
                </span>
              </div>
              <div className="flex items-center gap-2 px-2 py-0.5 rounded-md bg-yellow-50/50 dark:bg-yellow-900/10 border border-yellow-100/50 dark:border-yellow-800/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-[11px] font-medium text-yellow-600/80 dark:text-yellow-400/80">
                  Jaune: {formatValue(jaune)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function EnqueteHangarDetails({ id }) {
  const [actats, setAchats] = useState({});
  const [ventes, setVentes] = useState({});
  const [transfers, setTransfers] = useState({});
  const [stock_initial, setStockInitial] = useState({});
  const [cultivateurs, setACultivateurs] = useState({});
  const [error, setError] = useState(null);
  const [qte_blanc_restante, setBlancRestante] = useState(0);
  const [qte_jaune_restante, setJauneRestante] = useState(0);
  const [qte_recues, setQteRecues] = useState({});
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!id) return; // Ne rien faire si l'ID est invalide

    const getData = async () => {
      try {
        const values = await fetchData(
          "get",
          `/tous_enquetes/anagessa/enquete/${id}/`,
          {
            params: {},
            additionalHeaders: {},
            body: {},
          },
        );
        setData(values);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    };

    getData();
  }, [id]);

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="outline"
          className="cursor-pointer border-none shadow-none w-full"
        >
          Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] ">
        <DialogHeader>
          <DialogTitle>Details</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-800 max-h-[70vh] overflow-y-auto px-3">
          <DetailItem
            label="Qté Collectée"
            total={data?.total_quantity_collected_kg}
            blanc={data?.quantity_collected_blanc_kg}
            jaune={data?.quantity_collected_jaune_kg}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3"
                />
              </svg>
            }
          />

          <DetailItem
            label="Qté Vendue"
            total={data?.quantity_sold_blanc_kg + data?.quantity_sold_jaune_kg}
            blanc={data?.quantity_sold_blanc_kg}
            jaune={data?.quantity_sold_jaune_kg}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v7.5m2.25-6.466a9.016 9.016 0 0 0-3.461-.203c-.536.072-.974.478-1.021 1.017a4.559 4.559 0 0 0-.018.402c0 .464.336.844.775.994l2.95 1.012c.44.15.775.53.775.994 0 .136-.006.27-.018.402-.047.539-.485.945-1.021 1.017a9.077 9.077 0 0 1-3.461-.203M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
            }
          />

          <DetailItem
            label="Qté Transférée"
            total={data?.quantity_transferred_blanc_kg + data?.quantity_transferred_jaune_kg}
            blanc={data?.quantity_transferred_blanc_kg}
            jaune={data?.quantity_transferred_jaune_kg}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
            }
          />

          <DetailItem
            label="Qté Reçue"
            total={data?.quantity_received_blanc_kg + data?.quantity_received_jaune_kg}
            blanc={data?.quantity_received_blanc_kg}
            jaune={data?.quantity_received_jaune_kg}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
            }
          />
          <DetailItem
            label="Stock Initial (2024)"
            total={data?.total_quantity_initial_kg}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                <path
                  fillRule="evenodd"
                  d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087ZM12 10.5a.75.75 0 0 1 .75.75v4.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72v-4.94a.75.75 0 0 1 .75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />

          <DetailItem
            label="Stocks disponibles"
            total={qte_blanc_restante + qte_jaune_restante}
            blanc={qte_blanc_restante}
            jaune={qte_jaune_restante}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
                />
              </svg>
            }
          />

          <DetailItem
            label="QTE RESTANTE"
            total={data?.quantity_remaining_kg}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
                />
              </svg>
            }
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Fermer</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
