import { ButtonPrice, ButtonSurface, TerminalUi } from '@gamedevland/cyber-ui';
import { Container, Graphics } from 'pixi.js';
import { CyberDrawing } from './CyberDrawing';
import { CyberExample } from './CyberExample';
import { CyberPanelSettings } from './CyberPanelSettings';

export class CyberPriceExample extends CyberExample {
  private readonly settings = new CyberPanelSettings();
  private amount = '250';
  private scale = 1;
  constructor() {
    super();
    this.settings.width = 248;
    this.settings.text = 'UPGRADE';
  }
  override get canvasHeight(): number {
    return 152;
  }
  get status(): string {
    return `ButtonPrice.layout · scale: ${this.scale.toFixed(2)}`;
  }
  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.draw();
  }
  override control(id: string, value: string): void {
    this.settings.set(id, value);
    if (id === 'amount') this.amount = value;
    this.draw();
  }
  private draw(): void {
    CyberDrawing.clear(this.root);
    const t = this.settings.palette;
    const w = Math.min(this.settings.width, this.width - 48);
    const button = this.root.addChild(new Container());
    button.position.set((this.width - w) / 2, (this.height - 56) / 2);
    const g = button.addChild(new Graphics());
    ButtonSurface.draw(
      g,
      { width: w, height: 56, variant: 'primary', enabled: true, selected: false },
      t,
    );
    const label = CyberDrawing.label(button, this.settings.text, 0, 28, 18, t.background);
    const amount = CyberDrawing.label(button, this.amount, 0, 28, 18, t.background);
    const row = ButtonPrice.layout(w, label.width, amount.width, 18, 8, 12);
    this.scale = row.scale;
    label.anchor.set(0.5);
    amount.anchor.set(0.5);
    label.scale.set(row.scale);
    amount.scale.set(row.scale);
    label.position.x = row.labelX;
    amount.position.x = row.amountX;
    TerminalUi.icon(g, 'credit', row.iconX, 28, row.iconSize, t.background);
  }
}
