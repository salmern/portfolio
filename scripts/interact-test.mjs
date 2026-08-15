import puppeteer from "puppeteer-core";

const BASE = process.env.BASE_URL ?? "http://localhost:3123";
const browser = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});

let failures = 0;
const check = (name, ok, detail = "") => {
  console.log(`${ok ? "✓" : "✗"} ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures++;
};

/* 1. SystemFlow runs end to end */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle0" });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise((r) => setTimeout(r, 600));

  // wait for autoplay to finish (or click run if idle)
  await page.waitForFunction(
    () => document.querySelector("section#system")?.textContent.includes("COMPLETE"),
    { timeout: 20000 }
  ).catch(() => {});
  const done = await page.evaluate(() =>
    document.querySelector("section#system")?.textContent.includes("COMPLETE")
  );
  check("SystemFlow auto-runs to completion", !!done);
  const logLines = await page.evaluate(() => {
    const log = document.querySelector('[role="log"]');
    return log ? log.querySelectorAll("p").length : 0;
  });
  check("SystemFlow log populated", logLines > 10, `${logLines} log lines`);

  // manual replay
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll("button")].find((b) => b.textContent.includes("Replay"));
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 14000));
  const replayDone = await page.evaluate(() =>
    document.querySelector("section#system")?.textContent.includes("COMPLETE")
  );
  check("SystemFlow replay completes", !!replayDone);
  await page.close();
}

/* 2. Arsenal hover reveals detail panel */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle0" });
  await page.evaluate(() => {
    const el = document.querySelector("#arsenal");
    el?.scrollIntoView();
  });
  await new Promise((r) => setTimeout(r, 700));

  const firstChip = await page.$("#arsenal button");
  await firstChip?.hover();
  await new Promise((r) => setTimeout(r, 500));
  const panelText = await page.evaluate(() => {
    const panel = [...document.querySelectorAll("#arsenal div")].find((d) =>
      d.textContent.includes("used in") && d.textContent.length > 40
    );
    return panel ? panel.textContent.slice(0, 120) : null;
  });
  check("Arsenal hover shows detail panel", !!panelText, panelText?.slice(0, 80) ?? "no panel");
  await page.close();
}

/* 3. Architecture diagram renders on ZainPOS page */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE}/projects/zainpos`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 800));
  const diagram = await page.evaluate(() => {
    // the diagram is the svg that carries edge labels (text elements)
    const svg = [...document.querySelectorAll("svg")].find((s) => s.querySelectorAll("text").length > 0);
    const boxes = [...document.querySelectorAll("div")].filter((d) =>
      d.className?.includes && String(d.className).includes("min-h-[64px]")
    );
    const paths = svg ? svg.querySelectorAll("path").length : 0;
    return { edges: Math.max(0, paths - 1), boxes: boxes.length }; // -1 for the marker arrow
  });
  check("ZainPOS diagram renders boxes + edges", diagram.boxes >= 8 && diagram.edges >= 7,
    `${diagram.boxes} nodes, ${diagram.edges} edges`);
  await page.screenshot({ path: "/tmp/shots/zainpos-diagram.png" });
  await page.close();
}

/* 4. Mobile menu opens */
{
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle0" });
  await page.click('button[aria-label="Open menu"]');
  await new Promise((r) => setTimeout(r, 400));
  const menuShown = await page.evaluate(() => document.body.textContent.includes("Arsenal"));
  check("Mobile menu opens", !!menuShown);
  await page.close();
}

await browser.close();
console.log(failures === 0 ? "\nINTERACTION CHECKS PASSED" : `\n${failures} failures`);
process.exit(failures === 0 ? 0 : 1);
