import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: { baseURL: 'http://127.0.0.1:4219', channel: 'chrome' },
  webServer: {
    command: 'node server.mjs',
    env: { PORT: '4219' },
    url: 'http://127.0.0.1:4219/',
    reuseExistingServer: false
  }
});
