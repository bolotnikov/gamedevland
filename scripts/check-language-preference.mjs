import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

const root = resolve(import.meta.dirname, '..');
mkdirSync(join(root, 'node_modules/.cache'), { recursive: true });
const temporary = mkdtempSync(join(root, 'node_modules/.cache/language-preference-'));
try {
  const compile = (source) => ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  }).outputText;
  writeFileSync(join(temporary, 'locales.mjs'), compile(readFileSync(join(root, 'src/i18n/locales.ts'), 'utf8')));
  const source = readFileSync(join(root, 'src/scripts/LanguagePreference.ts'), 'utf8');
  writeFileSync(join(temporary, 'preference.mjs'), compile(source).replace('../i18n/locales', './locales.mjs'));
  const { LanguagePreference } = await import(pathToFileURL(join(temporary, 'preference.mjs')).href);
  const cases = [
    [null, ['ru-RU'], 'ru'],
    [null, ['en-GB'], 'en'],
    [null, ['pl-PL', 'ru-RU', 'en-US'], 'ru'],
    ['en', ['ru-RU'], 'en'],
    ['ru', ['en-US'], 'ru'],
    ['invalid', ['ru'], 'ru'],
    ['invalid', [], 'en'],
    [null, ['fr-FR'], 'en'],
    [null, [], 'en'],
    [null, [''], 'en'],
    [null, ['RU-ru'], 'ru'],
  ];
  for (const [saved, languages, expected] of cases)
    assert.equal(LanguagePreference.resolve(saved, languages), expected, JSON.stringify({ saved, languages }));
  console.log(`Language preference: ${cases.length} cases passed (saved choice, browser language, EN fallback).`);
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
