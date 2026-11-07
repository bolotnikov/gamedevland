import { CyberPreset, SurfaceGlitch, TextEcho, TriangleLoader } from '@gamedevland/cyber-ui';
import type { UiEffect } from '@gamedevland/cyber-ui';
import { Graphics, Text } from 'pixi.js';
import { CyberExample } from './CyberExample';
import { CyberPanelSettings } from './CyberPanelSettings';
import { CyberPanelSkin } from './CyberPanelSkin';

export class CyberMotionExample extends CyberExample {
  private readonly settings = new CyberPanelSettings();
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
  private secondary = 0x44e2ff;
  private radius = 64;
  private count = 96;
  private shift = 1;
  private duration = 180;
  constructor(private readonly lesson: 'triangle-loader' | 'text-echo' | 'glitch-lifecycle') {
    super();
    this.copy.anchor.set(0.5);
    this.title.anchor.set(0.5);
    this.secondary = lesson === 'text-echo' ? 0xffd65c : 0x44e2ff;
    this.createEffect();
  }
  get status(): string {
    return this.lesson === 'triangle-loader'
      ? `TriangleLoader · радиус ${this.radius} · частиц ${this.count}`
      : this.lesson === 'text-echo'
        ? `TextEcho · смещение ${this.shift}`
        : `SurfaceGlitch · ${this.settings.variant} · ${this.duration} мс`;
  }
  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.layout();
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
  override control(id: string, value: string): void {
    this.settings.set(id, value);
    if (id === 'secondary') this.secondary = Number.parseInt(value.slice(1), 16);
    if (id === 'radius') this.radius = Number(value);
    if (id === 'particles') this.count = Number(value);
    if (id === 'shift') this.shift = Number(value);
    if (id === 'duration') this.duration = Number(value);
    if (id === 'text') {
      this.title.text = value;
      this.copy.text = value;
    }
    if (id === 'particles' || id === 'shift' || id === 'duration') this.createEffect();
    this.layout();
    this.draw();
  }
  override dispose(): void {
    this.effect?.dispose();
    super.dispose();
  }
  private createEffect(): void {
    this.effect?.dispose();
    if (this.lesson === 'triangle-loader')
      this.effect = new TriangleLoader({ ...CyberPreset.triangle, particles: this.count });
    if (this.lesson === 'text-echo')
      this.effect = new TextEcho({ ...CyberPreset.textEcho, shift: this.shift });
    if (this.lesson === 'glitch-lifecycle')
      this.effect = new SurfaceGlitch({ ...CyberPreset.glitch, durationMs: this.duration });
    this.effect?.setReducedMotion(this.reduced);
  }
  private layout(): void {
    const s = this.settings;
    this.copy.visible = this.lesson === 'text-echo';
    this.title.visible = this.lesson !== 'triangle-loader';
    this.title.position.set(this.width / 2, this.height / 2);
    this.copy.position.copyFrom(this.title.position);
    this.title.style.fill = s.accent;
    this.copy.style.fill = this.secondary;
    this.title.style.fontSize = Math.min(
      24,
      (this.width - 64) / Math.max(this.title.text.length * 0.6, 1),
    );
    this.copy.style.fontSize = this.title.style.fontSize;
    if (this.effect instanceof SurfaceGlitch) {
      const w = Math.min(s.width, this.width - 64);
      const h = s.variant === 'square' ? Math.min(w, 224) : s.height;
      const actualW = s.variant === 'square' ? h : w;
      // Release temporary strips before rebuilding the borrowed source geometry.
      this.effect.hide();
      this.surface.clear();
      CyberPanelSkin.draw(this.surface, s.variant, actualW, h, s.glass, s.palette);
      this.surface.position.set((this.width - actualW) / 2, (this.height - h) / 2);
      this.title.text = s.variant === 'square' ? '' : 'SIGNAL ONLINE';
      this.title.position.set(this.width / 2, this.height / 2 + h * 0.15);
      this.effect.show('panel', [{ surface: this.surface, x: 0, y: 0, w: actualW, h }], 0);
    }
  }
  private draw(): void {
    if (this.effect instanceof TriangleLoader)
      this.effect.draw(
        this.surface,
        this.particles,
        { x: this.width / 2, y: this.height / 2, radius: this.radius, scale: 1 },
        { ...CyberPreset.trianglePalette, accent: this.settings.accent, secondary: this.secondary },
      );
    if (this.effect instanceof TextEcho)
      this.effect.draw(this.title, this.copy, this.width / 2, this.height / 2);
  }
}
