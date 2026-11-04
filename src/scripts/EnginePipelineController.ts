import { Locale } from '../i18n/Locale';

export class EnginePipelineController {
	private readonly i18n = Locale.fromDocument();
	private completed = 0;
	private readonly stages;

	constructor(private readonly root: HTMLElement) {
		this.stages = Array.from(root.querySelectorAll<HTMLElement>('[data-engine-stage]')).map((element) => {
			const button = element.querySelector<HTMLButtonElement>('[data-stage-action]');
			const result = element.querySelector<HTMLElement>('[data-stage-result]');
			const pending = element.querySelector<HTMLElement>('[data-stage-pending]');
			if (!button || !result || !pending) throw new Error('Engine pipeline stage requires an action, result, and pending message.');
			return { element, button, result, pending, action: button.textContent, waiting: pending.textContent };
		});
		for (const [index, stage] of this.stages.entries()) {
			stage.button.hidden = false;
			stage.button.addEventListener('click', () => {
				if (index !== this.completed) return;
				this.completed++;
				this.render();
				this.announce(stage.result.dataset['announcement'] ?? '');
				stage.result.scrollIntoView({ block: 'nearest', behavior: 'instant' });
				stage.result.focus({ preventScroll: true });
			});
		}
		root.querySelector<HTMLElement>('[data-pipeline-controls]')?.removeAttribute('hidden');
		root.querySelector('[data-pipeline-reset]')?.addEventListener('click', () => {
			this.completed = 0;
			this.render();
			this.announce(root.dataset['resetNote'] ?? '');
			this.stages[0]?.button.focus();
		});
		this.render();
	}

	private render(): void {
		for (const [index, stage] of this.stages.entries()) {
			const done = index < this.completed;
			const ready = index === this.completed;
			stage.result.hidden = !done;
			stage.pending.hidden = done;
			stage.pending.textContent = ready ? stage.pending.dataset['ready'] ?? stage.waiting : stage.waiting;
			stage.button.disabled = !ready;
			stage.button.textContent = done ? stage.button.dataset['doneLabel'] ?? stage.action : stage.action;
			stage.element.classList.toggle('is-ready', ready);
			stage.element.classList.toggle('is-complete', done);
		}
		const counter = this.root.querySelector('[data-pipeline-count]');
		if (counter) counter.textContent = this.i18n.t("Выполнено {value0} из {value1} этапов", {value0: this.completed, value1: this.stages.length});
		const reset = this.root.querySelector<HTMLButtonElement>('[data-pipeline-reset]');
		if (reset) reset.disabled = this.completed === 0;
	}

	private announce(message: string): void {
		const announcement = this.root.querySelector('[data-pipeline-announcement]');
		if (announcement) announcement.textContent = message;
	}
}
