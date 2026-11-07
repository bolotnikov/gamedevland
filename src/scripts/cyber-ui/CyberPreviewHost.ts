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
  private playing: boolean;
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
    this.playing = definition.motion && definition.slug !== 'glitch-lifecycle';
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
    this.element.addEventListener('click', (event) => this.click(event), options);
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
    this.syncClock();
    this.element.dataset['ready'] = 'true';
    this.element.querySelector('[data-cyber-controls]')?.removeAttribute('disabled');
  }

  private readonly tick = (ticker: Ticker): void => {
    this.example?.update(Math.min(ticker.deltaMS / 1000, 0.1));
    this.updateStatus();
  };

  private resize(): void {
    const width = Math.max(320, Math.round(this.viewport.clientWidth));
    this.app.renderer.resize(width, 320);
    this.example?.resize(width, 320);
    this.viewport.style.aspectRatio = `${width} / 320`;
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
    if (id === 'reduced') {
      this.reduced = value === 'true';
      this.example?.setReducedMotion(this.reduced);
    } else this.example?.control(id, value);
    if (input instanceof HTMLInputElement && input.type === 'range') {
      const output = input.parentElement?.querySelector('output');
      if (output) output.value = value;
    }
    this.syncClock();
    this.render();
  }

  private click(event: MouseEvent): void {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest<HTMLButtonElement>('button[data-cyber-action]');
    const action = button?.dataset['cyberAction'];
    if (!action) return;
    if (action === 'play') this.playing = !this.playing;
    else if (action === 'step') {
      this.playing = false;
      if (!this.reduced) {
        this.example?.setActive(true);
        this.example?.update(0.09);
      }
    } else this.example?.control(action, '');
    this.syncClock();
    this.render();
  }

  private syncClock(): void {
    if (!this.ready || this.disposed) return;
    const active = this.playing && !this.reduced && this.visible && !document.hidden;
    this.example?.setActive(active);
    if (active) this.app.start();
    else this.app.stop();
    const play = this.element.querySelector<HTMLButtonElement>('[data-cyber-action="play"]');
    if (play) {
      play.textContent = this.playing ? 'Пауза' : 'Продолжить';
      play.disabled = this.reduced;
    }
    const step = this.element.querySelector<HTMLButtonElement>('[data-cyber-action="step"]');
    if (step) step.disabled = this.reduced;
    const reduced = this.element.querySelector<HTMLInputElement>('[data-cyber-control="reduced"]');
    if (reduced) reduced.checked = this.reduced;
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
