import {
  CyberPreset,
  FaultGlyph,
  SignalBrackets,
  SignalLost,
  TerminalGlass,
  TerminalSweep,
  TerminalUi,
} from '@gamedevland/cyber-ui';
import type { BracketOptions } from '@gamedevland/cyber-ui';
import { Graphics } from 'pixi.js';
import { CyberDrawing } from './CyberDrawing';
import { CyberExample } from './CyberExample';

type DrawingLesson =
  'surface-details' | 'signal-brackets' | 'terminal-sweep' | 'fault-glyph' | 'signal-lost';

/** Scrubbing changes actual helper input; no hidden animation clock or flashing loop. */
export class CyberDrawingExample extends CyberExample {
  private progress = 0.5;
  private accent = CyberPreset.palette.accent;
  private detail = 'focus';
  private direction: 'down' | 'right' = 'down';
  constructor(private readonly lesson: DrawingLesson) {
    super();
  }
  get status(): string {
    return `${this.lesson} · ${this.progress.toFixed(2)}`;
  }
  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.draw();
  }
  override setReducedMotion(reduced: boolean): void {
    super.setReducedMotion(reduced);
    this.draw();
  }
  override control(id: string, value: string): void {
    if (id === 'progress') this.progress = Number(value);
    if (id === 'accent') this.accent = Number.parseInt(value.slice(1), 16);
    if (id === 'detail') this.detail = value;
    if (id === 'direction' && (value === 'down' || value === 'right')) this.direction = value;
    this.draw();
  }
  private draw(): void {
    CyberDrawing.clear(this.root);
    const g = this.root.addChild(new Graphics());
    const t = CyberPreset.palette;
    const x = 32,
      y = 48,
      w = this.width - 64,
      h = this.height - 96;
    if (this.lesson === 'signal-lost' && this.reduced) {
      FaultGlyph.draw(g, this.width / 2, this.height / 2 - 24, t.danger, this.accent, 1, 0, 4);
      const label = CyberDrawing.label(
        this.root,
        'SIGNAL LOST',
        this.width / 2,
        this.height / 2 + 24,
        24,
        t.danger,
      );
      label.anchor.set(0.5);
      return;
    }
    if (this.lesson === 'signal-lost') {
      const sample = SignalLost.draw(g, this.width, this.height, this.progress, {
        background: t.background,
        danger: t.danger,
        accent: this.accent,
        highlight: t.signal,
      });
      const label = CyberDrawing.label(
        this.root,
        'SIGNAL LOST',
        sample.x + sample.shift * 4,
        sample.y + 48,
        24,
        t.danger,
      );
      label.anchor.set(0.5);
      label.alpha = sample.fade;
      return;
    }
    if (this.lesson === 'fault-glyph') {
      FaultGlyph.draw(
        g,
        this.width / 2,
        this.height / 2,
        t.danger,
        this.accent,
        1,
        this.reduced ? 0 : this.progress * 12,
        6,
      );
      return;
    }
    TerminalUi.plate(g, x, y, w, h, 12, t.panel, t.panelEdge);
    if (this.lesson === 'surface-details') {
      if (this.detail === 'focus') TerminalGlass.focus(g, x, y, w, h, this.accent);
      if (this.detail === 'traces') TerminalUi.traces(g, x, y, w, h, this.accent);
      if (this.detail === 'etch') TerminalUi.etch(g, x, y, w, h, this.accent);
      if (this.detail === 'clippedRect') {
        TerminalUi.clippedRect(g, { x, y, w, h }, 12, x, y + this.progress * (h - 16), w, 16);
        g.fill({ color: this.accent, alpha: 0.5 });
      }
    }
    if (this.lesson === 'terminal-sweep')
      TerminalSweep.draw(g, x, y, w, h, this.progress, this.accent, this.reduced, this.direction);
    if (this.lesson === 'signal-brackets') {
      const options: BracketOptions = {
        cycleMs: 2400,
        travel: 12,
        scale: 0.08,
        jitter: 1,
        distanceRatio: 0.3,
        maxDistance: 200,
        halfHeight: 48,
        bevel: 10,
        strokeWidth: 2,
        alpha: 0.45,
        peakAlpha: 1,
        markerSize: 8,
        markerAlpha: 0.7,
      };
      TerminalUi.icon(g, 'chip', this.width / 2, this.height / 2, 48, this.accent);
      SignalBrackets.draw(
        g,
        options,
        this.width,
        this.height / 2,
        40,
        1,
        this.progress * 2400,
        90,
        this.reduced,
        this.accent,
        t.signal,
      );
    }
  }
}
