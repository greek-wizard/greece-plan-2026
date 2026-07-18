# Athens and Peloponnese Trip Plan 2026

A static, responsive website comparing travel options for three adults visiting Greece from September 9 to September 18, 2026.

## Published files

- `index.html` — the complete trip-planning website
- `attractions.html` — the ranked attraction list and unused alternatives
- `preparation.html` — the interactive preparation checklist
- `TRIP_ASSUMPTIONS.md` — the planning constraints and content rules
- `PHOTO_CREDITS.md` — photo-source and license policy
- `images/trip/` — manually reviewed, locally stored attraction photographs
- `greece-route-hero.png` — the header illustration

OpenStreetMap tiles and OSRM road routes are loaded online. Attraction photographs are stored locally for stable rendering. The website requires no build process or installed dependencies.

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

The pre-commit hook writes the current Warsaw date and time into the version strip in `index.html` and stages that update automatically.

After editing the page:

```powershell
git add index.html attractions.html preparation.html TRIP_ASSUMPTIONS.md README.md PHOTO_CREDITS.md images/trip .githooks scripts
git commit -m "Update trip plan"
git push
```

GitHub Pages will publish the new version automatically.
