// ui/context/HangarContext.js

"use client";
import { createContext, useContext, useState } from "react";

const HangarContext = createContext();

export const HangarProvider = ({ children }) => {
  const [hangarId, setHangarId] = useState(null);
  return (
    <HangarContext.Provider value={{ hangarId, setHangarId }}>
      {children}
    </HangarContext.Provider>
  );
};

export const useHangar = () => useContext(HangarContext);
