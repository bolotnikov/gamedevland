import { Container, Graphics } from 'pixi.js';
import { CyberDrawing } from './CyberDrawing';
import { CyberExample } from './CyberExample';
import { CyberPanelSettings } from './CyberPanelSettings';
import { CyberPanelSkin } from './CyberPanelSkin';
import type { CyberPanelVariant } from './types';

export class CyberSurfaceExample extends CyberExample {
  private readonly settings = new CyberPanelSettings();
  get status(): string {
    return `${this.settings.variant} · ${this.settings.glass && this.settings.variant !== 'plate' && this.settings.state !== 'locked' ? 'стекло' : 'плоская поверхность'} · ${this.settings.width} × ${this.settings.variant === 'square' ? Math.min(this.settings.width, 224) : this.settings.height}`;
  }
  override get canvasHeight(): number {
    return 500;
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
    const t = s.palette;
    const parent = this.root.addChild(new Container());
    const w = Math.min(s.width, this.width - 64);
    const h = s.variant === 'square' ? Math.min(w, 224) : s.height;
    const actualW = s.variant === 'square' ? h : w;
    const sectionHeight = 264;
    parent.position.set((this.width - actualW) / 2, (sectionHeight - h) / 2);
    const g = parent.addChild(new Graphics());
    CyberPanelSkin.draw(g, s.variant, actualW, h, s.glass, t, s.state);
    if (s.variant !== 'square') {
      const label = CyberDrawing.label(
        parent,
        s.text,
        actualW / 2,
        h * 0.66,
        Math.min(16, (actualW - 24) / Math.max(s.text.length * 0.6, 1)),
        t.text,
      );
      label.anchor.set(0.5);
    }
    if (s.variant === 'window' && h >= 100) {
      g.moveTo(14, 52)
        .lineTo(actualW - 14, 52)
        .stroke({ color: t.panelEdge, width: 1 });
      CyberDrawing.label(parent, 'SYSTEM / ONLINE', 16, 20, 11, t.accent);
    }
    this.gallery();
  }
  private gallery(): void {
    const items: readonly { variant: CyberPanelVariant; label: string }[] = [
      { variant: 'window', label: 'Окно' },
      { variant: 'plate', label: 'Плашка' },
      { variant: 'square', label: 'Квадрат' },
      { variant: 'card', label: 'Агент' },
      { variant: 'research', label: 'Исследование' },
      { variant: 'module', label: 'Модуль' },
    ];
    const columns = this.width < 480 ? 3 : 6;
    const cellWidth = (this.width - 32) / columns;
    const cellHeight = columns === 3 ? 108 : 180;
    const t = this.settings.palette;
    for (const [index, item] of items.entries()) {
      const cell = this.root.addChild(new Container());
      cell.position.set(
        16 + (index % columns) * cellWidth,
        282 + Math.floor(index / columns) * cellHeight,
      );
      const maxW = cellWidth - 16;
      const square = item.variant === 'square' || item.variant === 'research';
      const w = square ? Math.min(56, maxW) : maxW;
      const h = square ? w : item.variant === 'card' ? 66 : item.variant === 'module' ? 40 : 56;
      const g = cell.addChild(new Graphics());
      g.position.set((cellWidth - w) / 2, (72 - h) / 2);
      CyberPanelSkin.draw(g, item.variant, w, h, item.variant !== 'plate', t);
      const label = CyberDrawing.label(cell, item.label, cellWidth / 2, 82, 10, t.muted);
      label.anchor.set(0.5, 0);
    }
  }
}
