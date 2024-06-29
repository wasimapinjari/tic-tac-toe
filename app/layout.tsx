import './globals.css';
import { Inter } from 'next/font/google';
import HeadData from './_components/HeadData';
export { metadata } from './_components/HeadData';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <HeadData />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
