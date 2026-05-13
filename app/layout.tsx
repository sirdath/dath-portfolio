import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono, Playfair_Display, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://dathproject.com";
const DESCRIPTION =
  "Geospatial Data Scientist & AI Engineer building end-to-end agentic pipelines, spatial ML on H3 hexagons, and local-first LLM tooling. London ↔ Athens.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dimitris Athinaios — Geospatial Data Scientist & AI Engineer",
    template: "%s · dathproject.com",
  },
  description: DESCRIPTION,
  keywords: [
    "Dimitris Athinaios",
    "dathproject",
    "geospatial data scientist",
    "AI engineer",
    "geospatial machine learning",
    "H3 hexagon",
    "multi-agent platforms",
    "spatial ML",
    "London data scientist",
    "Athens AI engineer",
    "LangGraph",
    "CrewAI",
    "NeuroVault",
    "AEGIS maritime",
  ],
  authors: [{ name: "Dimitris Athinaios", url: SITE_URL }],
  creator: "Dimitris Athinaios",
  publisher: "Dimitris Athinaios",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "dathproject.com",
    title: "Dimitris Athinaios — Geospatial Data Scientist & AI Engineer",
    description: DESCRIPTION,
    // app/opengraph-image.png is auto-detected by Next.js
  },
  twitter: {
    card: "summary_large_image",
    title: "Dimitris Athinaios — Geospatial Data Scientist & AI Engineer",
    description: DESCRIPTION,
    creator: "@sirdath",
    // app/twitter-image.png is auto-detected
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${playfair.variable} ${instrumentSerif.variable} antialiased bg-void text-text-primary`}
      >
        {children}
      </body>
    </html>
  );
}
