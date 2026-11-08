# Editorial style

## Authority and reference material

Alex explicitly identified these four handwritten tutorial series as the reference for
public-facing writing on GameDev.Land:

- Create a platformer with PixiJS: `src/content/tutorials/en/runner/`.
- Creating Tower Defense game with PIXI: `src/content/tutorials/en/tower-defense/`.
- Create Match-3 Game with PixiJS: `src/content/tutorials/en/match3/`.
- Create PixiJS Project Template: `src/content/tutorials/en/pixi-project-template/`.

Read the relevant original English chapters before composing substantial new material.
Their Russian translations are useful counterparts, but the original articles establish
the author's voice. Preserve these reference articles unless Alex requests their revision.
This document records repository-specific editorial guidance, not global Codex settings.

The Academy's purpose is to turn verified ECMA-262 rules and official V8 implementation
details into accessible lessons. Understand the source first, then explain the mechanism
in plain language with a focused example and suitable infographic or interaction. The revised
Russian Memory Heap lesson is an approved reference for this approach.

For other existing lessons, first read the current text and propose concrete changes; apply
them after Alex's decision. A direct request to revise a named lesson is sufficient authorization.

## Authoring language

Write and revise new material in Russian first. Alex reviews and approves the Russian text;
English translation starts only on a separate explicit request after approval. Do not
translate intermediate edits or automatically synchronize existing English versions during
Russian review. Apply the English style rules below when that translation task is authorized.
The site's default English URL is independent of the language used for authoring.

## Voice

- Do not use periods at the end of titles or headings, or separate heading fragments with periods.
  This applies to both Russian and English. Keep question marks where the heading is a question.

- Keep text and UI concise and minimal. No grandiose phrasing, promotional labels, or stacks
  of headings describing the presentation. One useful heading is enough; often none is needed.
- Write in a measured, polite, technical tone. Formality must not become bureaucratic or obscure.
- Prefer inclusive first-person plural for a shared explanation: “Рассмотрим”, “Создадим”,
  “Добавим”, “Теперь можем…”; in English, “Let's create”, “We will add”, “Now we can…”.
- Use impersonal statements when explaining a mechanism: “Движок подготавливает программу”,
  “После возврата управление передаётся вызывающей функции”.
- Do not address the reader as “ты”, “тебе”, “твой”, or with singular informal commands such
  as “посмотри”, “попробуй”, “нажми”, “собери”. Do not mechanically replace these with “вы”:
  inclusive or impersonal phrasing usually fits the author's style better.
- In English, prefer the same inclusive or neutral construction over repeated “you/your”.
- Avoid familiar banter, motivational coaching, invented personal situations, and decorative
  metaphors. Introduce a code example when it helps explain a specific mechanism.
- Apply these rules to titles, descriptions, takeaways, diagrams, model hints, quizzes,
  exercise instructions, accessibility labels, and client-side feedback as well as body prose.
- Keep action labels concise and neutral: “Начать урок”, “Проверить ответы”, “Скопировать”.

## Explanatory structure

All new or revised public-facing text must be simple, clear, concise, and reduced to the
essentials. Alex approved the shortened Russian `garbage-collection.md` prose on 2026-11-04
as the reference for this standard. Explain the mechanism in plain language, define only
the terms needed now, and remove repetition and secondary details. Preserve the cause and
effect and any conditions essential for accuracy. Apply this to subtitles, takeaways,
captions, and simulation notes as well as the main prose.

Academy hierarchy is course → section → lesson. Engine and Event Loop are sections;
their individual concept pages are lessons. Use “step” for an actual action within an
exercise or simulation. Legacy source identifiers do not determine public terminology.

The reference tutorials introduce a concrete task, perform one change, explain the relevant
code, and establish the result before continuing. Preserve this sequence:

1. State the current task or mechanism directly.
2. Introduce the required action and explain why it is needed.
3. Show a focused example or model.
4. Explain what changed and connect it to the next step.

Use short paragraphs and explicit causal links. Keep exact identifiers and code adjacent to
their explanation. Explain new terms before relying on them. Avoid rhetorical padding;
technical depth should come from mechanisms and consequences, not a more conversational tone.
Do not copy accidental repetition or grammatical errors from the reference articles.

Keep each step focused on its main concept. Include only details needed to understand the
explanation or exercise; omit related facts added merely for completeness. For example,
a bytecode trace with numeric inputs does not need a remark about addition's type semantics.
Preserve qualifications needed for accuracy, but explain them locally and briefly.

Introduce unfamiliar technical terms with a short definition at their first meaningful use.
Use the existing book-style `lesson-note` block labelled “Термин”, following the machine-code
definition in step 01. Prefer concrete language in the surrounding prose (for example,
“instructions for the Ignition interpreter”) and define broader abstractions separately.
A definition should not require the reader to learn several more unexplained terms.

Keep technical accuracy while explaining the mechanism in concrete language first. Prefer
“the same object” over “the same identity”, and show the exact effect of an assignment before
discussing storage abstractions. Implementation caveats should not overshadow the lesson's
main idea; defer register placement and allocation-elimination details to relevant lessons.

## Technical references and visual presentation

Link a significant term to an official specification or documentation section when introducing
it in a step. Use the same source in both languages, preserve emphasis, and avoid linking
every repetition. External HTTP(S) references open in a new tab with `target="_blank"` and
`rel="noopener noreferrer"`; the shared Markdown renderer adds these at build time. For
links authored directly in Astro templates, supply those attributes explicitly.

The FSM in HTML5 Game Scenes and AI Agents / Own SDK articles establish the visual baseline:
connected flows, responsibility maps, numbered cards, and clear color grouping. Academy
steps should explain mechanisms with concept-specific infographics and useful interaction,
supported by concise prose. Use theme-aware CSS, restrained depth and transitions, keyboard
focus, reduced-motion support, and layouts that work in both languages on narrow screens.

Prefer static diagrams for relationships. Add interaction only when a reader's action changes
an input/result, reveals execution order, tests a hypothesis, or supplies meaningful feedback.
Recoloring or restating an unchanged diagram does not justify tabs or next/reset controls.
Avoid duplicate controls; describe actual actions and make meaningful changes obvious.

Alex's approved interaction references are the AST example (grouping changes both the tree
and result) and the scanner example (each action highlights the actual source fragment and
adds its recognized token). Model future interactions on these visible cause-and-effect
relationships. Use a static infographic by default for other explanations; switching labels
or showing successive explanatory cards alone does not justify interaction.

Use occasional book-style definition/aside blocks for terms or important qualifications.
Academy supports `<aside class="lesson-note">` with a `lesson-note__label`, a labelled
heading, and short paragraphs; `is-green` provides a second theme-aware accent. Keep these
in the Markdown near the relevant explanation, so Alex can edit them directly. Labels and
headings explain their purpose independently of color. Code inserts should identify the
architecture/format and clearly separate actual machine bytes from readable assembly.

## Examples

| Avoid | Prefer |
| --- | --- |
| Ты пишешь `updatePlayer()`, но CPU не умеет исполнять JavaScript напрямую. | CPU не исполняет исходный код JavaScript напрямую. Движок подготавливает программу и выполняет её. |
| Посмотри на `const damage = 2 + 3;`. | Рассмотрим выражение `const damage = 2 + 3;`. |
| Добавь вторую ссылку и измени свойство через неё. | Добавим вторую ссылку и изменим свойство через неё. |
| Твой путь через движок | Основные механизмы движка |
| You write `updatePlayer()`, but… | A CPU does not execute JavaScript source code directly. |

## Review before delivery

Read complete Russian paragraphs in context during authoring; review both versions during
the separately requested translation task. Check for informal address and
singular commands, preserve technical meaning and official evidence, and verify that code
examples and interactions remain unchanged. A keyword search helps locate candidates;
it does not replace editorial review. Localization and project checks still apply.
