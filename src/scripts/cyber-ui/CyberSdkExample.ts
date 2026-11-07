import { Graphics as SdkGraphics } from '@gamedevland/engine/layouts';
import { Graphics } from 'pixi.js';
import { CyberDrawing } from './CyberDrawing';
import { CyberExample } from './CyberExample';
import { CyberPanelComponent } from './CyberPanelComponent';

export class CyberSdkExample extends CyberExample {
  private readonly node = new SdkGraphics(new Graphics());
  private readonly title = CyberDrawing.label(this.root, 'SDK Graphics', 48, 70, 18);
  private readonly subtitle = CyberDrawing.label(
    this.root,
    'ToolkitComponent.onReady()',
    48,
    108,
    13,
  );
  private component: CyberPanelComponent | undefined;
  private attached = true;
  constructor() {
    super();
    this.root.addChildAt(this.node.view, 0);
  }
  get status(): string {
    return this.component
      ? 'init → ready → enable · панель нарисована'
      : 'detach · рисунок остался у SDK Graphics';
  }
  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.node.setPosition(24, 40);
    if (this.attached) this.attach();
  }
  override control(id: string): void {
    if (id === 'detach') {
      this.detach();
      this.attached = false;
    }
    if (id === 'attach') {
      this.attached = true;
      this.attach();
    }
  }
  override dispose(): void {
    this.detach();
    super.dispose();
  }
  private attach(): void {
    this.detach();
    const component = new CyberPanelComponent();
    component.init(this.node, { width: this.width - 48, height: 240, cut: 12 });
    component.ready();
    component.enable();
    this.component = component;
    this.title.visible = true;
    this.subtitle.visible = true;
  }
  private detach(): void {
    if (!this.component) return;
    void this.component.onDetach();
    void this.component.completeDetach();
    this.component = undefined;
  }
}
