import { Locale } from '../../i18n/Locale';
import { CyberPreviewCatalog } from './CyberPreviewCatalog';
import type { CyberPreviewHost } from './CyberPreviewHost';

/** Lazy loading keeps Pixi and SDK runtime out of unrelated lessons. */
export class CyberPreviewController {
  private readonly observer: IntersectionObserver;
  private readonly listeners = new AbortController();
  private host?: CyberPreviewHost;
  private loading = false;
  private visible = false;
  private disposed = false;

  constructor(private readonly element: HTMLElement) {
    this.observer = new IntersectionObserver((entries) => {
      this.visible = entries.some((entry) => entry.isIntersecting);
      if (this.visible && !this.host && !this.loading) void this.start();
      this.host?.setVisible(this.visible);
    });
    this.observer.observe(element);
    window.addEventListener(
      'pagehide',
      (event) => {
        if (event.persisted) this.host?.setVisible(false);
        else this.dispose();
      },
      { signal: this.listeners.signal },
    );
    window.addEventListener('pageshow', () => this.host?.setVisible(this.visible), {
      signal: this.listeners.signal,
    });
  }

  private async start(): Promise<void> {
    this.loading = true;
    try {
      const slug = this.element.dataset['cyberPreview'];
      if (!slug) throw new Error('Missing Cyber UI lesson slug');
      const definition = CyberPreviewCatalog.get(slug, Locale.fromDocument());
      const { CyberPreviewHost } = await import('./CyberPreviewHost');
      if (this.disposed) return;
      const host = await CyberPreviewHost.create(this.element, definition);
      if (this.disposed) {
        host.dispose();
        return;
      }
      this.host = host;
      host.setVisible(this.visible);
    } catch (error) {
      if (this.disposed) return;
      const status = this.element.querySelector('[data-cyber-status]');
      if (status)
        status.textContent = Locale.fromDocument().t('Canvas не удалось запустить. Код примера остаётся доступен ниже.');
      const viewport = this.element.querySelector('[data-cyber-viewport]');
      if (viewport) viewport.textContent = Locale.fromDocument().t('Canvas недоступен');
      this.element.dataset['ready'] = 'error';
      console.error('Cyber UI preview failed', error);
    }
  }

  private dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.observer.disconnect();
    this.listeners.abort();
    this.host?.dispose();
  }
}
