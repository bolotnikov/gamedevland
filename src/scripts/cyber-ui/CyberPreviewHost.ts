import { Application } from 'pixi.js';
import { CyberExampleCode } from './CyberExampleCode';
import { CyberExampleFactory } from './CyberExampleFactory';
import type { CyberExample } from './CyberExample';
import type { CyberPreviewDefinition } from './types';

/** Owns the Canvas, compiled example, controls, and matching API snippet. */
export class CyberPreviewHost {
  private readonly app = new Application();
  private readonly listeners = new AbortController();
  private readonly motion = matchMedia('(prefers-reduced-motion: reduce)');
  private readonly viewport: HTMLElement;
  private readonly status: HTMLElement;
  private readonly code: CyberExampleCode | undefined;
  private observer?: ResizeObserver;
  private example?: CyberExample;
  private reduced = this.motion.matches;
  private visible = true;
  private paused = false;
  private requestedReduced = false;
  private ready = false;
  private disposed = false;
  private generation = 0;

  private constructor(
    private readonly element: HTMLElement,
    private readonly definition: CyberPreviewDefinition,
  ) {
    const viewport = element.querySelector<HTMLElement>('[data-cyber-viewport]');
    const status = element.querySelector<HTMLElement>('[data-cyber-status]');
    if (!viewport || !status) throw new Error('Missing Cyber UI host elements');
    this.viewport = viewport;
    this.status = status;
    this.code = element.querySelector('[data-cyber-code]')
      ? new CyberExampleCode(element, definition, this.listeners.signal)
      : undefined;
  }
  static async create(
    element: HTMLElement,
    definition: CyberPreviewDefinition,
  ): Promise<CyberPreviewHost> {
    const host = new CyberPreviewHost(element, definition);
    try {
      await host.init();
      return host;
    } catch (error) {
      host.dispose();
      throw error;
    }
  }
  setVisible(visible: boolean): void {
    this.visible = visible;
    this.syncClock();
  }
  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.generation++;
    this.listeners.abort();
    this.observer?.disconnect();
    if (this.ready) this.app.stop();
    this.example?.dispose();
    if (this.ready) {
      this.app.ticker.remove(this.tick);
      this.app.destroy(true, { children: true });
    }
  }
  private async init(): Promise<void> {
    await this.code?.init();
    await this.app.init({
      width: 480,
      height: 320,
      background: 0x07111d,
      preference: 'webgl',
      antialias: true,
      resolution: Math.min(devicePixelRatio || 1, 2),
      autoDensity: true,
      autoStart: false,
    });
    this.ready = true;
    if (this.disposed) {
      this.app.destroy(true);
      return;
    }
    this.app.ticker.maxFPS = 30;
    this.app.canvas.setAttribute('role', 'img');
    this.app.canvas.setAttribute('aria-label', this.definition.description);
    this.viewport.replaceChildren(this.app.canvas);
    const options = { signal: this.listeners.signal };
    this.element.addEventListener(
      'input',
      (event) => {
        void this.input(event);
      },
      options,
    );
    document.addEventListener('visibilitychange', () => this.syncClock(), options);
    this.motion.addEventListener(
      'change',
      (event) => {
        this.reduced = event.matches || this.requestedReduced;
        void this.rebuild().catch((error) => this.fail(error));
      },
      options,
    );
    this.app.ticker.add(this.tick);
    await this.rebuild();
    this.observer = new ResizeObserver(() => {
      const width = Math.max(320, Math.round(this.viewport.clientWidth));
      if (this.app.screen.width !== width) void this.rebuild().catch((error) => this.fail(error));
    });
    this.observer.observe(this.viewport);
    this.element.dataset['ready'] = 'true';
    this.element.querySelector('[data-cyber-controls]')?.removeAttribute('disabled');
  }
  private async rebuild(): Promise<void> {
    const generation = ++this.generation;
    this.app.stop();
    const example = await CyberExampleFactory.create(this.definition.slug);
    if (this.disposed || generation !== this.generation) {
      example.dispose();
      return;
    }
    this.example?.dispose();
    this.example = example;
    example.onChange = () => this.render();
    for (const control of this.definition.controls) {
      if (control.id === 'paused' || control.id === 'reduced') continue;
      const input = this.control(control.id);
      if (input)
        example.control(
          control.id,
          input instanceof HTMLInputElement && input.type === 'checkbox'
            ? String(input.checked)
            : input.value,
        );
    }
    example.setReducedMotion(this.reduced);
    this.app.stage.addChild(example.root);
    this.resize();
    this.syncClock();
    this.render();
  }
  private readonly tick = (): void => {
    this.example?.update(1 / 30);
  };
  private resize(): void {
    if (!this.ready || this.disposed || !this.example) return;
    const width = Math.max(320, Math.round(this.viewport.clientWidth));
    this.app.renderer.resize(width, this.example.canvasHeight);
    this.example.resize(width, this.example.canvasHeight);
    this.syncControls();
    if (this.app.screen.height !== this.example.canvasHeight) {
      this.app.renderer.resize(width, this.example.canvasHeight);
      this.example.resize(width, this.example.canvasHeight);
    }
    this.viewport.style.aspectRatio = `${width} / ${this.example.canvasHeight}`;
    this.render();
  }
  private async input(event: Event): Promise<void> {
    const input = event.target;
    if (!(input instanceof HTMLInputElement || input instanceof HTMLSelectElement)) return;
    const id = input.dataset['cyberControl'];
    if (!id) return;
    if (input instanceof HTMLInputElement && input.type === 'range') {
      const output = input.parentElement?.querySelector('output');
      if (output) output.value = input.value;
    }
    if (id === 'paused') {
      this.paused = input instanceof HTMLInputElement && input.checked;
      this.syncClock();
      this.render();
      return;
    }
    if (id === 'reduced') {
      this.requestedReduced = input instanceof HTMLInputElement && input.checked;
      this.reduced = this.motion.matches || this.requestedReduced;
    }
    try {
      await this.rebuild();
    } catch (error) {
      this.fail(error);
    }
  }
  private control(id: string): HTMLInputElement | HTMLSelectElement | null {
    return this.element.querySelector<HTMLInputElement | HTMLSelectElement>(
      `[data-cyber-control="${id}"]`,
    );
  }
  private syncControls(): void {
    const value = (id: string) => this.control(id)?.value;
    const checked = (id: string) => {
      const input = this.control(id);
      return input instanceof HTMLInputElement && input.checked;
    };
    const variant = value('variant');
    const panel = this.definition.slug === 'panels';
    const sweep = panel && value('decoration') === 'sweep';
    const square = variant === 'icon';
    const priced = checked('priced') && ['primary', 'module', 'danger'].includes(variant ?? '');
    for (const control of this.definition.controls) {
      const input = this.control(control.id);
      if (!input) continue;
      const hidden =
        (panel && ['direction', 'duration', 'paused', 'reduced'].includes(control.id) && !sweep) ||
        (panel && control.id === 'progress' && value('decoration') !== 'clippedRect') ||
        (control.id === 'priced' && !['primary', 'module', 'danger'].includes(variant ?? '')) ||
        (control.id === 'amount' && !priced) ||
        (this.reduced &&
          (control.id === 'paused' ||
            (this.definition.slug === 'text-echo' && ['shift', 'secondary'].includes(control.id)) ||
            (this.definition.slug === 'binary-field' && control.id === 'rate') ||
            (this.definition.slug === 'panels' && ['direction', 'duration'].includes(control.id)) ||
            (['signal-brackets', 'glitch-lifecycle'].includes(this.definition.slug) &&
              control.id === 'duration') ||
            (this.definition.slug === 'panel-reveal' &&
              ['axis', 'duration'].includes(control.id)) ||
            (['fault-glyph', 'signal-lost'].includes(this.definition.slug) &&
              ['accent', 'duration', 'distortion'].includes(control.id)))) ||
        (control.id === 'selected' &&
          (['primary', 'danger', 'utility', 'line'].includes(variant ?? '') ||
            (variant === 'module' && checked('enabled')))) ||
        (this.definition.slug === 'buttons' && control.id === 'text' && !priced && Number(value('width')) <= 80) ||
        (this.definition.slug === 'fault-glyph' && Number(value('distortion')) === 0 && ['paused', 'reduced'].includes(control.id)) ||
        (control.id === 'surface' &&
          (['nav', 'segment', 'utility', 'line'].includes(variant ?? '') ||
            (variant === 'primary' && checked('enabled')) ||
            (['tab', 'icon'].includes(variant ?? '') && checked('selected')))) ||
        (control.id === 'explicitAccent' &&
          (variant !== 'module' || checked('enabled') || checked('selected'))) ||
        (square && ['height', 'text'].includes(control.id));
      const field = input.closest<HTMLElement>('[data-cyber-field]');
      if (field) field.hidden = hidden;
      input.disabled = hidden;
      if (control.kind === 'range' && control.id === 'width' && input instanceof HTMLInputElement) {
        const before = input.value;
        input.max = String(
          Math.min(control.max, this.app.screen.width - 64, square ? 224 : control.max),
        );
        if (before !== input.value) this.example?.control('width', input.value);
        const output = field?.querySelector('output');
        if (output) output.value = input.value;
      }
    }
  }
  private syncClock(): void {
    if (!this.ready || this.disposed) return;
    const active =
      this.definition.motion &&
      this.example?.animated &&
      !this.paused &&
      !this.reduced &&
      this.visible &&
      !document.hidden;
    this.example?.setActive(Boolean(active));
    if (active) this.app.start();
    else this.app.stop();
  }
  private render(): void {
    if (!this.ready || this.disposed) return;
    this.app.render();
    this.status.textContent = this.example?.status ?? '';
    for (const control of this.definition.controls) {
      const value = this.example?.controlValue(control.id);
      const input = this.control(control.id);
      if (input && value !== undefined) {
        if (input instanceof HTMLInputElement && input.type === 'checkbox')
          input.checked = value === 'true';
        else input.value = value;
      }
    }
    this.syncControls();
    this.updateSource();
  }
  private updateSource(): void {
    this.code?.update(
      this.app.screen.width,
      this.app.screen.height,
      this.reduced,
      this.paused,
    );
  }
  private fail(error: unknown): void {
    console.error('Cyber UI preview failed', error);
    this.element.dataset['ready'] = 'error';
    this.status.textContent = 'Не удалось обновить пример';
  }
}
