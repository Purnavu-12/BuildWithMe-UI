import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage presents the ecosystem before discovery', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Build the interface/ })).toBeVisible();
  await expect(page.getByText('165', { exact: true }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /Explore the collection/ })).toBeVisible();
  await expect(page.locator('[data-cosmos-chapter]')).toHaveCount(5);
  await expect(page.locator('.cosmos-static')).toBeVisible();
  await expect(page.getByRole('link', { name: /GitHub/ }).first()).toHaveAttribute(
    'href',
    'https://github.com/Purnavu-12/BuildWithMe-UI',
  );
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  expect(results.violations).toEqual([]);
});

test('chapter navigation and command search work by keyboard', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /03 Translation/ }).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#translation$/);
  await expect(page.locator('#translation')).toBeInViewport();
  await page.keyboard.press('Control+k');
  const search = page.getByRole('combobox', { name: 'Search components and documentation' });
  await expect(search).toBeFocused();

  const commandResults = page.getByRole('listbox', { name: 'Search results' });
  const initialOptions = commandResults.getByRole('option');
  await search.press('ArrowUp');
  await expect(initialOptions.last()).toHaveAttribute('aria-selected', 'true');

  await search.fill('magnetic');
  const magnetic = commandResults.getByRole('option', { name: /Magnetic button/ });
  await expect(magnetic).toBeVisible();
  await expect(search).not.toHaveAttribute('aria-activedescendant');

  await search.press('ArrowDown');
  await expect(search).toBeFocused();
  await expect(magnetic).toHaveAttribute('aria-selected', 'true');
  await expect(search).toHaveAttribute('aria-activedescendant', 'command-search-option-0');

  await search.fill('no-such-command-search-result');
  await expect(commandResults.getByRole('option')).toHaveCount(0);
  await expect(search).not.toHaveAttribute('aria-activedescendant');

  await search.fill('magnetic');
  await search.press('ArrowDown');
  await search.press('Enter');
  await expect(page).toHaveURL(/\/components\/magnetic-button$/);
  await expect(page.getByRole('heading', { name: 'Magnetic button' })).toBeVisible();
  await page.waitForLoadState('networkidle');

  await page.keyboard.press('Control+k');
  await expect(search).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
});

test('search and every filter survive reload and reset cleanly', async ({ page }) => {
  const index = await (await page.request.get('/index.v2.json')).json();
  const navigationCount = index.items.filter((item: { domains: string[] }) =>
    item.domains.includes('navigation'),
  ).length;
  await page.goto('/components');
  await page.getByRole('combobox', { name: 'Filter by product domain' }).selectOption('navigation');
  await page.getByRole('combobox', { name: 'Filter by framework' }).selectOption('vue');
  await expect(page).toHaveURL((url) => {
    return url.searchParams.get('domain') === 'navigation' && url.searchParams.get('framework') === 'vue';
  });
  await expect(page.locator('.component-card')).toHaveCount(navigationCount);
  await page.waitForLoadState('networkidle');
  await page.reload();
  await expect(page.getByRole('combobox', { name: 'Filter by product domain' })).toHaveValue(
    'navigation',
  );
  await page.getByRole('textbox', { name: 'Search components' }).fill('no-such-design');
  await expect(page.getByText('No design matches that combination.')).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(page.locator('.component-card')).toHaveCount(55);
});

test('detail supports preview controls, framework source, and copy failure recovery', async ({
  page,
}) => {
  await page.goto('/components/magnetic-button');
  await expect(page.getByRole('heading', { name: 'Magnetic button' })).toBeVisible();
  await page.getByRole('button', { name: 'Pause preview' }).click();
  await expect(page.locator('.bw-demo')).toHaveAttribute('data-active', 'false');
  await page.getByRole('button', { name: 'Play preview', exact: true }).click();
  await page.getByRole('combobox', { name: 'Preview theme' }).selectOption('light');
  await page.getByRole('combobox', { name: 'Preview width' }).selectOption('360px');
  await page
    .getByRole('tablist', { name: 'Source framework' })
    .getByRole('tab', { name: 'vue' })
    .click();
  await expect(page.locator('.source-block')).toContainText('<template>');
  await expect(page.locator('.component-install code')).toContainText(
    'https://build-with-me-ui.vercel.app/r/react/magnetic-button.json',
  );
  await page.evaluate(() =>
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: () => Promise.reject(new Error('blocked')) },
      configurable: true,
    }),
  );
  await page.getByRole('button', { name: 'Copy command' }).click();
  await expect(page.getByText('Copy failed')).toBeVisible();
});

test('contribution page offers a beginner path before advanced component work', async ({
  page,
}) => {
  await page.goto('/contribute');
  await expect(page.getByRole('heading', { name: /Start small/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /good first issue/i })).toHaveAttribute(
    'href',
    /label%3A%22good(?:\+|%20)first(?:\+|%20)issue%22/,
  );
  await expect(page.getByRole('link', { name: /First contribution guide/ })).toHaveAttribute(
    'href',
    /FIRST_CONTRIBUTION\.md$/,
  );
});

test('site and component preview themes switch completely and persist', async ({ page }) => {
  await page.goto('/components/magnetic-button');
  await page.getByRole('combobox', { name: 'Color theme' }).selectOption('light');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(243, 240, 232)');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

  const stage = page.locator('.preview-stage');
  await expect(stage).toHaveAttribute('data-bwm-theme', 'light');
  await page.getByRole('combobox', { name: 'Preview theme' }).selectOption('dark');
  await expect(stage).toHaveAttribute('data-bwm-theme', 'dark');
  await expect(stage).toHaveCSS('background-color', 'rgb(5, 5, 5)');
  await expect(stage.locator('.bw-demo')).toHaveCSS('color', 'rgb(244, 241, 232)');
  expect(
    await stage
      .locator('.bw-demo')
      .evaluate((node) => getComputedStyle(node).getPropertyValue('--bw-border').trim()),
  ).toBe('#343431');
  await page.getByRole('combobox', { name: 'Preview theme' }).selectOption('light');
  await expect(stage).toHaveAttribute('data-bwm-theme', 'light');
  await expect(stage).toHaveCSS('background-color', 'rgb(243, 240, 232)');
  await expect(stage.locator('.bw-demo')).toHaveCSS('color', 'rgb(20, 20, 18)');
  expect(
    await stage
      .locator('.bw-demo')
      .evaluate((node) => getComputedStyle(node).getPropertyValue('--bw-border').trim()),
  ).toBe('#cbc6ba');
  await page.getByRole('combobox', { name: 'Preview theme' }).selectOption('dark');
  await expect(stage).toHaveCSS('background-color', 'rgb(5, 5, 5)');
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
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.addInitScript(
        (selectedTheme) => localStorage.setItem('theme', selectedTheme),
        theme,
      );
      await page.goto('/');
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true);
      await expect(page).toHaveScreenshot(`home-${theme}-${width}.png`, {
        animations: 'disabled',
        maxDiffPixelRatio: 0.01,
      });
    });
  }
}

test('reduced motion uses the static hero and every React preview renders', async ({ page }) => {
  test.setTimeout(120000);
  const pageErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.cosmos-static')).toBeVisible();
  await expect(page.locator('.cosmos-canvas')).toHaveCount(0);
  const index = await (await page.request.get('/index.v2.json')).json();
  expect(index.items).toHaveLength(55);
  for (const item of index.items) {
    await page.goto(`/preview/${item.id}/react`);
    await expect(page.getByText('This preview could not load.')).toHaveCount(0);
    await expect(page.locator('.preview-stage')).toBeVisible();
    await expect(page.locator('.preview-stage > :not(.preview-loading)').first()).toBeVisible();
  }
  expect(pageErrors).toEqual([]);
});

test('adapted artifacts expose working semantic interactions', async ({ page }) => {
  await page.goto('/components/folder-preview');
  const folder = page.locator('.adapt-folder');
  await folder.getByText('Folder preview').click();
  await expect(folder).toHaveAttribute('open', '');

  await page.goto('/components/account-login-card');
  await page.getByRole('textbox', { name: 'Email' }).fill('builder@example.com');
  await page.getByLabel('Password').fill('source-owned');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByRole('status')).toHaveText('Demo sign-in complete.');

  await page.goto('/components/precision-pagination');
  await expect(page.getByRole('button', { name: '2', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  );
});

test('dialog sheet is modal, keyboard accessible, and adaptive', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 });
  await page.goto('/preview/dialog-sheet/react');

  const trigger = page.getByRole('button', { name: 'Open Dialog sheet' });
  await trigger.focus();
  await trigger.press('Enter');

  const dialog = page.getByRole('dialog', { name: 'Dialog sheet' });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveJSProperty('open', true);
  expect(await dialog.evaluate((element) => element.matches(':modal'))).toBe(true);
  await expect(page.getByRole('button', { name: 'Close Dialog sheet' })).toBeFocused();
  await expect
    .poll(async () => {
      const box = await dialog.boundingBox();
      return box ? Math.round(box.y + box.height) : 0;
    })
    .toBe(800);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(dialog).toHaveCSS('animation-name', 'none');

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();

  await trigger.click();
  await page.getByRole('button', { name: 'Close Dialog sheet' }).click();
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();

  await page.setViewportSize({ width: 1000, height: 800 });
  await trigger.click();
  await expect
    .poll(async () => {
      const box = await dialog.boundingBox();
      return box ? Math.round(box.y + box.height / 2) : 0;
    })
    .toBe(400);
});

for (const framework of ['vue', 'svelte'] as const) {
  test(`${framework} preview route mounts its isolated runtime`, async ({ page }) => {
    await page.goto(`/preview/magnetic-button/${framework}`);
    await expect(page.locator('.live-label')).toContainText(
      new RegExp(`${framework} runtime`, 'i'),
    );
    const runtime = page.frameLocator(`iframe[title="${framework} preview for magnetic-button"]`);
    await expect(runtime.getByText(new RegExp(`BUILDWITHME / ${framework}`, 'i'))).toBeVisible();
    await runtime.getByRole('button', { name: 'Try interaction' }).click();
    await expect(runtime.getByRole('button', { name: 'Selected' })).toBeVisible();
    await page.getByRole('combobox', { name: 'Preview theme' }).selectOption('light');
    await expect(runtime.locator('body')).toHaveCSS('background-color', 'rgb(243, 240, 232)');
    const resources = await page.evaluate(() =>
      performance.getEntriesByType('resource').map((entry) => entry.name),
    );
    expect(resources.some((resource) => resource.includes(`/preview-runtime/${framework}/`))).toBe(
      true,
    );
    expect(
      resources.some((resource) =>
        resource.includes(`/preview-runtime/${framework === 'vue' ? 'svelte' : 'vue'}/`),
      ),
    ).toBe(false);
  });
}

test('save-data mode keeps the complete static story without WebGL', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'connection', {
      value: { saveData: true },
      configurable: true,
    });
  });
  await page.goto('/');
  await expect(page.locator('.cosmos-canvas')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: /The system grows/ })).toBeAttached();
});

test('ecosystem coverage is registry-derived and accessible', async ({ page }) => {
  await page.goto('/ecosystem');
  await expect(page.getByText('55', { exact: true }).first()).toBeVisible();
  await expect(page.getByText('165', { exact: true }).first()).toBeVisible();
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  expect(results.violations).toEqual([]);
});

for (const route of [
  '/components',
  '/components/magnetic-button',
  '/components/glass-dock',
  '/docs/installation',
  '/contribute',
]) {
  test(`${route} has no automated accessibility violations`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
    expect(results.violations).toEqual([]);
  });
}

test('machine-readable registry exposes all framework artifacts', async ({ page }) => {
  const registry = await (await page.request.get('/registry.json')).json();
  expect(registry.items).toHaveLength(165);
  for (const framework of ['react', 'vue', 'svelte']) {
    const response = await page.request.get(`/r/${framework}/magnetic-button.json`);
    expect(response.ok()).toBe(true);
    expect((await response.json()).meta.framework).toBe(framework);
  }
});
