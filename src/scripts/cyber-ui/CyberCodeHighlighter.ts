import { createHighlighterCore, type HighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import typescript from 'shiki/langs/typescript.mjs';
import light from 'shiki/themes/github-light.mjs';
import dark from 'shiki/themes/github-dark.mjs';

/** Tokenizes TypeScript without executing it or changing the copied source. */
export class CyberCodeHighlighter {
  private static instance?: Promise<CyberCodeHighlighter>;

  private constructor(private readonly highlighter: HighlighterCore) {}

  static create(): Promise<CyberCodeHighlighter> {
    this.instance ??= this.load();
    return this.instance;
  }

  private static async load(): Promise<CyberCodeHighlighter> {
    return new CyberCodeHighlighter(await createHighlighterCore({
      themes: [light, dark],
      langs: [typescript],
      engine: createJavaScriptRegexEngine(),
    }));
  }

  render(source: string): DocumentFragment {
    const { tokens } = this.highlighter.codeToTokens(source, {
      lang: 'typescript',
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    });
    const fragment = document.createDocumentFragment();
    for (const [index, line] of tokens.entries()) {
      if (index > 0) fragment.appendChild(document.createTextNode('\n'));
      for (const token of line) {
        const span = document.createElement('span');
        span.className = 'cyber-code-token';
        span.textContent = token.content;
        for (const [property, value] of Object.entries(token.htmlStyle ?? {})) {
          span.style.setProperty(property, value);
        }
        fragment.appendChild(span);
      }
    }
    return fragment;
  }
}
