export class ThemeController {
	constructor() {
		const buttons = document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]');
		const update = () => {
			const dark = document.documentElement.dataset.theme === 'dark';
			for (const button of buttons) {
				button.setAttribute('aria-label', (dark ? button.dataset['themeLightLabel'] : button.dataset['themeDarkLabel']) ?? '');
				button.title = button.getAttribute('aria-label') ?? '';
			}
		};
		for (const button of buttons) {
			button.addEventListener('click', () => {
				const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
				document.documentElement.dataset.theme = theme;
				try { localStorage.setItem('gamedevland:theme', theme); } catch { /* In-memory theme still works. */ }
				update();
			});
		}
		window.addEventListener('storage', (event) => {
			if (event.key !== 'gamedevland:theme') return;
			if (event.newValue === 'dark' || event.newValue === 'light') {
				document.documentElement.dataset.theme = event.newValue;
				update();
			}
		});
		update();
	}
}
