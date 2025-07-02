import React from "react";

function LoadingDots() {
  return (
    <div className="flex space-x-1 justify-center items-center w-full h-full px-4 py-1">
      <div className="size-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="size-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="size-2 bg-white rounded-full animate-bounce"></div>
    </div>
  );
}

export default LoadingDots;
