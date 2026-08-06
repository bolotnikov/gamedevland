export const GAME_STATUSES = ['released', 'in-development', 'prototype', 'completed'] as const;

export type GameStatus = (typeof GAME_STATUSES)[number];

export const GAME_STATUS_LABELS: Record<GameStatus, string> = {
	released: 'Released',
	'in-development': 'In development',
	prototype: 'Prototype',
	completed: 'COMPLETED',
};
