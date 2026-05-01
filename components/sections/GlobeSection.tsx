"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { GlobeMethods } from "react-globe.gl";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

interface ProjectPin {
  slug: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  color: string;
  size: number;
}

const PROJECT_PINS: ProjectPin[] = [
  {
    slug: "aegis",
    name: "AEGIS",
    region: "Maritime · Strait of Hormuz",
    lat: 26.5667,
    lng: 56.25,
    color: "#00f0ff",
    size: 0.9,
  },
  {
    slug: "london-synergy-index",
    name: "London Synergy Index",
    region: "London, UK",
    lat: 51.5074,
    lng: -0.1278,
    color: "#a855f7",
    size: 0.8,
  },
  {
    slug: "housing-crime-analysis",
    name: "Housing & Crime Analysis",
    region: "London, UK",
    lat: 51.515,
    lng: -0.1,
    color: "#ec4899",
    size: 0.75,
  },
  {
    slug: "risk-terrain",
    name: "RiskTerrain",
    region: "Wall Street, NYC",
    lat: 40.7074,
    lng: -74.0113,
    color: "#22d3ee",
    size: 0.85,
  },
  {
    slug: "data-engineering-pipeline",
    name: "Data Engineering Pipeline",
    region: "Global",
    lat: 0,
    lng: 0,
    color: "#00f0ff",
    size: 0.7,
  },
  {
    slug: "dataportfolio",
    name: "Dataportfolio.co.uk",
    region: "United Kingdom",
    lat: 53.5,
    lng: -2.5,
    color: "#a855f7",
    size: 0.7,
  },
];

// Arcs connecting AEGIS to other locations (shipping route metaphor)
interface Arc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
}
const ARCS: Arc[] = [
  // Strait of Hormuz to London (Suez route)
  { startLat: 26.5667, startLng: 56.25, endLat: 51.5074, endLng: -0.1278, color: "#00f0ff" },
  // Strait of Hormuz to NYC
  { startLat: 26.5667, startLng: 56.25, endLat: 40.7074, endLng: -74.0113, color: "#a855f7" },
  // London to NYC (transatlantic)
  { startLat: 51.5074, startLng: -0.1278, endLat: 40.7074, endLng: -74.0113, color: "#22d3ee" },
];

export function GlobeSection() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [size, setSize] = useState({ width: 600, height: 600 });

  const selectedPin = useMemo(
    () => PROJECT_PINS.find((p) => p.slug === selected),
    [selected]
  );

  // Resize globe to container
  useEffect(() => {
    if (!containerRef.current) return;
    const update = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      setSize({ width: w, height: h });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-rotate slowly
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
      controls.autoRotateSpeed = 0.4;
      controls.enableZoom = false;
    }
  }, []);

  // Fly to selected pin
  useEffect(() => {
    if (!selectedPin || !globeRef.current) return;
    globeRef.current.pointOfView(
      { lat: selectedPin.lat, lng: selectedPin.lng, altitude: 1.8 },
      1500
    );
  }, [selectedPin]);

  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl relative">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent-cyan">
            Where the work lives
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
            Project Atlas
          </h2>
          <motion.div
            className="mt-3 mx-auto h-0.5 w-16 rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <p className="mt-4 max-w-xl mx-auto text-text-muted text-sm sm:text-base">
            Click a glowing pin to fly to the project anchored at that location.
          </p>
        </motion.div>

        {/* Globe + side info layout */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* Globe canvas */}
          <div
            ref={containerRef}
            className="relative h-[500px] sm:h-[600px] rounded-3xl overflow-hidden border border-white/[0.06] bg-gradient-to-br from-void to-obsidian"
          >
            <Globe
              ref={globeRef}
              width={size.width}
              height={size.height}
              backgroundColor="rgba(0,0,0,0)"
              globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg"
              bumpImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
              showAtmosphere
              atmosphereColor="#00f0ff"
              atmosphereAltitude={0.18}
              // Pins
              pointsData={PROJECT_PINS}
              pointLat={(d: object) => (d as ProjectPin).lat}
              pointLng={(d: object) => (d as ProjectPin).lng}
              pointColor={(d: object) => (d as ProjectPin).color}
              pointAltitude={(d: object) =>
                (d as ProjectPin).slug === selected ? 0.12 : 0.04
              }
              pointRadius={(d: object) => (d as ProjectPin).size * 0.7}
              pointLabel={(d: object) => {
                const p = d as ProjectPin;
                return `<div style="background: rgba(9,9,11,0.92); border: 1px solid ${p.color}; border-radius: 12px; padding: 10px 14px; font-family: system-ui; box-shadow: 0 8px 32px rgba(0,0,0,0.5);">
                  <div style="font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: ${p.color}; margin-bottom: 4px;">${p.region}</div>
                  <div style="font-weight: 600; color: white; font-size: 14px;">${p.name}</div>
                </div>`;
              }}
              onPointClick={(d: object) => {
                const p = d as ProjectPin;
                setSelected(p.slug);
              }}
              onPointHover={(d: object | null) => {
                document.body.style.cursor = d ? "pointer" : "";
              }}
              // Arcs
              arcsData={ARCS}
              arcStartLat={(d: object) => (d as Arc).startLat}
              arcStartLng={(d: object) => (d as Arc).startLng}
              arcEndLat={(d: object) => (d as Arc).endLat}
              arcEndLng={(d: object) => (d as Arc).endLng}
              arcColor={(d: object) => (d as Arc).color}
              arcStroke={0.4}
              arcDashLength={0.5}
              arcDashGap={0.2}
              arcDashAnimateTime={2500}
              arcAltitude={0.3}
            />
            <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.2em] text-text-dim pointer-events-none">
              Drag to rotate · Click pins to fly there
            </div>
          </div>

          {/* Side panel */}
          <div className="space-y-3">
            {selectedPin ? (
              <motion.div
                key={selectedPin.slug}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="glass rounded-2xl p-6 border-l-2"
                style={{ borderLeftColor: selectedPin.color }}
              >
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-text-dim mb-3">
                  <MapPin
                    className="w-3 h-3"
                    style={{ color: selectedPin.color }}
                  />
                  {selectedPin.region}
                </div>
                <h3 className="text-2xl font-[family-name:var(--font-space-grotesk)] font-bold text-text-primary mb-2">
                  {selectedPin.name}
                </h3>
                <p className="text-xs text-text-dim mb-5 font-mono">
                  {selectedPin.lat.toFixed(4)}°{selectedPin.lat >= 0 ? "N" : "S"}
                  ,{" "}
                  {Math.abs(selectedPin.lng).toFixed(4)}°
                  {selectedPin.lng >= 0 ? "E" : "W"}
                </p>
                <Link
                  href={`/projects/${selectedPin.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border bg-white/5 hover:bg-white/10 transition-all"
                  style={{
                    borderColor: `${selectedPin.color}40`,
                    color: selectedPin.color,
                  }}
                >
                  Open project
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            ) : (
              <div className="glass rounded-2xl p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-text-dim mb-3">
                  6 projects · 4 regions
                </p>
                <p className="text-sm text-text-muted leading-relaxed">
                  Each pin marks where a project does its work in the world —
                  from London hexagon analysis to Mediterranean shipping
                  intelligence.
                </p>
              </div>
            )}

            {/* Project list */}
            <div className="glass rounded-2xl p-4 space-y-1">
              {PROJECT_PINS.map((pin) => (
                <button
                  key={pin.slug}
                  onClick={() => setSelected(pin.slug)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    selected === pin.slug
                      ? "bg-white/[0.08]"
                      : "hover:bg-white/[0.04]"
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: pin.color }}
                  />
                  <span className="text-sm text-text-primary truncate">
                    {pin.name}
                  </span>
                  <span className="ml-auto text-[10px] text-text-dim shrink-0">
                    {pin.region.split("·")[0].trim()}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
