"use client"; // si tu es en app router (Next.js 13+)
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the map component with no SSR
const MapWithNoSSR = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

function HangarLocalisation() {
  return <MapWithNoSSR />;
}

export default HangarLocalisation;
