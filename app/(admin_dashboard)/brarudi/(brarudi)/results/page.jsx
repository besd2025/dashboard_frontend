"use client";
import React, { useEffect, useState, useCallback } from "react";
import Results from "../../../../ui/brarudi/results/results";
import { fetchData } from "../../../../_utils/api";

export default function Page() {
  const [pointer, setPointer] = useState(0);
  const limit = 5;

  const [retours, setRetours] = useState([]);
  const [erreur, setErreur] = useState("");

  const buildProduits = useCallback((item) => {
    return [
      {
        name: "Farine (blanc)",
        quantite: item?.quantite_farine_blanc,
        prix: item?.prix_kg_farine,
      },
      {
        name: "Farine (jaune)",
        quantite: item?.quantite_farine_jaune,
        prix: item?.prix_kg_farine,
      },
      {
        name: "Son (blanc)",
        quantite: item?.quantite_son_blanc,
        prix: item?.prix_kg_son,
      },
      {
        name: "Son (jaune)",
        quantite: item?.quantite_son_jaune,
        prix: item?.prix_kg_son,
      },
    ]
      .filter((l) => l.quantite > 0)
      .map((l) => ({ ...l, prix_total: l.quantite * l.prix }));
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchData("get", "/retour/", {
          params: { offset: pointer, limit },
        });
        setRetours(res?.results || []);
      } catch (err) {
        console.error(err);
        setErreur("Erreur lors du chargement des données");
      }
    })();
  }, [pointer]);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50/60 lg:px-5 px-0 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <h3 className="px-3 py-3 text-lg font-semibold text-gray-800 dark:text-white/90">
        Retour des résidus
      </h3>

      {erreur && <p className="px-3 text-sm text-red-600">{erreur}</p>}

      <div className="flex flex-col gap-y-6 px-3 lg:px-0">
        {retours.map((item, index = 0) => (
          <Results key={index + 1} products={buildProduits(item)} />
        ))}
      </div>
    </div>
  );
}
