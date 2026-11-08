import { CyberPreset } from '@gamedevland/cyber-ui';
import type { CyberLesson } from './types';

type Values = Readonly<Record<string, string | number | boolean>>;

/** Focused public API examples; application setup belongs to the installation lesson. */
export class CyberApiSnippet {
  private constructor(
    private readonly values: Values,
    private readonly width: number,
    private readonly height: number,
    private readonly reduced: boolean,
    private readonly paused: boolean,
  ) {}

  static create(lesson: CyberLesson, values: Values, width: number, height: number, reduced: boolean, paused: boolean): string {
    return new CyberApiSnippet(values, width, height, reduced, paused).build(lesson);
  }

  private text(id: string, fallback = ''): string { return String(this.values[id] ?? fallback); }
  private number(id: string, fallback: number): number { return Number(this.values[id] ?? fallback); }
  private flag(id: string): boolean { return this.values[id] === true; }
  private color(id: string, fallback: number): number {
    return this.values[id] === undefined ? fallback : Number.parseInt(this.text(id).slice(1), 16);
  }
  private hex(value: number): string { return `0x${value.toString(16).padStart(6, '0')}`; }
  private quote(value: string): string { return JSON.stringify(value); }
  private n(value: number): string { return String(Number(value.toFixed(3))); }
  private get accent(): string { return this.hex(this.color('accent', CyberPreset.palette.accent)); }
  private get panelWidth(): number { return Math.min(this.number('width', 280), this.width - 64); }

  private palette(): string {
    const t = CyberPreset.palette;
    const accent = this.color('accent', t.accent);
    const panel = this.color('surface', t.panel);
    const overrides = { accent, focus: accent, signal: accent, panel, inset: panel };
    const changed = Object.entries(overrides).filter(([key, value]) => t[key as keyof typeof t] !== value);
    return changed.length
      ? `const colors = {\n  ...CyberPreset.palette,\n${changed.map(([key, value]) => `  ${key}: ${this.hex(value)},`).join('\n')}\n};`
      : 'const colors = CyberPreset.palette;';
  }

  private finish(api: readonly string[], body: string): string {
    const pixi = ['Container', 'Graphics', 'Text'].filter(name => body.includes(`new ${name}(`));
    return [
      `import { ${[...new Set(api)].join(', ')} } from '@gamedevland/cyber-ui';`,
      ...(pixi.length ? [`import { ${pixi.join(', ')} } from 'pixi.js';`] : []),
      '', body,
    ].join('\n');
  }

  private label(name: string, text: string, x: string, y: string, size: string, fill: string, parent?: string, anchor = '0.5'): string {
    const view = `new Text({ text: ${this.quote(text)},\n  style: { fontFamily: 'monospace', fontSize: ${size}, fill: ${fill} } })`;
    return `const ${name} = ${parent ? `${parent}.addChild(${view})` : view};\n${name}.anchor.set(${anchor});\n${name}.position.set(${x}, ${y});`;
  }

  private surface(g: string, width: string, height: string, variant = this.text('panel', 'glass')): { api: string; code: string } {
    if (variant === 'panel') return { api: 'PanelSurface', code: `PanelSurface.draw(${g}, { x: 0, y: 0, w: ${width}, h: ${height} }, {\n  surface: colors.panel, edge: colors.panelEdge, accent: colors.accent,\n});` };
    if (variant === 'plate') return { api: 'TerminalUi', code: `TerminalUi.plate(${g}, 0, 0, ${width}, ${height}, 12, colors.inset, colors.panelEdge);` };
    return { api: 'TerminalGlass', code: `TerminalGlass.draw(${g}, 0, 0, ${width}, ${height}, 12,\n  colors.panel, colors.panelEdge, colors.accent, colors.text);` };
  }

  private panels(): string {
    const w = this.panelWidth, h = this.number('height', 168);
    const surface = this.surface('g', String(w), String(h));
    const api = ['CyberPreset', surface.api];
    let body = `${this.palette()}\nconst panel = new Container();\nconst g = panel.addChild(new Graphics());\n${surface.code}`;
    const decoration = this.text('decoration', 'none');
    if (decoration === 'focus' || decoration === 'traces' || decoration === 'etch') {
      const owner = decoration === 'focus' ? 'TerminalGlass' : 'TerminalUi';
      api.push(owner);
      body += `\n${owner}.${decoration}(g, 0, 0, ${w}, ${h}, colors.accent);`;
    }
    if (decoration === 'clippedRect') {
      api.push('TerminalUi');
      body += `\nTerminalUi.clippedRect(g, { x: 0, y: 0, w: ${w}, h: ${h} },\n  ${this.text('panel') === 'panel' ? 0 : 12}, 0, ${this.n(this.number('progress', 0.5) * (h - 12))}, ${w}, 12);\ng.fill({ color: colors.accent, alpha: 0.4 });`;
    }
    const label = this.label('label', this.text('text'), String(w / 2), String(h / 2), this.n(Math.min(16, (w - 24) / Math.max(this.text('text').length * 0.6, 1))), 'colors.text', 'panel');
    if (decoration !== 'sweep') return this.finish(api, `${body}\n\n${label}`);
    api.push('TerminalSweep');
    return this.finish(api, `${this.palette()}\nconst panel = new Container();\nconst g = panel.addChild(new Graphics());\n${label}\n\nfunction draw(elapsedSeconds: number) {\n  g.clear();\n${surface.code.split('\n').map(line => `  ${line}`).join('\n')}\n  TerminalSweep.draw(g, 0, 0, ${w}, ${h},\n    ${this.reduced ? '0.5' : `(elapsedSeconds * 1000 / ${this.number('duration', 1600)}) % 1`}, colors.accent, ${this.reduced}, ${this.quote(this.text('direction', 'down'))});\n}`);
  }

  private buttons(): string {
    const variant = this.text('variant', 'primary');
    const w = this.panelWidth, h = variant === 'icon' ? w : this.number('height', 56);
    const enabled = this.flag('enabled');
    const priced = this.flag('priced') && ['primary', 'module', 'danger'].includes(variant);
    const api = ['CyberPreset', 'ButtonSurface', 'TerminalUi'];
    const color = variant === 'primary' && enabled ? 'colors.background' : 'colors.accent';
    let body = `${this.palette()}\nconst button = new Container();\nconst g = button.addChild(new Graphics());\nButtonSurface.draw(g, {\n  width: ${w}, height: ${h}, variant: ${this.quote(variant)},\n  enabled: ${enabled}, selected: ${this.flag('selected')},${this.flag('ready') ? '\n  ready: true,' : ''}${this.flag('explicitAccent') ? '\n  explicitAccent: true,' : ''}\n}, colors);`;
    if (!enabled) body += '\nbutton.alpha = 0.42;';
    if (variant === 'switch') body += `\nButtonSurface.toggle(g, ${w}, ${h}, ${this.flag('selected')}, colors);`;
    if (priced) {
      api.push('ButtonPrice');
      body += `\n\n${this.label('label', this.text('text'), '0', String(h / 2), '18', color, 'button')}\n${this.label('amount', this.text('amount', '250'), '0', String(h / 2), '18', color, 'button')}\nconst row = ButtonPrice.layout(${w}, label.width, amount.width, 18, 8, 12);\nlabel.scale.set(row.scale);\namount.scale.set(row.scale);\nlabel.x = row.labelX;\namount.x = row.amountX;\nTerminalUi.icon(g, 'credit', row.iconX, ${h / 2}, row.iconSize, ${color});`;
    } else {
      body += `\nTerminalUi.icon(g, ${this.quote(variant === 'icon' ? 'gear' : 'play')}, ${this.n(variant === 'icon' ? w / 2 : Math.min(w * 0.14, 28))}, ${h / 2},\n  ${this.n(variant === 'icon' ? w * 0.5 : Math.min(20, w * 0.25))}, ${color});`;
      if (w > 80 && variant !== 'icon') body += `\n\n${this.label('label', this.text('text'), this.n(variant === 'switch' ? w * 0.4 : w / 2 + 8), String(h / 2), this.n(Math.max(8, Math.min(18, (w - (variant === 'switch' ? 100 : 64)) / Math.max(this.text('text').length * 0.6, 1)))), color, 'button')}`;
    }
    return this.finish(api, body);
  }

  private selectors(): string {
    const variant = this.text('variant', 'nav');
    const w = this.width - 48, h = variant === 'tab' ? 80 : 64;
    const api = ['CyberPreset', 'ButtonSurface', 'TerminalUi'];
    let body = `${this.palette()}\nconst selector = new Container();\nconst track = selector.addChild(new Graphics());`;
    if (variant === 'nav') { api.push('TerminalGlass'); body += `\nTerminalGlass.draw(track, 0, 0, ${w}, ${h}, 10,\n  colors.panel, colors.panelEdge, colors.accent, colors.text);`; }
    if (variant === 'segment') body += `\nButtonSurface.segmentTrack(track, { x: 0, y: 0, w: ${w}, h: ${h} }, colors);`;
    body += `\n\nconst icons = ['battle', 'agents', 'quests'] as const;\nicons.forEach((icon, index) => {\n  const g = selector.addChild(new Graphics());\n  const itemWidth = (${w} - 16) / 3;\n  const selected = index === ${this.number('item', 0)};\n  g.position.set(8 + index * itemWidth, 6);\n  ButtonSurface.draw(g, {\n    width: itemWidth - 4, height: ${h - 12},\n    variant: ${this.quote(variant)}, enabled: true, selected,\n  }, colors);\n  TerminalUi.icon(g, icon, (itemWidth - 4) / 2, ${this.n((h - 12) / 2)},\n    24, selected ? colors.accent : colors.muted);\n});`;
    return this.finish(api, body);
  }

  private icons(): string {
    const columns = this.width < 420 ? 5 : 7;
    const cellW = (this.width - 24) / columns, cellH = 288 / Math.ceil(27 / columns);
    return this.finish(['CyberPreset', 'TerminalUi'], `const view = new Container();\nconst g = view.addChild(new Graphics());\nconst icons = [\n  'chip', 'battle', 'agents', 'skills', 'quests', 'gear', 'bolt',\n  'calendar', 'credit', 'capsule', 'key', 'left', 'right', 'exit',\n  'play', 'lock', 'chest', 'check', 'speed', 'target', 'burst',\n  'repair', 'heart', 'scan', 'snow', 'boss', 'flag',\n] as const;\nicons.forEach((icon, index) => {\n  const x = 12 + ${this.n(cellW)} * (index % ${columns} + 0.5);\n  const y = 12 + Math.floor(index / ${columns}) * ${this.n(cellH)} + ${this.n(cellH * 0.35)};\n  TerminalUi.icon(g, icon, x, y, ${this.number('size', 24)}, ${this.accent});\n  const label = view.addChild(new Text({ text: icon, style: {\n    fontFamily: 'monospace', fontSize: 10, fill: CyberPreset.palette.muted,\n  } }));\n  label.anchor.set(0.5, 0);\n  label.position.set(x, y + ${this.n(cellH * 0.3)});\n});`);
  }

  private effectState(name: string): string {
    return `${this.reduced ? `\n${name}.setReducedMotion(true);` : ''}${this.paused || this.reduced ? `\n${name}.setActive(false);` : ''}`;
  }

  private motion(lesson: 'triangle-loader' | 'text-echo' | 'glitch-lifecycle'): string {
    if (lesson === 'triangle-loader') return this.finish(['CyberPreset', 'TriangleLoader'], `const view = new Container();\nconst emblem = view.addChild(new Graphics());\nconst particles = view.addChild(new Graphics());\nconst loader = new TriangleLoader({\n  ...CyberPreset.triangle, particles: ${this.number('particles', 96)},\n});${this.effectState('loader')}\n\nfunction update(deltaSeconds: number) {\n  loader.update(deltaSeconds);\n  loader.draw(emblem, particles,\n    { x: ${this.n(this.width / 2)}, y: ${this.n(this.height / 2)}, radius: ${this.number('radius', 64)}, scale: 1 },\n    { ...CyberPreset.trianglePalette, accent: ${this.accent}, secondary: ${this.hex(this.color('secondary', 0x44e2ff))} });\n}`);
    if (lesson === 'text-echo') {
      const text = this.text('text', 'SYSTEM READY');
      const size = this.n(Math.min(24, (this.width - 64) / Math.max(text.length * 0.6, 1)));
      return this.finish(['CyberPreset', 'TextEcho'], `const view = new Container();\n${this.label('echo', text, '0', '0', size, this.hex(this.color('secondary', 0xffd65c)), 'view')}\n${this.label('label', text, '0', '0', size, this.accent, 'view')}\nconst effect = new TextEcho({ ...CyberPreset.textEcho, shift: ${this.number('shift', 1)} });${this.effectState('effect')}\n\nfunction update(deltaSeconds: number) {\n  effect.update(deltaSeconds);\n  effect.draw(label, echo, ${this.n(this.width / 2)}, ${this.n(this.height / 2)});\n}`);
    }
    const w = this.panelWidth, h = this.number('height', 168);
    const surface = this.surface('g', String(w), String(h));
    return this.finish(['CyberPreset', 'SurfaceGlitch', surface.api], `${this.palette()}\nconst panel = new Container();\nconst g = panel.addChild(new Graphics());\n${surface.code}\n${this.label('label', 'SIGNAL ONLINE', String(w / 2), this.n(h * 0.65), this.n(Math.min(24, (this.width - 64) / (13 * 0.6))), 'colors.accent', 'panel')}\nconst effect = new SurfaceGlitch({ ...CyberPreset.glitch, durationMs: ${this.number('duration', 180)} });${this.effectState('effect')}\neffect.show('panel', [{ surface: g, x: 0, y: 0, w: ${w}, h: ${h} }], 0);\n\nfunction update(deltaSeconds: number) {\n  effect.update(deltaSeconds);\n}`);
  }

  private drawing(lesson: 'binary-field' | 'signal-brackets' | 'fault-glyph' | 'signal-lost'): string {
    const x = this.n(this.width / 2), y = this.n(this.height / 2);
    const elapsed = 'elapsedSeconds';
    if (lesson === 'binary-field') return this.finish(['BinaryField'], `const g = new Graphics();\nfunction draw(elapsedSeconds: number) {\n  const frame = ${this.reduced ? '0' : `Math.floor(${elapsed} * ${this.number('rate', 8)})`};\n  BinaryField.draw(g.clear(), { x: 24, y: 24, w: ${this.width - 48}, h: ${this.height - 48} },\n    12, ${this.number('cell', 9)}, 7291, frame);\n  g.fill({ color: ${this.accent}, alpha: ${this.number('opacity', 0.25)} });\n}`);
    if (lesson === 'fault-glyph') return this.finish(['CyberPreset', 'FaultGlyph'], `const g = new Graphics();\nfunction draw(elapsedSeconds: number) {\n  const distortion = ${this.reduced ? '0' : `Math.sin(${elapsed} * 7) * ${this.number('distortion', 12)}`};\n  FaultGlyph.draw(g.clear(), ${x}, ${y},\n    CyberPreset.palette.danger, ${this.accent}, 1, distortion, 6);\n}`);
    if (lesson === 'signal-brackets') return this.finish(['CyberPreset', 'SignalBrackets', 'TerminalUi'], `const g = new Graphics();\nconst options = {\n  cycleMs: ${this.number('duration', 2400)}, travel: 12, scale: 0.08, jitter: 1,\n  distanceRatio: 0.3, maxDistance: 200, halfHeight: 48,\n  bevel: 10, strokeWidth: 2, alpha: 0.45, peakAlpha: 1,\n  markerSize: 8, markerAlpha: 0.7,\n};\nfunction draw(elapsedSeconds: number) {\n  g.clear();\n  TerminalUi.icon(g, 'chip', ${x}, ${y}, 48, ${this.accent});\n  SignalBrackets.draw(g, options, ${this.width}, ${y}, 40, 1,\n    ${elapsed} * 1000, 90, ${this.reduced}, ${this.accent}, CyberPreset.palette.signal);\n}`);
    {
      const label = this.label('label', 'SIGNAL LOST', x, String(this.height / 2 + 24), '24', 'CyberPreset.palette.danger', 'view');
      if (this.reduced) return this.finish(['CyberPreset', 'FaultGlyph'], `const view = new Container();\nconst g = view.addChild(new Graphics());\nFaultGlyph.draw(g, ${x}, ${this.height / 2 - 24},\n  CyberPreset.palette.danger, ${this.accent}, 1, 0, 4);\n${label}`);
      const duration = this.number('duration', 1200);
      return this.finish(['CyberPreset', 'SignalLost'], `const view = new Container();\nconst g = view.addChild(new Graphics());\n${label}\nfunction draw(elapsedSeconds: number) {\n  const progress = Math.min(1, (${elapsed} * 1000 % ${duration + 350}) / ${duration});\n  const sample = SignalLost.draw(g.clear(), ${this.width}, ${this.height}, progress, {\n    background: CyberPreset.palette.background,\n    danger: CyberPreset.palette.danger, accent: ${this.accent},\n    highlight: CyberPreset.palette.signal,\n  });\n  label.position.set(sample.x + sample.shift * 4, sample.y + 48);\n  label.alpha = sample.fade;\n}`);
    }
  }

  private reveal(): string {
    const surface = this.surface('g', String(this.width - 64), '176', 'glass');
    const opened = this.flag('opened');
    const axis = this.text('axis', 'down');
    return this.finish(['CyberPreset', 'TerminalGlass', 'PanelTransition'], `${this.palette()}\nconst panel = new Container();\nconst g = panel.addChild(new Graphics());\n${surface.code}\n${this.label('label', 'COMMAND CENTER', '20', '32', '18', 'colors.accent', 'panel', '0')}\nconst origin = PanelTransition.origin({\n  ${axis === 'none' ? '' : `axis: ${this.quote(axis)}, `}offset: 8, closing: ${!opened},\n});\n\nfunction draw(elapsedSeconds: number) {\n  const p = ${this.reduced ? '1' : `Math.min(1, elapsedSeconds * 1000 / ${this.number('duration', 240)})`};\n  const amount = ${opened ? '(1 - p) ** 3' : 'p ** 2'};\n  panel.position.set(32 + origin.x * amount, 72 + origin.y * amount);\n  panel.scale.set(1 + (origin.scaleX - 1) * amount, 1 + (origin.scaleY - 1) * amount);\n  panel.alpha = 1 + (origin.alpha - 1) * amount;\n  panel.visible = ${opened} || p < 1;\n}`);
  }

  private build(lesson: CyberLesson): string {
    switch (lesson) {
      case 'panels': return this.panels();
      case 'buttons': return this.buttons();
      case 'selectors': return this.selectors();
      case 'icons-theme': return this.icons();
      case 'triangle-loader': case 'text-echo': case 'glitch-lifecycle': return this.motion(lesson);
      case 'panel-reveal': return this.reveal();
      default: return this.drawing(lesson);
    }
  }
}
