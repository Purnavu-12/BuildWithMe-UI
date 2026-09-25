import ts from 'typescript';
import path from 'node:path';

/** Flatten declared local modules without touching URLs or unrelated string values. */
export function rewriteImports(source:string):string{
  const ast=ts.createSourceFile('component.tsx',source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
  const edits:{start:number;end:number;text:string}[]=[];
  function record(node:ts.Expression|undefined){
    if(node&&ts.isStringLiteral(node)&&node.text.startsWith('.'))edits.push({start:node.getStart(ast)+1,end:node.getEnd()-1,text:`./${path.posix.basename(node.text)}`});
  }
  function visit(node:ts.Node){
    if(ts.isImportDeclaration(node)||ts.isExportDeclaration(node))record(node.moduleSpecifier);
    if(ts.isCallExpression(node)&&(node.expression.kind===ts.SyntaxKind.ImportKeyword||(ts.isIdentifier(node.expression)&&node.expression.text==='require')))record(node.arguments[0]);
    ts.forEachChild(node,visit);
  }
  visit(ast);
  for(const edit of edits.sort((a,b)=>b.start-a.start))source=source.slice(0,edit.start)+edit.text+source.slice(edit.end);
  return source;
}
