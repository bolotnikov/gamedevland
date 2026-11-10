import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, join, dirname, basename } from 'node:path';
import sharp from 'sharp';

const [captures, icon] = process.argv.slice(2);
if (!captures || !icon) throw new Error('Usage: node scripts/prepare-rings-media.mjs <capture-directory> <icon-image>');
const output = resolve('public/assets/games/rings');
const entries = [
 ['gameplay-land.jpg', 'cover.webp', 1280, 720, 'Level 7 gameplay'],
 ['gameplay-port.jpg', 'screens/port/gameplay.webp', 720, 1280, 'Level 7 gameplay'],
 ['complex-land.jpg', 'screens/land/complex.webp', 1280, 720, 'Level 27 gameplay'],
 ['complex-port.jpg', 'screens/port/complex.webp', 720, 1280, 'Level 27 gameplay'],
 ['boosters-land.jpg', 'screens/land/boosters.webp', 1280, 720, 'Magic Hat introduction'],
 ['boosters-port.jpg', 'screens/port/boosters.webp', 720, 1280, 'Magic Hat introduction'],
];
const report = [];
for (const [source, target, width, height, scene] of entries) {
 const input = await readFile(join(captures, source));
 const metadata = await sharp(input).metadata();
 if (metadata.width !== width || metadata.height !== height) throw new Error(`Unexpected capture dimensions: ${source}`);
 const destination = join(output, target);
 await mkdir(dirname(destination), { recursive: true });
 const data = await sharp(input).webp({ quality: 90, effort: 6 }).toBuffer();
 await writeFile(destination, data);
 report.push({ source, target, scene, width, height, bytes: data.length, inputSha256: createHash('sha256').update(input).digest('hex'), outputSha256: createHash('sha256').update(data).digest('hex') });
}
const input = await readFile(icon);
const data = await sharp(input).resize(512, 512, { fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 94, mozjpeg: true }).toBuffer();
await writeFile(join(output, 'icon-rings.jpg'), data);
report.push({ source: basename(icon), target: 'icon-rings.jpg', width: 512, height: 512, bytes: data.length, inputSha256: createHash('sha256').update(input).digest('hex'), outputSha256: createHash('sha256').update(data).digest('hex') });
await mkdir('docs/portfolio', { recursive: true });
await writeFile('docs/portfolio/rings-media.json', JSON.stringify({ game: 'Rings', sourceRevision: '4f4b63e', platform: 'web', screenshotSource: 'Live browser captures of the current compiled game; no simulated gameplay or generated screenshots', encoder: { name: 'Sharp', webpQuality: 90, iconFormat: 'jpeg', iconQuality: 94, mozjpeg: true, effort: 6 }, files: report }, null, 2) + '\n');
console.log(`${report.length} images prepared, ${report.reduce((sum, file) => sum + file.bytes, 0)} bytes.`);
