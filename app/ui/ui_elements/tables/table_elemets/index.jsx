import React from "react";
import SkeletonLoader from "../../loading/SkeletonLoader";

// Table Component
const Table = ({ children, className }) => {
  return <table className={`min-w-full   ${className}`}>{children}</table>;
};

// TableHeader Component
const TableHeader = ({ children, className }) => {
  return <thead className={className}>{children}</thead>;
};

// TableBody Component
const TableBody = ({
  children,
  className,
  loading,
  columns = 1,
  skeletonRows = 5,
  menu = true,
}) => {
  if (loading) {
    return (
      <tbody className={className}>
        {Array.from({ length: skeletonRows }).map((_, rowIdx) => (
          <tr key={rowIdx}>
            {Array.from({ length: columns }).map((_, colIdx) =>
              menu ? (
                colIdx === 0 ? (
                  <td
                    key={colIdx}
                    className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 w-[10px]"
                  />
                ) : (
                  <td
                    key={colIdx}
                    className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400"
                  >
                    <SkeletonLoader
                      width="100%"
                      height="15px"
                      borderRadius="4px"
                    />
                  </td>
                )
              ) : (
                <td
                  key={colIdx}
                  className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400"
                >
                  <SkeletonLoader
                    width="100%"
                    height="15px"
                    borderRadius="4px"
                  />
                </td>
              )
            )}
          </tr>
        ))}
      </tbody>
    );
  }
  return <tbody className={className}>{children}</tbody>;
};

// TableRow Component
const TableRow = ({ children, className }) => {
  return (
    <tr
      className={`${className}  hover:bg-gray-50 dark:hover:bg-white/[0.05] rounded-2xl`}
    >
      {children}
    </tr>
  );
};

// TableCell Component
const TableCell = ({ children, isHeader = false, className }) => {
  const CellTag = isHeader ? "th" : "td";
  return <CellTag className={` ${className} `}>{children}</CellTag>;
};

export { Table, TableHeader, TableBody, TableRow, TableCell };
