import { CyberPreset, SurfaceGlitch, TextEcho, TriangleLoader } from '@gamedevland/cyber-ui';
import type { UiEffect } from '@gamedevland/cyber-ui';
import { Graphics, Text } from 'pixi.js';
import { CyberExample } from './CyberExample';

export class CyberMotionExample extends CyberExample {
  private readonly surface = this.root.addChild(new Graphics());
  private readonly particles = this.root.addChild(new Graphics());
  private readonly copy = this.root.addChild(
    new Text({
      text: 'SYSTEM READY',
      style: { fontFamily: 'monospace', fontSize: 24, fill: 0xffd65c },
    }),
  );
  private readonly title = this.root.addChild(
    new Text({
      text: 'SYSTEM READY',
      style: { fontFamily: 'monospace', fontSize: 24, fill: 0x70ccff },
    }),
  );
  private effect: (UiEffect & { readonly elapsedSeconds: number }) | undefined;
  private hidden = false;
  constructor(private readonly lesson: 'triangle-loader' | 'text-echo' | 'glitch-lifecycle') {
    super();
    this.copy.anchor.set(0.5);
    this.title.anchor.set(0.5);
    this.createEffect();
  }
  get status(): string {
    return this.effect
      ? `update(seconds) · t: ${this.effect.elapsedSeconds.toFixed(2)} с${this.hidden ? ' · hide()' : ''}${this.reduced ? ' · reduced motion' : ''}`
      : `dispose() · Graphics: ${this.surface.destroyed ? 'удалён' : 'сохранён'} · объектов: ${this.root.children.length}`;
  }
  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.layout();
    if (this.effect instanceof SurfaceGlitch && !this.hidden) this.effect.update(0);
    this.draw();
  }
  override setActive(active: boolean): void {
    this.effect?.setActive(active);
  }
  override update(deltaSeconds: number): void {
    this.effect?.update(deltaSeconds);
    this.draw();
  }
  override setReducedMotion(reduced: boolean): void {
    super.setReducedMotion(reduced);
    this.effect?.setReducedMotion(reduced);
    this.draw();
  }
  override control(id: string): void {
    if (id === 'dispose') {
      this.effect?.dispose();
      this.effect = undefined;
    }
    if (id === 'reset') this.createEffect();
    if (this.effect instanceof SurfaceGlitch) {
      if (id === 'hide') {
        this.effect.hide();
        this.hidden = true;
      }
      if (id === 'show') {
        this.showGlitch();
        this.effect.update(0);
        this.hidden = false;
      }
    }
    this.draw();
  }
  override dispose(): void {
    this.effect?.dispose();
    super.dispose();
  }
  private createEffect(): void {
    this.effect?.dispose();
    this.hidden = false;
    if (this.lesson === 'triangle-loader') this.effect = new TriangleLoader(CyberPreset.triangle);
    if (this.lesson === 'text-echo') {
      this.effect = new TextEcho(CyberPreset.textEcho);
      this.effect.update(0.09);
    }
    if (this.lesson === 'glitch-lifecycle') this.effect = new SurfaceGlitch(CyberPreset.glitch);
    this.effect?.setReducedMotion(this.reduced);
    this.layout();
    if (this.effect instanceof SurfaceGlitch) this.effect.update(0.2);
  }
  private layout(): void {
    this.copy.visible = this.lesson === 'text-echo';
    this.title.visible = this.lesson !== 'triangle-loader';
    this.title.position.set(this.width / 2, this.height / 2);
    this.copy.position.copyFrom(this.title.position);
    if (this.effect instanceof SurfaceGlitch) {
      this.effect.hide();
      const t = CyberPreset.palette;
      this.surface
        .clear()
        .rect(0, 0, this.width - 80, 112)
        .fill(t.panel)
        .stroke({ color: t.accent, width: 1 });
      this.surface.position.set(40, 104);
      this.title.text = 'SIGNAL ONLINE';
      this.showGlitch();
      if (this.hidden) this.effect.hide();
    }
  }
  private showGlitch(): void {
    if (this.effect instanceof SurfaceGlitch)
      this.effect.show(
        'menu',
        [{ surface: this.surface, x: 0, y: 0, w: this.width - 80, h: 112 }],
        0,
      );
  }
  private draw(): void {
    if (this.effect instanceof TriangleLoader)
      this.effect.draw(
        this.surface,
        this.particles,
        { x: this.width / 2, y: this.height / 2, radius: 64, scale: 1 },
        CyberPreset.trianglePalette,
      );
    if (this.effect instanceof TextEcho)
      this.effect.draw(this.title, this.copy, this.width / 2, this.height / 2);
  }
}
