import { defineConfig, devices } from "@playwright/test";

const VIEWPORTS = [
  { name: "320x800", width: 320, height: 800 },
  { name: "390x844", width: 390, height: 844 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "1024x768", width: 1024, height: 768 },
  { name: "1440x1000", width: 1440, height: 1000 },
] as const;

export { VIEWPORTS };

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 90_000,
  expect: {
    timeout: 10_000,
  },
  reporter: [
    ["list"],
    [
      "html",
      {
        outputFolder: "ui-audit/reports/playwright-html",
        open: "never",
      },
    ],
    ["json", { outputFile: "ui-audit/reports/playwright-results.json" }],
  ],
  outputDir: "ui-audit/reports/test-results",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "off",
  },
  projects: VIEWPORTS.map((viewport) => ({
    name: viewport.name,
    use: {
      ...devices["Desktop Chrome"],
      viewport: {
        width: viewport.width,
        height: viewport.height,
      },
    },
  })),
  webServer: {
    command: "npm run dev -- --hostname 127.0.0.1 --port 3000",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
