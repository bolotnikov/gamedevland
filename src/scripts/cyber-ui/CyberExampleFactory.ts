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
