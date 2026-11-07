import {
  BinaryField,
  ButtonSurface,
  CyberPreset,
  FaultGlyph,
  TerminalUi,
} from '@gamedevland/cyber-ui';
import { Graphics } from 'pixi.js';
import { CyberDrawing } from './CyberDrawing';
import { CyberExample } from './CyberExample';

export class CyberApiExample extends CyberExample {
  private api = 'TerminalGlass.draw';
  get status(): string {
    return `${this.api}() → Graphics`;
  }
  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.draw();
  }
  override control(id: string, value: string): void {
    if (id === 'api') {
      this.api = value;
      this.draw();
    }
  }
  private draw(): void {
    CyberDrawing.clear(this.root);
    const t = CyberPreset.palette;
    const w = this.width - 64;
    const g = this.root.addChild(new Graphics());
    g.position.set(32, 80);
    if (this.api === 'TerminalGlass.draw') CyberDrawing.panel(this.root, 32, 80, w, 160);
    if (this.api === 'TerminalUi.plate') TerminalUi.plate(g, 0, 0, w, 160, 12, t.inset, t.accent);
    if (this.api === 'ButtonSurface.draw')
      ButtonSurface.draw(
        g,
        { width: w, height: 56, variant: 'primary', enabled: true, selected: false },
        t,
      );
    if (this.api === 'TerminalUi.icon') TerminalUi.icon(g, 'chip', w / 2, 80, 64, t.accent);
    if (this.api === 'BinaryField.draw') {
      BinaryField.draw(g, { x: 0, y: 0, w, h: 160 }, 12, 9, 7291, 0);
      g.fill({ color: t.accent, alpha: 0.18 });
    }
    if (this.api === 'FaultGlyph.draw') FaultGlyph.draw(g, w / 2, 80, t.danger, t.signal, 1, 0, 4);
    CyberDrawing.label(this.root, this.api + '()', 24, 30, 15, t.muted);
  }
}
