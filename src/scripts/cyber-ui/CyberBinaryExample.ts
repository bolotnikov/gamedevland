import { BinaryField, CyberPreset } from '@gamedevland/cyber-ui';
import { Graphics } from 'pixi.js';
import { CyberExample } from './CyberExample';

export class CyberBinaryExample extends CyberExample {
  private readonly pattern = this.root.addChild(new Graphics());
  private seconds = 0;
  private frame = -1;
  private rate = 8;
  private cell = 9;
  private opacity = 0.25;
  private color = CyberPreset.palette.accent;
  get status(): string {
    return `BinaryField · ${this.rate} кадров/с · размер ${this.cell}`;
  }
  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.draw();
  }
  override update(deltaSeconds: number): void {
    if (!this.reduced) this.seconds += deltaSeconds;
    const frame = this.reduced ? 0 : Math.floor(this.seconds * this.rate);
    if (frame !== this.frame) this.draw();
  }
  override setReducedMotion(reduced: boolean): void {
    super.setReducedMotion(reduced);
    this.draw();
  }
  override control(id: string, value: string): void {
    if (id === 'rate') this.rate = Number(value);
    if (id === 'cell') this.cell = Number(value);
    if (id === 'opacity') this.opacity = Number(value);
    if (id === 'accent') this.color = Number.parseInt(value.slice(1), 16);
    this.draw();
  }
  private draw(): void {
    this.frame = this.reduced ? 0 : Math.floor(this.seconds * this.rate);
    BinaryField.draw(
      this.pattern.clear(),
      { x: 24, y: 24, w: this.width - 48, h: this.height - 48 },
      12,
      this.cell,
      7291,
      this.frame,
    );
    this.pattern.fill({ color: this.color, alpha: this.opacity });
  }
}
