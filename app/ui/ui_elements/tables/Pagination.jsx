const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  pointer,
  limit,
  totalCount,
}) => {
  const pagesToShow = [];
  console.log(totalCount);
  // Génère les numéros de pages à afficher
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, startPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    pagesToShow.push(i);
  }

  return (
    <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 sm:px-6">
      <div className="flex items-center justify-between flex-col sm:flex-row">
        {/* Affichage du texte "X à Y sur Z" */}
        <div className="mb-4 sm:mb-0">
          <p className="text-sm text-gray-700 dark:text-gray-400">
            Affichage de{" "}
            {pointer > 0 ? (
              <span className="font-medium">{pointer + 1}</span>
            ) : (
              <span className="font-medium">{0}</span>
            )}{" "}
            à{" "}
            <span className="font-medium">
              {Math.min(pointer + limit, totalCount)}
            </span>{" "}
            sur <span className="font-medium">{totalCount}</span> résultats
          </p>
        </div>

        {/* Navigation */}
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          {/* Previous button */}
          <button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-white/[0.03] dark:text-gray-400 disabled:opacity-50"
          >
            <span className="sr-only">Previous</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Numéros de page */}
          {pagesToShow?.map((page) => (
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

          {/* Next button */}
          <button
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-white/[0.03] dark:text-gray-400 disabled:opacity-50"
          >
            <span className="sr-only">Next</span>
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
