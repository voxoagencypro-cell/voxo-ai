/**
 * Vérifie les redirections recovery (sans mot de passe ni secrets).
 * Usage: BASE_URL=https://www.voxo-ai.ch node scripts/verify-auth-recovery-flow.mjs
 */
const base = (process.env.BASE_URL || "https://www.voxo-ai.ch").replace(/\/$/, "");

const cases = [
  {
    name: "otp_expired query",
    path: "/auth/callback?error=access_denied&error_code=otp_expired",
    expectLogin: true,
    expectErrorKey: "recovery_expired",
    forbidHost: "localhost",
  },
  {
    name: "missing code",
    path: "/auth/callback",
    expectLogin: true,
    expectErrorKey: "auth_callback_missing_code",
    forbidHost: "localhost",
  },
];

let failed = 0;

for (const c of cases) {
  const res = await fetch(`${base}${c.path}`, { redirect: "manual" });
  const location = res.headers.get("location") ?? "";

  if (c.expectLogin && !location.includes("/login")) {
    console.error("FAIL", c.name, "expected /login redirect, got", location);
    failed++;
    continue;
  }

  if (c.forbidHost && location.includes("localhost")) {
    console.error("FAIL", c.name, "redirect must not target localhost:", location);
    failed++;
    continue;
  }

  if (c.expectErrorKey && !location.includes(`error=${c.expectErrorKey}`)) {
    console.error(
      "FAIL",
      c.name,
      "expected error=" + c.expectErrorKey,
      "got",
      location,
    );
    failed++;
    continue;
  }

  console.log("PASS", c.name, "→", location.split("?")[0], "(error param OK)");
}

if (failed > 0) {
  process.exit(1);
}

console.log("Auth recovery redirect checks OK on", base);
