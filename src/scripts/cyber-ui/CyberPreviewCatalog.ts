import type { CyberPreviewDefinition } from './types';

/** Shared server/client metadata; importing this catalog never loads Pixi. */
export class CyberPreviewCatalog {
  private static readonly entries: readonly CyberPreviewDefinition[] = [
    {
      slug: 'installation',
      description: 'Панель из TerminalGlass.draw(). Размеры подстраиваются под ширину примера.',
      motion: false,
      controls: [],
    },
    {
      slug: 'host-contract',
      description:
        'Приложение меняет масштаб родителя. Панель, текст и иконка масштабируются вместе.',
      motion: false,
      controls: [
        {
          kind: 'range',
          id: 'scale',
          label: 'Масштаб родителя',
          min: 0.6,
          max: 1,
          step: 0.1,
          value: 1,
        },
      ],
    },
    {
      slug: 'panels',
      description: 'Стеклянная панель, плашка счётчика и иконка credit из примера.',
      motion: false,
      controls: [{ kind: 'checkbox', id: 'focus', label: 'Акцент focus()', checked: false }],
    },
    {
      slug: 'buttons',
      description: 'Оформление и ввод связаны с одним состоянием. Нажатие увеличивает счётчик.',
      motion: false,
      controls: [
        {
          kind: 'select',
          id: 'variant',
          label: 'variant',
          options: [
            'primary',
            'module',
            'danger',
            'icon',
            'nav',
            'segment',
            'switch',
            'utility',
            'line',
          ].map((value) => ({ value, label: value })),
        },
        { kind: 'checkbox', id: 'enabled', label: 'enabled', checked: true },
        { kind: 'checkbox', id: 'selected', label: 'selected', checked: false },
        { kind: 'button', id: 'tap', label: 'Нажать кнопку' },
      ],
    },
    {
      slug: 'icons-theme',
      description: '27 векторных иконок. Размер меняет геометрию, название остаётся под знаком.',
      motion: false,
      controls: [
        { kind: 'range', id: 'size', label: 'Размер иконки', min: 16, max: 32, step: 4, value: 24 },
      ],
    },
    {
      slug: 'binary-field',
      description: 'Один seed и один frame дают один узор. Сброс возвращает исходный кадр.',
      motion: false,
      controls: [
        { kind: 'button', id: 'frame', label: 'Следующий кадр' },
        { kind: 'button', id: 'seed', label: 'Другой seed' },
        { kind: 'button', id: 'reset', label: 'Сбросить' },
      ],
    },
    {
      slug: 'triangle-loader',
      description: 'Реальный TriangleLoader: контуры и частицы получают секунды из ticker.',
      motion: true,
      controls: [],
    },
    {
      slug: 'text-echo',
      description: 'TextEcho смещает основной текст и его цветную копию. Начальное время — 0.09 с.',
      motion: true,
      controls: [],
    },
    {
      slug: 'glitch-lifecycle',
      description:
        'SurfaceGlitch меняет только геометрию панели. Подпись остаётся отдельным объектом.',
      motion: true,
      controls: [
        { kind: 'button', id: 'hide', label: 'hide()' },
        { kind: 'button', id: 'show', label: 'show()' },
        { kind: 'button', id: 'dispose', label: 'dispose()' },
        { kind: 'button', id: 'reset', label: 'Создать эффект' },
      ],
    },
    {
      slug: 'sdk-components',
      description:
        'Настоящие SDK Graphics и ToolkitComponent. Переподключение повторяет init → ready → enable.',
      motion: false,
      controls: [
        { kind: 'button', id: 'detach', label: 'Отключить компонент' },
        { kind: 'button', id: 'attach', label: 'Подключить компонент' },
      ],
    },
    {
      slug: 'panel-reveal',
      description:
        'Геометрия PanelTransition и реальные твины SDK. В уроке ими управляет действие PanelReveal.',
      motion: true,
      controls: [
        {
          kind: 'select',
          id: 'axis',
          label: 'axis',
          options: ['down', 'right', 'zoom'].map((value) => ({ value, label: value })),
        },
        { kind: 'button', id: 'open', label: 'Открыть' },
        { kind: 'button', id: 'close', label: 'Закрыть' },
        { kind: 'button', id: 'cancel', label: 'Отменить' },
      ],
    },
    {
      slug: 'api-reference',
      description: 'Выбор API меняет рисунок и показывает вызов, который его строит.',
      motion: false,
      controls: [
        {
          kind: 'select',
          id: 'api',
          label: 'API',
          options: [
            'TerminalGlass.draw',
            'TerminalUi.plate',
            'ButtonSurface.draw',
            'TerminalUi.icon',
            'BinaryField.draw',
            'FaultGlyph.draw',
          ].map((value) => ({ value, label: value })),
        },
      ],
    },
  ];

  static get(slug: string): CyberPreviewDefinition {
    const entry = this.entries.find((entry) => entry.slug === slug);
    if (!entry) throw new Error(`Unknown Cyber UI lesson: ${slug}`);
    return entry;
  }
}
