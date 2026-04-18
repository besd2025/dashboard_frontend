"use client";
import React, { useState, useEffect } from "react";
import { fetchData } from "../../../_utils/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ViewImageModal from "../../ui_elements/modal/ViewImageModal";

// Sub-components
import DetailsHeader from "./detail_components/DetailsHeader";
import DetailsPersonnel from "./detail_components/DetailsPersonnel";
import DetailsStocks from "./detail_components/DetailsStocks";
import DetailsQuality from "./detail_components/DetailsQuality";
import DetailsLosses from "./detail_components/DetailsLosses";
import DetailsObservations from "./detail_components/DetailsObservations";
import DetailsPhotos from "./detail_components/DetailsPhotos";

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
        hangar_name: "HANGAR COMMUNAL GIHARABUGA22",
        hangar_code: "1050401",
        province: "BUBANZA",
        commune: "RUGAZI",
        zone: "RUGAZI",
        new_hangar_real_name: "HANGAR NOUVEL",
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
      weevils_photo: "/img/billet_example.jpg",
      is_on_floor: false,
      floor_qty_kg: 0.0,
      floor_photo:
        "http://192.168.1.198/media/enquetes/images/86aa45d1-ff46-42d3-a3e7-80284f24a1f8.jpeg",
      is_humid: false,
      humid_qty_kg: 0.0,
      humid_photo:
        "http://192.168.1.198/media/enquetes/images/86aa45d1-ff46-42d3-a3e7-80284f24a1f8.jpeg",
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

  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const openImageModal = (url, label) => {
    setSelectedImage({ url, label });
    setIsImageModalOpen(true);
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
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

        // if (!hangar_id || hangar_id === "mock") {
        //   setTimeout(async () => {
        //    // setData(MOCK_ENQUETE_DATA.results[0]);
        //    const res = await fetchData(
        //   "get",
        //   `enquetes/get_latest_by_hangar/${hangar_id}`,
        // ).catch(() => null);
        // setData(res?.results);
        //     setLoading(false);
        //   }, 400);
        //   return;
        // }
        
      } catch (error) {
        console.error(error);
        //setData(MOCK_ENQUETE_DATA.results[0]);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id]);

  if (!data && loading) return null;
  const d = data;

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
{/* 
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
          /> */}
      <DialogContent
        onInteractOutside={(e) => {
          if (isImageModalOpen) e.preventDefault();
        }}
        onPointerDownOutside={(e) => {
          if (isImageModalOpen) e.preventDefault();
        }}
        className="sm:max-w-[900px] h-[95vh] p-0 border border-gray-200 dark:border-gray-800 rounded-3xl bg-white dark:bg-gray-900"
      >
        <div className="w-full h-full overflow-hidden rounded-3xl flex flex-col">
          <DialogHeader className="p-4 border-b border-gray-100 dark:border-gray-800">
            <DialogTitle className="sr-only">Détails de l'enquête</DialogTitle>
            <DetailsHeader data={d} />
            <DetailsPersonnel data={d} />
          </DialogHeader>

          <div className="max-h-[60vh] overflow-y-auto px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <DetailsStocks data={d} />
              <div className="space-y-6">
                <DetailsQuality data={d} />
                <DetailsLosses data={d} />
                <DetailsObservations comment={d?.comment} />
              </div>
            </div>
            <DetailsPhotos data={d} onImageClick={openImageModal} />
          </div>

          <DialogFooter className="p-4 border-t border-gray-100 dark:border-gray-800 lg:justify-end">
            <DialogClose asChild>
              <Button variant="outline" className="rounded-xl font-bold">
                Fermer
              </Button>
            </DialogClose>
          </DialogFooter>

        </div>

        <ViewImageModal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          imageUrl={selectedImage?.url}
          alt={selectedImage?.label}
        />
      </DialogContent>
    </Dialog>
  );
}
