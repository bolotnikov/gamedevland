interface PlaygamaSandbox {
	readonly title: string;
	readonly url: string;
}

export interface PlaygamaPublication {
	readonly url: string;
	readonly shareText: string;
}

const sandboxes: ReadonlyMap<string, PlaygamaSandbox> = new Map([
	['capydiver', { title: 'CapyDiver', url: 'https://playgama.ai/play/j6azogobat4dbr' }],
	['fish-sort', { title: 'Fish Sort', url: 'https://playgama.ai/play/yjdqkti4uynvbu' }],
	['ai-defender', { title: 'AI Defender', url: 'https://playgama.ai/play/fznmvgysnpemmf' }],
	['hole-islands', { title: 'Hole Islands', url: 'https://playgama.ai/play/6qoqdpzuv7gtmd' }],
	['hole-marine', { title: 'Hole Marine', url: 'https://playgama.ai/play/ktwmd3qhfimqzb' }],
	['rings', { title: 'Rings 3D: Magic Show Puzzle', url: 'https://playgama.ai/play/3dwgwee3kbrcsq' }],
	['idle-submarine', { title: 'Idle Submarine', url: 'https://playgama.ai/play/6wvsofx473reta' }],
]);

export class PlaygamaPublications {
	static find(translationKey: string): PlaygamaPublication | undefined {
		const sandbox = sandboxes.get(translationKey);
		if (!sandbox) return undefined;

		const { title, url } = sandbox;
		return {
			url,
			shareText: `Made with AI. Brought to you by #PlaygamaMCP. Fine-tuned by me. ${title} → ${url}\n#playgama #PlaygamaMCP #webdev #gamedev`,
		};
	}
}
