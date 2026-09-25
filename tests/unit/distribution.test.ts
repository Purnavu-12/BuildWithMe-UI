import {it,expect} from 'vitest';
import {rewriteImports} from '../../packages/registry/src/rewrite-imports';
it('rewrites module paths while retaining unrelated strings and source notices',()=>{
 const source=`// MIT copyright notice\nimport {useAnimation} from '../../shared/use-animation';\nimport '../../shared/base.css';\nexport {thing} from '../module/thing';\nconst loader=()=>import('../module/lazy');\nconst url='../../some-page';`;
 const result=rewriteImports(source);
 expect(result).toContain("from './use-animation'");expect(result).toContain("import './base.css'");expect(result).toContain("from './thing'");expect(result).toContain("import('./lazy')");expect(result).toContain("const url='../../some-page'");expect(result).toContain('// MIT copyright notice');
});
