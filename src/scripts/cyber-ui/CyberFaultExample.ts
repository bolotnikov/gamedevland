import { CyberPreset, FaultGlyph } from '@gamedevland/cyber-ui';
import { Graphics } from 'pixi.js';
import { CyberExample } from './CyberExample';

export class CyberFaultExample extends CyberExample {
  private readonly drawing = this.root.addChild(new Graphics());
  private seconds = 0;
  private distortion = 12;
  private accent = CyberPreset.palette.accent;
  get status(): string {
    return 'FaultGlyph';
  }
  override get animated(): boolean {
    return this.distortion > 0;
  }
  override get canvasHeight(): number {
    return 224;
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
    if (id === 'distortion') this.distortion = Number(value);
    this.draw();
  }
  override setReducedMotion(reduced: boolean): void {
    super.setReducedMotion(reduced);
    this.draw();
  }
  private draw(): void {
    const distortion = this.reduced ? 0 : Math.sin(this.seconds * 7) * this.distortion;
    FaultGlyph.draw(
      this.drawing.clear(),
      this.width / 2,
      this.height / 2,
      CyberPreset.palette.danger,
      this.accent,
      1,
      distortion,
      6,
    );
  }
}
