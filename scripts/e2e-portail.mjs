/**
 * Parcours portail 5 étapes — node scripts/e2e-portail.mjs
 */
import { chromium, devices } from "playwright";

const BASE = process.env.BASE_URL || "http://localhost:3000";
const unique = Date.now();

async function expectText(page, text) {
  await page.getByText(text).waitFor({ timeout: 10000 });
}

async function runFormFlow(page, label) {
  const results = [];

  await page.context().clearCookies();
  await page.goto(`${BASE}/fr/consulting-ia`, { waitUntil: "networkidle" });
  await page.waitForURL(/\/fr\/portail\?next=/);
  results.push([`${label}: redirect commercial → portail`, true]);

  await expectText(page, "Étape 1 sur 5");
  await page.getByLabel("Nom de l'entreprise").fill(`Test Co ${unique}`);
  await page.getByRole("button", { name: "Indépendant / seul" }).click();
  await page.getByRole("button", { name: "Continuer" }).click();

  await expectText(page, "Étape 2 sur 5");
  await page.getByLabel("Nom et prénom").fill("Jean Testeur");
  await page.getByLabel("E-mail", { exact: true }).fill(`test+${unique}@example.com`);
  await page.getByLabel("Téléphone", { exact: true }).fill("+41791234567");
  await page.getByRole("button", { name: "Continuer" }).click();

  await expectText(page, "Étape 3 sur 5");
  await page.getByRole("button", { name: "Trouver de nouveaux clients" }).click();
  await page.getByRole("button", { name: "Gérer les appels" }).click();
  await page.getByRole("button", { name: "Continuer" }).click();

  await expectText(page, "Étape 4 sur 5");
  await page.getByRole("button", { name: "WhatsApp" }).click();
  await page.getByRole("button", { name: "Téléphone" }).click();
  await page.getByRole("button", { name: "Continuer" }).click();

  await expectText(page, "Étape 5 sur 5");
  await page.getByRole("radio", { name: "Trouver de nouveaux clients" }).check();

  const marketing = page.getByRole("checkbox", {
    name: /actualités et offres de VOXO AI/i,
  });
  results.push([
    `${label}: consentement marketing décoché par défaut`,
    !(await marketing.isChecked()),
  ]);

  await page.getByRole("button", { name: "Retour" }).click();
  await expectText(page, "Étape 4 sur 5");
  const waClass = await page.getByRole("button", { name: "WhatsApp" }).getAttribute("class");
  results.push([
    `${label}: retour conserve canaux`,
    Boolean(waClass?.includes("marketing-choice-selected")),
  ]);
  await page.getByRole("button", { name: "Continuer" }).click();
  await expectText(page, "Étape 5 sur 5");

  const responsePromise = page.waitForResponse(
    (r) =>
      r.url().includes("/api/prospect-intake") && r.request().method() === "POST",
  );
  await page
    .getByRole("button", { name: "Envoyer et découvrir VOXO AI" })
    .click();
  const response = await responsePromise;
  const body = await response.json();
  results.push([
    `${label}: API prospect-intake succès`,
    response.ok() && body.success === true,
  ]);
  results.push([
    `${label}: enregistrement dans prospect_intakes`,
    response.ok() && body.storedIn === "prospect_intakes",
  ]);

  await page.waitForURL(/\/fr\/consulting-ia/, { timeout: 20000 });
  results.push([
    `${label}: redirection vers next après succès`,
    page.url().includes("/fr/consulting-ia"),
  ]);

  await page.reload({ waitUntil: "networkidle" });
  results.push([
    `${label}: accès persiste après refresh`,
    !page.url().includes("/portail"),
  ]);

  await page.goto(`${BASE}/fr`, { waitUntil: "networkidle" });
  results.push([
    `${label}: accueil sans retour portail`,
    !page.url().includes("/portail"),
  ]);

  const cookies = await page.context().cookies();
  results.push([
    `${label}: cookie accès httpOnly`,
    Boolean(cookies.find((c) => c.name === "voxo_site_access")?.httpOnly),
  ]);

  await page.goto(`${BASE}/fr/tarifs/calendrier`, { waitUntil: "networkidle" });
  results.push([
    `${label}: calendrier exige login`,
    page.url().includes("/login"),
  ]);

  return results;
}

async function testExclusiveNoneYet(page) {
  await page.context().clearCookies();
  await page.goto(`${BASE}/fr/portail`);
  await page.getByLabel("Nom de l'entreprise").fill("Excl Co");
  await page.getByRole("button", { name: "Indépendant / seul" }).click();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.getByLabel("Nom et prénom").fill("A B");
  await page.getByLabel("E-mail", { exact: true }).fill("excl@example.com");
  await page.getByLabel("Téléphone", { exact: true }).fill("+411");
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.getByRole("button", { name: "Trouver de nouveaux clients" }).click();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.getByRole("button", { name: "Aucun pour le moment" }).click();
  const noneClass = await page
    .getByRole("button", { name: "Aucun pour le moment" })
    .getAttribute("class");
  const waClass = await page.getByRole("button", { name: "WhatsApp" }).getAttribute("class");
  return [
    [
      "none_yet: exclusif",
      Boolean(noneClass?.includes("marketing-choice-selected")) &&
        !waClass?.includes("marketing-choice-selected"),
    ],
  ];
}

async function testFailedSubmit(page) {
  await page.context().clearCookies();
  await page.route("**/api/prospect-intake", (route) =>
    route.fulfill({ status: 500, body: JSON.stringify({ error: "fail" }) }),
  );
  await page.goto(`${BASE}/fr/portail`);
  await page.getByLabel("Nom de l'entreprise").fill("Err Co");
  await page.getByRole("button", { name: "Indépendant / seul" }).click();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.getByLabel("Nom et prénom").fill("Err User");
  await page.getByLabel("E-mail", { exact: true }).fill("err@example.com");
  await page.getByLabel("Téléphone", { exact: true }).fill("+41790000000");
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.getByRole("button", { name: "Simplifier l'organisation" }).click();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.getByRole("button", { name: "E-mail" }).click();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.getByRole("button", { name: "Envoyer et découvrir VOXO AI" }).click();
  await page.getByText("fail").waitFor();
  const cookies = await page.context().cookies();
  return [
    ["error-flow: reste sur portail", page.url().includes("/portail")],
    [
      "error-flow: bouton réessai visible",
      await page.getByRole("button", { name: "Envoyer et découvrir VOXO AI" }).isVisible(),
    ],
    [
      "error-flow: pas de cookie accès",
      !cookies.some((c) => c.name === "voxo_site_access"),
    ],
  ];
}

async function main() {
  const all = [];
  const browser = await chromium.launch({ headless: true });

  const desktop = await browser.newContext();
  all.push(...(await runFormFlow(await desktop.newPage(), "desktop")));

  const mobile = await browser.newContext({ ...devices["iPhone 13"] });
  all.push(...(await runFormFlow(await mobile.newPage(), "mobile")));

  const extra = await browser.newPage();
  all.push(...(await testExclusiveNoneYet(extra)));
  all.push(...(await testFailedSubmit(await browser.newPage())));

  await browser.close();

  console.log("E2E PORTAIL RESULTS");
  for (const [name, ok] of all) {
    console.log(`${ok ? "PASS" : "FAIL"} — ${name}`);
  }
  const failed = all.filter(([, ok]) => !ok);
  process.exit(failed.length ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
