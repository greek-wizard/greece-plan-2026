# Athens and Peloponnese Trip Plan 2026

A static, responsive website comparing travel options for three adults visiting Greece from September 9 to September 18, 2026.

## Published files

- `index.html` — the complete trip-planning website
- `greece-route-hero.png` — the header illustration

Attraction photos, OpenStreetMap tiles, and OSRM road routes are loaded online. The website requires no build process or installed dependencies.

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
https://GITHUB-USERNAME.github.io/REPOSITORY-NAME/
```

## Updating the website

After editing the page:

```powershell
git add index.html greece-route-hero.png
git commit -m "Update trip plan"
git push
```

GitHub Pages will publish the new version automatically.
