"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowUpRight, Globe2, Sparkles, X } from "lucide-react";
import Link from "next/link";
import type { GlobeMethods } from "react-globe.gl";
import { projects } from "@/data/projects";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

interface ProjectPin {
  slug: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  color: string;
  index: string; // "01", "02", etc
  stackIndex?: number; // 0 = base position; 1 = stacked below; 2 = further below
}

const PROJECT_PINS: ProjectPin[] = [
  {
    slug: "neurovault",
    name: "NeuroVault",
    region: "Local-first · Anywhere",
    lat: 30,
    lng: -40,
    color: "#00d9ff", // bright cyan
    index: "01",
  },
  {
    slug: "aegis",
    name: "AEGIS",
    region: "Strait of Hormuz · Maritime",
    lat: 26.5667,
    lng: 56.25,
    color: "#a3e635", // lime
    index: "02",
  },
  // ─── London cluster: same coords, vertical stack via stackIndex ───
  {
    slug: "london-synergy-index",
    name: "London Synergy Index",
    region: "London, UK",
    lat: 51.5074,
    lng: -0.1278,
    color: "#c084fc", // bright violet
    index: "03",
    stackIndex: 0,
  },
  {
    slug: "housing-crime-analysis",
    name: "Housing & Crime Analysis",
    region: "London, UK",
    lat: 51.5074,
    lng: -0.1278, // same coords as Synergy - stacked
    color: "#ff4d8d", // hot pink
    index: "04",
    stackIndex: 1,
  },
  {
    slug: "dataportfolio",
    name: "Dataportfolio.co.uk",
    region: "London, UK",
    lat: 51.5074,
    lng: -0.1278, // also stacked with London cluster
    color: "#fbbf24", // gold
    index: "05",
    stackIndex: 2,
  },
  {
    slug: "risk-terrain",
    name: "RiskTerrain",
    region: "Wall Street, NYC",
    lat: 40.7074,
    lng: -74.0113,
    color: "#fb923c", // orange
    index: "06",
  },
  {
    slug: "data-engineering-pipeline",
    name: "Data Engineering Pipeline",
    region: "Global infrastructure",
    lat: 0,
    lng: -160,
    color: "#f87171", // red
    index: "07",
  },
];

interface Arc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
}
const ARCS: Arc[] = [
  { startLat: 26.5667, startLng: 56.25, endLat: 51.5074, endLng: -0.1278, color: "#00f0ff" },
  { startLat: 26.5667, startLng: 56.25, endLat: 40.7074, endLng: -74.0113, color: "#a855f7" },
  { startLat: 51.5074, startLng: -0.1278, endLat: 40.7074, endLng: -74.0113, color: "#22d3ee" },
];

// Hex → "r, g, b" for rgba() usage
function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

interface RingDatum {
  lat: number;
  lng: number;
  color: string;
  rgb: string;
}

export function GlobeSection() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [size, setSize] = useState({ width: 600, height: 600 });

  const selectedPin = useMemo(
    () => PROJECT_PINS.find((p) => p.slug === selected),
    [selected]
  );
  const selectedProject = useMemo(
    () => projects.find((p) => p.slug === selected),
    [selected]
  );

  // Resize globe to container
  useEffect(() => {
    if (!containerRef.current) return;
    const update = () => {
      if (!containerRef.current) return;
      setSize({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-rotate
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    const controls = globe.controls() as unknown as {
      autoRotate: boolean;
      autoRotateSpeed: number;
      enableZoom: boolean;
    };
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.35;
      controls.enableZoom = false;
    }
  }, []);

  // Fly to selected pin
  useEffect(() => {
    if (!selectedPin || !globeRef.current) return;
    globeRef.current.pointOfView(
      { lat: selectedPin.lat, lng: selectedPin.lng, altitude: 1.7 },
      1500
    );
  }, [selectedPin]);

  const ringsData: RingDatum[] = useMemo(
    () =>
      PROJECT_PINS.map((p) => ({
        lat: p.lat,
        lng: p.lng,
        color: p.color,
        rgb: hexToRgb(p.color),
      })),
    []
  );

  // Build the HTML beacon for each pin
  const buildBeacon = (d: object) => {
    const pin = d as ProjectPin;
    const isActive = pin.slug === selected;
    const wrap = document.createElement("div");
    wrap.className = `beacon-wrap${isActive ? " beacon-active" : ""}`;
    wrap.style.color = pin.color;

    // Stack offset for clustered pins (e.g., London projects all at same coords)
    const stackIndex = pin.stackIndex ?? 0;
    const tagTop = -7 + stackIndex * 30;
    const labelTop = -10 + stackIndex * 30;

    // Hide beacon visuals (beam/core/ring) on non-base stacked pins -
    // they'd just stack on top of the base pin's visuals at the same coord
    const hideVisuals = stackIndex > 0;

    wrap.innerHTML = `
      ${
        hideVisuals
          ? ""
          : `
        <div class="beacon-beam" style="background: linear-gradient(to top, ${pin.color}, ${pin.color}40 50%, transparent 100%); box-shadow: 0 0 12px ${pin.color}80;"></div>
        <div class="beacon-core" style="background: ${pin.color}; box-shadow: 0 0 14px ${pin.color}, 0 0 28px ${pin.color}60;"></div>
        <div class="beacon-ring" style="color: ${pin.color}"></div>
      `
      }
      <div class="beacon-tag beacon-clickable" style="color: ${pin.color}; top: ${tagTop}px;">${pin.index}</div>
      <div class="beacon-label" style="top: ${labelTop}px;">
        <div style="display: flex; align-items: center; gap: 7px;">
          <span style="font-family: ui-monospace, monospace; color: ${pin.color}; font-size: 8px; letter-spacing: 0.16em;">${pin.index}</span>
          <span style="font-weight: 500;">${pin.name}</span>
        </div>
        <div class="beacon-label-region">${pin.region}</div>
      </div>
    `;
    wrap.onclick = (e) => {
      e.stopPropagation();
      // Click selected pin again = deselect (return to overview)
      setSelected((prev) => (prev === pin.slug ? null : pin.slug));
    };
    return wrap;
  };

  return (
    <section
      id="atlas"
      className="relative w-full px-4 sm:px-6 lg:px-8 py-24 sm:py-32 overflow-hidden bg-void"
    >
      {/* Subtle radial backdrop glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-accent-cyan">
            <Globe2 className="w-3 h-3" />
            Where the work lives
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-text-primary">
            Project <span className="italic">Atlas</span>
          </h2>
          <motion.div
            className="mt-4 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-accent-cyan/60 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="mt-5 max-w-xl mx-auto text-text-muted text-sm sm:text-base">
            Seven projects, seven beacons. Click a glowing marker to dive into the
            work anchored at that location.
          </p>
        </motion.div>

        {/* Globe + side info layout - symmetric */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          {/* Globe canvas with elegant frame */}
          <div className="relative">
            <div
              ref={containerRef}
              className="relative h-[500px] sm:h-[640px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#0a1020] via-void to-[#0c0820]"
              style={{
                boxShadow:
                  "0 30px 100px -30px rgba(0, 240, 255, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.04)",
              }}
            >
              <Globe
                ref={globeRef}
                width={size.width}
                height={size.height}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
                bumpImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
                showAtmosphere
                atmosphereColor="#88ccff"
                atmosphereAltitude={0.22}
                /* ─── Pulsing rings on the surface ─── */
                ringsData={ringsData}
                ringColor={(d: object) => (t: number) => {
                  const r = d as RingDatum;
                  return `rgba(${r.rgb}, ${1 - t})`;
                }}
                ringMaxRadius={(d: object) => {
                  const r = d as RingDatum;
                  return PROJECT_PINS.find(
                    (p) => p.lat === r.lat && p.lng === r.lng
                  )?.slug === selected
                    ? 6
                    : 3;
                }}
                ringPropagationSpeed={(d: object) => {
                  const r = d as RingDatum;
                  return PROJECT_PINS.find(
                    (p) => p.lat === r.lat && p.lng === r.lng
                  )?.slug === selected
                    ? 2.5
                    : 1.4;
                }}
                ringRepeatPeriod={2200}
                /* ─── HTML beacons (the WOW) ─── */
                htmlElementsData={PROJECT_PINS}
                htmlAltitude={0.001}
                htmlElement={buildBeacon}
                htmlElementVisibilityModifier={(el: HTMLElement, isVisible: boolean) => {
                  el.style.opacity = isVisible ? "1" : "0";
                  el.style.pointerEvents = isVisible ? "auto" : "none";
                }}
                /* ─── Animated arcs (shipping route metaphor) ─── */
                arcsData={ARCS}
                arcStartLat={(d: object) => (d as Arc).startLat}
                arcStartLng={(d: object) => (d as Arc).startLng}
                arcEndLat={(d: object) => (d as Arc).endLat}
                arcEndLng={(d: object) => (d as Arc).endLng}
                arcColor={(d: object) => (d as Arc).color}
                arcStroke={0.5}
                arcDashLength={0.5}
                arcDashGap={0.18}
                arcDashAnimateTime={2800}
                arcAltitude={0.32}
              />

              {/* Top-left annotation */}
              <div className="absolute top-5 left-5 pointer-events-none flex items-center gap-2.5">
                <div className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-70 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.28em] text-text-muted font-mono">
                  LIVE · 7 BEACONS · 4 REGIONS
                </span>
              </div>

              {/* Bottom-right hint */}
              <div className="absolute bottom-5 right-5 text-[10px] uppercase tracking-[0.22em] text-text-dim pointer-events-none flex items-center gap-2">
                <Sparkles className="w-3 h-3" />
                Drag to rotate · Click to fly
              </div>

              {/* Coordinate readout */}
              <div className="absolute bottom-5 left-5 font-mono text-[10px] text-text-dim pointer-events-none">
                {selectedPin
                  ? `${selectedPin.lat.toFixed(4)}°N · ${selectedPin.lng.toFixed(4)}°E`
                  : "0.0000°N · 0.0000°E"}
              </div>
            </div>
          </div>

          {/* Side panel - DRAMATIC */}
          <div className="space-y-3 lg:sticky lg:top-8">
            {/* Active project hero card */}
            <AnimatePresence mode="wait">
              {selectedPin && selectedProject ? (
                <motion.div
                  key={selectedPin.slug}
                  initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -24, filter: "blur(8px)" }}
                  transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    background: `
                      radial-gradient(circle at top right, ${selectedPin.color}18, transparent 50%),
                      linear-gradient(to bottom, rgba(15,15,20,0.85), rgba(9,9,11,0.95))
                    `,
                    boxShadow: `0 24px 60px -20px ${selectedPin.color}25, inset 0 0 0 1px ${selectedPin.color}30`,
                  }}
                >
                  {/* Top accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${selectedPin.color}, transparent)`,
                    }}
                  />

                  <div className="p-7">
                    {/* Header row */}
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className="font-mono text-xs tracking-[0.3em]"
                        style={{ color: selectedPin.color }}
                      >
                        {selectedPin.index} / 07
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-text-muted">
                          <MapPin
                            className="w-3 h-3"
                            style={{ color: selectedPin.color }}
                          />
                          {selectedPin.region}
                        </div>
                        <button
                          onClick={() => setSelected(null)}
                          className="p-1 rounded-full border border-white/10 text-text-dim hover:text-white hover:border-white/30 transition-colors"
                          aria-label="Clear selection"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-[family-name:var(--font-playfair)] text-3xl leading-[1.1] mb-4 text-white">
                      {selectedPin.name}
                    </h3>

                    {/* Coordinates monospace */}
                    <div className="font-mono text-[10px] text-text-dim mb-5 tracking-wider">
                      LAT {selectedPin.lat.toFixed(4)}° · LNG {selectedPin.lng.toFixed(4)}°
                    </div>

                    {/* Subtitle/description */}
                    <p className="text-sm text-text-muted leading-relaxed mb-6">
                      {selectedProject.subtitle}
                    </p>

                    {/* Tech pills */}
                    <div className="flex flex-wrap gap-1.5 mb-7">
                      {selectedProject.techStack.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider border bg-white/[0.03] text-text-muted"
                          style={{ borderColor: `${selectedPin.color}25` }}
                        >
                          {tech}
                        </span>
                      ))}
                      {selectedProject.techStack.length > 6 && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium text-text-dim border border-white/[0.06]">
                          +{selectedProject.techStack.length - 6}
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <Link
                      href={`/projects/${selectedPin.slug}`}
                      className="group/cta inline-flex items-center justify-between w-full px-5 py-3.5 rounded-xl text-sm font-medium border bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-300"
                      style={{
                        borderColor: `${selectedPin.color}50`,
                        color: selectedPin.color,
                      }}
                    >
                      <span>Open project</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                    </Link>
                  </div>

                  {/* Bottom accent corner */}
                  <div
                    className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at bottom right, ${selectedPin.color}20, transparent 70%)`,
                    }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-2xl p-7 glass border-l-2 border-accent-cyan/30"
                >
                  <div className="text-[10px] uppercase tracking-[0.3em] text-accent-cyan/80 mb-3">
                    Select a beacon
                  </div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-2xl text-white mb-3">
                    Seven projects · four regions
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    Each beacon marks where a project does its work in the
                    world - from London hexagon analysis to Mediterranean
                    shipping intelligence.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Project list - premium navigation */}
            <div className="rounded-2xl glass overflow-hidden">
              <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.22em] text-text-dim font-mono">
                  All beacons
                </span>
                <span className="text-[10px] text-text-dim">{PROJECT_PINS.length}</span>
              </div>
              <div className="p-2">
                {PROJECT_PINS.map((pin) => {
                  const isActive = selected === pin.slug;
                  return (
                    <button
                      key={pin.slug}
                      onClick={() => setSelected(pin.slug)}
                      className={`group/row relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-300 overflow-hidden ${
                        isActive
                          ? "bg-white/[0.06]"
                          : "hover:bg-white/[0.03] hover:translate-x-0.5"
                      }`}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <motion.span
                          layoutId="active-row"
                          className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r"
                          style={{ background: pin.color }}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}

                      {/* Index */}
                      <span
                        className="font-mono text-[10px] w-6 shrink-0"
                        style={{
                          color: isActive ? pin.color : "var(--color-text-dim)",
                        }}
                      >
                        {pin.index}
                      </span>

                      {/* Beacon dot */}
                      <span className="relative w-2 h-2 shrink-0">
                        <span
                          className="absolute inset-0 rounded-full opacity-50 animate-ping"
                          style={{ background: pin.color }}
                        />
                        <span
                          className="relative inline-block w-full h-full rounded-full"
                          style={{
                            background: pin.color,
                            boxShadow: `0 0 8px ${pin.color}`,
                          }}
                        />
                      </span>

                      {/* Name */}
                      <span
                        className={`text-sm truncate transition-colors ${
                          isActive ? "text-white" : "text-text-muted group-hover/row:text-white"
                        }`}
                      >
                        {pin.name}
                      </span>

                      {/* Region (right side) */}
                      <span className="ml-auto text-[10px] text-text-dim shrink-0 hidden sm:inline">
                        {pin.region.split("·")[0].trim()}
                      </span>

                      {/* Hover arrow */}
                      <ArrowUpRight
                        className={`w-3.5 h-3.5 shrink-0 transition-all duration-300 ${
                          isActive
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-1 group-hover/row:opacity-60 group-hover/row:translate-x-0"
                        }`}
                        style={{ color: isActive ? pin.color : undefined }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stats footer */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Projects", value: "7" },
                { label: "Regions", value: "4" },
                { label: "Years", value: "3" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass rounded-xl px-3 py-3 text-center"
                >
                  <div className="font-[family-name:var(--font-playfair)] text-2xl text-white leading-none">
                    {stat.value}
                  </div>
                  <div className="mt-1.5 text-[9px] uppercase tracking-[0.2em] text-text-dim">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
