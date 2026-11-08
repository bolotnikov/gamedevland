import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

const root = resolve(import.meta.dirname, '..');
const directory = join(root, 'src/content/academy/en/cyber-ui/interface');
const pages = readdirSync(directory).filter((name) => name.endsWith('.md'));
const reference = readFileSync(join(directory, 'api-reference.md'), 'utf8');
const options = {
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  strict: true,
  skipLibCheck: true,
  noEmit: true,
  exactOptionalPropertyTypes: true,
};
const blocks = (text) => [...text.matchAll(/```(ts|json)\n([\s\S]*?)```/g)];
const orders = new Set();
for (const name of pages) {
  const en = readFileSync(join(directory, name), 'utf8');
  const ru = readFileSync(join(root, 'src/content/academy/ru/cyber-ui/interface', name), 'utf8');
  const metadata = JSON.parse(en.split('---')[1]);
  assert.ok(!orders.has(metadata.order), `Duplicate order: ${name}`);
  orders.add(metadata.order);
  assert.deepEqual(
    blocks(en).map((match) => match[0]),
    blocks(ru).map((match) => match[0]),
    `Code differs: ${name}`,
  );
  for (const block of blocks(en)) if (block[1] === 'json') JSON.parse(block[2]);
}
assert.deepEqual(
  [...orders].sort((a, b) => a - b),
  pages.map((_, index) => index + 1),
);
for (const name of ['@gamedevland/cyber-ui', '@gamedevland/cyber-ui-sdk']) {
  const resolved = ts.resolveModuleName(
    name,
    join(root, 'check.ts'),
    options,
    ts.sys,
  ).resolvedModule;
  assert.ok(resolved, `Cannot resolve ${name}`);
  const source = ts.createSourceFile(
    resolved.resolvedFileName,
    readFileSync(resolved.resolvedFileName, 'utf8'),
    ts.ScriptTarget.Latest,
  );
  for (const statement of source.statements) {
    if (
      !ts.isExportDeclaration(statement) ||
      !statement.exportClause ||
      !ts.isNamedExports(statement.exportClause)
    )
      continue;
    for (const specifier of statement.exportClause.elements)
      assert.ok(
        reference.includes('`' + specifier.name.text + '`'),
        `Missing API reference: ${specifier.name.text}`,
      );
  }
}
const cache = join(root, 'node_modules/.cache');
mkdirSync(cache, { recursive: true });
const temporary = mkdtempSync(join(cache, 'cyber-docs-'));
try {
  const files = [];
  for (const name of pages) {
    let sample = blocks(readFileSync(join(directory, name), 'utf8'))
      .filter((block) => block[1] === 'ts')
      .map((block) => block[2])
      .join('\n');
    if (!sample) continue;
    let context =
      name === 'installation.md' ? '' : "declare const app: import('pixi.js').Application;\n";
    if (name === 'sdk-components.md')
      context += "declare const group: import('@gamedevland/engine/di').ComponentsGroup;\n";
    if (name === 'panel-reveal.md') {
      context +=
        "declare const registrar: import('@gamedevland/engine/di').ValuesGroupRegistrar;\ndeclare const node: import('@gamedevland/engine/layouts').NodeBase;\n";
      sample = sample.replaceAll('this.node', 'node');
    }
    const path = join(temporary, name.replace('.md', '.ts'));
    writeFileSync(path, context + sample + '\nexport {};\n');
    files.push(path);
  }
  // Compile the exact API snippets displayed by the interactive examples.
  const loadGenerator = async (name) => {
    const source = readFileSync(join(root, 'src/scripts/cyber-ui', `${name}.ts`), 'utf8');
    const { outputText } = ts.transpileModule(source, {
      compilerOptions: { target: options.target, module: options.module },
    });
    const path = join(temporary, `${name}.mjs`);
    writeFileSync(path, outputText);
    return (await import(pathToFileURL(path).href))[name];
  };
  const CyberApiSnippet = await loadGenerator('CyberApiSnippet');
  const CyberPreviewCatalog = await loadGenerator('CyberPreviewCatalog');
  const locale = { code: 'en', t: (text) => text };
  let interactive = 0;
  for (const name of pages) {
    const slug = name.replace('.md', '');
    if (!CyberPreviewCatalog.has(slug)) continue;
    const definition = CyberPreviewCatalog.get(slug, locale);
    const defaults = Object.fromEntries(definition.controls.map((control) => [
      control.id,
      control.kind === 'checkbox' ? control.checked
        : control.kind === 'select' ? control.options[0].value : control.value,
    ]));
    const variants = [{}];
    if (slug === 'panels') {
      for (const panel of ['glass', 'panel', 'plate'])
        for (const decoration of ['none', 'focus', 'traces', 'etch', 'clippedRect', 'sweep'])
          variants.push({ panel, decoration });
      variants.push({ decoration: 'sweep', direction: 'right', duration: 2400 });
    }
    if (slug === 'buttons') {
      for (const variant of ['primary', 'module', 'danger', 'icon', 'nav', 'segment', 'tab', 'switch', 'utility', 'line'])
        for (const enabled of [true, false]) variants.push({ variant, enabled, selected: true });
      for (const variant of ['primary', 'module', 'danger'])
        variants.push({ variant, priced: true, text: 'UPGRADE "A"', amount: '1250' });
    }
    if (slug === 'selectors')
      for (const variant of ['nav', 'segment', 'tab'])
        for (const item of ['0', '1', '2']) variants.push({ variant, item });
    if (definition.motion) variants.push({ reduced: true }, { paused: true });
    variants.push({ accent: '#ff9b64', surface: '#18202d' });
    for (const variant of variants) {
      const values = { ...defaults, ...variant };
      const sample = CyberApiSnippet.create(slug, values, 377, 320, values.reduced === true, values.paused === true);
      assert.ok(!/\bApplication\b|CyberExample|CyberDrawing|requestAnimationFrame/.test(sample), `Application code leaked into ${slug}`);
      assert.ok(sample.split('\n').length <= 50, `API snippet is too long: ${slug}`);
      const path = join(temporary, `interactive-${interactive++}-${slug}.ts`);
      writeFileSync(path, sample);
      files.push(path);
    }
  }
  const program = ts.createProgram(files, options);
  const diagnostics = ts.getPreEmitDiagnostics(program);
  if (diagnostics.length) {
    console.error(
      ts.formatDiagnosticsWithColorAndContext(diagnostics, {
        getCanonicalFileName: (path) => path,
        getCurrentDirectory: () => root,
        getNewLine: () => '\n',
      }),
    );
    process.exitCode = 1;
  } else
    console.log(
      `Cyber UI: ${pages.length} bilingual lessons, public exports covered, ${files.length} TypeScript examples checked (${interactive} interactive variants).`,
    );
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
