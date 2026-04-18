import React from "react";
import { Phone } from "lucide-react";

const DetailsPersonnel = ({ data: d }) => {
  return (
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
  );
};

export default DetailsPersonnel;
