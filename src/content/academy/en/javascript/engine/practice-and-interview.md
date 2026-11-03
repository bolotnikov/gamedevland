---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 20,
  "title": "Practice in technical explanation",
  "concept": "Practice and review",
  "description": "Six open questions: mechanisms, code, and architectural decisions.",
  "takeaway": "Completed steps record material viewed. Understanding is confirmed by reviewing the answers.",
  "sources": [
    {
      "title": "ECMA-262 · Execution Contexts",
      "url": "https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-execution-contexts",
      "note": "The abstract model of execution contexts and their stack."
    },
    {
      "title": "Chrome DevTools · Memory",
      "url": "https://developer.chrome.com/docs/devtools/memory-problems",
      "note": "Official tools for diagnosing memory use, leaks, and frequent collections."
    }
  ],
  "assessment": "mentor",
  "locale": "en",
  "translationKey": "javascript/engine/practice-and-interview"
}
---

For the review, we will prepare answers in our own words. The lesson’s source links may be used. Each answer needs to explain the causal chain: **what happens → why → what it changes for the game**.

1. Where is the boundary between [ECMAScript](https://tc39.es/ecma262/multipage/), V8, and the browser runtime? Who owns `setTimeout`?
2. Which stages does `return a + b` pass through from source text to execution? How do an AST, bytecode, and machine code differ?
3. Why can a hot function become faster? What happens to the semantics of `add('2', 3)` if earlier calls used numbers?
4. How does the stack change during the `start → update → damage` calls and the returns from these functions? Why is “a local variable always lives on the stack” a poor rule?
5. A scene is closed, but a global subscription retains a callback with its data. Why is [GC](https://v8.dev/blog/trash-talk) not required to remove it? How should cleanup be designed?
6. A game starts slowly and occasionally misses frames. Which separate hypotheses need to be tested, and what measurements are required before optimization?

**The instructor can award up to 100 points:** theory — 25, internal mechanisms — 25, practical application — 25, and clarity in an interview — 25. This page does not automatically grade free-text answers.

The answers can be copied into the chat for review. Viewing all steps and receiving a final grade are separate statuses. The next lesson in this course is **Event Loop**; it is planned, not yet published.
