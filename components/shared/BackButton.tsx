"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-text-muted border border-white/10 bg-white/5 backdrop-blur-md hover:border-accent-cyan/30 hover:text-accent-cyan transition-all"
    >
      <ArrowLeft className="w-4 h-4" />
      Back
    </button>
  );
}
