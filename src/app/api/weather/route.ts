import { NextResponse } from "next/server";

export async function getWeatherData() {
  const baseurl: string =
    process.env.NEXT_PUBLIC_EVENTS_BASEURL ??
    (() => {
      throw new Error(
        "NEXT_PUBLIC_EVENTS_BASEURL is not defined in the environment variables",
      );
    })();

  const apiKey: string =
    process.env.NEXT_PUBLIC_EVENTS_API_KEY ??
    (() => {
      throw new Error(
        "NEXT_PUBLIC_EVENTS_API_KEY is not defined in the environment variables",
      );
    })();

  const url = `${baseurl}/api/v1/weather`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
    },
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) throw new Error("Fetch failed");
  return await response.json();
}

export async function GET(req: Request) {
  try {
    const data = await getWeatherData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Something went wrong. Please try again. ${error}`,
      },
      { status: 500 },
    );
  }
}
