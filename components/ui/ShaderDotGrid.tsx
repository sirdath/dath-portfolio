"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useMemo } from "react";
import * as THREE from "three";

const TRAIL_LENGTH = 8;
const TRAIL_LIFETIME = 0.7; // seconds

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec3 uTrail[${TRAIL_LENGTH}]; // x, y, intensity
  uniform vec2 uResolution;
  varying vec2 vUv;

  float sdfCircle(vec2 p, float r) {
    return length(p) - r;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 cuv = vec2(uv.x * aspect, uv.y);

    // ─── Mouse trail influence (max across N recent points) ───
    float trailInfluence = 0.0;
    for (int i = 0; i < ${TRAIL_LENGTH}; i++) {
      vec3 t = uTrail[i];
      if (t.z > 0.0) {
        vec2 trailPos = vec2(t.x * aspect, t.y);
        float d = distance(cuv, trailPos);
        float inf = smoothstep(0.18, 0.0, d) * t.z;
        trailInfluence = max(trailInfluence, inf);
      }
    }

    // ─── Dot grid via SDF ───
    float gridDensity = 55.0;
    vec2 gridUv = uv * vec2(gridDensity * aspect, gridDensity);
    vec2 cellUv = fract(gridUv) - 0.5;

    float baseRadius = 0.055;
    float radius = baseRadius + trailInfluence * 0.32;
    float sdf = sdfCircle(cellUv, radius);
    float dot = smoothstep(0.025, 0.0, sdf);

    // ─── Ambient pulse — radial mask from center ───
    float distFromCenter = distance(uv, vec2(0.5));
    float ambientPulse = 0.5 + 0.5 * sin(uTime * 0.3);
    float radialMask = smoothstep(0.95, 0.0, distFromCenter * 1.4 + ambientPulse * 0.04);

    // ─── Color blend (cyan → purple) ───
    vec3 cyan = vec3(0.0, 0.94, 1.0);
    vec3 purple = vec3(0.66, 0.33, 0.97);
    float colorMix = clamp(distFromCenter * 1.2 + sin(uTime * 0.15) * 0.2, 0.0, 1.0);
    vec3 color = mix(cyan, purple, colorMix);

    // ─── Combine: dim ambient grid + bright trail dots ───
    float ambient = dot * radialMask * 0.32;
    float interactive = dot * trailInfluence * 1.7;
    float intensity = max(ambient, interactive);

    gl_FragColor = vec4(color, intensity * 0.88);
  }
`;

interface TrailPoint {
  x: number;
  y: number;
  age: number;
}

function DotGridShader() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const trailRef = useRef<TrailPoint[]>([]);

  // Pre-allocate uniform array (Vec3 per slot)
  const trailUniform = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      arr.push(new THREE.Vector3(-10, -10, 0));
    }
    return arr;
  }, []);

  // Track mouse globally (works even when canvas has pointer-events: none)
  useEffect(() => {
    let lastAdd = 0;
    const handler = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = 1 - e.clientY / window.innerHeight; // flip Y for shader space

      const now = performance.now();
      // Throttle to ~60Hz
      if (now - lastAdd > 16) {
        trailRef.current.unshift({ x, y, age: 0 });
        if (trailRef.current.length > TRAIL_LENGTH) {
          trailRef.current.length = TRAIL_LENGTH;
        }
        lastAdd = now;
      }
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame(({ clock, size }, delta) => {
    if (!materialRef.current) return;

    // Age & filter trail
    trailRef.current.forEach((t) => (t.age += delta));
    trailRef.current = trailRef.current.filter((t) => t.age < TRAIL_LIFETIME);

    // Update uniform array
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      const t = trailRef.current[i];
      if (t) {
        const intensity = 1 - t.age / TRAIL_LIFETIME;
        trailUniform[i].set(t.x, t.y, intensity);
      } else {
        trailUniform[i].set(-10, -10, 0);
      }
    }

    materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
    materialRef.current.uniforms.uTrail.value = trailUniform;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uTrail: { value: trailUniform },
          uResolution: { value: new THREE.Vector2(1, 1) },
        }}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export function ShaderDotGrid() {
  return (
    <div className="fixed inset-0 z-0 bg-void pointer-events-none">
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 2]}
      >
        <DotGridShader />
      </Canvas>
      {/* Subtle vignette to keep content legible */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-void)_92%)] opacity-90 pointer-events-none" />
    </div>
  );
}
