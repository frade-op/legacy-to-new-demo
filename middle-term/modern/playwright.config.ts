import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://127.0.0.1:4209',
    channel: 'chrome'
  },
  webServer: {
    command: 'node ../server.mjs',
    env: { PORT: '4209' },
    url: 'http://127.0.0.1:4209/inicio',
    reuseExistingServer: false
  }
});
