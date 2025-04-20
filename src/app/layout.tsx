import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import styles from './styles/layout.module.css';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { GlobalDataProvider } from '@/context/GlobalDataContext';
import { fetchCurrentTrackData } from './utils/fetchData';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aakash Solanki | Portfolio',
  description: 'Software developer portfolio showcasing projects and experience',
};

async function getInitialGlobalData() {
  const data = await fetchCurrentTrackData(); // Reuse the API call logic

  return data;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const initialData = await getInitialGlobalData();

  return (
    <html lang="en">
      <body className={`${inter.className} ${styles.body}`}>
        <GlobalDataProvider initialData={initialData}>
          <BackgroundWrapper>{children}</BackgroundWrapper>
        </GlobalDataProvider>
      </body>
    </html>
  );
}
