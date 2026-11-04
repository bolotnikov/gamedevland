---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 17,
  "title": "Game performance",
  "concept": "Practical diagnosis",
  "description": "What to check when a game starts slowly, stutters, or uses more and more memory.",
  "takeaway": "First, identify where the game spends time or memory. Then change the relevant part and repeat the same check.",
  "sources": [
    {
      "title": "Chrome DevTools · Performance",
      "url": "https://developer.chrome.com/docs/devtools/performance",
      "note": "Official tools for recording and analyzing performance."
    },
    {
      "title": "Chrome DevTools · Memory",
      "url": "https://developer.chrome.com/docs/devtools/memory-problems",
      "note": "Official tools for diagnosing memory use, leaks, and frequent garbage collections."
    },
    {
      "title": "Chrome DevTools · Network",
      "url": "https://developer.chrome.com/docs/devtools/network",
      "note": "Inspecting file sizes and download times."
    }
  ],
  "simulation": "performance",
  "locale": "en",
  "translationKey": "javascript/engine/game-performance"
}
---

If a game runs slowly, first determine **where the delay occurs**: loading files, executing code, or rendering frames.

<aside class="lesson-note" aria-labelledby="devtools-note-title">
  <span class="lesson-note__label">Term</span><h3 id="devtools-note-title">Chrome DevTools</h3>
  <p>Chrome's built-in developer tools. They show what a page loads, where it spends time, and how much memory it uses.</p>
</aside>

We use the following panels to investigate:

- **[Network](https://developer.chrome.com/docs/devtools/network):** which files the game loads, their sizes, and how long the downloads take.
- **[Performance](https://developer.chrome.com/docs/devtools/performance):** a recording of the page's activity. It helps identify a slow function or measure the time spent rendering a frame.
- **[Memory](https://developer.chrome.com/docs/devtools/memory-problems):** snapshots of objects in memory. Compare the state before opening a scene and after closing it to see which objects remain and what still refers to them.

For example, if `window` still holds the closed scene's event handler, the scene may remain in memory. We examined this connection in the lesson on memory leaks. Increasing memory use alone does not prove a leak: we need to find objects that the game no longer needs but still retains.

In the interactive diagram, we will select a problem and see where to start investigating.

After changing the code, repeat the same actions on the same device and compare the results. For example: does the first scene open faster, has stuttering stopped, and have old scenes stopped accumulating in memory?
