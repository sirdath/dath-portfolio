"use client";

import dynamic from "next/dynamic";

const ShaderDotGrid = dynamic(
  () => import("./ShaderDotGrid").then((mod) => mod.ShaderDotGrid),
  { ssr: false }
);

export function ShaderDotGridLazy() {
  return <ShaderDotGrid />;
}
