"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { GlobeMethods } from "react-globe.gl";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

interface Pin {
  slug: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  index: string;
}

const PINS: Pin[] = [
  { slug: "aegis", name: "AEGIS", region: "Strait of Hormuz · Maritime", lat: 26.5667, lng: 56.25, index: "02" },
  { slug: "london-synergy", name: "London Synergy Index", region: "London · UK", lat: 51.5074, lng: -0.1278, index: "03" },
  { slug: "housing-crime", name: "London Housing & Crime", region: "London · UK", lat: 51.5074, lng: -0.13, index: "04" },
  { slug: "risk-terrain", name: "RiskTerrain", region: "Wall Street · NYC", lat: 40.7074, lng: -74.0113, index: "05" },
  { slug: "dataportfolio", name: "Dataportfolio.co.uk", region: "London · UK", lat: 51.5074, lng: -0.125, index: "07" },
];

const ARCS = [
  { startLat: 26.5667, startLng: 56.25, endLat: 51.5074, endLng: -0.1278 },
  { startLat: 26.5667, startLng: 56.25, endLat: 40.7074, endLng: -74.0113 },
  { startLat: 51.5074, startLng: -0.1278, endLat: 40.7074, endLng: -74.0113 },
];

type CountryFeatures = { features: object[] };

export function RedesignGlobe() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [countries, setCountries] = useState<CountryFeatures>({ features: [] });
  const [size, setSize] = useState({ w: 560, h: 560 });
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const selected = useMemo(
    () => PINS.find((p) => p.slug === selectedSlug) || null,
    [selectedSlug],
  );

  // Fetch a low-res world countries GeoJSON on mount.
  useEffect(() => {
    let cancelled = false;
    fetch(
      "https://cdn.jsdelivr.net/gh/vasturiano/three-globe/example/datasets/ne_110m_admin_0_countries.geojson",
    )
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setCountries(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  // Resize observer keeps the globe canvas square with its container.
  useEffect(() => {
    if (!containerRef.current) return;
    const update = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      // Keep square; clamp to a sensible range
      const dim = Math.min(720, Math.max(360, w));
      setSize({ w: dim, h: dim });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Auto-rotate after the globe is ready.
  useEffect(() => {
    const g = globeRef.current;
    if (!g || !countries.features.length) return;
    const controls = g.controls() as unknown as {
      autoRotate: boolean;
      autoRotateSpeed: number;
      enableZoom: boolean;
    };
    controls.autoRotate = !selectedSlug;
    controls.autoRotateSpeed = 0.4;
    controls.enableZoom = false;
  }, [countries, selectedSlug]);

  // Fly to selected pin
  useEffect(() => {
    const g = globeRef.current;
    if (!g || !selected) return;
    g.pointOfView(
      { lat: selected.lat, lng: selected.lng, altitude: 1.6 },
      1100,
    );
  }, [selected]);

  return (
    <div className="globe-block">
      <div ref={containerRef} className="globe-canvas">
        <Globe
          ref={globeRef}
          width={size.w}
          height={size.h}
          backgroundColor="rgba(0,0,0,0)"
          showGlobe
          showAtmosphere
          atmosphereColor="#E63946"
          atmosphereAltitude={0.18}
          // Dark, untextured sphere with a faint red rim glow.
          globeMaterial={undefined}
          // Country outlines as hex tiles — distinctive vs. the blue marble.
          hexPolygonsData={countries.features}
          hexPolygonResolution={3}
          hexPolygonMargin={0.45}
          hexPolygonColor={() => "rgba(230, 237, 243, 0.22)"}
          // Project pins
          pointsData={PINS}
          pointLat="lat"
          pointLng="lng"
          pointColor={(d: object) =>
            (d as Pin).slug === selectedSlug ? "#ffffff" : "#E63946"
          }
          pointAltitude={0.012}
          pointRadius={(d: object) =>
            (d as Pin).slug === selectedSlug ? 0.8 : 0.45
          }
          onPointClick={(p: object) =>
            setSelectedSlug((prev) =>
              prev === (p as Pin).slug ? null : (p as Pin).slug,
            )
          }
          // Pulsing rings at each pin
          ringsData={PINS}
          ringLat="lat"
          ringLng="lng"
          ringColor={() => (t: number) => `rgba(230,57,70,${(1 - t) * 0.9})`}
          ringMaxRadius={(d: object) =>
            (d as Pin).slug === selectedSlug ? 5 : 3
          }
          ringPropagationSpeed={(d: object) =>
            (d as Pin).slug === selectedSlug ? 2.5 : 1.6
          }
          ringRepeatPeriod={1800}
          // Connecting arcs
          arcsData={ARCS}
          arcStartLat="startLat"
          arcStartLng="startLng"
          arcEndLat="endLat"
          arcEndLng="endLng"
          arcColor={() => "rgba(230, 57, 70, 0.7)"}
          arcStroke={0.35}
          arcDashLength={0.5}
          arcDashGap={0.2}
          arcDashAnimateTime={3200}
          arcAltitude={0.28}
        />
      </div>

      <div className="globe-info">
        <div className="globe-info-head">
          {selected ? (
            <>
              <span className="globe-num">{selected.index}</span>
              <h3 className="globe-name">{selected.name}</h3>
              <span className="globe-region">{selected.region}</span>
              <span className="globe-coord">
                {selected.lat.toFixed(4)}° N · {selected.lng.toFixed(4)}° E
              </span>
            </>
          ) : (
            <>
              <span className="globe-num">/ Atlas</span>
              <h3 className="globe-name">Where it lives.</h3>
              <p className="globe-blurb">
                Five projects, three regions. Click a pin on the globe — or a
                row below — to fly there.
              </p>
            </>
          )}
        </div>

        <ul className="globe-list">
          {PINS.map((p) => {
            const active = p.slug === selectedSlug;
            return (
              <li
                key={p.slug + p.lat + p.lng}
                className={active ? "globe-li active" : "globe-li"}
                onClick={() =>
                  setSelectedSlug((prev) => (prev === p.slug ? null : p.slug))
                }
              >
                <span className="globe-li-num">{p.index}</span>
                <span className="globe-li-dot" aria-hidden="true" />
                <span className="globe-li-name">{p.name}</span>
                <span className="globe-li-region">
                  {p.region.split(" · ")[0]}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
