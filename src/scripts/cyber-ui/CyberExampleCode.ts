import type { CyberPreviewDefinition } from './types';
import { CyberApiSnippet } from './CyberApiSnippet';
import { CyberCodeHighlighter } from './CyberCodeHighlighter';
import { Locale } from '../../i18n/Locale';

/** Shows only the public API call and the current visual parameters. */
export class CyberExampleCode {
  private readonly code: HTMLElement;
  private readonly copy: HTMLButtonElement;
  private readonly locale = Locale.fromDocument();
  private highlighter?: CyberCodeHighlighter;
  private source = '';

  constructor(
    private readonly element: HTMLElement,
    private readonly definition: CyberPreviewDefinition,
    signal: AbortSignal,
  ) {
    const code = element.querySelector<HTMLElement>('[data-cyber-code]');
    const copy = element.querySelector<HTMLButtonElement>('[data-cyber-copy]');
    if (!code || !copy) throw new Error('Missing example code elements');
    this.code = code;
    this.copy = copy;
    copy.addEventListener('click', () => { void this.copySource(); }, { signal });
  }

  async init(): Promise<void> {
    this.highlighter = await CyberCodeHighlighter.create();
  }

  update(width: number, height: number, reduced: boolean, paused: boolean): void {
    if (!this.highlighter) throw new Error('Code highlighter is not initialized');
    const values: Record<string, string | number | boolean> = {};
    for (const control of this.definition.controls) {
      if (control.id === 'paused' || control.id === 'reduced') continue;
      const input = this.element.querySelector<HTMLInputElement | HTMLSelectElement>(
        `[data-cyber-control="${control.id}"]`,
      );
      if (!input) throw new Error(`Missing control ${control.id}`);
      values[control.id] = input instanceof HTMLInputElement && input.type === 'checkbox'
        ? input.checked : control.kind === 'range' ? Number(input.value) : input.value;
    }
    const source = CyberApiSnippet.create(this.definition.slug, values, width, height, reduced, paused);
    if (source === this.source) return;
    this.source = source;
    this.code.replaceChildren(this.highlighter.render(source));
    this.copy.textContent = this.locale.t('Copy');
  }

  private async copySource(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.source);
      this.copy.textContent = this.locale.t('Copied');
    } catch {
      this.copy.textContent = this.locale.t('Не удалось скопировать');
    }
  }
}
