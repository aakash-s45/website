import { getCurrentPlaying } from "../api/now-playing/route";

export const fetchCurrentTrackData = async () => {
  try {
    return await getCurrentPlaying();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw new Error("Failed to fetch data");
  }
};
