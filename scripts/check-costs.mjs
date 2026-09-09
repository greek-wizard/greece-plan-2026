import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const read = name => readFile(new URL(`../${name}`, import.meta.url), 'utf8');
const context = vm.createContext({});
vm.runInContext(await read('costs.js'), context);
const prices = context.TripPrices;
assert.equal(prices.confirmed.length,3);
assert.equal(prices.museums.length,2);
assert.equal(prices.candidates.length,9);
assert.equal(prices.museums.every(item => item.price === '20 €'),true);
assert.ok(!prices.confirmed.some(item => 'status' in item));
assert.equal(prices.candidates.find(item => item.name === 'Mykeny').price,'20 €');
assert.equal(prices.candidates.find(item => item.name === 'Starożytne Asini').hours,'Codziennie 08:30–15:30.');
assert.equal(Object.values(prices).flat().every(item => item.name && item.price && item.source),true);

const costs = await read('costs.html');
assert.ok(!costs.includes('localStorage'));
assert.ok(!costs.includes('dla 3 osób'));
assert.ok(!costs.includes('id="base-group"'));
assert.match(costs,/cena za osobę/i);
assert.match(costs,/Muzea \(opcjonalnie\)/i);
assert.ok(!costs.includes('Oficjalne informacje'));

for (const page of ['index','excursions','attractions']) {
  const html = await read(`${page}.html`);
  assert.ok(html.includes('grecja-wycieczki-tolo'));
}
const excursions = await read('excursions.html');
const index = await read('index.html');
assert.equal(excursions.match(/<article class="trip"/g)?.length,8);
assert.equal(excursions.match(/stops:\[/g)?.length,8);
assert.match(excursions,/maps\.app\.goo\.gl\/9aeaq22g48rKAstq7/);
assert.match(excursions,/Paralia Karathonas/);
assert.match(index,/const chosenDays=/);
assert.match(index,/fixed\.concat\(chosenDays,last\)/);
assert.match(index,/id="today-action"/);
assert.match(index,/timeZone:'Europe\/Athens'/);
assert.ok(!index.includes('Szybki wybór na rano'));
assert.ok(!index.includes('Decyzja: prosto do Tolo'));
assert.ok(!index.includes('bez obowiązkowych wejść'));
assert.match(index,/Muzeum Akropolu \(opcjonalnie\)/);
assert.match(index,/Narodowe Muzeum Archeologiczne \(opcjonalnie\)/);
assert.ok(!index.includes('pogoda+Tolo'));
assert.ok(index.includes('localStorage'));
assert.ok(!index.includes('Aktualny plan'));
assert.ok(!(await read('attractions.html')).includes('Aktualny plan'));
assert.ok(!(await read('preparation.html')).includes('data-task="departure-weather"'));

for (const page of ['index','excursions','attractions','costs','preparation','info','old-plans']) {
  const html = await read(`${page}.html`);
  assert.match(html, /href="costs.html"/);
  assert.match(html, />Ceny</);
  assert.ok(!html.includes('>Koszty<'));
  assert.match(html, /href="site-nav.css"/);
  assert.match(html, /<time id="build-time"/);
  for (const [,path] of html.matchAll(/(?:href|src)="([^"#?:]+\.(?:html|js))"/g)) await read(path);
  for (const [,script] of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) new vm.Script(script);
}
console.log('Price-list checks passed: independent catalogue, adult prices, sources, navigation and script syntax.');
