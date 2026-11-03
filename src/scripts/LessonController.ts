import { Locale } from '../i18n/Locale';
import { z } from 'astro/zod';

const lessonStateSchema = z.object({
	version: z.literal(1),
	current: z.string().max(120),
	completed: z.array(z.string().max(120)).max(100),
	answers: z.string().max(200_000),
	quiz: z.record(z.string(), z.enum(['0', '1', '2'])),
});
type LessonState = z.infer<typeof lessonStateSchema>;

export class LessonController {
	private readonly i18n = Locale.fromDocument();
	private readonly key = 'gamedevland:academy:javascript:engine:v1';
	private readonly root = document.querySelector<HTMLElement>('[data-lesson-step], [data-lesson-overview]');
	private readonly slugs = this.root?.dataset['stepSlugs']?.split(',') ?? [];
	private state = this.read();
	private storageAvailable = true;

	constructor() {
		if (!this.root) return;
		const toc = this.root.querySelector<HTMLDetailsElement>('.lesson-toc');
		if (toc && matchMedia('(max-width: 800px)').matches) toc.open = false;
		const current = this.root.dataset['lessonStep'];
		if (current && this.slugs.includes(current)) {
			this.state.current = current;
			this.save();
		}
		this.root.querySelector('[data-complete-step]')?.addEventListener('click', () => {
			if (!current) return;
			this.state.completed = [...new Set([...this.state.completed, current])];
			this.save();
			this.render();
			const message = this.root?.querySelector('[data-completion-message]');
			if (message && current === this.slugs.at(-1)) {
				message.textContent = this.state.completed.length === this.slugs.length
					? this.i18n.t("Все шаги просмотрены. Ответы можно отправить в чат для разбора и оценки.")
					: this.i18n.t("Отмечено {value0} из {value1} шагов. К оставшимся можно вернуться через оглавление.", {value0: this.state.completed.length, value1: this.slugs.length});
			}
		});
		this.root.querySelector('[data-reset-progress]')?.addEventListener('click', () => {
			this.state.completed = [];
			this.state.current = '';
			this.save();
			this.render();
			const resume = this.root?.querySelector<HTMLAnchorElement>('[data-resume-link]');
			if (resume) {
				resume.href = this.i18n.path(`/academy/javascript/engine/${this.slugs[0] ?? ''}/`);
				resume.textContent = this.i18n.t("Начать урок →");
			}
		});
		this.setupAnswers();
		this.setupQuiz();
		document.addEventListener('keydown', (event) => {
			if (!current || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
			if (event.target instanceof Element && event.target.closest('a, button, input, textarea, select, summary, [contenteditable="true"]')) return;
			if (event.key === 'ArrowLeft') { event.preventDefault(); this.root?.querySelector<HTMLAnchorElement>('.step-pagination a')?.click(); }
			if (event.key === 'ArrowRight') { event.preventDefault(); this.root?.querySelector<HTMLElement>('[data-complete-step]')?.click(); }
		});
		this.render();
	}

	private read(): LessonState {
		const fallback: LessonState = { version: 1, current: '', completed: [], answers: '', quiz: {} };
		try {
			const raw = localStorage.getItem(this.key);
			if (!raw) return fallback;
			const decoded = lessonStateSchema.safeParse(JSON.parse(raw));
			if (!decoded.success) return fallback;
			return { ...decoded.data, completed: [...new Set(decoded.data.completed.filter((slug) => this.slugs.includes(slug)))] };
		} catch { return fallback; }
	}

	private save(): void {
		try { localStorage.setItem(this.key, JSON.stringify(this.state)); }
		catch { this.storageAvailable = false; }
	}

	private render(): void {
		const done = this.state.completed.length;
		this.root?.querySelectorAll('[data-progress-count]').forEach((element) => { element.textContent = `${done} / ${this.slugs.length}`; });
		this.root?.querySelectorAll<HTMLProgressElement>('[data-lesson-progress]').forEach((element) => { element.max = this.slugs.length; element.value = done; });
		this.root?.querySelectorAll<HTMLElement>('[data-step-link]').forEach((link) => link.classList.toggle('is-done', this.state.completed.includes(link.dataset['stepLink'] ?? '')));
		if (!this.storageAvailable) this.root?.querySelectorAll('[data-progress-status]').forEach((element) => { element.textContent = this.i18n.t("Хранилище недоступно: прогресс сохранён только до перезагрузки"); });
		if (this.slugs.includes(this.state.current)) {
			const resume = this.root?.querySelector<HTMLAnchorElement>('[data-resume-link]');
			if (resume) {
				resume.href = this.i18n.path(`/academy/javascript/engine/${this.state.current}/`);
				resume.textContent = done === this.slugs.length ? this.i18n.t("Вернуться к уроку →") : this.i18n.t("Продолжить урок →");
			}
		}
	}

	private setupAnswers(): void {
		const textarea = this.root?.querySelector<HTMLTextAreaElement>('[data-mentor-answers]');
		if (!textarea) return;
		textarea.value = this.state.answers;
		const status = this.root?.querySelector('[data-answer-status]');
		textarea.addEventListener('input', () => {
			this.state.answers = textarea.value;
			this.save();
			if (status) status.textContent = this.storageAvailable ? this.i18n.t("Черновик сохранён в этом браузере.") : this.i18n.t("Хранилище недоступно. Перед выходом необходимо скачать или скопировать ответы.");
		});
		const text = () => this.i18n.t("GameDev.Land Academy — JavaScript Engine\nОтветы для разбора преподавателем\n\n{value0}", {value0: textarea.value});
		this.root?.querySelector('[data-copy-answers]')?.addEventListener('click', async () => {
			try { await navigator.clipboard.writeText(text()); if (status) status.textContent = this.i18n.t("Скопировано. Ответы можно вставить в чат для разбора."); }
			catch { textarea.focus(); textarea.select(); if (status) status.textContent = this.i18n.t("Текст выделен. Для копирования доступно сочетание Ctrl/Cmd+C; также можно скачать .txt."); }
		});
		this.root?.querySelector('[data-download-answers]')?.addEventListener('click', () => {
			const url = URL.createObjectURL(new Blob([text()], { type: 'text/plain;charset=utf-8' }));
			const link = document.createElement('a');
			link.href = url;
			link.download = 'javascript-engine-answers.txt';
			link.click();
			window.setTimeout(() => URL.revokeObjectURL(url), 1000);
			if (status) status.textContent = this.i18n.t("Подготовлен файл с ответами.");
		});
	}

	private setupQuiz(): void {
		const form = this.root?.querySelector<HTMLFormElement>('[data-academy-quiz]');
		if (!form) return;
		const fields = Array.from(form.querySelectorAll<HTMLFieldSetElement>('[data-question]'));
		for (const input of form.querySelectorAll<HTMLInputElement>('input[type="radio"]')) {
			input.checked = this.state.quiz[input.name] === input.value;
			input.addEventListener('change', () => {
				if (input.value === '0' || input.value === '1' || input.value === '2') this.state.quiz[input.name] = input.value;
				this.save();
				for (const field of fields) { const explanation = field.querySelector<HTMLElement>('.quiz-explanation'); if (explanation) explanation.hidden = true; }
				const result = form.querySelector('[data-quiz-result]');
				if (result) result.textContent = this.i18n.t("Ответ изменён. Для обновления результата необходимо повторно нажать «Проверить ответы».");
			});
		}
		form.addEventListener('reset', () => {
			this.state.quiz = {};
			this.save();
			for (const field of fields) { const explanation = field.querySelector<HTMLElement>('.quiz-explanation'); if (explanation) explanation.hidden = true; }
			const result = form.querySelector('[data-quiz-result]');
			if (result) result.textContent = this.i18n.t("Ответы самопроверки сброшены.");
		});
		form.addEventListener('submit', (event) => {
			event.preventDefault();
			let correct = 0;
			let answered = 0;
			for (const field of fields) {
				const selection = field.querySelector<HTMLInputElement>('input:checked');
				if (selection) answered++;
				const right = selection?.value === field.dataset['answer'];
				if (right) correct++;
				const explanation = field.querySelector<HTMLElement>('.quiz-explanation');
				if (explanation) explanation.hidden = false;
				const result = field.querySelector('[data-question-result]');
				if (result) { result.textContent = !selection ? this.i18n.t("Ответ пока не выбран") : right ? this.i18n.t("Верно ✓") : this.i18n.t("Стоит повторить"); result.className = right ? 'tone-green' : 'tone-amber'; }
			}
			const result = form.querySelector('[data-quiz-result]');
			if (result) result.textContent = this.i18n.t("Правильно {value0} из {value1}. Отвечено {value2} из {value3}. Это самопроверка; итоговую оценку даст преподаватель.", {value0: correct, value1: fields.length, value2: answered, value3: fields.length});
		});
	}
}
