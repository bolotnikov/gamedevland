import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const seriesArticles = [
	'match3',
	'pixi-project-template',
	'runner',
	'tower-defense',
];

const readFile = (filePath) => fs.readFileSync(filePath, 'utf8');

const extractFrontmatter = (source) => {
	const match = source.match(/^---\n([\s\S]*?)\n---\s*/);
	if (!match) {
		throw new Error('Frontmatter not found');
	}

	const frontmatterSource = match[1];
	const body = source.slice(match[0].length);
	const getValue = (key) => {
		const entry = frontmatterSource.match(new RegExp(`^${key}:\\s*"([^"]+)"`, 'm'));
		return entry ? entry[1] : '';
	};

	return {
		title: getValue('title'),
		description: getValue('description'),
		body,
	};
};

const slugify = (value) =>
	value
		.toLowerCase()
		.replace(/&/g, 'and')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

const parseSeries = (articleSlug) => {
	const sourcePath = path.join(root, 'src/content/articles', `${articleSlug}.md`);
	const source = readFile(sourcePath);
	const { title, description, body } = extractFrontmatter(source);
	const matches = [...body.matchAll(/^##\s+(.+)$/gm)];
	const sections = matches.map((match, index) => {
		const heading = match[1].trim();
		const start = match.index;
		const end = index + 1 < matches.length ? matches[index + 1].index : body.length;
		return { heading, content: body.slice(start, end).trim() };
	});

	const tutorialSections = sections.filter((section) => /^\d+[\.\s]/.test(section.heading));
	if (!tutorialSections.length) {
		throw new Error(`No tutorial sections found for ${articleSlug}`);
	}

	const firstStepSection = tutorialSections[0];
	const intro = body.slice(0, body.indexOf(firstStepSection.content)).trim();

	const steps = tutorialSections.map((section, index) => {
		const cleanTitle = section.heading.replace(/^\d+\.?\s*/, '').trim();
		return {
			step: index + 1,
			title: cleanTitle,
			slug: index === 0 ? '' : slugify(cleanTitle),
			content: section.content.replace(/^##\s+.*\n*/, '').trim(),
		};
	});

	if (steps[0]) {
		steps[0].content = `${intro}\n\n${steps[0].content}`.trim();
	}

	return { articleSlug, title, description, steps };
};

const yamlEscape = (value) => `"${String(value).replaceAll('"', '\\"')}"`;

const estimateReadingTime = (content) => {
	const wordCount = content
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/`[^`]*`/g, ' ')
		.replace(/\[[^\]]*]\([^)]*\)/g, ' ')
		.split(/\s+/)
		.filter(Boolean).length;
	return `${Math.max(2, Math.ceil(wordCount / 220))} min read`;
};

const ensureCleanDir = (dirPath) => {
	fs.rmSync(dirPath, { recursive: true, force: true });
	fs.mkdirSync(dirPath, { recursive: true });
};

for (const articleSlug of seriesArticles) {
	const series = parseSeries(articleSlug);
	const outDir = path.join(root, 'src/pages/articles', articleSlug);
	ensureCleanDir(outDir);

	for (const step of series.steps) {
		const frontmatter = [
			'---',
			'layout: ../../../layouts/ArticleSeriesLayout.astro',
			`title: ${yamlEscape(`Step ${step.step}. ${step.title}`)}`,
			`description: ${yamlEscape(
				`Step ${step.step} of the ${series.title} tutorial: ${step.title}.`,
			)}`,
			`seriesTitle: ${yamlEscape(series.title)}`,
			`seriesDescription: ${yamlEscape(series.description)}`,
			`seriesSlug: ${yamlEscape(articleSlug)}`,
			`step: ${step.step}`,
			`readingTime: ${yamlEscape(estimateReadingTime(step.content))}`,
			'steps:',
			...series.steps.map(
				(item) =>
					`  - step: ${item.step}\n    slug: ${yamlEscape(item.slug)}\n    title: ${yamlEscape(item.title)}`,
			),
			'---',
			'',
		].join('\n');

		const fileName = step.slug ? `${step.slug}.md` : 'index.md';
		fs.writeFileSync(path.join(outDir, fileName), `${frontmatter}${step.content}\n`);
	}
}

console.log(`Generated article series pages for ${seriesArticles.join(', ')}`);
