import { headers } from "next/headers";

export const fetchCurrentTrackData = async () => {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  try {
    const response = await fetch(`${protocol}://${host}/api/now-playing`, {
      cache: 'no-store',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw new Error('Failed to fetch data');
  }
};


