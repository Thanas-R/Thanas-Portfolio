import puppeteer from "puppeteer";
import fs from "fs-extra";
import path from "path";
import { spawn } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, "../dist");
const routesPath = path.resolve(__dirname, "../prerender-routes.json");

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function readRoutes() {
  const raw = await fs.readFile(routesPath, "utf8");
  return JSON.parse(raw).routes;
}

async function startPreviewServer() {
  return new Promise((resolve, reject) => {
    const server = spawn(
      "npx",
      ["vite", "preview", "--port", "4173"],
      {
        shell: true,
        stdio: "inherit",
      }
    );

    setTimeout(() => resolve(server), 5000);

    server.on("error", reject);
  });
}

async function prerender() {
  const routes = await readRoutes();

  const server = await startPreviewServer();

  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  for (const route of routes) {
    const url = `http://localhost:4173${route}`;

    console.log(`Rendering ${route}`);

    await page.goto(url, {
      waitUntil: "networkidle0",
    });

    await sleep(700);

    const html = await page.content();

    const outputDir =
      route === "/"
        ? distDir
        : path.join(distDir, route.slice(1));

    await fs.ensureDir(outputDir);

    await fs.writeFile(
      path.join(outputDir, "index.html"),
      html
    );
  }

  await browser.close();
  server.kill();

  console.log("Done");
}

prerender();