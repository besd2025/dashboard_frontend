import React, { useState } from "react";

const ViewImageModal = ({ isOpen, onClose, imageUrl, alt }) => {
  const [zoom, setZoom] = useState(1);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));
  const handleReset = () => setZoom(1);

  return (
    <div className="fixed inset-0  flex items-center justify-center  bg-opac/ity-80 bg-gray-500/50 z-999999 ">
      <div className="relative max-w-full max-h-full p-4">
        {/* Zoom controls */}
        <div className="absolute top-2 left-2 flex gap-2 z-10">
          <button
            onClick={handleZoomOut}
            className="bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-80 focus:outline-none"
            aria-label="Zoom out"
            type="button"
          >
            −
          </button>
          <button
            onClick={handleReset}
            className=" text-white transition-colors  hover:text-gray-700  dark:text-gray-400  dark:hover:text-white  w-8 h-8 flex items-center justify-center hover:bg-opacity-80 focus:outline-none"
            aria-label="Reset zoom"
            type="button"
          >
            {zoom}x
          </button>
          <button
            onClick={handleZoomIn}
            className="bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-80 focus:outline-none"
            aria-label="Zoom in"
            type="button"
          >
            +
          </button>
        </div>
        <button
          onClick={onClose}
          className="absolute right-2 top-2 z-9999 flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white  sm:h-8 sm:w-8"
          aria-label="Close"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.04289 16.5413C5.65237 16.9318 5.65237 17.565 6.04289 17.9555C6.43342 18.346 7.06658 18.346 7.45711 17.9555L11.9987 13.4139L16.5408 17.956C16.9313 18.3466 17.5645 18.3466 17.955 17.956C18.3455 17.5655 18.3455 16.9323 17.955 16.5418L13.4129 11.9997L17.955 7.4576C18.3455 7.06707 18.3455 6.43391 17.955 6.04338C17.5645 5.65286 16.9313 5.65286 16.5408 6.04338L11.9987 10.5855L7.45711 6.0439C7.06658 5.65338 6.43342 5.65338 6.04289 6.0439C5.65237 6.43442 5.65237 7.06759 6.04289 7.45811L10.5845 11.9997L6.04289 16.5413Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <img
          src={imageUrl}
          alt={alt || "Image"}
          style={{ transform: `scale(${zoom})`, transition: "transform 0.2s" }}
          className="max-w-[90vw] max-h-[80vh] w-auto h-auto rounded shadow-lg object-contain mx-auto"
        />
      </div>
    </div>
  );
};

export default ViewImageModal;
