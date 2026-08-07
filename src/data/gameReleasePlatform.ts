export const GAME_RELEASE_PLATFORMS = ['poki', 'game-distribution'] as const;

export type GameReleasePlatform = (typeof GAME_RELEASE_PLATFORMS)[number];

export const GAME_RELEASE_PLATFORM_LABELS: Record<GameReleasePlatform, string> = {
	poki: 'Released on Poki',
	'game-distribution': 'Released on GameDistribution',
};
