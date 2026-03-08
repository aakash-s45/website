import { NextResponse } from "next/server";

interface CachedMusicData {
  title: string;
  artist: string;
  artwork: string;
  duration: number;
  elapsed: number;
  updated: string;
  updatedTime: string;
}

const FALLBACK_MUSIC: CachedMusicData = {
  title: "Somewhere beyond the clouds...",
  artist: "the music plays on",
  artwork: "/images/error-albumart.png",
  duration: 0,
  elapsed: 0,
  updated: "—",
  updatedTime: new Date().toISOString(),
};

let cachedMusic: CachedMusicData | null = null;

const formatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  day: "2-digit",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

function isSameTrack(a: CachedMusicData, b: CachedMusicData): boolean {
  return (
    a.title === b.title && a.artist === b.artist && a.artwork === b.artwork
  );
}

async function fetchFromExternalAPI(): Promise<CachedMusicData | null> {
  try {
    const baseurl = process.env.NEXT_PUBLIC_EVENTS_BASEURL;
    const apiKey = process.env.NEXT_PUBLIC_EVENTS_API_KEY;

    if (!baseurl || !apiKey) {
      console.error("Music API env vars are not configured");
      return null;
    }

    const url = `${baseurl}/api/v1/current-playing`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.error("External music API returned status:", response.status);
      return null;
    }

    const json = await response.json();

    if (!json.updated.endsWith("Z")) {
      json.updated += "Z";
    }

    const updatedTime = new Date(json.updated);

    return {
      title: json.title,
      artist: json.artist,
      artwork: json.artwork,
      duration: json.duration,
      elapsed: json.elapsed,
      updated: formatter.format(updatedTime),
      updatedTime: updatedTime.toISOString(),
    };
  } catch (error) {
    console.error("External music API fetch failed:", error);
    return null;
  }
}

export async function getCurrentPlaying() {
  const freshData = await fetchFromExternalAPI();

  if (freshData) {
    if (!cachedMusic || !isSameTrack(cachedMusic, freshData)) {
      cachedMusic = freshData;
    } else {
      cachedMusic = {
        ...cachedMusic,
        elapsed: freshData.elapsed,
        duration: freshData.duration,
        updated: freshData.updated,
        updatedTime: freshData.updatedTime,
      };
    }
    return { music: cachedMusic };
  }

  if (cachedMusic) {
    return { music: cachedMusic };
  }
  return { music: FALLBACK_MUSIC };
}

export async function GET() {
  const data = await getCurrentPlaying();
  return NextResponse.json(data);
}
