import { CyberPreset } from '@gamedevland/cyber-ui';
import { Text } from 'pixi.js';
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

  static clear(parent: Container): void {
    for (const child of parent.removeChildren()) child.destroy({ children: true, context: true });
  }
}
