"use client";

import dynamic from "next/dynamic";

const ConstellationField = dynamic(
  () =>
    import("./ConstellationField").then((mod) => mod.ConstellationField),
  { ssr: false }
);

export function ConstellationFieldLazy() {
  return <ConstellationField />;
}
