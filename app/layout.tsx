import './globals.css';
import { Inter } from 'next/font/google';
import LayoutHeadData from './_components/LayoutHeadData';
export { metadata } from './_components/LayoutHeadData';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <LayoutHeadData />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
