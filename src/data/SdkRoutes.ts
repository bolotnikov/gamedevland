/** Preserve URLs shared before rendering lessons received their own section. */
export class SdkRoutes {
  static readonly redirects: Readonly<Record<string, string>> = {
    'foundations/renderers': 'rendering/renderers',
    'presentation/pixi-only': 'rendering/pixi-only',
    'presentation/three-only': 'rendering/three-only',
    'presentation/three-pixi': 'rendering/three-pixi',
    'presentation/three-texture': 'rendering/three-texture',
    'presentation/three-models': 'rendering/three-models',
    'presentation/presentation-order': 'rendering/presentation-order',
  };
}
