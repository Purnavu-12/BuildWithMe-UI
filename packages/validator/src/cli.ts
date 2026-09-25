import { loadRegistry } from './index';
const { items, errors } = await loadRegistry();
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else console.log(`Validated ${items.length} components.`);
