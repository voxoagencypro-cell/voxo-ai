/**
 * Captures visuelles pages avec photos (desktop + mobile).
 * Usage: BASE_URL=http://localhost:3000 node scripts/capture-marketing-photos.mjs
 */
import { mkdirSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { chromium } from "playwright";

const base = process.env.BASE_URL || "http://localhost:3000";
const outDir = resolve(dirname(fileURLToPath(import.meta.url)), "../docs/screenshots");
mkdirSync(outDir, { recursive: true });

const unique = Date.now();
const payload = {
  locale: "fr",
  companyName: `Photo QA ${unique}`,
  contactName: "Photo QA",
  email: `photoqa+${unique}@example.com`,
  phone: "+41790000088",
  employeeRange: "solo",
  priorities: ["acquisition"],
  topPriority: "acquisition",
  channels: ["email"],
  marketingConsent: false,
};

const browser = await chromium.launch();
const context = await browser.newContext();
const intake = await context.request.post(`${base}/api/prospect-intake`, {
  data: payload,
  headers: { "Content-Type": "application/json" },
});
if (!intake.ok()) {
  console.error(await intake.text());
  process.exit(1);
}

const shots = [
  { name: "home-desktop", path: "/fr", w: 1280, h: 800 },
  { name: "home-mobile", path: "/fr", w: 390, h: 844 },
  {
    name: "acquisition-desktop",
    path: "/fr/acquisition-publicite",
    w: 1280,
    h: 900,
  },
  {
    name: "agents-mobile",
    path: "/fr/agents-ia",
    w: 390,
    h: 844,
  },
];

const page = await context.newPage();
for (const s of shots) {
  await page.setViewportSize({ width: s.w, height: s.h });
  await page.goto(`${base}${s.path}`, { waitUntil: "networkidle" });
  await page.screenshot({
    path: resolve(outDir, `${s.name}.png`),
    fullPage: false,
  });
}

await browser.close();
console.log("Captures marketing dans docs/screenshots/");
