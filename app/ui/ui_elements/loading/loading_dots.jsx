import React from "react";

function LoadingDots({ className = "bg-white" }) {
  return (
    <div
      className={`flex space-x-1 justify-center items-center w-full h-full px-4 py-1`}
    >
      <div
        className={`size-2 rounded-full animate-bounce [animation-delay:-0.3s] ${className}`}
      ></div>
      <div
        className={`size-2 rounded-full animate-bounce [animation-delay:-0.15s] ${className}`}
      ></div>
      <div className={`size-2 rounded-full animate-bounce ${className}`}></div>
    </div>
  );
}

export default LoadingDots;
