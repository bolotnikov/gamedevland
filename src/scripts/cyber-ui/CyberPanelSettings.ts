import { CyberPreset } from '@gamedevland/cyber-ui';
import type { ButtonPalette } from '@gamedevland/cyber-ui';
import type { CyberPanelVariant } from './types';

/** Editable surface values shared by panel, button and effect examples. */
export class CyberPanelSettings {
  variant: CyberPanelVariant = 'window';
  glass = true;
  accent = CyberPreset.palette.accent;
  surface = CyberPreset.palette.panel;
  width = 280;
  height = 168;
  text = 'COMMAND CENTER';
  state = 'normal';

  get palette(): ButtonPalette {
    return {
      ...CyberPreset.palette,
      background: this.state === 'locked' ? this.surface : CyberPreset.palette.background,
      accent: this.accent,
      focus: this.accent,
      panel: this.surface,
      inset: this.surface,
      steel: this.surface,
      sapphire: this.surface,
      signal: this.accent,
      danger: this.accent,
    };
  }
  set(id: string, value: string): void {
    if (id === 'panel') {
      switch (value) {
        case 'window':
        case 'plate':
        case 'square':
        case 'card':
        case 'research':
        case 'module':
          this.variant = value;
      }
    }
    if (id === 'glass') this.glass = value === 'true';
    if (id === 'accent') this.accent = Number.parseInt(value.slice(1), 16);
    if (id === 'surface') this.surface = Number.parseInt(value.slice(1), 16);
    if (id === 'width') this.width = Number(value);
    if (id === 'height') this.height = Number(value);
    if (id === 'text') this.text = value;
    if (id === 'state') this.state = value;
  }
}
