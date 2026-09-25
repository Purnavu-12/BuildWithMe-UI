import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage presents the ecosystem before discovery', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Build the interface/ })).toBeVisible();
  await expect(page.getByText('120', { exact: true }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /Explore the collection/ })).toBeVisible();
  await expect(page.locator('canvas')).toHaveCount(1);
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  expect(results.violations).toEqual([]);
});

test('search and every filter survive reload and reset cleanly', async ({ page }) => {
  await page.goto('/components');
  await page.getByRole('combobox', { name: 'Filter by product domain' }).selectOption('navigation');
  await page.getByRole('combobox', { name: 'Filter by framework' }).selectOption('vue');
  await expect(page).toHaveURL(/domain=navigation/);
  await expect(page.locator('.component-card')).toHaveCount(3);
  await page.reload();
  await expect(page.getByRole('combobox', { name: 'Filter by product domain' })).toHaveValue('navigation');
  await page.getByRole('textbox', { name: 'Search components' }).fill('no-such-design');
  await expect(page.getByText('No design matches that combination.')).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(page.locator('.component-card')).toHaveCount(40);
});

test('detail supports preview controls, framework source, and copy failure recovery', async ({ page }) => {
  await page.goto('/components/magnetic-button');
  await expect(page.getByRole('heading', { name: 'Magnetic button' })).toBeVisible();
  await page.getByRole('button', { name: 'Pause preview' }).click();
  await expect(page.locator('.bw-demo')).toHaveAttribute('data-active', 'false');
  await page.getByRole('button', { name: 'Play preview', exact: true }).click();
  await page.getByRole('combobox', { name: 'Preview theme' }).selectOption('light');
  await page.getByRole('combobox', { name: 'Preview width' }).selectOption('360px');
  await page.getByRole('tab', { name: 'vue' }).click();
  await expect(page.locator('.source-block')).toContainText('<template>');
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { value: { writeText: () => Promise.reject(new Error('blocked')) }, configurable: true }));
  await page.getByRole('button', { name: 'Copy command' }).click();
  await expect(page.getByText('Copy failed')).toBeVisible();
});

test('invalid component route returns the designed 404', async ({ page }) => {
  const response = await page.goto('/components/not-a-component');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading')).toBeVisible();
});

for (const theme of ['dark', 'light'] as const) {
  for (const width of [360, 768, 1280, 1536]) {
    test(`${theme} homepage at ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto('/');
      await page.locator('html').evaluate((element, value) => element.setAttribute('data-theme', String(value)), theme);
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      await page.screenshot({ path: `test-results/home-${theme}-${width}.png`, fullPage: false });
    });
  }
}

test('reduced motion uses the static hero and every React preview renders', async ({ page }) => {
  test.setTimeout(120000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.hero-static')).toBeVisible();
  const index = await (await page.request.get('/index.v2.json')).json();
  expect(index.items).toHaveLength(40);
  for (const item of index.items) {
    await page.goto(`/preview/${item.id}/react`);
    await expect(page.getByText('This preview could not load.')).toHaveCount(0);
    await expect(page.locator('.preview-stage')).toBeVisible();
  }
});

test('machine-readable registry exposes all framework artifacts', async ({ page }) => {
  const registry = await (await page.request.get('/registry.json')).json();
  expect(registry.items).toHaveLength(120);
  for (const framework of ['react', 'vue', 'svelte']) {
    const response = await page.request.get(`/r/${framework}/magnetic-button.json`);
    expect(response.ok()).toBe(true);
    expect((await response.json()).meta.framework).toBe(framework);
  }
});
