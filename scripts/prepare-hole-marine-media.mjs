import { createHash } from 'node:crypto';
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, join, resolve } from 'node:path';
import sharp from 'sharp';

const [gameDirectory, approvedIcon] = process.argv.slice(2);
if (!gameDirectory || !approvedIcon) throw new Error('Usage: node scripts/prepare-hole-marine-media.mjs <game-directory> <approved-icon>');
const game = resolve(gameDirectory);
const output = resolve('public/assets/games/hole-marine');
const files = [];
const hash = (data) => createHash('sha256').update(data).digest('hex');
const sources = [
  [approvedIcon, 'icon.webp', 512, 94],
  [join(game, 'art/marketing/playgama/source/landscape-unbranded.png'), 'cover.webp', 1600, 90],
  [join(game, 'art/boot-marine/source/hole-marine-logo.png'), 'logo.webp', 804, 94],
  [join(game, 'art/campaign/qa/level-06-gameplay.png'), 'screens/level-6.webp', 1280, 90],
  [join(game, 'art/campaign-v3/qa/browser-level-11-size4.png'), 'screens/level-11.webp', 1280, 90],
  [join(game, 'art/campaign-v3/qa/browser-level-26-size6.png'), 'screens/level-26.webp', 1280, 90],
  [join(game, 'art/campaign-v3/qa/browser-level-30-structures.png'), 'screens/level-30.webp', 1280, 90],
  [join(game, 'art/marketing/portfolio/source/video-poster.png'), 'screens/video-poster.webp', 1280, 90],
];
for (const [source, target, width, quality] of sources) {
  const input = await readFile(source);
  const data = await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality, effort: 6 }).toBuffer();
  const metadata = await sharp(data).metadata();
  await mkdir(dirname(join(output, target)), { recursive: true });
  await writeFile(join(output, target), data);
  files.push({ source: basename(source), target, width: metadata.width, height: metadata.height,
    bytes: data.length, inputSha256: hash(input), outputSha256: hash(data) });
}
const videoSource = join(game, 'art/marketing/portfolio/source/gameplay.mp4');
const video = await readFile(videoSource);
await copyFile(videoSource, join(output, 'gameplay.mp4'));
files.push({ source: 'gameplay.mp4', target: 'gameplay.mp4', bytes: video.length, outputSha256: hash(video) });
await mkdir('docs/portfolio', { recursive: true });
await writeFile('docs/portfolio/hole-marine-media.json', JSON.stringify({
  game: 'Hole Marine', approvedIcon: basename(approvedIcon),
  screenshotSource: 'Existing actual Three.js/PixiJS browser canvas captures of levels 6, 11, 26 and 30; no generated gameplay or portrait crops.',
  videoSource: 'Three straight-cut excerpts of the existing level-30 desktop IAB recording; normal FSM movement and production physics.',
  sourceVideo: 'art/qa/campaign-v3/browser-level-30.webm',
  videoSegments: [{ start: 13, end: 24 }, { start: 44, end: 61 }, { start: 72, end: 86 }],
  videoEncoding: 'H.264, 1280x720, 30 fps, CRF 21, yuv420p, faststart; no audio',
  videoCommand: 'ffmpeg -i <source> -filter_complex "[0:v]trim=start=13:end=24,setpts=PTS-STARTPTS[a];[0:v]trim=start=44:end=61,setpts=PTS-STARTPTS[b];[0:v]trim=start=72:end=86,setpts=PTS-STARTPTS[c];[a][b][c]concat=n=3:v=1:a=0,fps=30,format=yuv420p[v]" -map "[v]" -an -c:v libx264 -crf 21 -preset medium -movflags +faststart <output>',
  coverSource: 'Existing generated promotional illustration; kept separate from actual gameplay captures.',
  limitations: ['No new game-browser run or physical-phone capture was performed for this listing.'],
  encoder: { name: 'Sharp', webpQuality: 90, iconQuality: 94, effort: 6 }, files,
}, null, 2) + '\n');
console.log(`${files.length} media files prepared, ${files.reduce((sum, file) => sum + file.bytes, 0)} bytes.`);
