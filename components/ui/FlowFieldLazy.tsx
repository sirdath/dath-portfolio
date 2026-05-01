"use client";

import dynamic from "next/dynamic";

const FlowField = dynamic(
  () => import("./FlowField").then((mod) => mod.FlowField),
  { ssr: false }
);

export function FlowFieldLazy() {
  return <FlowField />;
}
