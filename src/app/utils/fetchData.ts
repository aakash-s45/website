export const fetchCurrentTrackData = async () => {
  try {
    const response = await fetch(`/api/now-playing`, {
      cache: "no-store",
    });
    if (!response.ok) throw new Error("API error");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
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
