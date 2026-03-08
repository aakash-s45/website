"use client";

import { fetchCurrentTrackData } from "@/app/utils/fetchData";
import { createContext, useContext, useState, useEffect } from "react";

export interface MusicData {
  title: string;
  artist: string;
  artwork: string;
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
      if (newData?.music) {
        setData(newData);
      }
    } catch (err) {
      console.error("Failed to refresh music data:", err);
    }
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    const timeout = setTimeout(() => {
      fetchCurrentTrack();
      interval = setInterval(fetchCurrentTrack, 5000);
    }, 5000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <GlobalDataContext.Provider value={data}>
      {children}
    </GlobalDataContext.Provider>
  );
};
