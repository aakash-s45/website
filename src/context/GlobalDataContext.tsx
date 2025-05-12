"use client";

import { fetchCurrentTrackData } from "@/app/utils/fetchData";
import { createContext, useContext, useState, useEffect } from "react";

interface ImageObj {
  size: string;
  "#text": string;
}

export interface MusicData {
  title: string;
  artist: string;
  images: ImageObj[];
  duration: number;
  elapsed: number;
  updated?: string;
  updatedTime?: string;
}

interface GlobalData {
  music: MusicData | null;
}

const GlobalDataContext = createContext<GlobalData | null>(null);

export const useGlobalData = () => useContext(GlobalDataContext);

export const GlobalDataProvider = ({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData: GlobalData;
}) => {
  const [data, setData] = useState<GlobalData>(initialData);

  const fetchCurrentTrack = async () => {
    try {
      const newData = await fetchCurrentTrackData();
      setData(newData);
    } catch (err) {
      console.error("Failed to refresh music data:", err);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchCurrentTrack();

      const interval = setInterval(() => {
        fetchCurrentTrack();
      }, 5000);

      return () => clearInterval(interval);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <GlobalDataContext.Provider value={data}>
      {children}
    </GlobalDataContext.Provider>
  );
};
