import { ButtonPrice, ButtonSurface, TerminalUi } from '@gamedevland/cyber-ui';
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
  private ready = false;
  private explicitAccent = false;
  private priced = false;
  private amount = '250';
  constructor() {
    super();
    this.settings.width = 216;
    this.settings.height = 56;
    this.settings.text = 'START';
  }
  override get canvasHeight(): number {
    return this.variant === 'icon' ? Math.min(this.settings.width, 224) + 64 : 160;
  }
  get status(): string {
    return `${this.variant} · ${this.locale.t('нажатий: {value0}', { value0: this.taps })}`;
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
        case 'tab':
        case 'switch':
        case 'utility':
        case 'line':
          this.variant = value;
      }
    }
    if (id === 'priced') this.priced = value === 'true';
    if (id === 'amount') this.amount = value;
    if (id === 'ready') this.ready = value === 'true';
    if (id === 'explicitAccent') this.explicitAccent = value === 'true';
    if (id === 'enabled') this.enabled = value === 'true';
    if (id === 'selected') this.selected = value === 'true';
    this.draw();
  }
  override controlValue(id: string): string | undefined {
    return id === 'enabled' ? String(this.enabled) : undefined;
  }
  private get showPrice(): boolean {
    return this.priced && ['primary', 'module', 'danger'].includes(this.variant);
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
        ready: this.ready,
        explicitAccent: this.explicitAccent,
      },
      t,
    );
    if (this.variant === 'switch') ButtonSurface.toggle(surface, w, h, this.selected, t);
    const color = this.variant === 'primary' && this.enabled ? t.background : t.accent;
    if (!this.showPrice)
      TerminalUi.icon(
        surface,
        this.variant === 'icon' ? 'gear' : 'play',
        this.variant === 'icon' ? w / 2 : Math.min(w * 0.14, 28),
        h / 2,
        this.variant === 'icon' ? w * 0.5 : Math.min(20, w * 0.25),
        color,
      );
    if (this.showPrice) {
      const label = CyberDrawing.label(button, s.text, 0, h / 2, 18, color);
      const amount = CyberDrawing.label(button, this.amount, 0, h / 2, 18, color);
      const row = ButtonPrice.layout(w, label.width, amount.width, 18, 8, 12);
      label.anchor.set(0.5);
      amount.anchor.set(0.5);
      label.scale.set(row.scale);
      amount.scale.set(row.scale);
      label.position.x = row.labelX;
      amount.position.x = row.amountX;
      TerminalUi.icon(surface, 'credit', row.iconX, h / 2, row.iconSize, color);
    } else if (w > 80 && this.variant !== 'icon') {
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
      this.enabled = false;
      this.draw();
      this.onChange();
    });
  }
}
