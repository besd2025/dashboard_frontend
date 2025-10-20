import { useState } from "react";
import { ChevronDownIcon } from "../../icons";
import Select from "../form/Select";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  pointer,
  totalCount,
  onLimitChange, // Nouvelle prop pour gérer le changement de limite
}) => {
  const [limit, setLimit] = useState(5); // Limite par défaut

  const pagesToShow = [];
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, startPage + 2);
  for (let i = startPage; i <= endPage; i++) {
    pagesToShow.push(i);
  }

  const dataNumber = [
    { value: "5", label: "5" },
    { value: "10", label: "10" },
    { value: "50", label: "50" },
    { value: "100", label: "100" },
  ];

  const handleDataNumber = (selectedOption) => {
    const newLimit = selectedOption;
    setLimit(newLimit);
    onLimitChange(newLimit);
    onPageChange(1);
  };
  const actualPointer = Number(pointer);
  const actualLimit = Number(limit);
  return (
    <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 sm:px-6">
      <div className="flex items-center justify-between flex-col sm:flex-row">
        <div className="mb-4 sm:mb-0">
          <p className="text-sm text-gray-700 dark:text-gray-400">
            Affichage de{" "}
            <span className="font-medium">
              {totalCount === 0 ? 0 : pointer + 1}
            </span>{" "}
            à{" "}
            <span className="font-medium">
              {Math.min(actualPointer + actualLimit, totalCount)}
            </span>{" "}
            sur <span className="font-medium">{totalCount}</span> résultats
          </p>
        </div>

        <div className="space-y-6 mb-4 sm:mb-0">
          <div className="flex flex-row gap-x-3 items-center">
            <div className="relative">
              <Select
                options={dataNumber}
                placeholder={limit.toString()} // Affiche la limite actuelle comme placeholder
                onChange={handleDataNumber}
                className="dark:bg-dark-900"
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <ChevronDownIcon className="size-4" />
              </span>
            </div>
          </div>
        </div>

        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-white/[0.03] dark:text-gray-400 disabled:opacity-50"
          >
            <span className="sr-only">Précédent</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {pagesToShow.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                page === currentPage
                  ? "bg-indigo-50 text-indigo-600 border-gray-300"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300 dark:bg-white/[0.03] dark:text-gray-400"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-white/[0.03] dark:text-gray-400 disabled:opacity-50"
          >
            <span className="sr-only">Suivant</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
