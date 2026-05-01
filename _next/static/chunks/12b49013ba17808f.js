(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,41478,e=>{"use strict";var t=e.i(43476),i=e.i(75056),r=e.i(71753),n=e.i(71645),a=e.i(90072);let o=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`,l=`
  precision highp float;

  uniform float uTime;
  uniform vec3 uTrail[8]; // x, y, intensity
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
    for (int i = 0; i < 8; i++) {
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

    // ─── Ambient pulse - radial mask from center ───
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
`;function s(){let e=(0,n.useRef)(null),i=(0,n.useRef)([]),s=(0,n.useMemo)(()=>{let e=[];for(let t=0;t<8;t++)e.push(new a.Vector3(-10,-10,0));return e},[]);return(0,n.useEffect)(()=>{let e=0,t=t=>{let r=t.clientX/window.innerWidth,n=1-t.clientY/window.innerHeight,a=performance.now();a-e>16&&(i.current.unshift({x:r,y:n,age:0}),i.current.length>8&&(i.current.length=8),e=a)};return window.addEventListener("mousemove",t),()=>window.removeEventListener("mousemove",t)},[]),(0,r.useFrame)(({clock:t,size:r},n)=>{if(e.current){i.current.forEach(e=>e.age+=n),i.current=i.current.filter(e=>e.age<.7);for(let e=0;e<8;e++){let t=i.current[e];if(t){let i=1-t.age/.7;s[e].set(t.x,t.y,i)}else s[e].set(-10,-10,0)}e.current.uniforms.uTime.value=t.elapsedTime,e.current.uniforms.uResolution.value.set(r.width,r.height),e.current.uniforms.uTrail.value=s}}),(0,t.jsxs)("mesh",{children:[(0,t.jsx)("planeGeometry",{args:[2,2]}),(0,t.jsx)("shaderMaterial",{ref:e,vertexShader:o,fragmentShader:l,uniforms:{uTime:{value:0},uTrail:{value:s},uResolution:{value:new a.Vector2(1,1)}},transparent:!0,depthWrite:!1})]})}function c(){return(0,t.jsxs)("div",{className:"fixed inset-0 z-0 bg-void pointer-events-none",children:[(0,t.jsx)(i.Canvas,{gl:{antialias:!0,alpha:!0,powerPreference:"high-performance"},camera:{position:[0,0,1]},dpr:[1,2],children:(0,t.jsx)(s,{})}),(0,t.jsx)("div",{className:"absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-void)_92%)] opacity-90 pointer-events-none"})]})}e.s(["ShaderDotGrid",()=>c])},72010,e=>{e.n(e.i(41478))}]);