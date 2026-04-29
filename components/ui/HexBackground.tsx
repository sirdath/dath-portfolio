"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function HexagonalPrism({
  scale,
  rotationSpeed,
  color,
  opacity,
  initialRotation = [0, 0, 0],
}: {
  scale: number;
  rotationSpeed: { x: number; y: number; z: number };
  color: string;
  opacity: number;
  initialRotation?: [number, number, number];
}) {
  const ref = useRef<THREE.LineSegments>(null);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * rotationSpeed.x;
      ref.current.rotation.y += delta * rotationSpeed.y;
      ref.current.rotation.z += delta * rotationSpeed.z;
    }
  });

  // Hexagonal prism = cylinder with 6 radial segments
  const geometry = new THREE.CylinderGeometry(scale, scale, scale * 0.5, 6);
  const edges = new THREE.EdgesGeometry(geometry);

  return (
    <lineSegments
      ref={ref}
      geometry={edges}
      rotation={initialRotation}
    >
      <lineBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        linewidth={1}
      />
    </lineSegments>
  );
}

function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.2} />
      {/* Outer hex — cyan, slow rotation */}
      <HexagonalPrism
        scale={3.4}
        rotationSpeed={{ x: 0.03, y: 0.06, z: 0.01 }}
        color="#00f0ff"
        opacity={0.55}
        initialRotation={[Math.PI / 5, Math.PI / 6, 0]}
      />
      {/* Inner hex — purple, opposite rotation, slightly offset */}
      <HexagonalPrism
        scale={2.4}
        rotationSpeed={{ x: -0.04, y: -0.08, z: 0.02 }}
        color="#a855f7"
        opacity={0.4}
        initialRotation={[Math.PI / 4, -Math.PI / 8, Math.PI / 12]}
      />
      {/* Tiny core hex — white-ish, fast rotation */}
      <HexagonalPrism
        scale={1.4}
        rotationSpeed={{ x: 0.08, y: 0.12, z: 0.03 }}
        color="#ffffff"
        opacity={0.25}
        initialRotation={[0, Math.PI / 3, 0]}
      />
    </Canvas>
  );
}

function FallbackBackground() {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.04)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(168,85,247,0.04)_0%,transparent_50%)]" />
    </div>
  );
}

export function HexBackground() {
  const [mounted, setMounted] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) {
        setHasError(true);
        return;
      }
    } catch {
      setHasError(true);
      return;
    }
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-void w-full h-full pointer-events-none">
      {mounted && !hasError ? <Scene /> : <FallbackBackground />}
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-void)_90%)] opacity-95" />
    </div>
  );
}
