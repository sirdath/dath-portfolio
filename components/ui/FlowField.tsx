"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

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
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // ─── Hash + value noise ─────────────────────────────
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = p * 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 cuv = vec2(uv.x * aspect, uv.y);

    // ─── Time-evolving noise field ───
    vec2 q = uv * 2.2;
    q.x += uTime * 0.045;
    q.y -= uTime * 0.025;

    // ─── Mouse attractor - warps the noise toward the cursor ───
    vec2 mouseAR = vec2(uMouse.x * aspect, uMouse.y);
    vec2 toMouse = mouseAR - cuv;
    float mouseDist = length(toMouse);
    float pull = 0.06 / (mouseDist + 0.4);
    q += normalize(toMouse + vec2(0.0001)) * pull;

    // ─── FBM noise → smooth flowing pattern ───
    float n = fbm(q);
    n = n * 0.5 + 0.5;  // map to [0, 1]

    // ─── Ribbons: highlight the mid-range of noise for flowing bands ───
    float ribbon = smoothstep(0.4, 0.58, n) * smoothstep(0.78, 0.6, n);
    ribbon += smoothstep(0.55, 0.62, n) * 0.4;

    // ─── Color blend: cyan to purple gradient driven by noise + position ───
    vec3 cyan = vec3(0.0, 0.85, 1.0);
    vec3 purple = vec3(0.66, 0.33, 0.97);
    vec3 dark = vec3(0.035, 0.035, 0.045);
    float colorMix = clamp(n * 1.2 + uv.y * 0.3, 0.0, 1.0);
    vec3 color = mix(cyan, purple, colorMix);

    // ─── Vignette: fade at edges ───
    float dist = distance(uv, vec2(0.5));
    float vignette = smoothstep(1.2, 0.2, dist * 1.3);

    // ─── Mouse glow halo ───
    float mouseGlow = smoothstep(0.25, 0.0, mouseDist) * 0.18;

    // ─── Combine ───
    float intensity = ribbon * vignette * 0.42 + mouseGlow;
    vec3 final = mix(dark, color, intensity * 1.4);

    gl_FragColor = vec4(final, intensity * 0.9);
  }
`;

function FlowFieldShader() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const smoothMouse = useRef(new THREE.Vector2(0.5, 0.5));

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.set(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight
      );
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame(({ clock, size }) => {
    if (!materialRef.current) return;
    smoothMouse.current.lerp(mouse.current, 0.06);
    materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    materialRef.current.uniforms.uMouse.value = smoothMouse.current;
    materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
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
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uResolution: { value: new THREE.Vector2(1, 1) },
        }}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export function FlowField() {
  return (
    <div className="fixed inset-0 bg-void pointer-events-none">
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 2]}
      >
        <FlowFieldShader />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-void)_92%)] opacity-90 pointer-events-none" />
    </div>
  );
}
