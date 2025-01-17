const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true, // Możesz zmienić na false, aby wyłączyć równoległość testów
  retries: 1, // Ustaw retry, jeśli testy mogą czasami zawieść
  workers: 1, // Ograniczenie liczby workerów do jednego
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on', // Trace ułatwia debugowanie
  },
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI, // Użyj istniejącego serwera, jeśli działa
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
