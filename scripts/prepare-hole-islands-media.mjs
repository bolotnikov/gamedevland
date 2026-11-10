import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import { resolve, join, dirname, basename } from 'node:path';
import sharp from 'sharp';

const [captures, icon, logo] = process.argv.slice(2);
if (!captures || !icon || !logo) throw new Error('Usage: node scripts/prepare-hole-islands-media.mjs <capture-directory> <icon> <logo>');
const output = resolve('public/assets/games/hole-islands');
const files = [];
const hash = (buffer) => createHash('sha256').update(buffer).digest('hex');
for (const level of [3, 4, 5, 9]) {
 for (const [orientation, width, height] of [['port', 720, 1280], ['land', 1280, 720]]) {
  const source = `level-${level}-${orientation}.png`;
  const input = await readFile(join(captures, source));
  const metadata = await sharp(input).metadata();
  if (metadata.width !== width || metadata.height !== height) throw new Error(`Unexpected capture dimensions: ${source}`);
  const target = `screens/${orientation}/level-${level}.webp`;
  const data = await sharp(input).webp({ quality: 90, effort: 6 }).toBuffer();
  await mkdir(dirname(join(output, target)), { recursive: true });
  await writeFile(join(output, target), data);
  files.push({ source, target, level, width, height, bytes: data.length, inputSha256: hash(input), outputSha256: hash(data) });
 }
}
for (const [source, target, width] of [[icon, 'icon.webp', 512], [logo, 'logo.webp', 804]]) {
 const input = await readFile(source);
 const data = await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 94, effort: 6 }).toBuffer();
 await writeFile(join(output, target), data);
 files.push({ source: basename(source), target, bytes: data.length, inputSha256: hash(input), outputSha256: hash(data) });
}
const video = await readFile(join(captures, 'gameplay.mp4'));
await copyFile(join(captures, 'gameplay.mp4'), join(output, 'gameplay.mp4'));
files.push({ source: 'gameplay.mp4', target: 'gameplay.mp4', bytes: video.length, outputSha256: hash(video) });
await mkdir('docs/portfolio', { recursive: true });
await writeFile('docs/portfolio/hole-islands-media.json', JSON.stringify({
 game: 'Hole Islands', sourceRevision: '59dc63e93ea092a7a42c6157350a9e353f425259',
 screenshotSource: 'Visible desktop Chrome running the current campaign through its QA entry; native game scenes, normal FSM movement and unchanged physics. QA toolbar hidden; no generated or composited gameplay.',
 viewportNote: 'Portrait viewport with touch enabled is a desktop-browser capture, not a physical-phone test.',
 videoSource: 'Four continuous Chrome screencasts of levels 3, 4, 5 and 9, joined with straight cuts; H.264 at 30 fps without audio.',
 encoder: { name: 'Sharp', webpQuality: 90, iconQuality: 94, effort: 6 }, files,
}, null, 2) + '\n');
console.log(`${files.length} media files prepared, ${files.reduce((sum, file) => sum + file.bytes, 0)} bytes.`);
