// components/MusicWidget.tsx
"use client";

import Image from "next/image";
import { MusicData, useGlobalData } from "@/context/GlobalDataContext";
import styles from "./styles/MusicWidget.module.css";
import { FaHeadphonesAlt } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import Visualizer from "./Visualizer";

function isMusicPlaying(music: MusicData): boolean {
  if (!music.updatedTime || !music.duration) return false;
  const updatedTime = new Date(music.updatedTime || 0).getTime();
  const currentTime = Date.now();
  const totalElapsed = (currentTime - updatedTime) / 1000 + music.elapsed;
  return totalElapsed < music.duration;
}

export default function MusicWidget() {
  const globalData = useGlobalData();

  if (!globalData?.music) return null;

  const albumArt = globalData?.music?.artwork || "/images/albumart.jpg";

  const isPlaying = globalData?.music.updated
    ? isMusicPlaying(globalData?.music)
    : false;

  return (
    <div className={styles.container}>
      <div className={styles.nowPlaying}>
        <FaHeadphonesAlt /> Listening to
      </div>

      <div className={styles.albumContainer}>
        <div className={styles.albumArt} id="album-art">
          <Image
            src={albumArt}
            alt={`${globalData.music.title} by ${globalData.music.artist}`}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      <div className={styles.trackInfo}>
        <h3 className={styles.title}>{globalData.music.title}</h3>
        <p className={styles.artist}>{globalData.music.artist}</p>
        <Visualizer isPlaying={isPlaying} />
        <div className={styles.updated}>
          {" "}
          <FaHistory /> {globalData.music.updated}
        </div>
      </div>
    </div>
  );
}
