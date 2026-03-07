// components/MusicWidget.tsx
"use client";

import Image from "next/image";
import { MusicData, useGlobalData } from "@/context/GlobalDataContext";
import styles from "./styles/MusicWidget.module.css";
import { FaHeadphonesAlt } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import Visualizer from "./Visualizer";
import PlayPreviewButton from "./PlayPreviewButton";

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

  const albumArt = globalData?.music?.artwork || "/images/error-albumart.png";

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
        <div className={styles.titleRow}>
          <div className={styles.titleArtist}>
            <h3 className={styles.title}>{globalData.music.title}</h3>
            <p className={styles.artist}>{globalData.music.artist}</p>
          </div>
          {!(
            globalData.music.title === "Somewhere beyond the clouds..." &&
            globalData.music.artist === "the music plays on"
          ) && (
            <PlayPreviewButton
              title={globalData.music.title}
              artist={globalData.music.artist}
              className={styles.playButton}
            />
          )}
        </div>
        <Visualizer isPlaying={isPlaying} />
        <div className={styles.updated}>
          {" "}
          <FaHistory /> {globalData.music.updated}
        </div>
      </div>
    </div>
  );
}
