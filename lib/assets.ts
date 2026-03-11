const basePath = process.env.NODE_ENV === "production" ? "/dath-portfolio" : "";

export function getAssetPath(path: string): string {
  return `${basePath}${path}`;
}
