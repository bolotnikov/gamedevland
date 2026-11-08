import { CyberPreset, SignalBrackets, TerminalUi } from '@gamedevland/cyber-ui';
import type { BracketOptions } from '@gamedevland/cyber-ui';
import { Graphics } from 'pixi.js';
import { CyberExample } from './CyberExample';

export class CyberBracketsExample extends CyberExample {
  private readonly drawing = this.root.addChild(new Graphics());
  private seconds = 0;
  private duration = 2400;
  private accent = CyberPreset.palette.accent;
  get status(): string {
    return 'SignalBrackets';
  }
  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.draw();
  }
  override update(deltaSeconds: number): void {
    this.seconds += deltaSeconds;
    this.draw();
  }
  override control(id: string, value: string): void {
    if (id === 'accent') this.accent = Number.parseInt(value.slice(1), 16);
    if (id === 'duration') this.duration = Number(value);
    this.draw();
  }
  override setReducedMotion(reduced: boolean): void {
    super.setReducedMotion(reduced);
    this.draw();
  }
  private draw(): void {
    const g = this.drawing.clear();
    const options: BracketOptions = {
      cycleMs: this.duration,
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
      this.seconds * 1000,
      90,
      this.reduced,
      this.accent,
      CyberPreset.palette.signal,
    );
  }
}
