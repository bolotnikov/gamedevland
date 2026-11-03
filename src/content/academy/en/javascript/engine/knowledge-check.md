---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 19,
  "title": "Checking the execution model",
  "concept": "Self-check",
  "description": "Six questions with explanations; this is not the final interview.",
  "takeaway": "Reviewing the reasons for correct answers helps check understanding of the mechanism.",
  "sources": [
    {
      "title": "ECMA-262 · Execution Contexts",
      "url": "https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-execution-contexts",
      "note": "The abstract model of execution contexts and their stack."
    },
    {
      "title": "V8 · Maglev",
      "url": "https://v8.dev/blog/maglev",
      "note": "Execution tiers, feedback, and speculative optimization."
    },
    {
      "title": "ECMA-262 · Object Type",
      "url": "https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-object-type",
      "note": "Object properties and identity; physical memory placement is not prescribed."
    }
  ],
  "assessment": "quiz",
  "locale": "en",
  "translationKey": "javascript/engine/knowledge-check"
}
---

The theory is followed by a short check. The questions separate language rules from possible implementation details. They do not require guessing how many calls make [V8](https://v8.dev/blog/maglev) switch tiers: applications have no universal contract for that.

After selecting the answers, we will click “Check answers.” Each question will display an explanation and links to the relevant steps. Choices are saved in this browser and can be reviewed later.

**This self-check result is not the final lesson grade.** Assessment also requires explaining the mechanism in one’s own words and applying it to a game-SDK problem. The next step provides questions for a review with the instructor.
