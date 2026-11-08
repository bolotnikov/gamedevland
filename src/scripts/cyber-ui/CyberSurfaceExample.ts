import { TerminalGlass, TerminalSweep, TerminalUi } from '@gamedevland/cyber-ui';
import { Graphics } from 'pixi.js';
import { CyberDrawing } from './CyberDrawing';
import { CyberExample } from './CyberExample';
import { CyberPanelSettings } from './CyberPanelSettings';
import { CyberPanelSkin } from './CyberPanelSkin';

export class CyberSurfaceExample extends CyberExample {
  private readonly settings = new CyberPanelSettings();
  private decoration = 'none';
  private direction: 'down' | 'right' = 'down';
  private duration = 1600;
  private progress = 0.5;
  private seconds = 0;
  override get animated(): boolean {
    return this.decoration === 'sweep';
  }
  override get canvasHeight(): number {
    return this.settings.height + 64;
  }
  get status(): string {
    return `${this.settings.variant} · ${this.settings.width} × ${this.settings.height}`;
  }
  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.draw();
  }
  override control(id: string, value: string): void {
    this.settings.set(id, value);
    if (id === 'decoration') this.decoration = value;
    if (id === 'direction' && (value === 'down' || value === 'right')) this.direction = value;
    if (id === 'duration') this.duration = Number(value);
    if (id === 'progress') this.progress = Number(value);
    this.draw();
  }
  override update(deltaSeconds: number): void {
    this.seconds += deltaSeconds;
    if (this.animated) this.draw();
  }
  override setReducedMotion(reduced: boolean): void {
    super.setReducedMotion(reduced);
    this.draw();
  }
  private draw(): void {
    CyberDrawing.clear(this.root);
    const s = this.settings;
    const w = Math.min(s.width, this.width - 64);
    const g = this.root.addChild(new Graphics());
    g.position.set((this.width - w) / 2, (this.height - s.height) / 2);
    CyberPanelSkin.draw(g, s.variant, w, s.height, s.palette);
    if (this.decoration === 'focus') TerminalGlass.focus(g, 0, 0, w, s.height, s.accent);
    if (this.decoration === 'traces') TerminalUi.traces(g, 0, 0, w, s.height, s.accent);
    if (this.decoration === 'etch') TerminalUi.etch(g, 0, 0, w, s.height, s.accent);
    if (this.decoration === 'clippedRect') {
      TerminalUi.clippedRect(
        g,
        { x: 0, y: 0, w, h: s.height },
        s.variant === 'panel' ? 0 : 12,
        0,
        this.progress * (s.height - 12),
        w,
        12,
      );
      g.fill({ color: s.accent, alpha: 0.4 });
    }
    if (this.decoration === 'sweep')
      TerminalSweep.draw(
        g,
        0,
        0,
        w,
        s.height,
        this.reduced ? 0.5 : ((this.seconds * 1000) / this.duration) % 1,
        s.accent,
        this.reduced,
        this.direction,
      );
    const label = CyberDrawing.label(
      this.root,
      s.text,
      this.width / 2,
      this.height / 2,
      Math.min(16, (w - 24) / Math.max(s.text.length * 0.6, 1)),
      s.palette.text,
    );
    label.anchor.set(0.5);
  }
}
