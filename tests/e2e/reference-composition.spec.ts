import { expect, test } from '@playwright/test';

for (const width of [360, 1280]) {
  for (const theme of ['dark', 'light']) {
    test(`reference cards work in ${theme} at ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.addInitScript((value) => localStorage.setItem('theme', value), theme);
      await page.goto('/');
      const demo = page.locator('.constellation-demo');
      await demo.scrollIntoViewIfNeeded();
      await expect(demo.getByRole('heading', { name: 'Animated tabs' })).toBeVisible();
      await expect(demo.locator('.preview-stage')).toHaveAttribute('data-bwm-theme', 'dark');
      const develop = demo.getByRole('tab', { name: 'Develop', exact: true });
      await develop.click();
      await expect(develop).toHaveAttribute('aria-selected', 'true');
      await develop.press('ArrowRight');
      await expect(demo.getByRole('tab', { name: 'Deliver', exact: true })).toHaveAttribute(
        'aria-selected',
        'true',
      );
      const source = page.locator('.constellation-source');
      await source
        .getByRole('group', { name: 'Owned source framework' })
        .getByRole('button', { name: 'vue', exact: true })
        .click();
      await expect(source.locator('.source-object')).toContainText('vue.vue');
      await expect(source.locator('.source-toolbar code')).toContainText(
        '/r/vue/animated-tabs.json',
      );
      await expect(source.getByRole('link', { name: /Read every file/ })).toHaveAttribute(
        'href',
        '/components/animated-tabs?framework=vue',
      );
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true);
      if (width > 980) {
        const left = await demo.boundingBox();
        const right = await source.boundingBox();
        expect(left).not.toBeNull();
        expect(right).not.toBeNull();
        expect(Math.abs(left!.y - right!.y)).toBeLessThan(2);
        expect(right!.x).toBeGreaterThan(left!.x + left!.width);
      }
    });
  }
}
