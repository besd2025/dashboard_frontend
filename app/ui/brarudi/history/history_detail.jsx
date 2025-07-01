import React from "react";

function HistoryDetail() {
  // Exemple de données correspondant aux colonnes du tableau principal
  const exampleDetail = {
    typeAcheteur: "Acheteur local",
    hangarName: "Hangar Central",
    hangarCode: "HGR-001",
    qteVendues: 1200,
    prix: "1 500 000 FBU",
    date: "2024-06-01",
    province: "Bujumbura Mairie",
    commune: "Mukaza",
  };

  return (
    <div className="no-scrollbar relative w-full max-w-[700px] max-h-[600px]  overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 z-0">
      <div className="flex flex-col gap-6  lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6  ">
            Détails de la vente
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Type d'acheteur
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {exampleDetail.typeAcheteur}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Hangar
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {exampleDetail.hangarName} ({exampleDetail.hangarCode})
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Quantité vendue
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {exampleDetail.qteVendues}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Prix
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {exampleDetail.prix}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Province
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {exampleDetail.province}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Commune
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {exampleDetail.commune}
              </p>
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Date
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {exampleDetail.date}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryDetail;
