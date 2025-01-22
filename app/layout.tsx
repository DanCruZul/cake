import './globals.css';
import type { Metadata } from 'next';
import { Dancing_Script } from 'next/font/google';

const dancingScript = Dancing_Script({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Camelia - Pastelería Artesanal',
  description: 'Pasteles y postres artesanales elaborados con amor',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={dancingScript.className}>{children}</body>
    </html>
  );
}