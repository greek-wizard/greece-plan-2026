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
assert.equal(prices.confirmed.find(item => item.name === 'Akropol').status,'bilet opłacony · cena oficjalna');
assert.equal(prices.candidates.find(item => item.name === 'Mykeny').price,'20 €');
assert.equal(prices.candidates.find(item => item.name === 'Starożytne Asini').hours,'Codziennie 08:30–15:30.');
assert.equal(Object.values(prices).flat().every(item => item.name && item.price && item.source),true);

const costs = await read('costs.html');
assert.ok(!costs.includes('localStorage'));
assert.ok(!costs.includes('dla 3 osób'));
assert.ok(!costs.includes('id="base-group"'));
assert.match(costs,/cena za osobę/i);
assert.match(costs,/najwyżej jedno/i);

for (const page of ['index','excursions','attractions']) {
  const html = await read(`${page}.html`);
  assert.ok(!html.includes('grecja-wycieczki-tolo'));
}
const excursions = await read('excursions.html');
const index = await read('index.html');
assert.equal(excursions.match(/<article class="trip"/g)?.length,8);
assert.equal(index.match(/Dzień z Tolo · wybór ad hoc/g)?.length,1);
assert.match(index,/id="today-action"/);
assert.match(index,/timeZone:'Europe\/Athens'/);
assert.match(index,/Szybki wybór na rano/);
assert.match(index,/Sprawdź pogodę w Tolo/);
assert.ok(!index.includes('localStorage'));

for (const page of ['index','excursions','attractions','costs','preparation','info','old-plans']) {
  const html = await read(`${page}.html`);
  assert.match(html, /href="costs.html"/);
  assert.match(html, /<time id="build-time"/);
  for (const [,path] of html.matchAll(/(?:href|src)="([^"#?:]+\.(?:html|js))"/g)) await read(path);
  for (const [,script] of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) new vm.Script(script);
}
console.log('Price-list checks passed: independent catalogue, adult prices, sources, navigation and script syntax.');
