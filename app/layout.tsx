import "./globals.css";
import type { Metadata } from "next";
import { Dancing_Script, Inter } from "next/font/google";

const dancingScript = Dancing_Script({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Camelia - Pastelería Artesanal",
  description:
    "Descubre nuestros pasteles y postres artesanales, elaborados con amor y los mejores ingredientes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* Estilos críticos en línea */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          :root {
            --pastel-cream: #FFF5E6;
            --pastel-pink: #FFE4E1;
          }
          
          .from-pastel-cream {
            --tw-gradient-from: var(--pastel-cream);
            --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
          }
          
          .to-pastel-pink {
            --tw-gradient-to: var(--pastel-pink);
          }
          
          .bg-gradient-to-b {
            background-image: linear-gradient(to bottom, var(--tw-gradient-stops));
          }
          
          .text-white {
            color: rgb(255 255 255);
          }
          
          .object-cover {
            object-fit: cover;
          }
          
          @media (min-width: 768px) {
            .md\\:text-9xl {
              font-size: 8rem;
              line-height: 1;
            }
          }
        `,
          }}
        />
        {/* Precargar fuentes críticas */}
        <link
          rel="preload"
          href="/_next/static/media/dancing-script.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
