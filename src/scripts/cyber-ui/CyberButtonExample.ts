import { ButtonSurface, TerminalGlass, TerminalUi } from '@gamedevland/cyber-ui';
import type { ButtonVariant } from '@gamedevland/cyber-ui';
import { Container, Graphics, Rectangle } from 'pixi.js';
import { CyberDrawing } from './CyberDrawing';
import { CyberExample } from './CyberExample';
import { CyberPanelSettings } from './CyberPanelSettings';

export class CyberButtonExample extends CyberExample {
  private readonly settings = new CyberPanelSettings();
  private variant: ButtonVariant = 'primary';
  private enabled = true;
  private selected = false;
  private taps = 0;
  constructor() {
    super();
    this.settings.width = 216;
    this.settings.height = 56;
    this.settings.text = 'START';
  }
  get status(): string {
    return `${this.variant} · нажатий: ${this.taps}`;
  }
  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.draw();
  }
  override control(id: string, value: string): void {
    this.settings.set(id, value);
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
    this.draw();
  }
  private draw(): void {
    CyberDrawing.clear(this.root);
    const s = this.settings;
    const t = s.palette;
    const w = Math.min(s.width, this.width - 64);
    const h = this.variant === 'icon' ? w : s.height;
    const button = this.root.addChild(new Container());
    const surface = button.addChild(new Graphics());
    button.position.set((this.width - w) / 2, (this.height - h) / 2);
    button.alpha = this.enabled ? 1 : 0.42;
    ButtonSurface.draw(
      surface,
      {
        width: w,
        height: h,
        variant: this.variant,
        enabled: this.enabled,
        selected: this.selected,
      },
      t,
    );
    if (this.variant === 'module' && this.selected)
      TerminalGlass.focus(surface, 0, 0, w, h, t.accent);
    if (this.variant === 'switch') ButtonSurface.toggle(surface, w, h, this.selected, t);
    const color = this.variant === 'primary' && this.enabled ? t.background : t.accent;
    TerminalUi.icon(
      surface,
      this.variant === 'icon' ? 'gear' : 'play',
      this.variant === 'icon' ? w / 2 : Math.min(w * 0.14, 28),
      h / 2,
      this.variant === 'icon' ? w * 0.5 : Math.min(20, w * 0.25),
      color,
    );
    if (w > 80 && this.variant !== 'icon') {
      const label = CyberDrawing.label(
        button,
        s.text,
        this.variant === 'switch' ? w * 0.4 : w / 2 + 8,
        h / 2,
        Math.max(
          8,
          Math.min(
            18,
            (w - (this.variant === 'switch' ? 100 : 64)) / Math.max(s.text.length * 0.6, 1),
          ),
        ),
        color,
      );
      label.anchor.set(0.5);
    }
    button.eventMode = this.enabled ? 'static' : 'none';
    button.cursor = this.enabled ? 'pointer' : 'default';
    button.hitArea = new Rectangle(0, 0, w, h);
    button.on('pointertap', () => {
      this.taps++;
      this.onChange();
    });
  }
}
