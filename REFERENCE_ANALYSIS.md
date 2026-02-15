# Reference Site Analysis (news.gqai.kr/dashboard)

## Snapshot (2026-02-15)
- Landing/dashboard is heavily client-rendered; static fetch shows loading/skeleton-first rendering pattern.
- Sitemap reveals product IA clearly: `/dashboard`, themed variants (`/dashboard-modern`, `/dashboard-warm`, `/dashboard-dark`), vertical pages (`/restaurants`, `/business`, `/casebook`, `/gov-releases`) and editorial detail pages.
- Suitable takeaways for PPulse: top summary strip, compact cards, clear hierarchy for key metrics, plus vertical navigation by user domain.

## Elements to Borrow
1. Top-priority summary section before feed list.
2. Compact card grid for key signals.
3. Consistent skeleton loading and spacing rhythm.

## Elements to Avoid
1. Overly generic news feed without personal relevance.
2. Long text blocks that reduce scan speed.

## Immediate PPulse Mapping
- Top: super-issue x3
- Mid: user-interest impact summary (item-level)
- Bottom: same-day event feed with reason chips
- Extra IA insight: keep lightweight route-based sections for audience contexts (e.g., `/living`, `/portfolio`) rather than one oversized feed.

## Analysis Status
- Completed: route/IA mapping via sitemap + dashboard rendering pattern capture.
- Remaining for full parity: interactive behavior mapping (filters/sorts) requires live browser rendering access.
