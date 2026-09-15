import "server-only";

/** Absolute base URL of the current deployment, for building absolute links server-side. */
export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  // Production always has the custom domain attached; the per-deployment
  // VERCEL_URL is behind Vercel Authentication and can't be used for
  // metadata (og:image, etc.) that external crawlers need to fetch.
  if (process.env.VERCEL_ENV === "production") {
    return "https://www.nfpclothing.com";
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}
