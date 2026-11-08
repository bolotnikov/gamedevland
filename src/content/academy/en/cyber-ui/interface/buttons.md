---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/buttons",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 4,
  "title": "Buttons",
  "concept": "ButtonSurface",
  "description": "Set a button's style, label, price, and availability.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · ButtonSurface",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/ButtonSurface.ts",
      "note": "Public API parameters and behavior."
    }
  ]
}
---

`ButtonSurface` draws the button's background. We add the label, icon, and tap handler separately. The Button type control shows every style.

The `enabled` flag changes the drawing but does not block input on its own. In the example, it also changes `eventMode`, so an unavailable button does not respond to taps.

For a purchase button, enable Show price. `ButtonPrice.layout()` arranges the label, currency icon, and amount in one row. If the row does not fit, it scales the whole row down. After changing the language or amount, measure the text again and recalculate the positions.

<details><summary>All ButtonSurface variants</summary>

| Variant | Appearance |
| --- | --- |
| `primary` | Solid accent when `enabled`; glass otherwise |
| `module` | Glass with a side rail when enabled, selected, or explicitAccent |
| `danger` | Glass using the danger color |
| `icon` | Rounded surface; selected changes the fill and border |
| `nav` | Subtle active fill and a top rail |
| `segment` | Fill on the selected segment only |
| `tab` | Separate border, fill, and active underline |
| `switch` | Glass background; add its thumb with toggle |
| `utility` | A bottom line |
| `line` | No background |

</details>

`selected` highlights a selected button; `ready` marks an available reward. For `switch`, draw the thumb after the background with `ButtonSurface.toggle()`. `explicitAccent` keeps the module rail visible even when the button is unavailable.
