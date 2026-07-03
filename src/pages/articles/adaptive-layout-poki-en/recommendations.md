---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Practical Recommendations and Conclusion"
description: "A compact checklist for building adaptive HTML5 games for Poki, plus the core formula behind the approach."
seriesTitle: "Adaptive Layout for a Poki HTML5 Game"
seriesDescription: "A production workshop on making UI, screen, and gameplay adapt across Poki desktop, mobile, tablet, and iframe resolutions."
seriesSlug: "adaptive-layout-poki-en"
seriesTypeLabel: "Workshop series"
stepLabel: "Section"
step: 11
readingTime: "2 min read"
steps:
  - step: 1
    slug: ""
    title: "Problem and Architecture"
  - step: 2
    slug: "virtual-screen"
    title: "Virtual Screen"
  - step: 3
    slug: "screen-changes"
    title: "Screen Changes"
  - step: 4
    slug: "layout-primitives"
    title: "Layout Primitives"
  - step: 5
    slug: "scene-composition"
    title: "Scene Composition"
  - step: 6
    slug: "level-panel"
    title: "Level Panel"
  - step: 7
    slug: "responsive-physics"
    title: "Responsive Physics"
  - step: 8
    slug: "object-sizing"
    title: "Object Sizing"
  - step: 9
    slug: "resize-during-animation"
    title: "Resize During Animation"
  - step: 10
    slug: "responsive-text"
    title: "Responsive Text"
  - step: 11
    slug: "recommendations"
    title: "Recommendations"
---
## Practical Recommendations

If I were building another HTML5 game for Poki, I would use the same approach:

1. **Start with virtual screen profiles.**
   Define portrait and landscape coordinate systems. Do not bind gameplay to `window.innerWidth`.

2. **Create one screen manager.**
   It should compute orientation, virtual size, viewport size, and emit one normalized screen-change event.

3. **Keep simple elements declarative.**
   Centering, edge positioning, full-screen backgrounds, and uniform scale should live in layout JSON.

4. **Use node components for complex scene composition.**
   A component may know scene UX rules, but it should not duplicate the whole engine layout system.

5. **Change the layout model between portrait and landscape.**
   Good game responsiveness is not always the same UI scaled down. Sometimes portrait needs a bottom panel and landscape needs a side panel.

6. **Recalculate gameplay bounds.**
   Physics, drag, spawn, collision, and tutorial targets must react to screen changes.

7. **Handle resize during animations.**
   Active tweens should be completed, cancelled, or restarted with new target values.

8. **Test more than popular resolutions.**
   Check ultra-wide, narrow portrait, tablet landscape, small iframes, and rotation during gameplay.

## Conclusion

For Poki, `canvas { width: 100%; height: 100%; }` is not enough.

A real responsive game needs to adapt:

- virtual coordinate system;
- layout JSON;
- scene composition;
- UI panels;
- gameplay bounds;
- object sizes;
- animations;
- text;
- input and drag state.

The formula I use in `Stickers Merge` is:

**the engine calculates the screen and provides reusable responsive primitives, while game components describe UX decisions for specific scenes.**

This keeps the code manageable and makes the game feel good on both a wide desktop screen and a phone in portrait orientation.
