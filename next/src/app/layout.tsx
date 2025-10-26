import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bloxie - Termin buchen',
  description: 'Buchen Sie Ihren Termin schnell und einfach',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}

