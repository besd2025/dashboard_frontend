"use client";

import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

export default function HangarLocalisation() {
  return <MapWithNoSSR />;
}
