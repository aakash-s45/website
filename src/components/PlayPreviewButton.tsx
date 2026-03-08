"use client";

import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaSpinner } from "react-icons/fa";

interface PlayPreviewButtonProps {
  title: string;
  artist: string;
  className?: string; // To allow positioning from parent
}

export default function PlayPreviewButton({
  title,
  artist,
  className,
}: PlayPreviewButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Stop and reset whenever the song changes (or on unmount)
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
      setIsPlaying(false);
      setIsLoading(false);
      setPreviewUrl(null);
    };
  }, [title, artist]);

  // Pre-fetch the preview URL on hover so the click handler can call audio.play()
  // synchronously within the user gesture — required by iOS WebKit's autoplay policy.
  const prefetchUrl = async () => {
    if (previewUrl) return;
    try {
      const query = encodeURIComponent(`${title} ${artist}`);
      const res = await fetch(
        `https://itunes.apple.com/search?term=${query}&entity=song&limit=1`,
      );
      const data = await res.json();
      const pUrl = data.results?.[0]?.previewUrl as string | undefined;
      if (pUrl) setPreviewUrl(pUrl);
    } catch {
      // Silently ignore — click handler will retry
    }
  };

  const handlePlayPause = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Pause
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    // Resume after pause
    if (!isPlaying && audioRef.current && previewUrl) {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
      return;
    }

    // URL was pre-fetched on hover — play synchronously within the gesture (iOS-safe)
    if (previewUrl) {
      const audio = new Audio(previewUrl);
      audio.volume = 0.5;
      audio.onended = () => setIsPlaying(false);
      audioRef.current = audio;
      audio.play().catch(console.error);
      setIsPlaying(true);
      return;
    }

    // Fallback: fetch then play (async — may be blocked by iOS autoplay policy on first tap)
    setIsLoading(true);
    try {
      const query = encodeURIComponent(`${title} ${artist}`);
      const res = await fetch(
        `https://itunes.apple.com/search?term=${query}&entity=song&limit=1`,
      );
      const data = await res.json();

      const pUrl = data.results?.[0]?.previewUrl as string | undefined;
      if (!pUrl) {
        console.warn("No preview URL found.");
        return;
      }

      setPreviewUrl(pUrl);
      const audio = new Audio(pUrl);
      audio.volume = 0.5;
      audio.onended = () => setIsPlaying(false);
      audioRef.current = audio;

      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.error("Failed to fetch or play preview:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handlePlayPause}
      disabled={isLoading}
      aria-label="Play 30s Preview"
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--card-bg)", // matches theme card style (glassmorphism if opacity)
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1px solid var(--divider)",
        color: "var(--primary-text)",
        cursor: isLoading ? "wait" : "pointer",
        transition: "all 0.25s ease",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
        zIndex: 10,
        outline: "none",
      }}
      onMouseEnter={(e) => {
        prefetchUrl();
        if (!isLoading) {
          e.currentTarget.style.transform = "scale(1.08)";
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.2)";
          e.currentTarget.style.backgroundColor = "var(--pill-bg-hover)";
        }
      }}
      onPointerDown={prefetchUrl}
      onMouseLeave={(e) => {
        if (!isLoading) {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.15)";
          e.currentTarget.style.backgroundColor = "var(--card-bg)";
        }
      }}
    >
      {isLoading ? (
        <FaSpinner className="animate-spin" />
      ) : isPlaying ? (
        <FaPause />
      ) : (
        <FaPlay style={{ marginLeft: "3px" }} /> // offset for play triangle optical alignment
      )}
    </button>
  );
}
