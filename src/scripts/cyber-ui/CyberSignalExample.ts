import { CyberPreset, FaultGlyph, SignalLost } from '@gamedevland/cyber-ui';
import { Graphics, Text } from 'pixi.js';
import { CyberExample } from './CyberExample';

export class CyberSignalExample extends CyberExample {
  private readonly drawing = this.root.addChild(new Graphics());
  private readonly label = this.root.addChild(
    new Text({
      text: 'SIGNAL LOST',
      style: { fontFamily: 'monospace', fontSize: 24, fill: CyberPreset.palette.danger },
    }),
  );
  private seconds = 0;
  private duration = 1200;
  private accent = CyberPreset.palette.accent;
  constructor() {
    super();
    this.label.anchor.set(0.5);
  }
  get status(): string {
    return 'SignalLost';
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
    const t = CyberPreset.palette;
    this.drawing.clear();
    if (this.reduced) {
      FaultGlyph.draw(
        this.drawing,
        this.width / 2,
        this.height / 2 - 24,
        t.danger,
        this.accent,
        1,
        0,
        4,
      );
      this.label.position.set(this.width / 2, this.height / 2 + 24);
      this.label.alpha = 1;
      return;
    }
    const progress = Math.min(1, ((this.seconds * 1000) % (this.duration + 350)) / this.duration);
    const sample = SignalLost.draw(this.drawing, this.width, this.height, progress, {
      background: t.background,
      danger: t.danger,
      accent: this.accent,
      highlight: t.signal,
    });
    this.label.position.set(sample.x + sample.shift * 4, sample.y + 48);
    this.label.alpha = sample.fade;
  }
}
