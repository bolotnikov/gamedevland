import { Locale } from '../i18n/Locale';

export class ReachabilityController {
	private readonly i18n = Locale.fromDocument();
	private rootConnected = true;
	private playerConnected = true;
	private readonly operations: string[] = [];
	private readonly removeRoot: HTMLButtonElement;
	private readonly removePlayer: HTMLButtonElement;
	private readonly resetButton: HTMLButtonElement;

	constructor(private readonly root: HTMLElement) {
		this.removeRoot = this.element<HTMLButtonElement>('[data-remove-root-link]');
		this.removePlayer = this.element<HTMLButtonElement>('[data-remove-player-link]');
		this.resetButton = this.element<HTMLButtonElement>('[data-reachability-reset]');
		this.removeRoot.addEventListener('click', () => {
			if (!this.rootConnected) return;
			this.rootConnected = false;
			this.operations.push('globalThis.activeScene = null;');
			this.render();
		});
		this.removePlayer.addEventListener('click', () => {
			// The demonstrated property assignment requires an accessible scene.
			if (!this.rootConnected || !this.playerConnected) return;
			this.playerConnected = false;
			this.operations.push('globalThis.activeScene.player = null;');
			this.render();
		});
		this.resetButton.addEventListener('click', () => {
			this.rootConnected = true;
			this.playerConnected = true;
			this.operations.length = 0;
			this.render();
		});
		this.render();
	}

	private render(): void {
		const playerReachable = this.rootConnected && this.playerConnected;
		this.updateObject(this.element('[data-scene-object]'), this.rootConnected);
		this.updateObject(this.element('[data-player-object]'), playerReachable);
		this.updateEdge(this.element('[data-root-edge]'), this.rootConnected, '→');
		this.updateEdge(this.element('[data-player-edge]'), this.playerConnected, '↓');
		this.element('[data-root-property]').textContent = `activeScene: ${this.rootConnected ? this.i18n.t("ссылка на scene") : 'null'}`;
		this.element('[data-scene-property]').textContent = `player: ${this.playerConnected ? this.i18n.t("ссылка на player") : 'null'}`;
		this.removeRoot.disabled = !this.rootConnected;
		this.removePlayer.disabled = !this.rootConnected || !this.playerConnected;
		this.resetButton.disabled = this.operations.length === 0;
		this.element('[data-remove-root-link] [data-edge-action]').textContent = this.rootConnected ? this.i18n.t("Разорвать связь") : this.i18n.t("Связь разорвана");
		this.element('[data-remove-player-link] [data-edge-action]').textContent = !this.playerConnected ? this.i18n.t("Связь разорвана") : this.rootConnected ? this.i18n.t("Разорвать связь") : this.i18n.t("Нет доступа к scene");
		this.element('[data-operations]').textContent = this.operations.length > 0 ? this.operations.join('\n') : this.i18n.t("Пока ни одной.");
		const count = Number(this.rootConnected) + Number(playerReachable);
		this.element('[data-reachability-count]').textContent = this.i18n.t("Достижимы: {value0} из 2", {value0: count});
		const note = this.rootConnected
			? this.playerConnected
				? this.i18n.t("От корня есть путь к scene и через неё — к player. Оба объекта достижимы.")
				: this.i18n.t("В scene.player теперь null. Сцена остаётся достижимой от корня, а к игроку больше нет пути — его можно собрать.")
			: this.playerConnected
				? this.i18n.t("В activeScene теперь null. Оба объекта недостижимы, хотя scene всё ещё ссылается на player. Обращаться к scene через activeScene уже нельзя. Чтобы проверить другой вариант, начнём сначала.")
				: this.i18n.t("Обе связи разорваны: activeScene и свойство player равны null. Сцена и игрок недостижимы и могут быть собраны.");
		this.element('[data-reachability-note]').textContent = note;
		this.element('[data-reachability-announcement]').textContent = this.i18n.t("{value0} Достижимы: {value1} из 2.", {value0: note, value1: count});
	}

	private updateObject(node: HTMLElement, reachable: boolean): void {
		node.classList.toggle('is-reachable', reachable);
		node.classList.toggle('is-unreachable', !reachable);
		const status = node.querySelector<HTMLElement>('[data-object-status]');
		if (!status) throw new Error('Reachability object must have a status label.');
		status.textContent = reachable ? this.i18n.t("✓ Достижим · сохранить") : this.i18n.t("Недостижим · можно собрать");
	}

	private updateEdge(node: HTMLElement, connected: boolean, arrow: string): void {
		node.classList.toggle('is-broken', !connected);
		const symbol = node.querySelector<HTMLElement>('[data-edge-symbol]');
		if (!symbol) throw new Error('Reachability edge must have a connection symbol.');
		symbol.textContent = connected ? arrow : '×';
	}

	private element<T extends HTMLElement = HTMLElement>(selector: string): T {
		const element = this.root.querySelector<T>(selector);
		if (!element) throw new Error(`Missing reachability element: ${selector}`);
		return element;
	}
}
