import fs from 'node:fs/promises';
import path from 'node:path';

/** A fresh checkout has no ignored tmp directory. Each consumer needs its own fixture. */
export async function createInstallFixture(root: string, prefix: string) {
  const directory = path.join(root, 'tmp');
  await fs.mkdir(directory, { recursive: true });
  return fs.mkdtemp(path.join(directory, prefix));
}
