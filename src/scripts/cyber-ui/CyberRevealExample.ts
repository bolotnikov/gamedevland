import { PanelTransition } from '@gamedevland/cyber-ui';
import { Container, Graphics } from 'pixi.js';
import { CyberDrawing } from './CyberDrawing';
import { CyberExample } from './CyberExample';
import { CyberPanelSettings } from './CyberPanelSettings';
import { CyberPanelSkin } from './CyberPanelSkin';

export class CyberRevealExample extends CyberExample {
  private readonly panel = this.root.addChild(new Container());
  private readonly settings = new CyberPanelSettings();
  private axis: 'down' | 'right' | 'zoom' | undefined = 'down';
  private duration = 240;
  private opened = true;
  private seconds = 0;
  get status(): string {
    return `PanelTransition · ${this.axis ?? 'none'}`;
  }
  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.paint();
    this.draw();
  }
  override update(deltaSeconds: number): void {
    this.seconds += deltaSeconds;
    this.draw();
  }
  override setReducedMotion(reduced: boolean): void {
    super.setReducedMotion(reduced);
    this.draw();
  }
  override control(id: string, value: string): void {
    this.settings.set(id, value);
    if (id === 'axis')
      this.axis = value === 'down' || value === 'right' || value === 'zoom' ? value : undefined;
    if (id === 'duration') this.duration = Number(value);
    if (id === 'opened') this.opened = value === 'true';
    this.seconds = 0;
    this.paint();
    this.draw();
  }
  private paint(): void {
    CyberDrawing.clear(this.panel);
    CyberPanelSkin.draw(
      this.panel.addChild(new Graphics()),
      'glass',
      this.width - 64,
      176,
      this.settings.palette,
    );
    CyberDrawing.label(this.panel, 'COMMAND CENTER', 20, 32, 18, this.settings.accent);
  }
  private draw(): void {
    const origin = PanelTransition.origin({ axis: this.axis, offset: 8, closing: !this.opened });
    const p = this.reduced ? 1 : Math.min(1, (this.seconds * 1000) / this.duration);
    const progress = this.opened ? 1 - (1 - p) ** 3 : p ** 2;
    const amount = this.opened ? 1 - progress : progress;
    this.panel.position.set(32 + origin.x * amount, 72 + origin.y * amount);
    this.panel.scale.set(1 + (origin.scaleX - 1) * amount, 1 + (origin.scaleY - 1) * amount);
    this.panel.alpha = 1 + (origin.alpha - 1) * amount;
    this.panel.visible = this.opened || p < 1;
  }
}
