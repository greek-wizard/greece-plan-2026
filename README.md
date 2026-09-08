# Athens and Peloponnese Trip Plan 2026

A static, responsive website comparing travel options for three adults visiting Greece from September 9 to September 18, 2026.

## Published files

- `index.html` — the date-aware detailed itinerary, including the four selected Tolo excursions
- `excursions.html` — the comparison catalogue and selector for four of eight car day trips from Tolo
- `old-plans.html` — the archived seven-route comparison retained for reference
- `attractions.html` — the ranked attraction catalogue and current-plan coverage
- `costs.html` — an independent list of prices per person and opening hours
- `preparation.html` — the interactive preparation checklist
- `info.html` — shared flight details and trip-planning assumptions
- `TRIP_ASSUMPTIONS.md` — the planning constraints and content rules
- `PHOTO_CREDITS.md` — photo-source and license policy
- `images/trip/` — manually reviewed, locally stored attraction photographs
- `greece-route-hero.png` — the header illustration

OpenStreetMap tiles and OSRM road routes are loaded online. Attraction photographs are stored locally for stable rendering. The website requires no build process or installed dependencies.

## Project structure

- `index.html` is the detailed day-by-day itinerary. Its “Today” strip uses the current date in the Europe/Athens time zone, opens the matching trip day, and links to it without storing state. Before the trip it points to September 9; after the trip it points to September 18. September 14–17 display the four excursions saved by the selector. Fixed driving, coach, and selected excursion days provide a route map and Google Maps directions link inside each accordion. Small timeline icons distinguish fixed commitments and supplier-controlled steps from unmarked, adjustable suggestions.
- `excursions.html` is the current option-comparison surface. Each option combines a brochure-style reviewed photo gallery, experiential description, proposed timeline, compact route map, Google Maps directions, logistics, and trade-offs. Exactly four selections are stored in browser `localStorage` under `grecja-wycieczki-tolo` and appear on `index.html` and in attraction coverage.
- `old-plans.html` preserves the previous seven-route comparison. It is an archive, not a source for the current itinerary.
- `attractions.html` is the attraction ranking and substitution catalogue. It marks which places belong to the current selection of four Tolo excursions without changing the underlying ranking list.
- `preparation.html` is a browser-local checklist of essential departure tasks. It stores checkbox state in `localStorage`; booked accommodation and the two paid tickets appear in a static completed summary outside the progress count. Preserve task IDs only when their meaning remains the same.
- `info.html` holds shared flight information and general assumptions so the main page can stay focused on comparing route options.
- `costs.html` and `costs.js` form an independent reference list. They show the public price per person, optional opening hours, paid status, and an official source link; they do not calculate totals, multiply by the group size, or read itinerary choices. Run `node scripts/check-costs.mjs` after changing cost data or presentation.
- `site-help.js` injects the shared help dialog used across the pages; `site-nav.css` keeps the main navigation consistent.
- `scripts/update-build-time.mjs` updates the fixed version badge on all published pages.
- `.githooks/pre-commit` runs the timestamp updater and stages the affected HTML files.
- `images/trip/` contains reviewed local attraction photos. Photo source and license policy lives in `PHOTO_CREDITS.md`.
- `TRIP_ASSUMPTIONS.md` is the source of truth for editorial and planning rules.
- `AGENTS.md` contains Codex-specific workflow and maintenance instructions.

When future work uncovers a project convention, verified source, maintenance step, or recurring pitfall that would help future contributors, add it to the relevant Markdown file during the same change.

## Local preview

You can open `index.html` directly in a browser. To avoid browser restrictions affecting local files, run a small local server:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

Configure the repository under **Settings → Pages**:

1. Set **Source** to `Deploy from a branch`.
2. Select the `main` branch.
3. Select the `/ (root)` folder.

The website will be published at:

```text
https://greek-wizard.github.io/greece-plan-2026/
```

## Updating the website

Enable the repository hook once after cloning:

```powershell
git config core.hooksPath .githooks
```

The pre-commit hook writes the current Warsaw date and time into the version badge on every published page and stages those updates automatically.

## Content and media maintenance

- Keep Polish diacritics as UTF-8 end to end. Mojibake such as `â€™`, `Ä™`, or `Å›` indicates an encoding problem and must be corrected before committing.
- When adding or changing a Tolo excursion, update its catalogue card, route data, attraction coverage, price reference when relevant, and any affected assumptions together.
- Review attraction photographs visually, not only by filename or search result. The image must show the actual attraction or its landscape, avoid logos and diagrams, and remain useful on a modern phone. Store reviewed files locally and update `PHOTO_CREDITS.md` and the in-page source metadata together.
- Treat map routing and online opening information as live data. Keep a readable fallback when OSRM or another online service is unavailable, and preserve an official source link for time-sensitive prices, hours, and suspended services.
- Keep the main navigation at `z-index:2000`, `main` positioned at `z-index:0`, and Leaflet containers positioned at `z-index:0` with `isolation:isolate`. Explicit stacking levels contain map panes and controls below navigation even where isolation alone does not prevent mobile overlap. Verify both map content and controls while scrolling a narrow viewport, including the published page.
- Keep the archived plans link out of the main navigation; it belongs in the footer of current pages.

After editing the page:

```powershell
git add index.html excursions.html attractions.html costs.html costs.js preparation.html info.html TRIP_ASSUMPTIONS.md README.md PHOTO_CREDITS.md images/trip .githooks scripts
git commit -m "Update trip plan"
git push
```

GitHub Pages will publish the new version automatically.
