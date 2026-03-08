export const fetchCurrentTrackData = async () => {
  try {
    const response = await fetch(`/api/now-playing`, {
      cache: "no-store",
    });
    if (!response.ok) throw new Error("API error");
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null;
  }
};
