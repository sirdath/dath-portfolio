"use client";

import dynamic from "next/dynamic";

const HexBackground = dynamic(
  () => import("./HexBackground").then((mod) => mod.HexBackground),
  { ssr: false }
);

export function HexBackgroundLazy() {
  return <HexBackground />;
}
