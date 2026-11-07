import { PanelTransition } from '@gamedevland/cyber-ui';
import { GsapTweenManager } from '@gamedevland/engine/tween';
import { Container } from 'pixi.js';
import { CyberDrawing } from './CyberDrawing';
import { CyberExample } from './CyberExample';

/** Runs real toolkit geometry and SDK tweens without constructing a second engine. */
export class CyberRevealExample extends CyberExample {
  private readonly panel = this.root.addChild(new Container());
  private readonly tweens = new GsapTweenManager();
  private axis: 'down' | 'right' | 'zoom' = 'down';
  private operation = 'Ожидает вызова';
  get status(): string {
    return `${this.operation} · alpha: ${this.panel.alpha.toFixed(2)} · scale: ${this.panel.scale.x.toFixed(2)}, ${this.panel.scale.y.toFixed(2)}`;
  }
  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.cancel();
    CyberDrawing.clear(this.panel);
    CyberDrawing.panel(this.panel, 0, 0, width - 64, 176);
    CyberDrawing.label(this.panel, 'PANEL REVEAL', 20, 34, 18);
    CyberDrawing.label(this.panel, 'PanelTransition + SDK tweens', 20, 74, 12);
  }
  override update(deltaSeconds: number): void {
    this.tweens.tick(deltaSeconds);
  }
  override setReducedMotion(reduced: boolean): void {
    super.setReducedMotion(reduced);
    if (reduced) this.cancel();
  }
  override control(id: string, value: string): void {
    if (id === 'axis' && (value === 'down' || value === 'right' || value === 'zoom')) {
      this.axis = value;
      this.cancel();
    }
    if (id === 'cancel') this.cancel();
    if (id === 'open' || id === 'close') this.animate(id === 'close');
  }
  override dispose(): void {
    this.tweens.killAll();
    super.dispose();
  }
  private cancel(): void {
    this.tweens.killAll();
    this.panel.position.set(32, 72);
    this.panel.scale.set(1);
    this.panel.alpha = 1;
    this.panel.visible = true;
    this.operation = 'Исходный transform';
  }
  private animate(closing: boolean): void {
    this.cancel();
    this.operation = closing ? 'closing: true' : `axis: ${this.axis}`;
    if (this.reduced) {
      this.panel.visible = !closing;
      return;
    }
    this.panel.visible = true;
    const origin = PanelTransition.origin({ axis: this.axis, offset: 8, closing });
    const shifted = { x: 32 + origin.x, y: 72 + origin.y, alpha: origin.alpha };
    const options = { duration: 0.24, ease: closing ? 'power2.in' : 'power3.out' };
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
