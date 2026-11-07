import { CyberPreset, TerminalGlass } from '@gamedevland/cyber-ui';
import { ToolkitComponent } from '@gamedevland/cyber-ui-sdk';
import type { Graphics } from '@gamedevland/engine/layouts';
import { SchemaDecoder as S } from '@gamedevland/engine/validation';
import type { InferDecoded } from '@gamedevland/engine/validation';

const decoder = S.object({
  width: S.number({ min: 48 }),
  height: S.number({ min: 28 }),
  cut: S.number({ min: 0 }),
});

/** The same panel component as the lesson, mounted on a real SDK Graphics node. */
export class CyberPanelComponent extends ToolkitComponent<InferDecoded<typeof decoder>, Graphics> {
  protected readonly configDecoder = decoder;
  protected override onReady(): void {
    const { width, height, cut } = this.config;
    const t = CyberPreset.palette;
    TerminalGlass.draw(
      this.node.view.clear(),
      0,
      0,
      width,
      height,
      cut,
      t.panel,
      t.panelEdge,
      t.accent,
      t.text,
    );
  }
}
