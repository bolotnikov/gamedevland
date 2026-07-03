---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Problem and Architecture"
description: "Why adaptive layout matters for Poki HTML5 games, and how Stickers Merge splits screen, layout, and game composition responsibilities."
seriesTitle: "Adaptive Layout for a Poki HTML5 Game"
seriesDescription: "A production workshop on making UI, screen, and gameplay adapt across Poki desktop, mobile, tablet, and iframe resolutions."
seriesSlug: "adaptive-layout-poki-en"
seriesTypeLabel: "Workshop series"
stepLabel: "Section"
step: 1
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
In this article, I want to explain how responsive and adaptive layout works in my game [Stickers Merge](https://poki.com/en/g/stickers-merge).

## The Problem

Poki games need to work on desktop, mobile, and tablet. The [official Poki requirements](https://sdk.poki.com/new-requirements.html) say that on mobile the game should cover the entire screen in portrait or landscape, and supporting both orientations gives the best player experience. The game also has to scale to the full canvas across devices.

In real development this means:

- the game should not break inside different iframe sizes;
- portrait and landscape are two different UX cases;
- desktop players usually want to use screen width;
- mobile players often play in portrait and use screen height;
- UI should not just shrink until it becomes unreadable;
- gameplay space must be recalculated too, not only visual UI.

In `Stickers Merge`, I do not solve this with one giant resize handler. The responsive system is split into several layers.

## Overall Architecture

There are three levels:

1. **Engine screen layer** - calculates virtual canvas size, orientation, and emits `SCREEN_CHANGED`.
2. **Engine layout primitives** - reusable components for common responsive tasks: positioning, scaling, fitting by bounds.
3. **Game composition components** - scene-specific components that know the UX rules of the game: how many columns to show, where to put the panel, how to rebuild the physics playfield.

This split is important. The engine owns screen math and reusable layout operations. The game owns meaning and UX.
