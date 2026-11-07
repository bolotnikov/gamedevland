import { CyberPreset, TerminalUi } from '@gamedevland/cyber-ui';
import type { TerminalIcon } from '@gamedevland/cyber-ui';
import { Graphics } from 'pixi.js';
import { CyberDrawing } from './CyberDrawing';
import { CyberExample } from './CyberExample';

export class CyberIconExample extends CyberExample {
  private size = 24;
  private color = CyberPreset.palette.accent;
  private static readonly icons: readonly TerminalIcon[] = [
    'chip',
    'battle',
    'agents',
    'skills',
    'quests',
    'gear',
    'bolt',
    'calendar',
    'credit',
    'capsule',
    'key',
    'left',
    'right',
    'exit',
    'play',
    'lock',
    'chest',
    'check',
    'speed',
    'target',
    'burst',
    'repair',
    'heart',
    'scan',
    'snow',
    'boss',
    'flag',
  ];
  get status(): string {
    return `TerminalUi.icon() · size: ${this.size} · ${this.locale.t('27 иконок')}`;
  }
  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.draw();
  }
  override control(id: string, value: string): void {
    if (id === 'size') this.size = Number(value);
    if (id === 'accent') this.color = Number.parseInt(value.slice(1), 16);
    this.draw();
  }
  private draw(): void {
    CyberDrawing.clear(this.root);
    const columns = this.width < 420 ? 5 : 7;
    const cellWidth = (this.width - 24) / columns;
    const cellHeight = 288 / Math.ceil(CyberIconExample.icons.length / columns);
    const g = this.root.addChild(new Graphics());
    for (const [index, icon] of CyberIconExample.icons.entries()) {
      const x = 12 + cellWidth * ((index % columns) + 0.5);
      const y = 12 + Math.floor(index / columns) * cellHeight + cellHeight * 0.35;
      TerminalUi.icon(g, icon, x, y, this.size, this.color);
      const label = CyberDrawing.label(
        this.root,
        icon,
        x,
        y + cellHeight * 0.3,
        10,
        CyberPreset.palette.muted,
      );
      label.anchor.set(0.5, 0);
    }
  }
}
