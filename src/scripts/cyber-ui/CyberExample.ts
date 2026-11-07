import { Container } from 'pixi.js';

/** A compiled example owns only its scene objects; the host owns the renderer and clock. */
export abstract class CyberExample {
  readonly root = new Container();
  onChange: () => void = () => {};
  setActive(active: boolean): void {
    void active;
  }
  protected width = 480;
  protected height = 320;
  protected reduced = false;
  abstract get status(): string;
  abstract resize(width: number, height: number): void;
  control(id: string, value: string): void {
    void id;
    void value;
  }
  update(deltaSeconds: number): void {
    void deltaSeconds;
  }
  setReducedMotion(reduced: boolean): void {
    this.reduced = reduced;
  }
  dispose(): void {
    this.root.destroy({ children: true, context: true });
  }
}
