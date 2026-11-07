import { CyberPreset, TerminalGlass, TerminalUi } from '@gamedevland/cyber-ui';
import { Container } from 'pixi.js';
import { CyberDrawing } from './CyberDrawing';
import { CyberExample } from './CyberExample';

export class CyberSurfaceExample extends CyberExample {
  private scale = 1;
  private focused = false;
  constructor(private readonly lesson: 'installation' | 'host-contract' | 'panels') {
    super();
  }
  get status(): string {
    return this.lesson === 'host-contract'
      ? `parent.scale = ${this.scale.toFixed(1)}`
      : 'TerminalGlass.draw() → Graphics';
  }
  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.draw();
  }
  override control(id: string, value: string): void {
    if (id === 'scale') this.scale = Number(value);
    if (id === 'focus') this.focused = value === 'true';
    this.draw();
  }
  private draw(): void {
    CyberDrawing.clear(this.root);
    const t = CyberPreset.palette;
    const parent = this.root.addChild(new Container());
    parent.position.set(24, 24);
    parent.scale.set(this.scale);
    const w = this.width - 48;
    const panel = CyberDrawing.panel(parent, 0, 0, w, this.height - 48);
    if (this.lesson === 'installation') return;
    TerminalUi.plate(panel, 20, 20, 140, 36, 7, t.inset, t.panelEdge);
    TerminalUi.icon(panel, 'credit', 40, 38, 18, t.accent);
    CyberDrawing.label(parent, '1 250', 60, 29);
    if (this.lesson === 'host-contract') {
      CyberDrawing.label(parent, 'HOST → GRAPHICS', 20, 92, 18);
      CyberDrawing.label(parent, 'layout · text · input', 20, 126, 13, t.muted);
    }
    if (this.focused) TerminalGlass.focus(panel, 0, 0, w, this.height - 48, t.accent);
  }
}
