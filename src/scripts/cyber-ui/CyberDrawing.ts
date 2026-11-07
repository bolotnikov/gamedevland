import { CyberPreset, TerminalGlass } from '@gamedevland/cyber-ui';
import { Graphics, Text } from 'pixi.js';
import type { Container } from 'pixi.js';

export class CyberDrawing {
  static label(
    parent: Container,
    text: string,
    x: number,
    y: number,
    size = 16,
    color = CyberPreset.palette.text,
  ): Text {
    const label = parent.addChild(
      new Text({ text, style: { fontFamily: 'monospace', fontSize: size, fill: color } }),
    );
    label.position.set(x, y);
    label.eventMode = 'none';
    return label;
  }

  static panel(parent: Container, x: number, y: number, width: number, height: number): Graphics {
    const t = CyberPreset.palette;
    const g = parent.addChild(new Graphics());
    g.position.set(x, y);
    TerminalGlass.draw(g, 0, 0, width, height, 12, t.panel, t.panelEdge, t.accent, t.text);
    return g;
  }

  static clear(parent: Container): void {
    for (const child of parent.removeChildren()) child.destroy({ children: true, context: true });
  }
}
