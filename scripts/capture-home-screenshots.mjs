/**
 * Captures accueil desktop + mobile (nécessite serveur sur BASE_URL + accès site).
 * Usage: BASE_URL=http://localhost:3000 node scripts/capture-home-screenshots.mjs
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
  companyName: `Capture Co ${unique}`,
  contactName: "Capture Test",
  email: `capture+${unique}@example.com`,
  phone: "+41790000099",
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
  console.error("Impossible d'obtenir l'accès site:", await intake.text());
  process.exit(1);
}

const page = await context.newPage();

await page.setViewportSize({ width: 1280, height: 800 });
await page.goto(`${base}/fr`, { waitUntil: "networkidle" });
await page.screenshot({
  path: resolve(outDir, "home-desktop.png"),
  fullPage: false,
});

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/fr`, { waitUntil: "networkidle" });
await page.screenshot({
  path: resolve(outDir, "home-mobile.png"),
  fullPage: false,
});

await browser.close();
console.log("Captures enregistrées dans docs/screenshots/");
