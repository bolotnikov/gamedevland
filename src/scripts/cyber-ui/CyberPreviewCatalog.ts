import type { Locale } from '../../i18n/Locale';
import type { CyberControl, CyberPreviewDefinition } from './types';

/** Authored controls describe visible parameters, never renderer lifecycle operations. */
export class CyberPreviewCatalog {
  private static readonly accent: CyberControl = {
    kind: 'color',
    id: 'accent',
    label: 'Акцент',
    value: '#70ccff',
  };
  private static readonly surface: CyberControl = {
    kind: 'color',
    id: 'surface',
    label: 'Цвет панели',
    value: '#101f39',
  };
  private static readonly text: CyberControl = {
    kind: 'text',
    id: 'text',
    label: 'Подпись',
    value: 'COMMAND CENTER',
  };
  private static readonly panelControls: readonly CyberControl[] = [
    {
      kind: 'select',
      id: 'panel',
      label: 'Вид панели',
      options: [
        { value: 'window', label: 'Окно с тенью' },
        { value: 'plate', label: 'Плоская плашка' },
        { value: 'square', label: 'Квадратная кнопка' },
        { value: 'card', label: 'Карточка агента' },
        { value: 'research', label: 'Ячейка исследования' },
        { value: 'module', label: 'Кнопка модуля' },
      ],
    },
    { kind: 'checkbox', id: 'glass', label: 'Стеклянная поверхность', checked: true },
    this.accent,
    this.surface,
    { kind: 'range', id: 'width', label: 'Ширина', min: 72, max: 360, step: 8, value: 280 },
    { kind: 'range', id: 'height', label: 'Высота', min: 48, max: 224, step: 8, value: 168 },
  ];
  private static readonly entries: readonly CyberPreviewDefinition[] = [
    {
      slug: 'panels',
      description:
        'Шесть поверхностей из интерфейса AI Defender. Сверху — выбранная панель с редактируемыми параметрами.',
      motion: false,
      controls: [
        ...this.panelControls,
        this.text,
        {
          kind: 'select',
          id: 'state',
          label: 'Состояние',
          options: [
            { value: 'normal', label: 'Обычное' },
            { value: 'selected', label: 'Выбранное' },
            { value: 'locked', label: 'Заблокированное' },
          ],
        },
      ],
    },
    {
      slug: 'buttons',
      description:
        'Нажатие работает прямо на Canvas. Вид, размеры, подпись и цвета задаются в форме.',
      motion: false,
      controls: [
        {
          kind: 'select',
          id: 'variant',
          label: 'Вид кнопки',
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
        this.accent,
        { kind: 'color', id: 'surface', label: 'Цвет поверхности', value: '#101f39' },
        { kind: 'text', id: 'text', label: 'Подпись', value: 'START' },
        { kind: 'range', id: 'width', label: 'Ширина', min: 56, max: 280, step: 8, value: 216 },
        { kind: 'range', id: 'height', label: 'Высота', min: 40, max: 120, step: 8, value: 56 },
        { kind: 'checkbox', id: 'enabled', label: 'Доступна', checked: true },
        { kind: 'checkbox', id: 'selected', label: 'Выбрана', checked: false },
      ],
    },
    {
      slug: 'icons-theme',
      description: 'Полный набор векторных иконок. Размер и цвет применяются ко всем знакам.',
      motion: false,
      controls: [
        this.accent,
        { kind: 'range', id: 'size', label: 'Размер иконки', min: 16, max: 32, step: 4, value: 24 },
      ],
    },
    {
      slug: 'binary-field',
      description:
        'Бинарный фон анимируется автоматически. Частота, размер символов и цвет меняются без перезапуска времени.',
      motion: true,
      controls: [
        this.accent,
        {
          kind: 'range',
          id: 'rate',
          label: 'Кадров узора в секунду',
          min: 2,
          max: 16,
          step: 1,
          value: 8,
        },
        { kind: 'range', id: 'cell', label: 'Размер символов', min: 6, max: 18, step: 1, value: 9 },
        {
          kind: 'range',
          id: 'opacity',
          label: 'Непрозрачность',
          min: 0.1,
          max: 0.7,
          step: 0.05,
          value: 0.25,
        },
      ],
    },
    {
      slug: 'triangle-loader',
      description:
        'Загрузчик работает автоматически: вращение контуров и движение частиц, как на экране загрузки игры.',
      motion: true,
      controls: [
        this.accent,
        { kind: 'color', id: 'secondary', label: 'Второй цвет', value: '#44e2ff' },
        { kind: 'range', id: 'radius', label: 'Радиус', min: 40, max: 88, step: 4, value: 64 },
        { kind: 'range', id: 'particles', label: 'Частицы', min: 0, max: 144, step: 12, value: 96 },
      ],
    },
    {
      slug: 'text-echo',
      description:
        'Цветовая копия подписи периодически смещается. Текст и параметры эффекта редактируются в форме.',
      motion: true,
      controls: [
        { kind: 'text', id: 'text', label: 'Подпись', value: 'SYSTEM READY' },
        this.accent,
        { kind: 'color', id: 'secondary', label: 'Цвет эха', value: '#ffd65c' },
        { kind: 'range', id: 'shift', label: 'Смещение', min: 1, max: 8, step: 1, value: 1 },
      ],
    },
    {
      slug: 'glitch-lifecycle',
      description:
        'Панель автоматически искажается короткими импульсами. Подпись остаётся отдельным объектом.',
      motion: true,
      controls: [
        ...this.panelControls,
        {
          kind: 'range',
          id: 'duration',
          label: 'Длительность импульса, мс',
          min: 100,
          max: 500,
          step: 20,
          value: 180,
        },
      ],
    },
    {
      slug: 'panel-reveal',
      description:
        'Параметры меняют появление панели. Флаг «Панель открыта» запускает открытие или закрытие.',
      motion: true,
      controls: [
        this.accent,
        this.surface,
        {
          kind: 'select',
          id: 'axis',
          label: 'Направление',
          options: ['down', 'right', 'zoom'].map((value) => ({ value, label: value })),
        },
        {
          kind: 'range',
          id: 'duration',
          label: 'Длительность, мс',
          min: 160,
          max: 1000,
          step: 40,
          value: 240,
        },
        { kind: 'checkbox', id: 'opened', label: 'Панель открыта', checked: true },
      ],
    },
  ];
  static has(slug: string): boolean {
    return this.entries.some((entry) => entry.slug === slug);
  }

  static get(slug: string, locale: Locale): CyberPreviewDefinition {
    const entry = this.entries.find((entry) => entry.slug === slug);
    if (!entry) throw new Error(`Unknown Cyber UI lesson: ${slug}`);
    return {
      ...entry,
      description: locale.t(entry.description),
      controls: entry.controls.map(control => ({
        ...control,
        label: locale.t(control.label),
        ...(control.kind === 'select' ? {
          options: control.options.map(option => ({ ...option, label: locale.t(option.label) })),
        } : {}),
      })),
    };
  }
}
