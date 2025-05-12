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
    const url = `${baseurl}/api/v1/weather`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Fetch failed");
    const json = await response.json();

    return NextResponse.json(json);
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
