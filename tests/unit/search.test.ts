import { expect, it } from 'vitest';
import { searchComponents } from '../../src/lib/search';
import { componentManifestSchema } from '../../src/registry/schema';

const base = { schemaVersion: 2 as const, status: 'stable' as const, engines: ['css'] as const, tags: ['keyboard'], installation: { npm: true, source: true, copy: true }, accessibility: { summary: 'Accessible controls.', features: ['Keyboard'] }, props: [], related: [], provenance: { type: 'original' as const, creator: { name: 'Asha' }, license: 'MIT' } };
const framework = (source:string)=>({source,exportName:'Demo',usage:'<Demo />',dependencies:{}});
const items = [
  componentManifestSchema.parse({ ...base, id:'command-palette',title:'Command palette',summary:'Fast navigation',domains:['navigation'],frameworks:{react:framework('a.tsx'),vue:framework('a.vue'),svelte:framework('a.svelte')} }),
  componentManifestSchema.parse({ ...base, id:'metric-sparkline',title:'Metric sparkline',summary:'Dashboard trend',domains:['data-visualization'],engines:['motion'],frameworks:{react:framework('b.tsx'),vue:framework('b.vue'),svelte:framework('b.svelte')} }),
];
it('combines text, domain, framework, engine, and installation filters',()=>{expect(searchComponents(items,{q:'Asha keyboard',domain:'navigation',framework:'vue',method:'npm'})).toEqual([items[0]]);expect(searchComponents(items,{q:'dashboard',engine:'css'})).toEqual([])});
it('restores the complete collection for clear filters',()=>expect(searchComponents(items,{q:' ',domain:'all',framework:'all',engine:'all',method:'all'})).toEqual(items));
