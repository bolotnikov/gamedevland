import { BinaryField, CyberPreset } from '@gamedevland/cyber-ui';
import { Graphics } from 'pixi.js';
import { CyberDrawing } from './CyberDrawing';
import { CyberExample } from './CyberExample';

export class CyberBinaryExample extends CyberExample {
  private seed = 7291;
  private frame = 0;
  get status(): string {
    return `seed: ${this.seed} · frame: ${this.frame} · cellSize: 9`;
  }
  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.draw();
  }
  override control(id: string): void {
    if (id === 'frame') this.frame++;
    if (id === 'seed') this.seed++;
    if (id === 'reset') {
      this.seed = 7291;
      this.frame = 0;
    }
    this.draw();
  }
  private draw(): void {
    CyberDrawing.clear(this.root);
    const g = this.root.addChild(new Graphics());
    BinaryField.draw(g, { x: 24, y: 72, w: this.width - 48, h: 160 }, 12, 9, this.seed, this.frame);
    g.fill({ color: CyberPreset.palette.accent, alpha: 0.18 });
    CyberDrawing.label(
      this.root,
      'BinaryField.draw() + fill()',
      24,
      36,
      14,
      CyberPreset.palette.muted,
    );
  }
}
