import { NextResponse } from "next/server";

export async function GET(req: Request) {
  console.log(req.url);
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

  try {
    const url = `${baseurl}/api/v1/current-playing`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Fetch failed");
    const json = await response.json();

    if (!json.updated.endsWith("Z")) {
      json.updated += "Z";
    }

    const updatedTime = new Date(json.updated);

    const formatter = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return NextResponse.json({
      music: {
        title: json.title,
        artist: json.artist,
        images: json.images,
        duration: json.duration,
        elapsed: json.elapsed,
        updated: formatter.format(updatedTime),
        updatedTime: updatedTime,
      },
    });
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
