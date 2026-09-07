import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

const read = name => readFile(new URL(`../${name}`, import.meta.url), 'utf8');
const context = vm.createContext({});
vm.runInContext(await read('costs.js'), context);
const {selection, calculate, trips} = context.TripCosts;
const defaults = ['epidaurus','nafplio','nemea','tiryns'];
for (const raw of [null, '', '{broken', 'null', '{}', '[]', '["hydra"]', '["hydra","hydra","nemea","tiryns"]', '["bad","nafplio","nemea","tiryns"]']) {
  const result = selection(raw);
  assert.equal(result.fallback, true);
  assert.equal(JSON.stringify(result.ids), JSON.stringify(defaults));
}
const base = calculate(defaults);
assert.equal(base.base, 155);
assert.equal(base.group, 465);
assert.equal(base.rows.length, 10);
assert.equal(calculate(defaults,['guide']).group, 555);
assert.equal(calculate(defaults,['guide','acrocorinth']).group, 570);
assert.equal(calculate(defaults,['olive']).group, 465, 'Unselected excursion extras must not count');
const alternatives = ['hydra','mystras','arcadia','monemvasia'];
assert.equal(calculate(alternatives).base, 110);
assert.equal(calculate(alternatives,['olive']).group, 348);
const reordered = selection(JSON.stringify([...defaults].reverse()));
assert.equal(reordered.fallback, false);
assert.equal(calculate(reordered.ids).rows.find(item => item.name === 'Tiryns').date,'14 IX');
assert.equal(base.rows.find(item => item.name.includes('klasztory')).price,15);
assert.equal(base.rows.filter(item => item.name.startsWith('Nemea')).length,1);
assert.equal(base.rows.filter(item => item.name === 'Mykeny').length,1);
assert.ok(!base.rows.some(item => item.name === 'Akropol' || item.price === 65), 'Paid bookings must not enter outstanding sums');
const expected = {epidaurus:20,nafplio:20,nemea:10,tiryns:15,arcadia:0,mystras:20,hydra:0,monemvasia:0};
const ids = Object.keys(trips);
let combinations = 0;
for(let a=0;a<8;a++) for(let b=a+1;b<8;b++) for(let c=b+1;c<8;c++) for(let d=c+1;d<8;d++) {
  const chosen = [ids[a],ids[b],ids[c],ids[d]];
  const result = calculate(chosen,['guide']);
  assert.equal(result.total,120 + chosen.reduce((sum,id) => sum + expected[id],0));
  assert.equal(result.group,result.total*3);
  combinations++;
}
const index = await read('index.html');
assert.ok(index.includes("const defaults=['epidaurus','nafplio','nemea','tiryns']"), 'Keep cost fallback aligned with itinerary');
const catalogue = await read('excursions.html');
assert.deepEqual([...catalogue.matchAll(/class="trip" data-id="([^"]+)"/g)].map(match=>match[1]).sort(),Object.keys(expected).sort());
for (const page of ['index','excursions','attractions','costs','preparation','info','old-plans']) {
  const html = await read(`${page}.html`);
  assert.match(html, /href="costs.html"/);
  assert.match(html, /<time id="build-time"/);
  for (const [,path] of html.matchAll(/(?:href|src)="([^"#?:]+\.(?:html|js))"/g)) await read(path);
  for (const [,script] of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) new vm.Script(script);
}
console.log(`Cost checks passed: ${combinations} selections, optional extras, paid exclusions, fallback, sources of selection, navigation and script syntax.`);
