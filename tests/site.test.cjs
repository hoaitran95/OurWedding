const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');
const content = fs.readFileSync(path.join(root, 'content.js'), 'utf8');
const context = { window: {} }; vm.runInNewContext(content, context);
vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/albums/manifest.js'), 'utf8'), context);
const c = context.window.WEDDING;
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
test('content dates are explicit Vietnam times and map links resolve to Google Maps', () => {
  for (const value of [c.weddingDate, ...c.events.map(e => e.datetime)]) { assert.match(value, /\+07:00$/); assert.ok(Number.isFinite(Date.parse(value))); }
  assert.equal(c.events.length, 2);
  for (const event of c.events) {
    const url = new URL(event.mapsUrl);
    assert.equal(url.protocol, 'https:');
    if (url.hostname === 'maps.app.goo.gl') assert.ok(url.pathname.length > 1);
    else { assert.equal(url.hostname, 'www.google.com'); assert.match(url.pathname, /^\/maps(?:\/|$)/); }
  }
});
test('all static resources exist and preserve a GitHub project prefix', () => {
  const refs = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map(m => m[1]);
  refs.push(c.opening.src, c.cover.src, c.music.src, c.hero, c.site.shareImage, ...c.interludes.map(p => p.src), ...c.album.map(p => p.src));
  const base = new URL('https://example.github.io/OurWedding/');
  for (const ref of refs) {
    assert.ok(!ref.startsWith('/'), ref);
    const url = new URL(ref, base);
    assert.ok(url.pathname.startsWith(base.pathname), ref);
    const localPath = decodeURIComponent(url.pathname.slice(base.pathname.length));
    assert.ok(fs.existsSync(path.join(root, localPath)), ref);
  }
});
test('countdown handles future, boundary and past dates', () => {
  // Stop immediately after the utility declarations; no browser DOM is required.
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
  const prefix = app.slice(0, app.indexOf('  document.title')) + '\n})();';
  const sandbox = { window: { WEDDING: c }, document: {} }; vm.runInNewContext(prefix, sandbox);
  const utils = sandbox.window.WeddingUtils;
  const target = '2027-02-14T11:00:00+07:00';
  assert.deepEqual(Array.from(utils.countdownParts(target, Date.parse(target) - 90061000).values), [1, 1, 1, 1]);
  assert.equal(utils.countdownParts(target, Date.parse(target)).remaining, 0);
  assert.equal(utils.countdownParts(target, Date.parse(target) + 1000).remaining, 0);
  const date = utils.dateParts('2027-02-13T18:30:00Z');
  assert.equal(date.full, '14/02/2027'); assert.equal(date.time, '01:30');
});
