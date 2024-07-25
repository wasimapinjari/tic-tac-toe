import './fonts.css';
import './globals.css';
import LayoutHeadData from './_components/LayoutHeadData';
export { metadata } from './_components/LayoutHeadData';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <LayoutHeadData />
      <body>{children}</body>
    </html>
  );
}
