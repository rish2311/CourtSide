// ─── src/lib/api.ts ───────────────────────────────────────────────────────────
// Canonical Axios instance.  Every feature/service must import from here —
// never create a raw axios instance elsewhere.
//
// Re-exports the instance from services/api.ts so both import paths work,
// making it easy to gradually migrate usages.

export { default } from "@/services/api";
