import { expect, test, type Locator } from '@playwright/test';
import { readFileSync } from 'node:fs';
const manifests = JSON.parse(
  readFileSync(new URL('../../src/generated/registry.json', import.meta.url), 'utf8'),
) as { id: string }[];

async function exercise(id: string, demo: Locator) {
  switch (id) {
    case 'animated-tabs': {
      const first = demo.getByRole('tab', { name: 'Design', exact: true });
      await first.focus();
      await first.press('ArrowRight');
      await expect(demo.getByRole('tab', { name: 'Develop', exact: true })).toBeFocused();
      await expect(demo.getByRole('tabpanel')).toContainText('Turn the details');
      await demo.getByRole('tab', { name: 'Develop', exact: true }).press('End');
      await expect(demo.getByRole('tab', { name: 'Deliver', exact: true })).toHaveAttribute(
        'aria-selected',
        'true',
      );
      break;
    }
    case 'adaptive-sidebar':
      await demo.getByRole('button', { name: 'Components', exact: true }).click();
      await expect(demo.getByRole('heading', { name: 'Components' })).toBeVisible();
      await demo.getByRole('button', { name: 'Collapse navigation' }).click();
      await expect(demo.getByRole('button', { name: 'Components', exact: true })).toHaveAttribute(
        'aria-current',
        'page',
      );
      await demo.getByRole('button', { name: 'Expand navigation' }).click();
      break;
    case 'command-palette': {
      const trigger = demo.getByRole('button', { name: /Open Command palette/ });
      await trigger.click();
      const input = demo.getByRole('combobox');
      await input.fill('handbook');
      await expect(demo.getByRole('option')).toHaveCount(1);
      await input.press('Enter');
      await expect(demo.getByRole('status')).toContainText('Read handbook selected');
      await expect(trigger).toBeFocused();
      await trigger.click();
      await input.fill('unfindable');
      await expect(demo.getByRole('option')).toHaveCount(0);
      await input.press('Escape');
      await expect(trigger).toBeFocused();
      break;
    }
    case 'multi-step-form':
      await demo.getByRole('button', { name: 'Continue' }).click();
      await expect(demo.getByLabel('Your name')).toBeFocused();
      await demo.getByLabel('Your name').fill('Builder');
      await demo.getByRole('button', { name: 'Continue' }).click();
      await demo.getByLabel('Email address').fill('builder@example.com');
      await demo.getByRole('button', { name: 'Continue' }).click();
      await expect(demo).toContainText('builder@example.com');
      await demo.getByRole('button', { name: 'Back', exact: true }).click();
      await expect(demo.getByLabel('Email address')).toHaveValue('builder@example.com');
      await demo.getByRole('button', { name: 'Continue' }).click();
      await demo.getByRole('button', { name: 'Complete profile' }).click();
      await expect(demo.getByRole('status')).toContainText('Builder');
      break;
    case 'prompt-composer':
      await expect(demo.getByRole('button', { name: 'Submit prompt' })).toBeDisabled();
      await demo.getByLabel('Your prompt').fill('  Create an orbit  ');
      await demo.getByRole('button', { name: 'Submit prompt' }).click();
      await expect(demo.getByLabel('Your prompt')).toHaveValue('');
      await expect(demo.getByRole('status')).toContainText('submitted locally');
      break;
    case 'folder-preview':
      await demo.locator('summary').focus();
      await demo.locator('summary').press('Enter');
      await expect(demo.locator('details')).toHaveAttribute('open', '');
      await expect(demo.locator('li')).toHaveCount(3);
      break;
    case 'precision-pagination':
      await demo.getByRole('button', { name: '1', exact: true }).click();
      await expect(demo.getByRole('button', { name: 'Previous page' })).toBeDisabled();
      await demo.getByRole('button', { name: 'Next page' }).click();
      await expect(demo.getByRole('button', { name: '2', exact: true })).toHaveAttribute(
        'aria-current',
        'page',
      );
      break;
    case 'media-gallery':
      await demo.getByRole('button', { name: 'Show Orbit object' }).focus();
      await demo.getByRole('button', { name: 'Show Orbit object' }).press('End');
      await expect(demo.locator('figure img')).toHaveAttribute('alt', /Coral/);
      await demo.getByRole('button', { name: 'Open image' }).click();
      await expect(demo.getByRole('dialog')).toBeVisible();
      await demo.getByRole('button', { name: 'Close image' }).click();
      await expect(demo.getByRole('button', { name: 'Open image' })).toBeFocused();
      break;
    case 'product-quick-view':
      await demo.getByRole('button', { name: /Open Product quick view/ }).click();
      await demo.getByLabel('Large', { exact: true }).check();
      await demo.getByRole('button', { name: 'Add to selection' }).click();
      await expect(demo.getByRole('status')).toContainText('Large Signal object added locally');
      await demo.getByRole('button', { name: 'Close quick view' }).click();
      break;
    case 'toast-stack':
      await demo.getByRole('button', { name: 'Pause timeouts' }).click();
      for (let i = 0; i < 4; i++)
        await demo.getByRole('button', { name: 'Add notification' }).click();
      await expect(demo.locator('.bwm-toast')).toHaveCount(3);
      await demo.getByRole('button', { name: 'Dismiss notification 2' }).click();
      await expect(demo.locator('.bwm-toast')).toHaveCount(2);
      break;
    case 'sortable-data-table':
      await demo.getByRole('button', { name: /^Name/ }).click();
      await expect(demo.getByRole('columnheader', { name: /^Name/ })).toHaveAttribute(
        'aria-sort',
        'descending',
      );
      await expect(demo.locator('tbody tr').first()).toContainText('Signal');
      await demo.getByRole('button', { name: 'Inspect Orbit' }).click();
      await expect(demo.getByRole('status')).toContainText('Selected Orbit');
      break;
    case 'workflow-stepper':
      await demo.getByRole('button', { name: 'Next', exact: true }).click();
      await expect(demo.getByRole('button', { name: 'Next', exact: true })).toBeDisabled();
      await expect(demo.getByRole('status')).toContainText('Ship');
      break;
    case 'pricing-matrix':
      await demo.getByRole('button', { name: /Yearly billing/ }).click();
      await expect(demo).toContainText('$14');
      await demo.getByRole('button', { name: 'Choose Studio' }).click();
      await expect(demo.getByRole('status')).toContainText('Studio selected locally');
      break;
    case 'account-login-card':
      await demo.getByLabel('Email').fill('builder@example.com');
      await demo.getByLabel('Password').fill('local-example');
      await demo.getByRole('button', { name: 'Continue' }).click();
      await expect(demo.getByRole('status')).toHaveText('Demo sign-in complete.');
      break;
    case 'expandable-card':
      await demo.getByRole('button', { name: 'Read the story +' }).click();
      await expect(demo).toContainText('Give every element a purpose');
      break;
    case 'tool-call-panel':
      await demo.getByRole('button', { name: /search_components/ }).click();
      await expect(demo.locator('pre')).toContainText('"results": 3');
      break;
    case 'glass-dock':
      await demo.getByRole('button', { name: 'Create', exact: true }).click();
      await expect(demo.getByRole('status')).toContainText('Create selected');
      break;
    case 'elastic-stack':
      await demo.getByRole('button', { name: 'Review', exact: true }).click();
      await expect(demo.getByRole('status')).toContainText('Review selected');
      break;
  }
}

for (const framework of ['react', 'vue', 'svelte'] as const) {
  for (const manifest of manifests) {
    test(`${manifest.id}/${framework}: contract and deterministic theme captures`, async ({
      page,
    }) => {
      test.setTimeout(60_000);
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(`/preview/${manifest.id}/${framework}`);
      const demo =
        framework === 'react'
          ? page.locator('.preview-stage .bw-demo').first()
          : page
              .frameLocator(`iframe[title="${framework} preview for ${manifest.id}"]`)
              .locator('.bw-demo')
              .first();
      await expect(demo).toBeVisible();
      await exercise(manifest.id, demo);
      for (const width of [360, 1280]) {
        await page.setViewportSize({ width, height: 900 });
        for (const theme of ['dark', 'light']) {
          await page.getByRole('combobox', { name: 'Preview theme' }).selectOption(theme);
          await expect(demo).toHaveCSS(
            'color',
            theme === 'dark' ? 'rgb(244, 241, 232)' : 'rgb(20, 20, 18)',
          );
          // Baselines require review; do not auto-approve generated snapshots.
          await expect(page).toHaveScreenshot(`${manifest.id}-${framework}-${theme}-${width}.png`, {
            animations: 'disabled',
            maxDiffPixelRatio: 0.01,
          });
        }
      }
      expect(errors).toEqual([]);
    });
  }
}

test('workbench choice follows source, command, preview and browser history', async ({ page }) => {
  await page.goto('/components/animated-tabs?framework=vue');
  const tabs = page.getByRole('tablist', { name: 'Component framework' });
  await expect(tabs.getByRole('tab', { name: /vue provisional/i })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await expect(page.locator('.component-install code')).toContainText('/r/vue/animated-tabs.json');
  await tabs.getByRole('tab', { name: /svelte provisional/i }).click();
  await expect(page).toHaveURL(/framework=svelte/);
  await expect(page.locator('.source-usage')).toContainText('$lib/');
  await page.goBack();
  await expect(tabs.getByRole('tab', { name: /vue provisional/i })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await expect(page.locator('iframe')).toHaveAttribute('title', 'vue preview for animated-tabs');
});
