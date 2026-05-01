"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";

interface ProjectPin {
  slug: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  color: string;
}

const PROJECT_PINS: ProjectPin[] = [
  { slug: "aegis", name: "AEGIS", region: "Maritime · Strait of Hormuz", lat: 26.5667, lng: 56.25, color: "#00f0ff" },
  { slug: "london-synergy-index", name: "London Synergy", region: "London, UK", lat: 51.5074, lng: -0.1278, color: "#a855f7" },
  { slug: "housing-crime-analysis", name: "Housing & Crime", region: "London, UK", lat: 51.515, lng: -0.13, color: "#ec4899" },
  { slug: "risk-terrain", name: "RiskTerrain", region: "New York, USA", lat: 40.7128, lng: -74.006, color: "#22d3ee" },
  { slug: "data-engineering-pipeline", name: "Data Engineering", region: "Global", lat: 0, lng: 0, color: "#00f0ff" },
  { slug: "dataportfolio", name: "Dataportfolio", region: "United Kingdom", lat: 53, lng: -2, color: "#a855f7" },
];

function latLngToVec3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function GlobeMesh({
  onSelect,
  selected,
}: {
  onSelect: (slug: string | null) => void;
  selected: string | null;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.06;
    }
  });

  // Wireframe sphere geometry
  const sphereGeo = new THREE.SphereGeometry(2, 32, 32);
  const wireframeGeo = new THREE.WireframeGeometry(sphereGeo);

  return (
    <group ref={groupRef}>
      {/* Wireframe sphere */}
      <lineSegments ref={wireframeRef} geometry={wireframeGeo}>
        <lineBasicMaterial color="#00f0ff" transparent opacity={0.18} />
      </lineSegments>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[1.98, 32, 32]} />
        <meshBasicMaterial color="#0c1420" transparent opacity={0.85} />
      </mesh>

      {/* Project pins */}
      {PROJECT_PINS.map((pin) => {
        const pos = latLngToVec3(pin.lat, pin.lng, 2.05);
        const isSelected = selected === pin.slug;
        return (
          <group key={pin.slug} position={[pos.x, pos.y, pos.z]}>
            {/* Outer pulse */}
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                onSelect(isSelected ? null : pin.slug);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => {
                document.body.style.cursor = "";
              }}
            >
              <sphereGeometry args={[isSelected ? 0.15 : 0.08, 16, 16]} />
              <meshBasicMaterial color={pin.color} transparent opacity={isSelected ? 0.9 : 0.7} />
            </mesh>
            {/* Glow halo */}
            <mesh>
              <sphereGeometry args={[isSelected ? 0.3 : 0.18, 16, 16]} />
              <meshBasicMaterial color={pin.color} transparent opacity={0.18} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export function GlobeSection() {
  const [selected, setSelected] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const selectedPin = PROJECT_PINS.find((p) => p.slug === selected);

  useEffect(() => {
    setMounted(true);
  }, []);

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
            Click a glowing pin to dive into the project anchored at that location.
          </p>
        </motion.div>

        {/* Globe + side info layout */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-center">
          {/* Globe canvas */}
          <div className="relative h-[500px] sm:h-[600px] rounded-3xl overflow-hidden border border-white/[0.06] bg-gradient-to-br from-void to-obsidian">
            {mounted && (
              <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
                <ambientLight intensity={0.4} />
                <pointLight position={[5, 5, 5]} intensity={0.8} />
                <GlobeMesh onSelect={setSelected} selected={selected} />
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  rotateSpeed={0.4}
                />
              </Canvas>
            )}
            <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.2em] text-text-dim pointer-events-none">
              Drag to rotate · Click pins to explore
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
                  <MapPin className="w-3 h-3" style={{ color: selectedPin.color }} />
                  {selectedPin.region}
                </div>
                <h3 className="text-2xl font-[family-name:var(--font-space-grotesk)] font-bold text-text-primary mb-2">
                  {selectedPin.name}
                </h3>
                <p className="text-xs text-text-dim mb-5">
                  {selectedPin.lat.toFixed(2)}°N, {selectedPin.lng.toFixed(2)}°E
                </p>
                <Link
                  href={`/projects/${selectedPin.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border bg-white/5 hover:bg-white/10 transition-all"
                  style={{ borderColor: `${selectedPin.color}40`, color: selectedPin.color }}
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
                  Each pin marks where a project does its work in the world — from
                  London hexagon analysis to Mediterranean shipping intelligence.
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
                  <span className="text-sm text-text-primary truncate">{pin.name}</span>
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
