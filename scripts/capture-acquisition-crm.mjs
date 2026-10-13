/**
 * Captures acquisition page desktop + mobile.
 * Usage: BASE_URL=http://localhost:3000 node scripts/capture-acquisition-crm.mjs
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
  companyName: `Cap ${unique}`,
  contactName: "Cap Test",
  email: `cap+${unique}@example.com`,
  phone: "+41790000077",
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

const page = await context.newPage();
const shots = [
  { file: "acquisition-crm-desktop.png", w: 1280, h: 900 },
  { file: "acquisition-crm-mobile.png", w: 390, h: 844 },
];

for (const s of shots) {
  await page.setViewportSize({ width: s.w, height: s.h });
  await page.goto(`${base}/fr/acquisition-publicite`, { waitUntil: "networkidle" });
  await page.screenshot({ path: resolve(outDir, s.file), fullPage: false });
}

await browser.close();
console.log("Captures acquisition CRM enregistrées.");
