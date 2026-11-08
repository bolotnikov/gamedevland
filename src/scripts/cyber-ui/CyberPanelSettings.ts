import { CyberPreset } from '@gamedevland/cyber-ui';
import type { ButtonPalette } from '@gamedevland/cyber-ui';
import type { CyberPanelVariant } from './types';

/** Editable surface values shared by panel, button and effect examples. */
export class CyberPanelSettings {
  variant: CyberPanelVariant = 'glass';
  accent = CyberPreset.palette.accent;
  surface = CyberPreset.palette.panel;
  width = 280;
  height = 168;
  text = 'COMMAND CENTER';

  get palette(): ButtonPalette {
    return {
      ...CyberPreset.palette,
      accent: this.accent,
      focus: this.accent,
      panel: this.surface,
      inset: this.surface,
      signal: this.accent,
    };
  }
  set(id: string, value: string): void {
    if (id === 'panel') {
      switch (value) {
        case 'glass':
        case 'panel':
        case 'plate':
          this.variant = value;
      }
    }
    if (id === 'accent') this.accent = Number.parseInt(value.slice(1), 16);
    if (id === 'surface') this.surface = Number.parseInt(value.slice(1), 16);
    if (id === 'width') this.width = Number(value);
    if (id === 'height') this.height = Number(value);
    if (id === 'text') this.text = value;
  }
}
