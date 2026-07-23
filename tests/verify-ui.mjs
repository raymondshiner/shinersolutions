// Headless UI verification — drives Playwright against the dev server.
// Usage: node tests/verify-ui.mjs   (dev server must be running; BASE_URL overrides)
import { chromium, devices } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:5231/";
const SHOTS = "/tmp/shinersolutions-shots";

const results = [];
const record = (name, ok, detail = "") => {
  results.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
};

const FORM = {
  name: "Leo Ortiz",
  business: "Leo's Photography",
  contact: "leo@example.com",
  message: "Our site is from 2009 and I'd like a new one.",
};

async function fillForm(page) {
  await page.getByRole("textbox", { name: "Your name" }).fill(FORM.name);
  await page.getByRole("textbox", { name: /^Business/ }).fill(FORM.business);
  await page.getByRole("textbox", { name: "Email or phone" }).fill(FORM.contact);
  await page.getByRole("textbox", { name: "What do you need?" }).fill(FORM.message);
}

async function verify(label, ctx) {
  const page = await ctx.newPage();
  page.on("pageerror", (err) => record(`${label}/no-page-errors`, false, err.message));
  await page.goto(BASE, { waitUntil: "networkidle" });

  // 1) hero promise
  const h1 = await page.getByRole("heading", { level: 1 }).textContent();
  record(
    `${label}/hero promise`,
    /Your website, handled/.test(h1 ?? "") && /you own everything/i.test(h1 ?? ""),
    h1?.trim().slice(0, 60),
  );

  // 2) nav links present and pointing at real anchors
  for (const [name, target] of [
    ["What we do", "#offer"],
    ["Why us", "#why"],
    ["Contact", "#contact"],
  ]) {
    const link = page.getByRole("navigation", { name: "Sections" }).getByRole("link", { name });
    const visible = await link.isVisible();
    const href = await link.getAttribute("href");
    const anchored = (await page.locator(target).count()) === 1;
    record(`${label}/nav ${name}`, visible && href === target && anchored, `href=${href}`);
  }

  // 3) before/after artifact
  record(
    `${label}/before-after artifact`,
    await page.getByText(/before \/ after — illustrative/).isVisible(),
  );

  // 4) offer rows
  for (const name of ["Managed websites", "Build & migrate", "Technical consulting"]) {
    record(`${label}/offer ${name}`, await page.getByRole("heading", { name }).isVisible());
  }

  // 5) ownership receipt
  const yours = await page.getByText("yours ✓").count();
  record(`${label}/ownership receipt`, yours === 3, `count=${yours}`);

  // 6) no broken nav — every in-page link resolves to an existing element
  const hrefs = await page
    .locator('a[href^="#"]')
    .evaluateAll((as) => as.map((a) => a.getAttribute("href")));
  let broken = 0;
  for (const href of hrefs) {
    if (href === "#top") continue;
    if ((await page.locator(href).count()) !== 1) broken++;
  }
  record(`${label}/no broken anchors`, broken === 0, `broken=${broken}`);

  // 7) honeypot off-screen (position: -9999px keeps it "visible" but out of viewport)
  const hpBox = await page.locator("#website").boundingBox();
  record(`${label}/honeypot off-screen`, hpBox === null || hpBox.x < -1000, `x=${hpBox?.x}`);

  await page.screenshot({ path: `${SHOTS}/${label}-01-full.png`, fullPage: true });

  // 8) contact form — success path (stubbed endpoint)
  await page.route("**/api/contact", (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' }),
  );
  await fillForm(page);
  await page.getByRole("button", { name: "Send it over" }).click();
  await page.getByRole("status").waitFor({ timeout: 3000 });
  record(
    `${label}/form success state`,
    /hear back within a business day/i.test((await page.getByRole("status").textContent()) ?? ""),
  );
  await page.screenshot({ path: `${SHOTS}/${label}-02-form-success.png` });

  // 9) contact form — failure path
  await page.unroute("**/api/contact");
  await page.route("**/api/contact", (route) => route.fulfill({ status: 502, body: "{}" }));
  await page.reload({ waitUntil: "networkidle" });
  await fillForm(page);
  await page.getByRole("button", { name: "Send it over" }).click();
  const errLink = page.getByRole("link", { name: "hello@shinersolutions.com" }).first();
  await errLink.waitFor({ timeout: 3000 });
  record(`${label}/form failure state`, await errLink.isVisible());
  await page.screenshot({ path: `${SHOTS}/${label}-03-form-error.png` });

  await page.close();
}

const browser = await chromium.launch({ headless: true });
try {
  const desktopCtx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  await verify("desktop", desktopCtx);
  await desktopCtx.close();

  const mobileCtx = await browser.newContext({ ...devices["iPhone 13"] });
  await verify("mobile", mobileCtx);
  await mobileCtx.close();
} finally {
  await browser.close();
}

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
if (failed.length > 0) {
  console.log("FAILURES:");
  failed.forEach((f) => console.log(`  - ${f.name}: ${f.detail}`));
}
process.exit(failed.length === 0 ? 0 : 1);
