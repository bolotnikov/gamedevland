/** Preserve links to lessons merged into the concise bilingual course. */
export class CyberUiRoutes {
  static readonly redirects: Readonly<Record<string, string>> = {
    'button-price': 'buttons',
    'surface-details': 'panels',
    'terminal-sweep': 'panels',
    'sdk-effects': 'sdk-components',
    'custom-effects': 'api-reference',
  };
}
