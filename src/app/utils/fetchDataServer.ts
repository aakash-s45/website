import { getCurrentPlaying } from "../api/now-playing/route";

export const fetchCurrentTrackData = async () => {
  try {
    return await getCurrentPlaying();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    // Return fallback data so the page still renders
    return {
      music: {
        title: "Somewhere beyond the clouds...",
        artist: "the music plays on",
        artwork: "/images/error-albumart.png",
        duration: 0,
        elapsed: 0,
        updated: "—",
        updatedTime: new Date().toISOString(),
      },
    };
  }
};
