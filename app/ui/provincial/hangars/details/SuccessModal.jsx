import React from "react";

function SuccessModal({ open, onClose, message }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/80">
      <div className="bg-white dark:bg-gray-800  rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-semibold text-green-600 mb-2">Succès</h2>
        <p className="mb-4 text-sm text-gray-700 dark:text-gray-400">
          {message || "envoyé avec succès !"}
        </p>
        <button
          className="px-3 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
          onClick={onClose}
        >
          Fermer
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;
