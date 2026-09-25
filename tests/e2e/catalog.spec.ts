import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('discover, filter, reload, reset, inspect, and recover copy failure', async ({ page }) => {
  await page.goto('/components');
  await page.getByRole('button', { name: 'Buttons 5', exact: true }).click();
  await page.getByRole('combobox', { name: 'Filter by engine' }).selectOption('css');
  await expect(page.locator('.component-card')).toHaveCount(3);
  await page.reload();
  await expect(page.locator('.component-card')).toHaveCount(3);
  await page.getByRole('textbox', { name: 'Search components' }).fill('nothing-matches');
  await expect(page.getByText('No components found. Yet.')).toBeVisible();
  await page.getByRole('button', { name: 'Clear all filters' }).click();
  await expect(page.locator('.component-card')).toHaveCount(25);
  await page.getByRole('link', { name: /Magnetic button/ }).click();
  await expect(page.getByRole('heading', { name: 'Magnetic button.' })).toBeVisible();
  await page.getByRole('button', { name: 'Pause preview' }).click();
  await expect(page.locator('.bw-demo')).toHaveAttribute('data-active', 'false');
  await page.getByRole('button', { name: 'Play preview', exact: true }).click();
  await page.getByRole('combobox', { name: 'Preview theme' }).selectOption('light');
  await page.getByRole('combobox', { name: 'Preview width' }).selectOption('360px');
  await page.getByRole('button', { name: 'Replay preview' }).click();
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: () => Promise.reject(new Error('blocked')) },
      configurable: true,
    });
  });
  await page.getByRole('button', { name: 'Copy command to clipboard' }).click();
  await expect(
    page.getByText('Copy unavailable. Select the code and copy manually.'),
  ).toBeVisible();
});
test('invalid routes and keyboard tabs', async ({ page }) => {
  const response = await page.goto('/components/not-a-component');
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole('heading', { name: 'This piece hasn’t been built yet.' }),
  ).toBeVisible();
  await page.goto('/components/animated-tabs');
  const tab = page.getByRole('tab', { name: 'Design', exact: true });
  await tab.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Develop', exact: true })).toBeFocused();
  await expect(page.getByRole('tabpanel')).toContainText('Turn the details');
});
test('preview failure offers recovery', async ({ page }) => {
  let recovered = false;
  await page.route('**/*.js', async (route) => {
    const response = await route.fetch();
    const body = await response.text();
    if (!recovered && body.includes('Pull me closer')) {
      await route.abort();
    } else await route.fulfill({ response });
  });
  await page.goto('/components/magnetic-button');
  await expect(page.getByText('This preview could not load.')).toBeVisible();
  recovered = true;
  await page.getByRole('button', { name: 'Try again', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Pull me closer' })).toBeVisible();
});
for (const theme of ['dark', 'light'])
  for (const width of [360, 768, 1280, 1536])
    test(`${theme} layout at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto('/');
      await page.getByRole('combobox', { name: 'Color theme', exact: true }).selectOption(theme);
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      await expect(page.locator('.component-card')).toHaveCount(25);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true);
      if (width < 800) {
        await page.getByRole('button', { name: 'Filters', exact: true }).click();
        await expect(page.getByRole('dialog')).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(page.getByRole('button', { name: 'Filters', exact: true })).toBeFocused();
      }
      await expect(page.locator('.component-card .bw-demo').first()).toBeVisible();
      await page.screenshot({
        path: `test-results/catalog-${theme}-${width}.png`,
        fullPage: false,
      });
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
      expect(
        results.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.slice(0, 3).map((n) => ({ target: n.target, summary: n.failureSummary })),
        })),
      ).toEqual([]);
    });
test('reduced motion, hidden previews, and every component renders', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const index = await (await page.request.get('/index.v1.json')).json();
  for (const item of index.items) {
    await page.goto(`/preview/${item.id}`);
    await expect(page.locator('.bw-demo')).toBeVisible();
    await expect(page.locator('.bw-demo')).toHaveAttribute('data-active', 'false');
    await expect(page.getByText('This preview could not load.')).toHaveCount(0);
  }
});
for (const theme of ['dark', 'light'])
  test(`every component is accessible in ${theme}`, async ({ page }) => {
    test.setTimeout(120000);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const index = await (await page.request.get('/index.v1.json')).json();
    for (const item of index.items) {
      await page.goto(`/preview/${item.id}`);
      await page.getByRole('combobox', { name: 'Preview theme', exact: true }).selectOption(theme);
      await expect(page.locator('.bw-demo')).toBeVisible();
      const results = await new AxeBuilder({ page })
        .include('.preview-stage')
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();
      expect(
        results.violations.map((v) => ({
          component: item.id,
          id: v.id,
          nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
        })),
      ).toEqual([]);
    }
  });
test('off-screen and hidden document animations stop', async ({ page }) => {
  await page.goto('/components/magnetic-button');
  await expect(page.locator('.bw-demo')).toHaveAttribute('data-active', 'true');
  await page.locator('.site-footer').scrollIntoViewIfNeeded();
  await expect(page.locator('.bw-demo')).toHaveAttribute('data-active', 'false');
  await page.locator('.preview-stage').scrollIntoViewIfNeeded();
  await expect(page.locator('.bw-demo')).toHaveAttribute('data-active', 'true');
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { get: () => true, configurable: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await expect(page.locator('.bw-demo')).toHaveAttribute('data-active', 'false');
});
