import React from "react";
import Image from "next/image";

function LoadingMais() {
  return (
    <div class="relative flex justify-center items-center  gap-5 dark:bg-gray-900">
      <div class="flex justify-center items-center">
        <div class="absolute animate-spin rounded-3xl h-16 w-16 border-3  border-emerald-500"></div>
        <Image
          src="/img/mais-logo-loading.png"
          class="rounded-full h-14 w-14 animate-horizontal-spin"
          alt="logo"
          width={56}
          height={56}
        />
      </div>
      <span class="text-sm text-emerald-500">Chargement...</span>
    </div>
  );
}

export default LoadingMais;
