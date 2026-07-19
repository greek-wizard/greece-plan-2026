import { readFile, writeFile } from "node:fs/promises";

const pageNames = ["index.html", "attractions.html", "preparation.html", "info.html"];
const now = new Date();
const iso = now.toISOString();
const display = new Intl.DateTimeFormat("pl-PL", {
  timeZone: "Europe/Warsaw",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZoneName: "short",
}).format(now);
const marker = /<time id="build-time" datetime="[^"]*">[^<]*<\/time>/;

for (const pageName of pageNames) {
  const pagePath = new URL(`../${pageName}`, import.meta.url);
  const page = await readFile(pagePath, "utf8");

  if (!marker.test(page)) {
    throw new Error(`Build-time marker was not found in ${pageName}`);
  }

  const updated = page.replace(
    marker,
    `<time id="build-time" datetime="${iso}">${display}</time>`,
  );
  await writeFile(pagePath, updated, "utf8");
}

console.log(`Updated page version time in ${pageNames.length} pages: ${display}`);
