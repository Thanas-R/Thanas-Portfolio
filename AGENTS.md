# AGENTS.md

## Architecture decisions
- Contact form spam protection: hidden honeypot inputs named `username` and `location` live in ContactSection.tsx; the edge function `supabase/functions/send-contact-email/index.ts` silently drops submissions that fill them. Keep both sides in sync.
- The same edge function rate-limits per IP (max 5/hour, rolling window, Deno KV). Frontend surfaces the returned `error` message in the toast.
- Detail-page dark scrollbar is driven by a `data-darkscroll` attribute on `<html>`, toggled per-route in ProjectDetailPage (see src/index.css).
- Project detail pages keep a hand-drawn survey/sketch design language (dashed draft-green borders, Caveat headings, hand-drawn SVG arrows) — NautilusDetail and VirdisDetail are the reference implementations.
