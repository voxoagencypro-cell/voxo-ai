/**
 * Vérifie la présence et les dimensions natives des logos marque.
 * Usage: node scripts/verify-brand-assets.mjs
 */
import { existsSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const brandDir = resolve(root, "public/images/brand");

const files = [
  { name: "voxo-logo-full.png", minWidth: 400 },
  { name: "voxo-symbol-v.png", minWidth: 64 },
];

let failed = false;

for (const f of files) {
  const path = resolve(brandDir, f.name);
  if (!existsSync(path)) {
    console.error("MANQUANT:", f.name);
    failed = true;
    continue;
  }

  try {
    const { default: sharp } = await import("sharp");
    const meta = await sharp(path).metadata();
    console.log(
      "OK",
      f.name,
      `${meta.width}×${meta.height}`,
      meta.format,
    );
    if ((meta.width ?? 0) < f.minWidth) {
      console.warn("AVERTISSEMENT: largeur faible pour", f.name);
    }
  } catch {
    console.log("OK (présent)", f.name, "(installez sharp pour les dimensions)");
  }
}

if (failed) {
  process.exit(1);
}

console.log("Assets marque trouvés dans public/images/brand/");