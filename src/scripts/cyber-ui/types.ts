export type CyberLesson =
  | 'installation'
  | 'host-contract'
  | 'panels'
  | 'buttons'
  | 'icons-theme'
  | 'binary-field'
  | 'triangle-loader'
  | 'text-echo'
  | 'glitch-lifecycle'
  | 'sdk-components'
  | 'panel-reveal'
  | 'api-reference';
export type CyberControl =
  | { readonly kind: 'button'; readonly id: string; readonly label: string }
  | {
      readonly kind: 'checkbox';
      readonly id: string;
      readonly label: string;
      readonly checked: boolean;
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
