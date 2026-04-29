// logoSampler.ts
// Loads an image (PNG/SVG), paints to offscreen canvas, returns a brightness map
// + sampled positions. Used by canvas/WebGL background effects to anchor visuals
// to logo letterforms.

export interface LogoSample {
  positions: Float32Array;
  count: number;
  width: number;
  height: number;
  aspect: number;
  brightness: Uint8Array;
}

interface SampleOptions {
  step?: number;
  threshold?: number;
  targetWidth?: number;
}

const cache = new Map<string, Promise<LogoSample>>();

export function sampleLogo(
  src: string,
  { step = 4, threshold = 160, targetWidth = 1200 }: SampleOptions = {}
): Promise<LogoSample> {
  const key = `${src}|${step}|${threshold}|${targetWidth}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const promise = new Promise<LogoSample>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const ratio = img.width / img.height;
      const W = targetWidth;
      const H = Math.round(W / ratio);
      const cv = document.createElement("canvas");
      cv.width = W;
      cv.height = H;
      const ctx = cv.getContext("2d");
      if (!ctx) {
        reject(new Error("2D context unavailable"));
        return;
      }
      ctx.drawImage(img, 0, 0, W, H);
      const data = ctx.getImageData(0, 0, W, H).data;

      const points: number[] = [];
      const grid = new Uint8Array(W * H);
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const i = (y * W + x) * 4;
          const a = data[i + 3] / 255;
          const br = ((data[i] + data[i + 1] + data[i + 2]) / 3) * a;
          grid[y * W + x] = br > threshold ? 255 : 0;
        }
      }

      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          if (grid[y * W + x]) {
            const nx = x / W - 0.5;
            const ny = -(y / H - 0.5) / ratio;
            points.push(nx, ny);
          }
        }
      }

      resolve({
        positions: new Float32Array(points),
        count: points.length / 2,
        width: W,
        height: H,
        aspect: ratio,
        brightness: grid,
      });
    };
    img.onerror = (e) => reject(e);
    img.src = src;
  });

  cache.set(key, promise);
  return promise;
}
