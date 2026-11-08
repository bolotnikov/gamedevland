import { PanelSurface, TerminalGlass, TerminalUi } from '@gamedevland/cyber-ui';
import type { ButtonPalette } from '@gamedevland/cyber-ui';
import type { Graphics } from 'pixi.js';
import type { CyberPanelVariant } from './types';

/** Shows the public surface primitives without adding game-specific skins. */
export class CyberPanelSkin {
  static draw(
    g: Graphics,
    variant: CyberPanelVariant,
    w: number,
    h: number,
    t: ButtonPalette,
  ): void {
    if (variant === 'panel')
      PanelSurface.draw(
        g,
        { x: 0, y: 0, w, h },
        { surface: t.panel, edge: t.panelEdge, accent: t.accent },
      );
    else if (variant === 'plate') TerminalUi.plate(g, 0, 0, w, h, 12, t.inset, t.panelEdge);
    else TerminalGlass.draw(g, 0, 0, w, h, 12, t.panel, t.panelEdge, t.accent, t.text);
  }
}
