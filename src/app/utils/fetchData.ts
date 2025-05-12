export const fetchCurrentTrackData = async () => {
  try {
    const response = await fetch(`/api/now-playing`, {
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw new Error("Failed to fetch data");
  }
};
