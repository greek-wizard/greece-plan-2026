# Athens and Peloponnese Trip Plan 2026

A static, responsive website comparing travel options for three adults visiting Greece from September 9 to September 18, 2026.

## Published files

- `index.html` — the detailed current itinerary generated from the four selected Tolo day trips
- `excursions.html` — the selectable catalogue of eight car day trips from Tolo
- `old-plans.html` — the archived seven-route comparison retained for reference
- `attractions.html` — the ranked attraction list and unused alternatives
- `preparation.html` — the interactive preparation checklist
- `info.html` — shared flight details and trip-planning assumptions
- `TRIP_ASSUMPTIONS.md` — the planning constraints and content rules
- `PHOTO_CREDITS.md` — photo-source and license policy
- `images/trip/` — manually reviewed, locally stored attraction photographs
- `greece-route-hero.png` — the header illustration

OpenStreetMap tiles and OSRM road routes are loaded online. Attraction photographs are stored locally for stable rendering. The website requires no build process or installed dependencies.

## Project structure

- `index.html` is the detailed day-by-day itinerary. It reads the four choices stored by `excursions.html`, renders them on September 14–17, updates the current distance and attraction summary, and provides an overview map plus a wider-framed route map and Google Maps directions link inside each driving-day accordion. Small timeline icons distinguish fixed commitments and supplier-controlled steps from unmarked, adjustable suggestions.
- `excursions.html` is the only current option-comparison surface. Each option combines a brochure-style reviewed photo gallery, experiential description, proposed detailed timeline, compact route map, logistics, and trade-offs; it stores up to four selected car day trips in `localStorage`.
- `old-plans.html` preserves the previous seven-route comparison. It is an archive, not a source for the current active variant stored by the main pages.
- `attractions.html` is the attraction ranking and substitution catalogue. Keep its variant coverage consistent with the published route variants.
- `preparation.html` is a browser-local checklist. It stores checkbox state in `localStorage`.
- `info.html` holds shared flight information and general assumptions so the main page can stay focused on comparing route options.
- `site-help.js` injects the shared help dialog used across the pages.
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
- When adding a route or changing a variant, update the picker, comparison table, overview data, route panel, map data, attraction coverage, and any affected assumptions together.
- Review attraction photographs visually, not only by filename or search result. The image must show the actual attraction or its landscape, avoid logos and diagrams, and remain useful on a modern phone. Store reviewed files locally and update `PHOTO_CREDITS.md` and the in-page source metadata together.
- Treat map routing and online opening information as live data. Keep a readable fallback when OSRM or another online service is unavailable, and preserve an official source link for time-sensitive prices, hours, and suspended services.

After editing the page:

```powershell
git add index.html attractions.html preparation.html info.html TRIP_ASSUMPTIONS.md README.md PHOTO_CREDITS.md images/trip .githooks scripts
git commit -m "Update trip plan"
git push
```

GitHub Pages will publish the new version automatically.
