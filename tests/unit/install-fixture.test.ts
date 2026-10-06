import { it, expect } from 'vitest';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createInstallFixture } from '../../scripts/install-fixture';

it('creates isolated fixtures in a fresh checkout and preserves existing temporary files', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'bwm-clean-checkout-'));
  try {
    await expect(fs.stat(path.join(root, 'tmp'))).rejects.toThrow();
    const first = await createInstallFixture(root, 'source-install-');
    await fs.writeFile(path.join(first, 'preserved.txt'), 'keep');
    const second = await createInstallFixture(root, 'source-install-');
    expect(second).not.toBe(first);
    expect(path.dirname(first)).toBe(path.join(root, 'tmp'));
    expect((await fs.stat(second)).isDirectory()).toBe(true);
    expect(await fs.readFile(path.join(first, 'preserved.txt'), 'utf8')).toBe('keep');
  } finally {
    await fs.rm(root, { recursive: true, force: true });
  }
});
