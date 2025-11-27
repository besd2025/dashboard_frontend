"use client";
import Profile from "../../../../ui/dashboard/hangars/details/profile";
import React, { useEffect, useState } from "react";

export default function page() {
  const [hangarId, setHangarId] = useState(null);
  useEffect(() => {
    const storedHangarId = localStorage.getItem("hangarId");
    setHangarId(storedHangarId);
  }, []);
  return <Profile hangar_id={hangarId} />;
}
