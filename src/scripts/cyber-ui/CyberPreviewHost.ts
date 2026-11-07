import { Application } from 'pixi.js';
import type { Ticker } from 'pixi.js';
import { CyberExampleFactory } from './CyberExampleFactory';
import type { CyberExample } from './CyberExample';
import type { CyberPreviewDefinition } from './types';

/** Owns one Canvas, one clock, DOM listeners and a compiled toolkit example. */
export class CyberPreviewHost {
  private readonly app = new Application();
  private readonly listeners = new AbortController();
  private readonly motion = matchMedia('(prefers-reduced-motion: reduce)');
  private readonly viewport: HTMLElement;
  private readonly status: HTMLElement;
  private observer?: ResizeObserver;
  private example?: CyberExample;
  private reduced = this.motion.matches;
  private visible = true;
  private ready = false;
  private disposed = false;

  private constructor(
    private readonly element: HTMLElement,
    private readonly definition: CyberPreviewDefinition,
  ) {
    const viewport = element.querySelector<HTMLElement>('[data-cyber-viewport]');
    const status = element.querySelector<HTMLElement>('[data-cyber-status]');
    if (!viewport || !status) throw new Error('Cyber UI preview is missing its host elements');
    this.viewport = viewport;
    this.status = status;
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
    this.app.ticker.maxFPS = 30;
    this.example = await CyberExampleFactory.create(this.definition.slug);
    this.example.onChange = () => this.render();
    this.example.setReducedMotion(this.reduced);
    this.app.stage.addChild(this.example.root);
    this.app.canvas.setAttribute('role', 'img');
    this.app.canvas.setAttribute('aria-label', this.definition.description);
    this.viewport.replaceChildren(this.app.canvas);
    this.observer = new ResizeObserver(() => this.resize());
    this.observer.observe(this.viewport);
    const options = { signal: this.listeners.signal };
    this.element.addEventListener('input', (event) => this.input(event), options);
    document.addEventListener('visibilitychange', () => this.syncClock(), options);
    this.motion.addEventListener(
      'change',
      (event) => {
        this.reduced = event.matches;
        this.example?.setReducedMotion(this.reduced);
        this.syncClock();
        this.render();
      },
      options,
    );
    this.app.ticker.add(this.tick);
    this.resize();
    this.syncControls();
    for (const control of this.definition.controls) {
      const input = this.element.querySelector<HTMLInputElement | HTMLSelectElement>(
        `[data-cyber-control="${control.id}"]`,
      );
      if (input)
        this.example.control(
          control.id,
          input instanceof HTMLInputElement && input.type === 'checkbox'
            ? String(input.checked)
            : input.value,
        );
    }
    this.syncClock();
    this.element.dataset['ready'] = 'true';
    this.element.querySelector('[data-cyber-controls]')?.removeAttribute('disabled');
  }

  private readonly tick = (ticker: Ticker): void => {
    this.example?.update(Math.min(ticker.deltaMS / 1000, 0.1));
  };

  private resize(): void {
    const width = Math.max(320, Math.round(this.viewport.clientWidth));
    const height = this.example?.canvasHeight ?? 320;
    this.app.renderer.resize(width, height);
    this.example?.resize(width, height);
    this.viewport.style.aspectRatio = `${width} / ${height}`;
    this.syncControls();
    this.render();
  }

  private input(event: Event): void {
    const input = event.target;
    if (!(input instanceof HTMLInputElement || input instanceof HTMLSelectElement)) return;
    const id = input.dataset['cyberControl'];
    if (!id) return;
    const value =
      input instanceof HTMLInputElement && input.type === 'checkbox'
        ? String(input.checked)
        : input.value;
    this.example?.control(id, value);
    if (input instanceof HTMLInputElement && input.type === 'range') {
      const output = input.parentElement?.querySelector('output');
      if (output) output.value = value;
    }
    this.syncControls();
    this.syncClock();
    this.render();
  }

  private syncControls(): void {
    const value = (id: string) =>
      this.element.querySelector<HTMLInputElement | HTMLSelectElement>(
        `[data-cyber-control="${id}"]`,
      )?.value;
    const square = value('panel') === 'square' || value('variant') === 'icon';
    const variant = value('variant');
    const checked = (id: string) =>
      this.element.querySelector<HTMLInputElement>(`[data-cyber-control="${id}"]`)?.checked ??
      false;
    for (const control of this.definition.controls) {
      const input = this.element.querySelector<HTMLInputElement | HTMLSelectElement>(
        `[data-cyber-control="${control.id}"]`,
      );
      if (!input) continue;
      const hidden =
        (control.id === 'state' && value('panel') === 'plate') ||
        (control.id === 'selected' &&
          variant !== undefined &&
          ['primary', 'danger', 'utility', 'line'].includes(variant)) ||
        (control.id === 'surface' &&
          variant !== undefined &&
          (['nav', 'utility', 'line'].includes(variant) ||
            (variant === 'primary' && checked('enabled')) ||
            (variant === 'segment' && !checked('selected')))) ||
        (control.id === 'glass' && (value('panel') === 'plate' || value('state') === 'locked')) ||
        ((control.id === 'height' || control.id === 'text') && square);
      const field = input.closest<HTMLElement>('[data-cyber-field]');
      if (field) field.hidden = hidden;
      input.disabled = hidden;
      if (control.kind === 'range' && control.id === 'width' && input instanceof HTMLInputElement) {
        input.max = String(
          Math.min(control.max, this.app.screen.width - 64, square ? 224 : control.max),
        );
        const effective = input.value;
        this.example?.control('width', effective);
        const output = field?.querySelector('output');
        if (output) output.value = effective;
      }
    }
  }

  private syncClock(): void {
    if (!this.ready || this.disposed) return;
    const active = this.definition.motion && !this.reduced && this.visible && !document.hidden;
    this.example?.setActive(active);
    if (active) this.app.start();
    else this.app.stop();
  }

  private render(): void {
    if (this.ready && !this.disposed) {
      this.app.render();
      this.updateStatus();
    }
  }
  private updateStatus(): void {
    this.status.textContent = this.example?.status ?? '';
  }
}
