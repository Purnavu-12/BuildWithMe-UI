import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const theme of ['dark', 'light']) {
  for (const width of [360, 1280]) {
    test(`motion handbook renders a usable checklist in ${theme} at ${width}px`, async ({
      page,
    }, testInfo) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.addInitScript((value) => localStorage.setItem('theme', value), theme);
      await page.goto('/docs/motion#testing-reduced-motion');
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      const section = page.locator('#testing-reduced-motion');
      await expect(
        section.getByRole('heading', { name: 'Testing reduced-motion preference' }),
      ).toBeVisible();
      await expect(section.locator('ol > li')).toHaveCount(5);
      await expect(section.locator('ol')).toHaveCSS('list-style-type', 'decimal');
      await expect(section.locator('ol > li').last()).toContainText('operating-system preference');
      await expect(section).not.toContainText('scroll-linked');
      const guidance = section.getByRole('link', {
        name: 'Chrome DevTools reduced-motion guidance',
      });
      await expect(guidance).toHaveAttribute(
        'href',
        /^https:\/\/developer\.chrome\.com\/docs\/devtools\/rendering\/emulate-css\//,
      );
      await guidance.focus();
      await expect(guidance).toBeFocused();
      await expect(section.getByRole('link', { name: 'Homepage', exact: true })).toHaveAttribute(
        'href',
        '/',
      );
      await expect(section.getByRole('link', { name: 'Magnetic Button preview' })).toHaveAttribute(
        'href',
        '/components/magnetic-button',
      );
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
      const accessibility = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();
      expect(accessibility.violations).toEqual([]);
      if (testInfo.project.name === 'chromium')
        await section.screenshot({ path: `tmp/pr36-checklist-${theme}-${width}.png` });
    });
  }
}

test('checklist destinations retain usable controls with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.engine-vector .cosmos-static')).toBeVisible();
  await expect(page.locator('canvas')).toHaveCount(0);
  await page.goto('/components/magnetic-button');
  await page.locator('.detail-preview').scrollIntoViewIfNeeded();
  const button = page.locator('.detail-preview').getByRole('button', { name: 'Pull me closer' });
  await expect(button).toBeVisible();
  await button.focus();
  await expect(button).toBeFocused();
  await button.press('Enter');
  await expect(page.locator('.detail-preview .bw-demo')).toHaveAttribute('data-active', 'false');
});
