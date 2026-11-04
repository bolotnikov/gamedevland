import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const files = (directory) => readdirSync(directory).flatMap((name) => {
 const path = join(directory, name);
 return statSync(path).isDirectory() ? files(path) : [path];
});
const languages = readdirSync('src/i18n/messages').filter((name) => name.endsWith('.json')).map((name) => name.slice(0, -5));
const catalogs = languages.map((code) => JSON.parse(readFileSync(`src/i18n/messages/${code}.json`, 'utf8')));
for (const catalog of catalogs) assert.deepEqual(Object.keys(catalog).sort(), Object.keys(catalogs[0]).sort(), 'Message catalog keys differ');
let pairs = 0;
for (const collection of ['articles', 'games', 'tutorials', 'academy']) {
 const base = `src/content/${collection}`;
 const originals = files(join(base, 'en')).filter((file) => file.endsWith('.md'));
 const expected = originals.map((file) => relative(join(base, 'en'), file)).sort();
 for (const language of languages) {
  const actual = files(join(base, language)).filter((file) => file.endsWith('.md')).map((file) => relative(join(base, language), file)).sort();
  assert.deepEqual(actual, expected, `${collection}/${language}: missing or extra translations`);
 }
 for (const file of originals) {
  const key = relative(join(base, 'en'), file);
  const original = readFileSync(file, 'utf8');
  const code = (text) => [...text.matchAll(/^```[^\n]*\n([\s\S]*?)^```/gm)].map((match) => match[1]);
  for (const language of languages) {
   const translated = readFileSync(join(base, language, key), 'utf8');
   assert.deepEqual(code(translated), code(original), `${collection}/${language}/${key}: changed code blocks`);
  }
  pairs++;
 }
}
assert.ok(existsSync('dist/index.html'), 'Run npm run build before checking output');
const pages = files('dist').filter((file) => file.endsWith('.html'));
for (const file of pages) {
 const html = readFileSync(file, 'utf8');
 const current = /<html[^>]*lang="([^"]+)"/.exec(html)?.[1];
 assert.ok(languages.includes(current), `Unknown page language: ${file}`);
 for (const language of languages) {
  const alternate = new RegExp(`<link(?=[^>]*rel="alternate")(?=[^>]*hreflang="${language}")(?=[^>]*href="([^"]+)")[^>]*>`).exec(html)?.[1];
  assert.ok(alternate, `Missing ${language} alternate: ${file}`);
  const url = new URL(alternate);
  const target = join('dist', decodeURI(url.pathname), 'index.html');
  assert.ok(existsSync(target), `Missing translation page ${target} from ${file}`);
 }
}
console.log(`Locale checks passed: ${languages.join(', ')}, ${pairs} content pairs, ${pages.length} pages; code blocks preserved.`);
