import React from "react";

const DetailsObservations = ({ comment }) => {
  return (
    <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
      <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-2 uppercase tracking-wider">
        Observations
      </h3>
      <p className="text-sm text-gray-500 italic">
        "{comment || "Aucune observation."}"
      </p>
    </div>
  );
};

export default DetailsObservations;
