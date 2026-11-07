import { ButtonSurface, TerminalGlass, TerminalUi } from '@gamedevland/cyber-ui';
import type { ButtonPalette } from '@gamedevland/cyber-ui';
import type { Graphics } from 'pixi.js';
import type { CyberPanelVariant } from './types';

/** Panel chrome follows BattleOverlay and HubConsole; game portraits remain game-owned. */
export class CyberPanelSkin {
  static draw(
    g: Graphics,
    variant: CyberPanelVariant,
    w: number,
    h: number,
    glass: boolean,
    t: ButtonPalette,
    state = 'normal',
  ): void {
    const selected = state === 'selected';
    const locked = state === 'locked';
    const fill = selected
      ? t.steel
      : variant === 'card' || variant === 'square'
        ? t.inset
        : t.panel;
    const edge = selected ? t.signal : t.panelEdge;
    const cut = variant === 'window' ? 19 : variant === 'square' ? 8 : 7;
    if (variant === 'window') TerminalUi.plate(g, 3, 5, w, h, cut, t.background, t.background);
    if (variant === 'module' && glass) {
      ButtonSurface.draw(
        g,
        { width: w, height: h, variant: 'module', enabled: !locked, selected },
        t,
      );
    } else if (variant === 'plate' || !glass || locked) {
      TerminalUi.plate(
        g,
        0,
        0,
        w,
        h,
        cut,
        locked ? t.background : fill,
        variant === 'plate' ? t.accent : edge,
      );
    } else TerminalGlass.draw(g, 0, 0, w, h, cut, fill, edge, t.accent, t.text);
    if (variant === 'module' && !glass)
      g.rect(1, 6, 2, Math.max(1, h - 12)).fill({ color: t.accent, alpha: 0.84 });
    if (variant === 'square')
      TerminalUi.icon(g, 'gear', w / 2, h / 2, Math.min(w, h) * 0.5, t.accent);
    if (variant === 'card') {
      TerminalUi.icon(
        g,
        'agents',
        w / 2,
        h * 0.3,
        Math.min(h * 0.4, w * 0.45, 42),
        locked ? t.muted : t.accent,
      );
      if (locked) TerminalUi.icon(g, 'lock', w - 11, 11, 11, t.signal);
    }
    if (variant === 'research') {
      for (let tier = 0; tier < 3; tier++)
        g.rect(8 + tier * 4, 8, 2, 4).fill({
          color: locked ? t.muted : t.accent,
          alpha: locked ? 0.35 : 0.8,
        });
      TerminalUi.icon(
        g,
        locked ? 'lock' : 'chip',
        w / 2,
        h * 0.3,
        Math.min(32, w * 0.35, h * 0.3),
        locked ? t.muted : t.accent,
      );
      for (let rank = 0; rank < 3; rank++)
        g.roundRect(w / 2 - 15 + rank * 10 + 1, h - 5, 8, 2, 1).fill({
          color: rank === 0 && !locked ? t.signal : t.muted,
          alpha: rank === 0 && !locked ? 1 : 0.25,
        });
      if (locked) {
        for (let x = cut + 2; x < w - cut; x += 7)
          g.moveTo(x, 2)
            .lineTo(Math.min(x + 3, w - cut), 2)
            .moveTo(x, h - 2)
            .lineTo(Math.min(x + 3, w - cut), h - 2);
        for (let y = cut + 2; y < h - cut; y += 7)
          g.moveTo(2, y)
            .lineTo(2, Math.min(y + 3, h - cut))
            .moveTo(w - 2, y)
            .lineTo(w - 2, Math.min(y + 3, h - cut));
        g.stroke({ color: t.muted, width: 1, alpha: 0.45 });
      }
    }
    if (selected && (variant === 'research' || variant === 'card' || variant === 'module'))
      TerminalGlass.focus(g, 0, 0, w, h, t.signal);
  }
}
