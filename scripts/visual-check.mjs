import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "http://localhost:3123";
const OUT = "/tmp/shots";
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH ?? "/usr/bin/google-chrome",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});

const cases = [
  { name: "home-desktop", url: `${BASE}/`, width: 1440, height: 900 },
  { name: "home-mobile", url: `${BASE}/`, width: 390, height: 844 },
  { name: "home-tablet", url: `${BASE}/`, width: 768, height: 1024 },
  { name: "zainpos-desktop", url: `${BASE}/projects/zainpos`, width: 1440, height: 900 },
  { name: "zainpos-mobile", url: `${BASE}/projects/zainpos`, width: 390, height: 844 },
  { name: "solnest-desktop", url: `${BASE}/projects/solnest`, width: 1440, height: 900 },
  { name: "lead-triage-desktop", url: `${BASE}/projects/lead-triage`, width: 1440, height: 900 },
  { name: "lifelark-desktop", url: `${BASE}/projects/lifelark`, width: 1440, height: 900 },
  { name: "404-page", url: `${BASE}/nope`, width: 1440, height: 900 },
];

let failures = 0;

for (const c of cases) {
  const page = await browser.newPage();
  await page.setViewport({ width: c.width, height: c.height, deviceScaleFactor: 1 });
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));

  await page.goto(c.url, { waitUntil: "networkidle0", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1200));

  const overflow = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
  }));

  const info = await page.evaluate(() => {
    const h1 = document.querySelector("h1");
    const sections = document.querySelectorAll("section").length;
    const imgs = [...document.images].map((i) => i.naturalWidth === 0 && i.currentSrc ? i.currentSrc : null).filter(Boolean);
    return {
      h1: h1 ? h1.textContent.trim().slice(0, 60) : null,
      title: document.title,
      sections,
      brokenImgs: imgs,
    };
  });

  // scroll through the page so scroll-reveal sections become visible
  const full = await page.evaluate(() => document.body.scrollHeight);
  const steps = Math.max(4, Math.ceil(full / 900));
  for (let i = 0; i <= steps; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * 900);
    await new Promise((r) => setTimeout(r, 160));
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: `${OUT}/${c.name}.png`, fullPage: true });

  // assert every section heading reached full opacity after reveal
  const hiddenHeadings = await page.evaluate(() => {
    const heads = [...document.querySelectorAll("h2")];
    return heads.filter((h) => getComputedStyle(h).opacity !== "1").map((h) => h.textContent.trim().slice(0, 40));
  });
  if (hiddenHeadings.length) {
    failures++;
    console.log(`   ✗ headings never revealed: ${hiddenHeadings.join(", ")}`);
  }

  const problems = [];
  if (errors.length) problems.push(`console errors (${errors.length})`);
  if (overflow.scrollW > overflow.clientW + 1) problems.push(`h-overflow ${overflow.scrollW - overflow.clientW}px`);
  if (info.brokenImgs.length) problems.push(`broken images: ${info.brokenImgs.join(",")}`);
  if (problems.length) failures++;

  console.log(`[${c.name}] ok=${problems.length === 0} h1="${info.h1}" sections=${info.sections} height=${full} ${problems.join(" | ")}`);
  for (const e of errors.slice(0, 4)) console.log(`   ✗ ${e.slice(0, 200)}`);

  // scan internal links for 404s
  const links = await page.$$eval("a[href]", (as) =>
    as.map((a) => a.getAttribute("href")).filter((h) => h && h.startsWith("/"))
  );
  const unique = [...new Set(links)];
  const broken = [];
  for (const href of unique) {
    if (href.startsWith("/#") || href === "/") continue;
    const res = await page.evaluate(async (u) => {
      const r = await fetch(u, { redirect: "follow" });
      return r.status;
    }, href);
    if (res >= 400) broken.push(`${href} → ${res}`);
  }
  if (broken.length) {
    failures++;
    console.log(`   ✗ broken links: ${broken.join(", ")}`);
  } else if (unique.length) {
    console.log(`   ✓ ${unique.length} internal links resolve`);
  }

  await page.close();
}

await browser.close();
console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} case(s) with failures`);
process.exit(failures === 0 ? 0 : 1);
