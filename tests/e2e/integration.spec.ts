import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
for (const framework of ['react', 'vue', 'svelte'] as const) {
  test(`${framework} integrates custom props, controlled events, composition and recovery`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`/examples/${framework}`);
    const handbook = page.getByRole('navigation', { name: 'Documentation' });
    const integrationLink = handbook.getByRole('link', { name: 'Integration examples' });

    await expect(handbook).toBeVisible();
    await expect(integrationLink).toHaveAttribute('href', `/examples/${framework}`);
    await expect(integrationLink).toHaveAttribute('aria-current', 'page');

    // The handbook becomes a compact navigation block on mobile, not a missing sidebar.
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(handbook).toBeVisible();
    await page.setViewportSize({ width: 1280, height: 800 });

    const app =
      framework === 'react'
        ? page.locator('.bwm-examples')
        : page
            .frameLocator(`iframe[title="${framework} preview for integration-example"]`)
            .locator('.bwm-examples');
    const tabs = app.locator('[data-example="tabs"]');
    const pagination = app.locator('[data-example="pagination"]');
    const pricing = app.locator('[data-example="pricing"]');
    const table = app.locator('[data-example="table"]');
    const events = app.getByLabel('Last component event');
    await expect(tabs.getByRole('tabpanel')).toHaveText('Custom panel: Launch status');
    await tabs.getByRole('tab', { name: 'Overview' }).focus();
    await tabs.getByRole('tab', { name: 'Overview' }).press('End');
    await expect(tabs.getByRole('tab', { name: 'Activity' })).toBeFocused();
    await expect(tabs.getByRole('tabpanel')).toHaveText('Custom panel: Recent activity');
    await expect(events).toHaveText('{"event":"tab","value":"activity"}');
    await pagination.getByRole('button', { name: 'Next page' }).click();
    await expect(pagination.getByRole('button', { name: '2', exact: true })).toHaveAttribute(
      'aria-current',
      'page',
    );
    await expect(events).toHaveText('{"event":"page","value":2}');
    await pricing.getByRole('button', { name: /Yearly billing/ }).click();
    await expect(pricing).toContainText('$9');
    await expect(events).toHaveText('{"event":"billing","value":"yearly"}');
    await pricing.getByRole('button', { name: 'Choose Launch' }).click();
    await expect(events).toHaveText('{"event":"plan","value":"launch"}');
    await expect(table.locator('tbody tr td:first-child strong')).toHaveText(['Atlas', 'Zephyr']);
    await table.getByRole('button', { name: /^Name/ }).click();
    await expect(events).toHaveText(
      '{"event":"sort","value":{"key":"name","direction":"descending"}}',
    );
    await expect(table.locator('tbody tr td:first-child strong')).toHaveText(['Zephyr', 'Atlas']);
    await table.getByRole('button', { name: 'Inspect Atlas' }).click();
    await expect(events).toHaveText(
      '{"event":"row","value":{"id":"atlas","name":"Atlas","status":"Ready"}}',
    );
    await app.getByLabel('Hold controlled values').check();
    await tabs.getByRole('tab', { name: 'Overview' }).click();
    await expect(events).toHaveText('{"event":"tab","value":"overview"}');
    await expect(tabs.getByRole('tab', { name: 'Activity' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await pagination.getByRole('button', { name: 'Next page' }).click();
    await expect(events).toHaveText('{"event":"page","value":3}');
    await expect(pagination.getByRole('button', { name: '2', exact: true })).toHaveAttribute(
      'aria-current',
      'page',
    );
    await pricing.getByRole('button', { name: 'Choose Scale' }).click();
    await expect(pricing.getByRole('button', { name: 'Choose Launch' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await table.getByRole('button', { name: /^Name/ }).click();
    await expect(table.getByRole('columnheader', { name: /^Name/ })).toHaveAttribute(
      'aria-sort',
      'descending',
    );
    await app.getByLabel('Hold controlled values').uncheck();
    await app.getByRole('button', { name: 'Reset selections' }).click();
    await expect(tabs.getByRole('tab', { name: 'Overview' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await app.getByRole('button', { name: 'Show empty state' }).click();
    await expect(tabs).toContainText('No tabs available.');
    await expect(table).toContainText('No records available.');
    await expect(pricing).toContainText('No plans available.');
    await expect(pagination.getByRole('button', { name: 'Next page' })).toBeDisabled();
    await app.getByRole('button', { name: 'Restore example data' }).click();
    await expect(table.locator('tbody tr')).toHaveCount(2);
    await app.getByRole('button', { name: 'Reject next save' }).click();
    const save = app.locator('[data-example="async"]');
    await save.getByRole('button', { name: 'Save your changes' }).click();
    await save.getByRole('button', { name: 'Try again' }).click();
    await expect(save.getByRole('button', { name: /Saved/ })).toBeVisible();
    for (const button of await app.locator('[data-example="actions"] button').all())
      await button.click();
    await expect(app.getByLabel('Form submissions')).toHaveText('0');
    await app.getByRole('button', { name: 'Submit application form' }).click();
    await expect(app.getByLabel('Form submissions')).toHaveText('1');
    await app.getByRole('button', { name: 'Hide components' }).click();
    await expect(tabs).toHaveCount(0);
    await app.getByRole('button', { name: 'Show components' }).click();
    await expect(tabs.getByRole('tabpanel')).toHaveText('Custom panel: Launch status');
    const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
    expect(axe.violations).toEqual([]);
    expect(errors).toEqual([]);
  });
}
