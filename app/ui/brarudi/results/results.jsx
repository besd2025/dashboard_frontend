"use client";
import { ChevronDownIcon, ChevronUpIcon } from "../../icons";
import React, { useState } from "react";

export default function Results({ invoiceId, from, to, products, vatRate }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-2xl bor/der border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] xl:w-4/5">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400">
        <h3 className="font-medium text-gray-800 text-md dark:text-white/90">
          Resultats
        </h3>
        {/* <h4 className="text-base font-medium text-gray-700 dark:text-gray-400">
          ID : #{invoiceId}
        </h4> */}
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="focus:outline-none flex flex-row border-2 text-green-500 border-green-500 p-1 rounded-md"
        >
          <span className="text-sm  "> Voir en détails</span>
          {expanded ? (
            <ChevronUpIcon className="size-3" />
          ) : (
            <ChevronDownIcon className="size-3" />
          )}
        </button>
      </div>

      <div className="p-5 relative">
        <div className="flex flex-col gap-6 mb-5 sm:flex-row sm:items-center sm:justify-between ">
          <div className="flex flex-row space-x-5">
            <div className="flex flex-row space-x-2">
              <span className="block  text-sm font-medium text-gray-700 dark:text-gray-400">
                De
              </span>
              <h5 className="text-sm font-semibold text-green-800 ">
                {from.name}
              </h5>
            </div>
            <div>
              <span className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Enregistré le:
              </span>
              <span className="block text-sm text-gray-500 dark:text-gray-400">
                {from.issuedOn}
              </span>
            </div>
          </div>
        </div>
        {expanded && (
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b border-gray-100 dark:border-white/[0.05]">
                  <tr>
                    <th className="px-5 py-2 text-sm font-medium text-left text-gray-700 dark:text-gray-400">
                      Produit
                    </th>
                    <th className="px-5 py-2 text-sm font-medium text-left text-gray-700 dark:text-gray-400">
                      Quantité
                    </th>
                    <th className="px-5 py-2 text-sm font-medium text-left text-gray-700 dark:text-gray-400">
                      P.U
                    </th>
                    <th className="px-5 py-2 text-sm font-medium text-left text-gray-700 dark:text-gray-400">
                      Prix Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y  divide-gray-100 dark:divide-white/[0.05]">
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td className="px-5 py-2 text-left text-sm font-semibold text-gray-500 dark:text-gray-400">
                        {product.name}
                      </td>
                      <td className="px-5 py-2 text-left text-sm text-gray-500 dark:text-gray-400">
                        {product.quantity} Kg
                      </td>
                      <td className="px-5 py-2 text-left text-sm text-gray-500 dark:text-gray-400">
                        {product.quantity} Fbu
                      </td>
                      <td className="px-5 py-2 text-left text-sm text-gray-500 dark:text-gray-400">
                        {product.quantity} Fbu
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          //   <div className="pb-6 my-6 text-right border-b border-gray-100 dark:border-gray-800">
          //     <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          //       Sub Total amount: ${subTotal.toFixed(2)}
          //     </p>
          //     <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
          //       Vat ({vatRate * 100}%): ${vat.toFixed(2)}
          //     </p>
          //     <p className="text-lg font-semibold text-gray-800 dark:text-white/90">
          //       Total : ${total.toFixed(2)}
          //     </p>
          //   </div>
        )}

        <div
          className={`flex items-center justify-end gap-3 mt-3 top-0 right-5 ${
            !expanded ? "lg:absolute" : ""
          }`}
        >
          <button className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white rounded-lg bg-yellow-600 shadow hover:bg-yellow-700">
            Approuver
          </button>
        </div>
      </div>
    </div>
  );
}
