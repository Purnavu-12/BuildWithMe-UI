import { expect, it } from 'vitest';
import fs from 'node:fs/promises';
import path from 'node:path';

it('generates 120 framework-specific source artifacts and machine discovery',async()=>{const registry=JSON.parse(await fs.readFile(path.join(process.cwd(),'public','registry.json'),'utf8'));const discovery=JSON.parse(await fs.readFile(path.join(process.cwd(),'public','index.v2.json'),'utf8'));const wellKnown=JSON.parse(await fs.readFile(path.join(process.cwd(),'public','.well-known','buildwithme.json'),'utf8'));expect(registry.items).toHaveLength(120);expect(discovery.items).toHaveLength(40);expect(wellKnown.frameworks).toEqual(['react','vue','svelte']);for(const item of registry.items){expect(item.files.length).toBeGreaterThan(0);expect(item.files[0].content).not.toContain('@buildwithme/');expect(item.files[0].content).not.toContain('../../shared/')}});
