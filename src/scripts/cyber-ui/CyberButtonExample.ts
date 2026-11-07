import { ButtonSurface, CyberPreset, TerminalUi } from '@gamedevland/cyber-ui';
import type { ButtonVariant } from '@gamedevland/cyber-ui';
import { Container, Graphics, Rectangle } from 'pixi.js';
import { CyberDrawing } from './CyberDrawing';
import { CyberExample } from './CyberExample';

export class CyberButtonExample extends CyberExample {
  private variant: ButtonVariant = 'primary';
  private enabled = true;
  private selected = false;
  private taps = 0;
  get status(): string {
    return `variant: ${this.variant} · enabled: ${this.enabled} · selected: ${this.selected} · нажатий: ${this.taps}`;
  }
  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.draw();
  }
  override control(id: string, value: string): void {
    if (id === 'variant') {
      switch (value) {
        case 'primary':
        case 'module':
        case 'danger':
        case 'icon':
        case 'nav':
        case 'segment':
        case 'switch':
        case 'utility':
        case 'line':
          this.variant = value;
      }
    }
    if (id === 'enabled') this.enabled = value === 'true';
    if (id === 'selected') this.selected = value === 'true';
    if (id === 'tap' && this.enabled) this.taps++;
    this.draw();
  }
  private draw(): void {
    CyberDrawing.clear(this.root);
    const t = CyberPreset.palette;
    const w = Math.min(220, this.width - 64);
    const button = this.root.addChild(new Container());
    const surface = button.addChild(new Graphics());
    button.position.set((this.width - w) / 2, 126);
    ButtonSurface.draw(
      surface,
      {
        width: w,
        height: 56,
        variant: this.variant,
        enabled: this.enabled,
        selected: this.selected,
      },
      t,
    );
    if (this.variant === 'switch') ButtonSurface.toggle(surface, w, 56, this.selected, t);
    const color = !this.enabled ? t.muted : this.variant === 'primary' ? t.background : t.text;
    TerminalUi.icon(surface, 'play', 28, 28, 20, color);
    const label = CyberDrawing.label(
      button,
      'START',
      this.variant === 'switch' ? 84 : w / 2 + 8,
      28,
      18,
      color,
    );
    label.anchor.set(0.5);
    button.eventMode = this.enabled ? 'static' : 'none';
    button.cursor = this.enabled ? 'pointer' : 'default';
    button.hitArea = new Rectangle(0, 0, w, 56);
    button.on('pointertap', () => {
      this.taps++;
      this.onChange();
    });
    CyberDrawing.label(this.root, 'ButtonSurface + Text + hitArea', 24, 56, 13, t.muted);
  }
}
