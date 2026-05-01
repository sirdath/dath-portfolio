"use client";

import dynamic from "next/dynamic";

const GlobeSection = dynamic(
  () => import("./GlobeSection").then((mod) => mod.GlobeSection),
  { ssr: false }
);

export function GlobeSectionLazy() {
  return <GlobeSection />;
}
