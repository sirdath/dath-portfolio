import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { CustomCursor } from "@/components/ui/CustomCursor";
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

export const metadata: Metadata = {
  title: "Dimitrios Athinaios | Data Scientist & AI Engineer",
  description:
    "Portfolio of Dimitrios Athinaios — Data Scientist & AI Engineer. Explore projects in geospatial intelligence, multi-agent AI platforms, machine learning, and data engineering.",
  keywords: [
    "data scientist",
    "AI engineer",
    "geospatial",
    "machine learning",
    "portfolio",
    "analytics",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-void text-text-primary`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
