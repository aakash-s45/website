import "./globals.css";
import { Geist } from "next/font/google";
import type { Metadata } from "next";
import styles from "./styles/layout.module.css";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import { GlobalDataProvider } from "@/context/GlobalDataContext";
import { fetchCurrentTrackData } from "./utils/fetchDataServer";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Aakash Solanki | Portfolio",
  description:
    "Software developer portfolio showcasing projects and experience",
};

export const dynamic = "force-dynamic";

async function getInitialGlobalData() {
  const data = await fetchCurrentTrackData();

  return data;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialData = await getInitialGlobalData();

  return (
    <html
      lang="en"
      className={cn("font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body className={`${geist.className} ${styles.body}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalDataProvider initialData={initialData}>
            <BackgroundWrapper>{children}</BackgroundWrapper>
          </GlobalDataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
