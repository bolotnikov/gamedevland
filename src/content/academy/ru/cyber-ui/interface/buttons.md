---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/buttons",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 4,
  "title": "Кнопки",
  "concept": "ButtonSurface",
  "description": "Настроим вид, подпись, цену и доступность кнопки.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · ButtonSurface",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/ButtonSurface.ts",
      "note": "Параметры и поведение публичного API."
    }
  ]
}
---

`ButtonSurface` рисует фон кнопки. Подпись, иконку и обработчик нажатия добавляем отдельно. В поле «Вид кнопки» можно сравнить все варианты оформления.

Флаг `enabled` меняет рисунок, но сам по себе не блокирует нажатия. В примере вместе с ним меняется `eventMode`: недоступная кнопка не реагирует на клик.

Для кнопки покупки включим цену. `ButtonPrice.layout()` расположит подпись, значок валюты и сумму в одной строке. Если строка не помещается, он уменьшит её целиком. После смены языка или суммы заново измеряем текст и пересчитываем положение элементов.

<details><summary>Все варианты ButtonSurface</summary>

| Вариант | Оформление |
| --- | --- |
| `primary` | Сплошной акцент при `enabled`; иначе стекло |
| `module` | Стекло и боковая полоска при enabled, selected или explicitAccent |
| `danger` | Стекло с цветом danger |
| `icon` | Скруглённая подложка; selected меняет заливку и рамку |
| `nav` | Только лёгкая активная заливка и верхняя полоска |
| `segment` | Только заливка выбранного сегмента |
| `tab` | Отдельная рамка, заливка и активное подчёркивание |
| `switch` | Стеклянная подложка; ползунок добавляется через toggle |
| `utility` | Нижняя линия |
| `line` | Без подложки |

</details>

`selected` выделяет выбранную кнопку, `ready` — доступную награду. Для `switch` после фона рисуем ползунок через `ButtonSurface.toggle()`. `explicitAccent` позволяет оставить полоску модуля, даже когда кнопка недоступна.
