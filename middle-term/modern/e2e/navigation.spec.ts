import { expect, test } from '@playwright/test';

test('navega entre os dois microfrontends e preserva os filtros', async ({ page }) => {
  await page.goto('/inicio');
  await expect(page.getByRole('heading', { name: 'Bem-vinda de volta, Marina' })).toBeVisible();
  await expect(page.locator('.metric')).toHaveCount(3);

  await page.getByRole('link', { name: 'Contas' }).click();
  await expect(page).toHaveURL(/\/contas$/);
  await page.getByRole('searchbox', { name: 'Buscar contas' }).fill('Ricardo');
  await expect(page.locator('tbody tr')).toHaveCount(1);
  await expect(page.locator('tbody')).toContainText('Ricardo Lima');

  await page.getByRole('link', { name: 'Movimentações' }).click();
  await expect(page).toHaveURL(/\/legado\/movimentacoes$/);
  await expect(page.getByRole('heading', { name: 'Movimentações' })).toBeVisible();
  await page.getByRole('searchbox', { name: 'Buscar movimentações' }).fill('Bruno');
  await expect(page.locator('tbody tr')).toHaveCount(1);
  await expect(page.locator('tbody')).toContainText('Bruno Almeida');

  await page.getByRole('link', { name: 'Investimentos' }).click();
  await expect(page).toHaveURL(/\/legado\/investimentos$/);
  await expect(page.getByRole('heading', { name: 'Investimentos' })).toBeVisible();
  await expect(page.locator('tbody')).toContainText('CDB Roxo');
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Investimentos' })).toBeVisible();

  await page.getByRole('link', { name: 'Visão geral' }).click();
  await expect(page).toHaveURL(/\/inicio$/);
  await expect(page.getByRole('heading', { name: 'Bem-vinda de volta, Marina' })).toBeVisible();
});

test('mantém a geometria das páginas migradas no desktop e no celular', async ({ page }) => {
  for (const width of [1280, 600]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['inicio', 'contas']) {
      const selectors = ['.sidebar', '.topbar', 'h1', '.metric', '.table-card',
        route === 'inicio' ? '.chart-card' : '.filter'];
      await page.goto('/' + route);
      await expect(page.locator('h1')).toBeVisible();
      const modern = await Promise.all(selectors.map(selector => page.locator(selector).first().boundingBox()));
      await page.goto('/legado/' + route);
      await expect(page.locator('h1')).toBeVisible();
      const legacy = await Promise.all(selectors.map(selector => page.locator(selector).first().boundingBox()));
      for (let i = 0; i < selectors.length; i++) {
        expect(modern[i], `${route}: ${selectors[i]} em ${width}px`).toEqual(legacy[i]);
      }
    }
  }
});
