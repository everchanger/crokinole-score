import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { GameContextProvider } from './GameContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Crokinole scorekeeper',
  description: 'A small app to keep score of Crokinole games',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={inter.className + ' [ text-base-content [--glass-blur:5px]'}
      >
        <main className='flex min-h-screen flex-col items-center p-8'>
          <h1 className='mb-8 text-2xl font-bold'>Crokinole Scorekeeper</h1>

          <GameContextProvider>{children}</GameContextProvider>
        </main>
      </body>
    </html>
  );
}
