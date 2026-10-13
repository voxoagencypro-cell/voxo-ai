/**
 * Vérifie la protection dashboard / API admin (sans secrets).
 * Usage: BASE_URL=https://www.voxo-ai.ch node scripts/verify-dashboard-auth.mjs
 */
const base = (process.env.BASE_URL || "https://www.voxo-ai.ch").replace(/\/$/, "");

const cases = [
  {
    name: "dashboard sans session → login",
    url: `${base}/dashboard`,
    expectRedirect: /\/login$/,
    forbid: /\/dashboard$/,
  },
  {
    name: "demandes-demo sans session → login",
    url: `${base}/dashboard/demandes-demo`,
    expectRedirect: /\/login$/,
  },
  {
    name: "cookie marketing seul → pas dashboard",
    url: `${base}/dashboard`,
    cookie: "voxo_site_access=invalid.token.value",
    expectRedirect: /\/login$/,
  },
  {
    name: "API admin sans session → 401/403",
    url: `${base}/api/admin-demo-count`,
    expectStatus: [401, 403],
  },
];

let failed = 0;

for (const c of cases) {
  const headers = {};
  if (c.cookie) {
    headers.Cookie = c.cookie;
  }

  const res = await fetch(c.url, {
    redirect: "manual",
    headers,
  });

  const location = res.headers.get("location") ?? "";

  if (c.expectStatus) {
    if (!c.expectStatus.includes(res.status)) {
      console.error("FAIL", c.name, "status", res.status, "expected", c.expectStatus);
      failed++;
    } else {
      console.log("PASS", c.name, "HTTP", res.status);
    }
    continue;
  }

  if (c.expectRedirect && !c.expectRedirect.test(location)) {
    console.error("FAIL", c.name, "location", location);
    failed++;
    continue;
  }

  if (c.forbid && c.forbid.test(location)) {
    console.error("FAIL", c.name, "forbidden redirect", location);
    failed++;
    continue;
  }

  console.log("PASS", c.name, "→", location || res.status);
}

if (failed) {
  process.exit(1);
}

console.log("Dashboard auth checks OK on", base);
