import { NextResponse } from "next/server";

interface Feedback {
  name: string;
  email: string;
  message: string;
}

export async function POST(req: Request) {
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
    const { name, email, message }: Feedback = await req.json();

    const body = `
        <html>
            <body>
            <p>Hi!</p>
            <p>You got a feedback from <strong>${name}</strong>.</p>
            <p>Message: <pre>${message}</pre></p>
            <p>You can reply back on this email: <strong>${email}</strong></p>
            <p>Thanks!</p>
            </body>
        </html>
        `;

    const subject = `You got a feedback!`;
    const url = `${baseurl}/api/v1/send-email`;
    const recipient = "corona3hack@gmail.com";
    const payload = {
      email: recipient,
      subject: subject,
      body: body,
    };

    const emailResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      body: JSON.stringify(payload),
    });

    const emailData = await emailResponse.json();

    if (emailData.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, message: emailData.message },
        { status: 500 },
      );
    }
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
