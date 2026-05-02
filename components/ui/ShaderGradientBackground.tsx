"use client";

import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

/**
 * Matte-black animated gradient background.
 *
 * Three near-black colors with a faint blue/purple bias create slow, subtle
 * depth without ever reading as "rainbow." Grain layer + dim env preset
 * keep the surface looking matte rather than glossy. Speed is intentionally
 * low (0.15) so the motion is ambient — never distracting.
 *
 * Sits at z-index 0 with `position: fixed` so the page content (z-index 10
 * via app/page.tsx wrapper) renders cleanly on top.
 */
export function ShaderGradientBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <ShaderGradientCanvas
        style={{ width: "100%", height: "100%" }}
        pixelDensity={1}
      >
        <ShaderGradient
          control="props"
          type="waterPlane"
          /* matte-black palette: near-black with subtle cool/violet bias */
          color1="#0a0e1a"
          color2="#15102a"
          color3="#020205"
          /* slow ambient motion */
          uSpeed={0.15}
          uStrength={1.4}
          uDensity={1.0}
          uFrequency={3.5}
          uAmplitude={0.6}
          /* grain + dim env keep it matte, not glossy */
          grain="on"
          lightType="env"
          envPreset="dawn"
          reflection={0.05}
          /* camera framing */
          cAzimuthAngle={180}
          cPolarAngle={80}
          cDistance={3.5}
          cameraZoom={9.1}
          rotationX={50}
          rotationY={0}
          rotationZ={-60}
          positionX={0}
          positionY={0}
          positionZ={0}
          /* misc */
          wireframe={false}
          shader="defaults"
          brightness={1}
          range="enabled"
          rangeStart={0}
          rangeEnd={40}
        />
      </ShaderGradientCanvas>
    </div>
  );
}
