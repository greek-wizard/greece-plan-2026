# Repository workflow

- After completing and verifying user-requested changes in this repository, commit all in-scope changes and push the current branch to `origin` unless the user explicitly asks not to commit or push.
- Write commit messages in English.
- Do not include unrelated user changes in the commit.

# Project overview

- This repository is a dependency-free static website for a September 9-18, 2026 Greece trip plan for three adults.
- The main user-facing language is Polish. Repository documentation, filenames, and commit messages stay in English.
- The primary pages are:
  - `index.html` for itinerary variants, route comparison, maps, day accordions, and the main trip experience.
  - `attractions.html` for the ranked attraction catalogue and unused substitution ideas.
  - `preparation.html` for the local-browser preparation checklist.
  - `info.html` for shared flight details, assumptions, and general planning notes.
- Shared browser behavior lives in `site-help.js`; the version timestamp updater lives in `scripts/update-build-time.mjs`.
- Local, reviewed photos live under `images/trip/`; `greece-route-hero.png` is the main hero image.

# Working conventions

- Read `README.md`, `TRIP_ASSUMPTIONS.md`, and `PHOTO_CREDITS.md` before making travel-content or media changes.
- Keep the site usable by opening the HTML files directly in a browser; do not introduce a build step or package dependency unless the user explicitly asks for it.
- When changing route variants, update all related surfaces together: variant picker, comparison table, route panel content, overview data, route map data, attraction coverage, checklist or info notes if affected, and any relevant assumptions.
- When changing travel facts such as prices, schedules, route status, opening hours, or flight times, verify against current official or primary sources and preserve the source context in the appropriate Markdown file when it will help future work.
- Keep `PHOTO_CREDITS.md` and the in-page photo credit/link data aligned whenever adding, replacing, or removing local photos.
- Run the local checks that fit the change. For timestamp updates, use the existing hook/script rather than editing the version badge by hand.

# Documentation upkeep

- When work on this project reveals a useful convention, source, constraint, gotcha, or maintenance step that would help future Codex sessions, add it automatically to the most relevant Markdown file as part of the same change.
- Prefer `AGENTS.md` for Codex workflow guidance, `README.md` for project structure and operating instructions, `TRIP_ASSUMPTIONS.md` for trip-planning rules, and `PHOTO_CREDITS.md` for image sourcing and license notes.
