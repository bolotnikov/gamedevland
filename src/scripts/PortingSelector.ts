export class PortingSelector {
 private readonly choices: HTMLInputElement[];
 private readonly panels: HTMLElement[];

 constructor(root: HTMLElement) {
  this.choices = [...root.querySelectorAll<HTMLInputElement>('input[name="porting-source"]')];
  this.panels = [...root.querySelectorAll<HTMLElement>('[data-porting-panel]')];
  const form = root.querySelector('form');
  if (!form || this.choices.length === 0 || this.choices.length !== this.panels.length) {
   throw new Error('Incomplete porting selector markup');
  }
  const requested = new URL(window.location.href).searchParams.get('from');
  const source = this.choices.find(choice => choice.value === requested);
  if (source) source.checked = true;
  root.addEventListener('change', () => this.update());
  form.addEventListener('submit', event => event.preventDefault());
  this.update();
  root.classList.add('is-ready');
 }

 private update(): void {
  const selected = this.choices.find(choice => choice.checked);
  if (!selected) throw new Error('A porting source must be selected');
  for (const panel of this.panels) panel.hidden = panel.dataset['portingPanel'] !== selected.value;
  const url = new URL(window.location.href);
  url.searchParams.set('from', selected.value);
  url.searchParams.delete('materials');
  window.history.replaceState(null, '', url);
 }
}
