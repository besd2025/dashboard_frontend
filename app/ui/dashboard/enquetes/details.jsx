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

      } catch (error) {
        console.error(error);
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
