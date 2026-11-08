import { Graphics } from 'pixi.js';
import { CyberDrawing } from './CyberDrawing';
import { CyberExample } from './CyberExample';
import { CyberPanelSettings } from './CyberPanelSettings';
import { CyberPanelSkin } from './CyberPanelSkin';

export class CyberSurfaceExample extends CyberExample {
  private readonly settings = new CyberPanelSettings();
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
    this.draw();
  }
  private draw(): void {
    CyberDrawing.clear(this.root);
    const s = this.settings;
    const w = Math.min(s.width, this.width - 64);
    const g = this.root.addChild(new Graphics());
    g.position.set((this.width - w) / 2, (this.height - s.height) / 2);
    CyberPanelSkin.draw(g, s.variant, w, s.height, s.palette);
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
