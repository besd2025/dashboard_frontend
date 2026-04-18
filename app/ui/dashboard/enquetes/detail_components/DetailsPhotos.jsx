import React from "react";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";

const AnomalyPhoto = ({ url, label, onImageClick }) => {
  if (!url) return null;
  return (
    <div className="space-y-2">
      <div
        onClick={() => onImageClick(url, label)}
        className="relative group overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 cursor-pointer"
      >
        <img
          src={url}
          alt={label}
          className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <ImageIcon className="text-white" size={24} />
        </div>
      </div>
      <p className="text-[10px]  text-gray-400 uppercase text-center tracking-wider">
        {label}
      </p>
    </div>
  );
};

const DetailsPhotos = ({ data: d, onImageClick }) => {
  if (
    !d.weevils_photo &&
    !d.foreign_bodies_photo &&
    !d.floor_photo &&
    !d.humid_photo
  )
    return null;

  return (
    <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
      <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-4 uppercase tracking-wider">
        Galerie Photos
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <AnomalyPhoto
          url={d.weevils_photo}
          label="Charançons"
          onImageClick={onImageClick}
        />
        <AnomalyPhoto
          url={d.foreign_bodies_photo}
          label="Corps Étrangers"
          onImageClick={onImageClick}
        />
        <AnomalyPhoto
          url={d.floor_photo}
          label="Stockage Sol"
          onImageClick={onImageClick}
        />
        <AnomalyPhoto
          url={d.humid_photo}
          label="Humidité"
          onImageClick={onImageClick}
        />
        {/* Placeholder or example image if needed */}
        {/* <Image src="/img/billet_example.jpg" alt="Example" width={100} height={100} /> */}
      </div>
    </div>
  );
};

export default DetailsPhotos;
