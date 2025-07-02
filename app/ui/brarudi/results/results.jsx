"use client";
import { ChevronDownIcon, ChevronUpIcon } from "../../icons";
import React, { useState, useEffect } from "react";
import { fetchData } from "../../../_utils/api";

export default function Results({ invoiceId, from, to, products, vatRate }) {
  const [expanded, setExpanded] = useState(false);
  const produit = products;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] xl:w-4/5">
      {/* ----- En‑tête ----- */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <h3 className="font-medium text-gray-800 dark:text-white/90">
          Résultats
        </h3>
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="flex items-center gap-1 rounded-md border-2 border-green-500 px-2 py-1 text-sm text-green-500"
        >
          Voir en détails
          {expanded ? (
            <ChevronUpIcon className="size-3" />
          ) : (
            <ChevronDownIcon className="size-3" />
          )}
        </button>
      </div>

      {/* ----- Corps ----- */}
      <div className="p-5 relative">
        <div className="mb-5 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-5">
            <div className="flex gap-2">
              <span className="text-sm text-gray-700">De</span>
              <h5 className="text-sm font-semibold text-green-800">ANAGESSA</h5>
            </div>
            <div>
              <span className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Enregistré le:
              </span>
              <span className="block text-sm text-gray-500 dark:text-gray-400">
                11 mars 2025
              </span>
            </div>
            {/* autres métadonnées… */}
          </div>
        </div>

        {expanded && (
          <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-white/[0.05]">
            <div className="max-w-full overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b border-gray-100 dark:border-white/[0.05]">
                  <tr>
                    <th className="px-5 py-2 text-left text-sm font-medium text-gray-700">
                      Produit
                    </th>
                    <th className="px-5 py-2 text-left text-sm font-medium text-gray-700">
                      Quantité (kg)
                    </th>
                    <th className="px-5 py-2 text-left text-sm font-medium text-gray-700">
                      P.U (Fbu)
                    </th>
                    <th className="px-5 py-2 text-left text-sm font-medium text-gray-700">
                      Prix Total (Fbu)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {produit.map((p, idx = 1) => (
                    <tr key={idx + 1}>
                      <td className="px-5 py-2 text-sm font-semibold text-gray-600">
                        {p.name}
                      </td>
                      <td className="px-5 py-2 text-sm text-gray-600">
                        {p.quantite?.toLocaleString("fr-FR")}
                      </td>
                      <td className="px-5 py-2 text-sm text-gray-600">
                        {p.prix?.toLocaleString("fr-FR")}
                      </td>
                      <td className="px-5 py-2 text-sm text-gray-600">
                        {p.prix_total?.toLocaleString("fr-FR")}
                      </td>
                    </tr>
                  ))}
                  {produit.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-5 py-4 text-center text-sm text-gray-500"
                      >
                        {erreur || "Aucun résultat"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ----- Bouton d’action ----- */}
        <div
          className={`mt-3 flex justify-end gap-3 ${
            !expanded ? "lg:absolute top-0 right-5" : ""
          }`}
        >
          <button className="rounded-lg bg-yellow-600 px-4 py-3 text-sm font-medium text-white shadow hover:bg-yellow-700">
            Approuver
          </button>
        </div>
      </div>
    </div>
  );
}
