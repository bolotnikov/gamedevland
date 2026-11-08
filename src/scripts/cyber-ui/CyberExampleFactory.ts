import { CyberFaultExample } from './CyberFaultExample';
import { CyberSignalExample } from './CyberSignalExample';
import { CyberBracketsExample } from './CyberBracketsExample';
import { CyberSelectorExample } from './CyberSelectorExample';
import { CyberBinaryExample } from './CyberBinaryExample';
import { CyberButtonExample } from './CyberButtonExample';
import { CyberIconExample } from './CyberIconExample';
import { CyberMotionExample } from './CyberMotionExample';
import { CyberSurfaceExample } from './CyberSurfaceExample';
import type { CyberExample } from './CyberExample';
import type { CyberLesson } from './types';

export class CyberExampleFactory {
  static async create(lesson: CyberLesson): Promise<CyberExample> {
    switch (lesson) {
      case 'selectors':
        return new CyberSelectorExample();
      case 'signal-brackets':
        return new CyberBracketsExample();
      case 'fault-glyph':
        return new CyberFaultExample();
      case 'signal-lost':
        return new CyberSignalExample();
      case 'panels':
        return new CyberSurfaceExample();
      case 'buttons':
        return new CyberButtonExample();
      case 'icons-theme':
        return new CyberIconExample();
      case 'binary-field':
        return new CyberBinaryExample();
      case 'triangle-loader':
      case 'text-echo':
      case 'glitch-lifecycle':
        return new CyberMotionExample(lesson);
      case 'panel-reveal':
        return new (await import('./CyberRevealExample')).CyberRevealExample();
    }
  }
}
