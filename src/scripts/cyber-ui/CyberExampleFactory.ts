import { CyberApiExample } from './CyberApiExample';
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
      case 'installation':
      case 'host-contract':
      case 'panels':
        return new CyberSurfaceExample(lesson);
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
      case 'api-reference':
        return new CyberApiExample();
      case 'sdk-components':
        return new (await import('./CyberSdkExample')).CyberSdkExample();
      case 'panel-reveal':
        return new (await import('./CyberRevealExample')).CyberRevealExample();
    }
  }
}
