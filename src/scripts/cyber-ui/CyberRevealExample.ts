import { PanelTransition } from '@gamedevland/cyber-ui';
import { GsapTweenManager } from '@gamedevland/engine/tween';
import { Container, Graphics } from 'pixi.js';
import { CyberDrawing } from './CyberDrawing';
import { CyberExample } from './CyberExample';
import { CyberPanelSettings } from './CyberPanelSettings';
import { CyberPanelSkin } from './CyberPanelSkin';

export class CyberRevealExample extends CyberExample {
  private readonly panel = this.root.addChild(new Container());
  private readonly tweens = new GsapTweenManager();
  private readonly settings = new CyberPanelSettings();
  private axis: 'down' | 'right' | 'zoom' | undefined = 'down';
  private duration = 240;
  private opened = true;
  get status(): string {
    return `PanelTransition · ${this.axis ?? 'none'} · ${this.duration} ${this.locale.t('мс')}`;
  }
  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.paint();
    this.animate();
  }
  override update(deltaSeconds: number): void {
    this.tweens.tick(deltaSeconds);
  }
  override setReducedMotion(reduced: boolean): void {
    super.setReducedMotion(reduced);
    if (reduced) this.finishStatic();
  }
  override control(id: string, value: string): void {
    this.settings.set(id, value);
    if (id === 'axis')
      this.axis = value === 'down' || value === 'right' || value === 'zoom' ? value : undefined;
    if (id === 'duration') this.duration = Number(value);
    if (id === 'opened') this.opened = value === 'true';
    this.paint();
    if (id === 'axis' || id === 'duration' || id === 'opened') this.animate();
  }
  override dispose(): void {
    this.tweens.killAll();
    super.dispose();
  }
  private paint(): void {
    CyberDrawing.clear(this.panel);
    const g = this.panel.addChild(new Graphics());
    CyberPanelSkin.draw(g, 'glass', this.width - 64, 176, this.settings.palette);
    CyberDrawing.label(this.panel, 'COMMAND CENTER', 20, 32, 18, this.settings.accent);
  }
  private finishStatic(): void {
    this.tweens.killAll();
    this.panel.position.set(32, 72);
    this.panel.scale.set(1);
    this.panel.alpha = 1;
    this.panel.visible = this.opened;
  }
  private animate(): void {
    this.tweens.killAll();
    if (this.reduced) {
      this.finishStatic();
      return;
    }
    this.panel.visible = true;
    const closing = !this.opened;
    const origin = PanelTransition.origin({ axis: this.axis, offset: 8, closing });
    const shifted = { x: 32 + origin.x, y: 72 + origin.y, alpha: origin.alpha };
    const options = { duration: this.duration / 1000, ease: closing ? 'power2.in' : 'power3.out' };
    if (closing) {
      this.tweens.to(this.panel, shifted, options);
      this.tweens.scaleXY(this.panel, origin.scaleX, origin.scaleY, options);
    } else {
      this.panel.position.set(shifted.x, shifted.y);
      this.panel.alpha = origin.alpha;
      this.panel.scale.set(origin.scaleX, origin.scaleY);
      this.tweens.to(this.panel, { x: 32, y: 72, alpha: 1 }, options);
      this.tweens.scaleXY(this.panel, 1, 1, options);
    }
  }
}
