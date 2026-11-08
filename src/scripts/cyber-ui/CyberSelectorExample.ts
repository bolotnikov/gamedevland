import { ButtonSurface, TerminalGlass, TerminalUi } from '@gamedevland/cyber-ui';
import type { ButtonVariant, TerminalIcon } from '@gamedevland/cyber-ui';
import { Container, Graphics, Rectangle } from 'pixi.js';
import { CyberDrawing } from './CyberDrawing';
import { CyberExample } from './CyberExample';
import { CyberPanelSettings } from './CyberPanelSettings';

/** One selected item inside the appropriate shared or standalone skin. */
export class CyberSelectorExample extends CyberExample {
  private readonly settings = new CyberPanelSettings();
  private variant: Extract<ButtonVariant, 'nav' | 'segment' | 'tab'> = 'nav';
  private selected = 0;
  override get canvasHeight(): number {
    return 176;
  }
  get status(): string {
    return `${this.variant} · ${this.locale.t('Выбран пункт {value0}', { value0: this.selected + 1 })}`;
  }
  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.draw();
  }
  override control(id: string, value: string): void {
    this.settings.set(id, value);
    if (id === 'item') this.selected = Number(value);
    if (id === 'variant' && (value === 'nav' || value === 'segment' || value === 'tab'))
      this.variant = value;
    this.draw();
  }
  override controlValue(id: string): string | undefined {
    return id === 'item' ? String(this.selected) : undefined;
  }
  private draw(): void {
    CyberDrawing.clear(this.root);
    const t = this.settings.palette;
    const w = this.width - 48;
    const h = this.variant === 'tab' ? 80 : 64;
    const group = this.root.addChild(new Container());
    group.position.set(24, (this.height - h) / 2);
    const track = group.addChild(new Graphics());
    if (this.variant === 'nav')
      TerminalGlass.draw(track, 0, 0, w, h, 10, t.panel, t.panelEdge, t.accent, t.text);
    if (this.variant === 'segment') ButtonSurface.segmentTrack(track, { x: 0, y: 0, w, h }, t);
    const icons: readonly TerminalIcon[] = ['battle', 'agents', 'quests'];
    for (const [index, icon] of icons.entries()) {
      const item = group.addChild(new Graphics());
      const itemW = (w - 16) / 3;
      item.position.set(8 + index * itemW, 6);
      ButtonSurface.draw(
        item,
        {
          width: itemW - 4,
          height: h - 12,
          variant: this.variant,
          enabled: true,
          selected: index === this.selected,
        },
        { ...t, signal: t.accent },
      );
      TerminalUi.icon(
        item,
        icon,
        (itemW - 4) / 2,
        (h - 12) / 2,
        24,
        index === this.selected ? t.accent : t.muted,
      );
      item.eventMode = 'static';
      item.cursor = 'pointer';
      item.hitArea = new Rectangle(0, 0, itemW - 4, h - 12);
      item.on('pointertap', () => {
        this.selected = index;
        this.draw();
        this.onChange();
      });
    }
  }
}
