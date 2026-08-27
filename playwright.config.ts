import { defineConfig, devices } from "@playwright/test";

const PORT = process.env.E2E_PORT ?? "3100";
const BASE_URL = process.env.E2E_BASE_URL ?? `http://127.0.0.1:${PORT}`;

/**
 * The API base is intentionally unreachable (a synthetic loopback port with
 * no server behind it). Every spec installs `apiMock` before navigating, so
 * every request to this origin is answered by Playwright's route
 * interception rather than a live network call — this constant only needs
 * to be a stable, unique origin for the fixtures to key off.
 */
const MOCK_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:4010/api/v1";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["html", { open: "never" }], ["list"]] : "list",
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "off",
    actionTimeout: 15_000,
  },
  projects: [
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 5"] },
    },
  ],
  webServer: {
    // A production build + `next start` is used instead of `next dev` so
    // Fast Refresh / on-demand Turbopack compilation never interrupts a
    // spec mid-interaction (dev-mode HMR can remount client components
    // while a test is mid-click, producing flaky "session vanished"
    // failures that have nothing to do with the app or the test).
    command: `npm run build && npm run start -- -p ${PORT} -H 127.0.0.1`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    env: {
      NEXT_PUBLIC_API_URL: MOCK_API_URL,
    },
/**
 * Dedicated Playwright configuration for the visual regression suite
 * (e2e/visual). This config is intentionally separate from any other
 * Playwright suites the project may add (functional e2e, a11y, perf) so the
 * visual project can be run, reviewed, and evolved independently.
 *
 * Viewport rationale (see e2e/visual/README.md for the full write-up):
 *  - desktop-1440: the approved desktop breakpoint used across EarnProof's
 *    design references (max page width is 1440px, see pageContainer).
 *  - tablet-768:   intermediate width required by the issue acceptance
 *    criteria; 768px is the Tailwind `md` breakpoint the app already
 *    branches layout on (grid-cols-3 -> stacked, nav collapse, etc.).
 *  - mobile-390:   the approved mobile breakpoint (iPhone 12/13/14 class
 *    device width), the narrowest width the layouts are designed for.
 */
const PORT = 3100;
const BASE_URL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./e2e/visual",
  outputDir: "./e2e/visual/.test-results",
  snapshotPathTemplate: "{testDir}/{testFilePath}-snapshots/{arg}-{projectName}{ext}",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [["list"], ["html", { outputFolder: "./e2e/visual/.report", open: "never" }]]
    : "list",
  timeout: 30_000,
  expect: {
    // Conservative pixel-diff thresholds. Kept small and explicit rather
    // than relying on Playwright defaults so any tightening/loosening is a
    // reviewable, intentional change.
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
      animations: "disabled",
    },
  },
  use: {
    baseURL: BASE_URL,
    locale: "en-US",
    timezoneId: "UTC",
    colorScheme: "dark",
    trace: "retain-on-failure",
    screenshot: "off",
    video: "off",
  },
  projects: [
    {
      name: "desktop-1440",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "tablet-768",
      use: { ...devices["Desktop Chrome"], viewport: { width: 768, height: 1024 } },
    },
    {
      name: "mobile-390",
      use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 } },
    },
  ],
  webServer: {
    command: `npm run start -- --port ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
