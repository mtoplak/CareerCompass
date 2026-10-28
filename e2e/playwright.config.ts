import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, ".env.e2e"), quiet: true });

const isCI = !!process.env.CI;
const frontendPort = process.env.E2E_FRONTEND_PORT;
const backendPort = process.env.E2E_BACKEND_PORT;

export default defineConfig({
  testDir: "./tests",
  // All tests share one test database that is cleared before and after every test.
  fullyParallel: false,
  workers: 1,
  forbidOnly: isCI,
  retries: 0,
  timeout: 60_000,
  expect: { timeout: 15_000 },
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "playwright-report" }],
    ["junit", { outputFile: "results/junit.xml" }],
    ...(isCI ? ([["github"]] as const) : []),
  ],
  use: {
    baseURL: process.env.E2E_BASE_URL,
    locale: "sl-SI",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  // The servers are always started fresh: reusing a running dev server could point the tests
  // at a real database. The backend and frontend must be built first (npm run build:app).
  webServer: [
    {
      name: "Firebase Auth emulator",
      command: `npx firebase emulators:start --only auth --project ${process.env.FIREBASE_PROJECT_ID}`,
      url: `http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}`,
      reuseExistingServer: false,
      timeout: 120_000,
    },
    {
      name: "Backend",
      command: "npm --prefix ../backend run start:prod",
      url: `http://localhost:${backendPort}`,
      env: { PORT: backendPort! },
      reuseExistingServer: false,
      timeout: 120_000,
    },
    {
      name: "Frontend",
      command: `npm --prefix ../frontend run start -- -p ${frontendPort}`,
      url: `http://localhost:${frontendPort}`,
      reuseExistingServer: false,
      timeout: 120_000,
    },
  ],
});
