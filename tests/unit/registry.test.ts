import { afterEach, describe, expect, it } from 'vitest';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { componentManifestSchema } from '../../src/registry/schema';
import { importsOf, safePath, validateRegistry } from '../../scripts/registry';
import { scaffold } from '../../scripts/new-component';

const temporary: string[] = [];
afterEach(async()=>Promise.all(temporary.splice(0).map((dir)=>fs.rm(dir,{recursive:true,force:true}))));
describe('manifest model',()=>{
  it.each(['../x','C:/x','C:\\x','/x','a/../../x','a\\x','a//x','./x','a\0b'])('rejects unsafe path %s',(value)=>expect(safePath(value)).toBe(false));
  it('finds static and dynamic imports',()=>expect(importsOf("import a from 'one'; import('two'); require('three')")).toEqual(['one','two','three']));
  it('requires progressive provenance fields',()=>{const original={type:'original',creator:{name:'Asha'},license:'MIT'};const adapted={...original,type:'adapted'};const remix={...original,type:'remix'};expect(componentManifestSchema.shape.provenance.safeParse(original).success).toBe(true);expect(componentManifestSchema.shape.provenance.safeParse(adapted).success).toBe(false);expect(componentManifestSchema.shape.provenance.safeParse(remix).success).toBe(false)});
  it('validates 40 designs with three framework sources each',async()=>{const result=await validateRegistry();expect(result.errors).toEqual([]);expect(result.manifests).toHaveLength(40);for(const item of result.manifests)expect(Object.keys(item.frameworks)).toEqual(['react','vue','svelte'])});
  it('scaffolds only the authored files and prevents overwrites',async()=>{const root=await fs.mkdtemp(path.join(os.tmpdir(),'bwm-scaffold-'));temporary.push(root);const directory=await scaffold(root,'signal-card','data-display','css');expect((await fs.readdir(directory)).sort()).toEqual(['manifest.ts','react.tsx','svelte.svelte','vue.vue']);await expect(scaffold(root,'signal-card')).rejects.toThrow('already exists');await expect(scaffold(root,'../bad')).rejects.toThrow('kebab');await expect(scaffold(root,'valid','unknown')).rejects.toThrow('Invalid domain')});
});
