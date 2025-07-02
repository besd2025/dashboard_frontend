"use client";
import Results from "../../../../ui/dashboard/brarudi/results/results";
import React, { useState, useEffect, useCallback } from "react";
import { fetchData } from "../../../../_utils/api";
function page() {
  const [pointer, setPointer] = useState(0);
  const limit = 5;

  const [results, setResults] = useState([]);
  const [erreur, setErreur] = useState("");

  const buildProduits = useCallback((item) => {
    return [
      {
        name: "Farine (blanc)",
        quantite: item?.quantite_farine_blanc,
      },
      {
        name: "Farine (jaune)",
        quantite: item?.quantite_farine_jaune,
      },
      {
        name: "Son (blanc)",
        quantite: item?.quantite_son_blanc,
      },
      {
        name: "Son (jaune)",
        quantite: item?.quantite_son_jaune,
      },
      {
        name: "Gruau (blanc)",
        quantite: item?.quantite_gruau_blanc,
        prix: item?.prix_kg_son,
      },
      {
        name: "Gruau (jaune)",
        quantite: item?.quantite_gruau_jaune,
      },
    ];
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchData("get", "/journal/", {
          params: { offset: pointer, limit },
        });
        setResults(res?.results || []);
        console.log(res);
      } catch (err) {
        console.error(err);
        setErreur("Erreur lors du chargement des données");
      }
    })();
  }, [pointer]);
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50/60 lg:px-5 px-0 pt-5 dark:border-gray-800 dark:bg-white/[0.03]  sm:px-6 sm:pt-6 ">
      <div className="flex flex-col items-cent/er justify-between w-full gap-2 px-3 py-3 border-b  border-gray-200 dark:border-gray-800 sm:gap-4  lg:border-b-0 lg:px-0 lg:py-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Resultats recus
        </h3>
        <div className="flex flex-col gap-y-3">
          {results?.map((item, index = 0) => (
            <Results key={index + 1} products={buildProduits(item)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
