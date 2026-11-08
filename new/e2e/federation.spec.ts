import { expect, test } from '@playwright/test';

test('carrega quatro páginas federadas com runtime compartilhado', async ({ page }) => {
  const entries: string[] = [];
  const errors: string[] = [];
  page.on('request', request => {
    if (request.url().includes('/remotes/') && request.url().includes('/remoteEntry.js')) entries.push(request.url());
  });
  page.on('pageerror', error => errors.push(error.message));

  await page.goto('/inicio');
  await expect(page.getByRole('heading', { name: 'Bem-vinda de volta, Marina' })).toBeVisible();
  await page.evaluate(() => { document.documentElement.dataset.shellNavigationCheck = 'preserved'; });
  await expect(page.locator('.metric')).toHaveCount(3);
  await expect(page.locator('tbody')).toContainText('Ana Martins');
  await expect(page.locator('.chart-item')).toHaveCount(6);

  await page.getByRole('link', { name: 'Contas' }).click();
  await expect(page.getByRole('heading', { name: 'Contas', exact: true })).toBeVisible();
  expect(entries).toHaveLength(2);
  await page.getByRole('searchbox', { name: 'Buscar contas' }).fill('Ricardo');
  await expect(page.locator('tbody tr')).toHaveCount(1);
  await expect(page.locator('tbody')).toContainText('Ricardo Lima');

  await page.getByRole('link', { name: 'Movimentações' }).click();
  await expect(page.getByRole('heading', { name: 'Movimentações', exact: true })).toBeVisible();
  await page.getByRole('searchbox', { name: 'Buscar movimentações' }).fill('Bruno');
  await expect(page.locator('tbody tr')).toHaveCount(1);
  await expect(page.locator('tbody')).toContainText('Bruno Almeida');

  await page.getByRole('link', { name: 'Investimentos' }).click();
  await expect(page.getByRole('heading', { name: 'Investimentos', exact: true })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-shell-navigation-check', 'preserved');
  await expect(page.locator('tbody')).toContainText('CDB Roxo');
  await expect(page.locator('.chart-item')).toHaveCount(4);
  for (const name of ['inicio', 'contas', 'movimentacoes', 'investimentos']) {
    expect(entries.some(url => url.includes(`/remotes/${name}/remoteEntry.js`))).toBe(true);
  }
  expect(errors).toEqual([]);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Investimentos', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Visão geral' }).click();
  await expect(page.getByRole('heading', { name: 'Bem-vinda de volta, Marina' })).toBeVisible();
});

test('exibe falha explícita se o remoto estiver indisponível', async ({ page }) => {
  await page.route('**/remotes/contas/remoteEntry.js', route => route.abort());
  await page.goto('/contas');
  await expect(page.getByRole('heading', { name: 'Não foi possível carregar esta página' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Recarregar página' })).toBeVisible();
  await page.unroute('**/remotes/contas/remoteEntry.js');
  await page.getByRole('button', { name: 'Recarregar página' }).click();
  await expect(page.getByRole('heading', { name: 'Contas', exact: true })).toBeVisible();
});

test('recusa remoto com instância incompatível do Angular', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await page.route('**/remotes/contas/remoteEntry.js', route => route.fulfill({
    contentType: 'text/javascript',
    body: 'export async function init() {} export async function get() { return () => ({ angularRuntime: () => {}, AccountsPage: class {} }); }'
  }));
  await page.goto('/contas');
  await expect(page.getByRole('heading', { name: 'Não foi possível carregar esta página' })).toBeVisible();
  expect(errors.some(message => message.includes('não compartilha o runtime Angular'))).toBe(true);
});

test('preserva o fallback de rota e não mascara arquivos ausentes', async ({ page, request }) => {
  await page.goto('/caminho-inexistente');
  await expect(page).toHaveURL(/\/inicio$/);
  await expect(page.getByRole('heading', { name: 'Bem-vinda de volta, Marina' })).toBeVisible();
  expect((await request.get('/remotes/contas/arquivo-inexistente.js')).status()).toBe(404);
  expect((await request.get('/remotes/desconhecido/remoteEntry.js')).status()).toBe(404);
});

test('mantém as páginas acessíveis em tela estreita', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  for (const [path, title] of [
    ['/inicio', 'Bem-vinda de volta, Marina'],
    ['/contas', 'Contas'],
    ['/movimentacoes', 'Movimentações'],
    ['/investimentos', 'Investimentos']
  ]) {
    await page.goto(path);
    await expect(page.getByRole('heading', { name: title, exact: true })).toBeVisible();
    await expect(page.locator('.metric')).toHaveCount(3);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
  }
});
