export type CyberLesson =
  | 'selectors'
  | 'button-price'
  | 'surface-details'
  | 'signal-brackets'
  | 'terminal-sweep'
  | 'fault-glyph'
  | 'signal-lost'
  | 'panels'
  | 'buttons'
  | 'icons-theme'
  | 'binary-field'
  | 'triangle-loader'
  | 'text-echo'
  | 'glitch-lifecycle'
  | 'panel-reveal';

export type CyberPanelVariant = 'glass' | 'panel' | 'plate';
export type CyberControl =
  | {
      readonly kind: 'checkbox';
      readonly id: string;
      readonly label: string;
      readonly checked: boolean;
    }
  | {
      readonly kind: 'color' | 'text';
      readonly id: string;
      readonly label: string;
      readonly value: string;
    }
  | {
      readonly kind: 'range';
      readonly id: string;
      readonly label: string;
      readonly min: number;
      readonly max: number;
      readonly step: number;
      readonly value: number;
    }
  | {
      readonly kind: 'select';
      readonly id: string;
      readonly label: string;
      readonly options: readonly { readonly value: string; readonly label: string }[];
    };
export interface CyberPreviewDefinition {
  readonly slug: CyberLesson;
  readonly description: string;
  readonly motion: boolean;
  readonly controls: readonly CyberControl[];
}
