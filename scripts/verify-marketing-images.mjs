/**
 * Vérifie les dimensions natives JPEG (sans paramètre w=) pour MARKETING_PHOTOS.
 * Usage: node scripts/verify-marketing-images.mjs
 */
import { readFileSync } from "fs";
import { resolve } from "path";

const MIN_WIDTH = 2400;
const src = readFileSync(resolve("lib/marketing-images.ts"), "utf8");

const blockRe =
  /(\w+):\s*\{\s*id:\s*"(photo-[^"]+)",\s*nativeWidth:\s*(\d+),\s*nativeHeight:\s*(\d+)/g;

/** @type {{ key: string, id: string, nativeWidth: number, nativeHeight: number }[]} */
const photos = [];
let m;
while ((m = blockRe.exec(src)) !== null) {
  photos.push({
    key: m[1],
    id: m[2],
    nativeWidth: Number(m[3]),
    nativeHeight: Number(m[4]),
  });
}

if (photos.length !== 6) {
  console.error("Attendu 6 photos, trouvé", photos.length);
  process.exit(1);
}

function readJpegSize(buf) {
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) break;
    const marker = buf[i + 1];
    const len = buf.readUInt16BE(i + 2);
    if (marker === 0xc0 || marker === 0xc2) {
      return {
        height: buf.readUInt16BE(i + 5),
        width: buf.readUInt16BE(i + 7),
      };
    }
    i += 2 + len;
  }
  return null;
}

async function nativeSize(id) {
  const url = `https://images.unsplash.com/${id}?auto=format`;
  const res = await fetch(url);
  if (!res.ok) {
    return { error: `HTTP ${res.status}` };
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const size = readJpegSize(buf);
  if (!size) {
    return { error: "JPEG SOF introuvable", bytes: buf.length };
  }
  return { ...size, bytes: buf.length };
}

let failed = false;

for (const photo of photos) {
  const measured = await nativeSize(photo.id);
  const ok =
    !measured.error &&
    measured.width === photo.nativeWidth &&
    measured.height === photo.nativeHeight;

  const wideEnough = !measured.error && measured.width >= MIN_WIDTH;

  console.log(
    `${photo.key} (${photo.id}):`,
    measured.error
      ? measured.error
      : `${measured.width}×${measured.height}`,
    "| déclaré",
    `${photo.nativeWidth}×${photo.nativeHeight}`,
    ok ? "metadata OK" : "metadata FAIL",
    wideEnough ? "width OK" : "width FAIL",
  );

  if (measured.error || !ok || !wideEnough) {
    failed = true;
  }
}

if (failed) {
  process.exit(1);
}

console.log("Toutes les photos marketing sont valides.");
