"use client";

import { useMemo, useState } from "react";
import data from "./london-synergy-data.json";

type Category = keyof typeof data.top_recommendations;

interface Rec {
  borough: string;
  prob: number;
  population?: number | null;
  degree_pct?: number | null;
  age_pct?: number | null;
  tier?: string | null;
  shap_drivers: { feature: string; shap: number }[];
}

const CATEGORIES: { key: Category; label: string }[] = [
  { key: "cafe", label: "Cafés" },
  { key: "restaurant", label: "Restaurants" },
  { key: "pub", label: "Pubs" },
  { key: "fast_food", label: "Fast food" },
  { key: "gym", label: "Gyms" },
  { key: "bakery", label: "Bakeries" },
];

// Simple linear lat/lng → SVG projection for Greater London.
const BOUNDS = {
  minLat: 51.32,
  maxLat: 51.69,
  minLng: -0.51,
  maxLng: 0.32,
};
const VIEW_W = 800;
const VIEW_H = 560;
const PAD = 24;

function project(lat: number, lng: number): [number, number] {
  const x = PAD + ((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * (VIEW_W - PAD * 2);
  // Invert y (latitude increases north, SVG y increases down).
  const y = PAD + (1 - (lat - BOUNDS.minLat) / (BOUNDS.maxLat - BOUNDS.minLat)) * (VIEW_H - PAD * 2);
  return [x, y];
}

// Stylised Thames path through London (left-to-right, west-to-east).
// Hand-traced for visual reference, not geographically precise.
const THAMES_POINTS: [number, number][] = [
  [51.481, -0.481],
  [51.471, -0.450],
  [51.463, -0.420],
  [51.455, -0.385],
  [51.460, -0.346],
  [51.475, -0.310],
  [51.479, -0.281],
  [51.480, -0.234],
  [51.487, -0.196],
  [51.495, -0.176],
  [51.505, -0.156],
  [51.510, -0.131],
  [51.508, -0.105],
  [51.498, -0.078],
  [51.504, -0.060],
  [51.504, -0.037],
  [51.490, -0.020],
  [51.488, 0.005],
  [51.500, 0.030],
  [51.493, 0.050],
  [51.487, 0.072],
  [51.480, 0.110],
  [51.478, 0.150],
  [51.493, 0.195],
  [51.500, 0.250],
];

export function LondonOpportunityMap() {
  const [category, setCategory] = useState<Category>("cafe");
  const [hoveredBorough, setHoveredBorough] = useState<string | null>(null);

  const recs = useMemo(() => data.top_recommendations[category] as Rec[], [category]);
  const auc = (data.auc_scores as Record<Category, { label: string; mean: number; std: number }>)[category];

  const topBoroughs = useMemo(() => new Set(recs.map((r) => r.borough)), [recs]);
  const recByBorough = useMemo(() => {
    const m = new Map<string, Rec>();
    recs.forEach((r) => m.set(r.borough, r));
    return m;
  }, [recs]);

  const thamesPath = useMemo(() => {
    const pts = THAMES_POINTS.map(([lat, lng]) => project(lat, lng));
    return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  }, []);

  const allBoroughs = data.boroughs as unknown as Record<string, [number, number]>;
  const hoveredRec = hoveredBorough ? recByBorough.get(hoveredBorough) : null;

  return (
    <div className="synergy-map">
      <div className="synergy-map-controls">
        <span className="synergy-map-eyebrow">/ Browse predicted opportunity by category</span>
        <div className="synergy-map-tabs">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              className={c.key === category ? "synergy-tab active" : "synergy-tab"}
              onClick={() => {
                setCategory(c.key);
                setHoveredBorough(null);
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="synergy-map-auc">
          Model AUC for {auc.label.toLowerCase()}: <b>{auc.mean.toFixed(3)}</b>
          <span className="synergy-map-auc-std"> ± {auc.std.toFixed(3)}</span>
        </div>
      </div>

      <div className="synergy-map-body">
        <svg
          className="synergy-map-svg"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="London map of predicted retail opportunity"
        >
          {/* faint grid */}
          <defs>
            <pattern id="synergy-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="rgba(230, 237, 243, 0.04)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width={VIEW_W} height={VIEW_H} fill="url(#synergy-grid)" />

          {/* Thames */}
          <path
            d={thamesPath}
            fill="none"
            stroke="rgba(112, 165, 253, 0.28)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d={thamesPath} fill="none" stroke="rgba(112, 165, 253, 0.12)" strokeWidth="8" strokeLinecap="round" />

          {/* All boroughs as dim dots */}
          {Object.entries(allBoroughs)
            // Drop the alias to avoid double-rendering "Westminster" + "City of Westminster"
            .filter(([n]) => n !== "City of Westminster")
            .map(([name, [lat, lng]]) => {
              const [x, y] = project(lat, lng);
              const isTop = topBoroughs.has(name);
              const rec = recByBorough.get(name);
              return (
                <g
                  key={name}
                  className={isTop ? "synergy-dot synergy-dot-top" : "synergy-dot"}
                  onMouseEnter={() => setHoveredBorough(name)}
                  onMouseLeave={() => setHoveredBorough(null)}
                  onClick={() => setHoveredBorough((h) => (h === name ? null : name))}
                >
                  {/* hit area */}
                  <circle cx={x} cy={y} r={14} fill="transparent" />
                  {/* pulse on top dots */}
                  {isTop && <circle cx={x} cy={y} r={11} className="synergy-dot-pulse" />}
                  {/* the visible dot */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isTop ? 6 : 2.5}
                    fill={isTop ? "#E63946" : "rgba(154,163,174,0.5)"}
                  />
                  {isTop && rec && (
                    <text
                      x={x + 10}
                      y={y + 4}
                      fill="rgba(230, 237, 243, 0.75)"
                      fontFamily="var(--mono)"
                      fontSize="10"
                      style={{ pointerEvents: "none" }}
                    >
                      {(rec.prob * 100).toFixed(0)}%
                    </text>
                  )}
                </g>
              );
            })}
        </svg>

        <aside className="synergy-map-panel">
          {hoveredRec ? (
            <>
              <span className="synergy-panel-eyebrow">
                {hoveredRec.tier?.toUpperCase() || "RECOMMENDATION"}
              </span>
              <h3 className="synergy-panel-name">{hoveredRec.borough}</h3>
              <div className="synergy-panel-prob">
                <b>{(hoveredRec.prob * 100).toFixed(1)}%</b>
                <span>opportunity probability</span>
              </div>
              <div className="synergy-panel-stats">
                {hoveredRec.population != null && (
                  <div>
                    <span>Pop.</span>
                    <b>{hoveredRec.population.toLocaleString()}</b>
                  </div>
                )}
                {hoveredRec.degree_pct != null && (
                  <div>
                    <span>Centrality</span>
                    <b>{hoveredRec.degree_pct.toFixed(1)}%</b>
                  </div>
                )}
                {hoveredRec.age_pct != null && (
                  <div>
                    <span>Age 18-44</span>
                    <b>{hoveredRec.age_pct.toFixed(1)}%</b>
                  </div>
                )}
              </div>
              {hoveredRec.shap_drivers.length > 0 && (
                <div className="synergy-panel-shap">
                  <span className="synergy-panel-shap-label">/ Top SHAP drivers</span>
                  <ul>
                    {hoveredRec.shap_drivers.map((d) => (
                      <li key={d.feature}>
                        <code>{d.feature}</code>
                        <span>{d.shap >= 0 ? "+" : ""}{d.shap.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <>
              <span className="synergy-panel-eyebrow">Top 10 sites · {auc.label}</span>
              <h3 className="synergy-panel-name">Hover or click a hot dot.</h3>
              <p className="synergy-panel-blurb">
                Red dots are the model&apos;s top-10 predicted opportunity zones for the selected category — borough-level summaries of the 15,430-hexagon prediction grid. Grey dots are the other 23 boroughs.
              </p>
              <div className="synergy-panel-grid-meta">
                <div>
                  <span>Hexagons</span>
                  <b>15,430</b>
                </div>
                <div>
                  <span>Boroughs</span>
                  <b>33</b>
                </div>
                <div>
                  <span>H3 res.</span>
                  <b>9</b>
                </div>
              </div>
            </>
          )}
        </aside>
      </div>

      <ol className="synergy-list">
        {recs.map((r, i) => (
          <li
            key={r.borough}
            className={r.borough === hoveredBorough ? "synergy-list-item active" : "synergy-list-item"}
            onMouseEnter={() => setHoveredBorough(r.borough)}
            onMouseLeave={() => setHoveredBorough(null)}
          >
            <span className="synergy-list-rank">{String(i + 1).padStart(2, "0")}</span>
            <span className="synergy-list-name">{r.borough}</span>
            <span className="synergy-list-prob">{(r.prob * 100).toFixed(0)}%</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
