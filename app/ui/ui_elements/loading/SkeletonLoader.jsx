import React from "react";

/**
 * SkeletonLoader
 * Un composant skeleton adaptable pour indiquer le chargement d'un élément.
 * Props : width, height, borderRadius, style, className
 */
const SkeletonLoader = ({
  width = "100%",
  height = "1em",
  borderRadius = "4px",
  style = {},
  className = "",
}) => {
  return (
    <div
      className={`skeleton-loader bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 bg-[length:400%_100%] animate-skeleton-loading ${className}`}
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
    />
  );
};

export default SkeletonLoader;

// Animation CSS à ajouter dans le global.css ou dans un styled-component :
// @keyframes skeleton-loading {
//   0% { background-position: 100% 50%; }
//   100% { background-position: 0 50%; }
// }
