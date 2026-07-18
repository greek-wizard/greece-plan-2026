import { readFile, writeFile } from "node:fs/promises";

const pagePath = new URL("../index.html", import.meta.url);
const page = await readFile(pagePath, "utf8");
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

if (!marker.test(page)) {
  throw new Error("Build-time marker was not found in index.html");
}

const updated = page.replace(
  marker,
  `<time id="build-time" datetime="${iso}">${display}</time>`,
);

await writeFile(pagePath, updated, "utf8");
console.log(`Updated page version time: ${display}`);
