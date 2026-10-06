import { expect, test, type Page } from '@playwright/test';

async function expectCanvasAligned(page: Page) {
  const stage = page.locator('.engine-sticky');
  await expect(stage).toHaveAttribute('data-canvas-state', /^(ready|failed)$/);
  const ready = (await stage.getAttribute('data-canvas-state')) === 'ready';
  await expect(stage).toHaveAttribute('data-renderer', ready ? 'webgl' : 'svg');
  if (!ready) {
    await expect(page.locator('.engine-vector')).toBeVisible();
    await expect(page.locator('.engine-canvas canvas')).toHaveCount(0);
  }
  await expect
    .poll(async () =>
      page.locator('.engine-artboard').evaluate((artboard) => {
        const canvas = artboard.querySelector('canvas') ?? artboard.querySelector('svg');
        if (!canvas) return Infinity;
        const expected = artboard.getBoundingClientRect();
        const actual = canvas.getBoundingClientRect();
        return Math.max(
          Math.abs(expected.left - actual.left),
          Math.abs(expected.top - actual.top),
          Math.abs(expected.width - actual.width),
          Math.abs(expected.height - actual.height),
        );
      }),
    )
    .toBeLessThan(2);
}

test('hero scene stays in its own place during scrolling, resizing and pause', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'hardwareConcurrency', { configurable: true, get: () => 8 });
  });
  await page.goto('/');
  await expectCanvasAligned(page);
  await expect(page.locator('.engine-sticky')).toHaveCSS('position', 'relative');
  const heroTop = await page
    .locator('.engine-artboard')
    .evaluate((element) => element.getBoundingClientRect().top + window.scrollY);
  for (const id of ['constellation', 'translation', 'ownership', 'open-orbit', 'translation']) {
    await page.locator(`#${id}`).evaluate((element) => element.scrollIntoView());
    await expect(page.locator('.kinetic-story')).toHaveAttribute(
      'data-active-chapter',
      String(['signal', 'constellation', 'translation', 'ownership', 'open-orbit'].indexOf(id)),
    );
    await expectCanvasAligned(page);
    await expect(page.locator('.engine-artboard')).toHaveCSS('transform', 'none');
    const documentTop = await page
      .locator('.engine-artboard')
      .evaluate((element) => element.getBoundingClientRect().top + window.scrollY);
    expect(Math.abs(documentTop - heroTop)).toBeLessThan(2);
    await expect(page.locator('.engine-vector svg')).toHaveAttribute('data-scene', '0');
    await expect(page.locator(`#${id} .mobile-chapter-scene svg`)).toHaveCSS('opacity', '1');
  }
  await page.setViewportSize({ width: 1536, height: 1000 });
  await expectCanvasAligned(page);
  await page.setViewportSize({ width: 981, height: 900 });
  await expectCanvasAligned(page);
  await page.setViewportSize({ width: 980, height: 900 });
  await expect(page.locator('.engine-sticky')).toHaveAttribute('data-renderer', 'svg');
  await expect(page.locator('.engine-canvas canvas')).toHaveCount(0);
  await page.setViewportSize({ width: 1280, height: 900 });
  await expectCanvasAligned(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expectCanvasAligned(page);
  await page.getByRole('button', { name: 'Pause story animation' }).click();
  await expect(page.locator('.engine-sticky')).toHaveAttribute('data-running', 'false');
  await expectCanvasAligned(page);
  await page.getByRole('button', { name: 'Play story animation' }).click();
  await expectCanvasAligned(page);
});
