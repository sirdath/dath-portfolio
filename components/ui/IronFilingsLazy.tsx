"use client";

import dynamic from "next/dynamic";

const IronFilings = dynamic(
  () => import("./IronFilings").then((mod) => mod.IronFilings),
  { ssr: false }
);

export function IronFilingsLazy() {
  return <IronFilings />;
}
