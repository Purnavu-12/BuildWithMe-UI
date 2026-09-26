// Adapted from https://github.com/vercel/examples/blob/main/internal/packages/ui/src/snippet.tsx under MIT. Copyright (c) Vercel, Inc..
'use client';
import '../../shared/base.css';
import './code-snippet.css';
export default function CodeSnippet({label='Code snippet',paused=false}:{label?:string;paused?:boolean}){return <div className="bw-demo" data-active={!paused}><figure className="adapt-snippet"><figcaption>{label}<span>TSX</span></figcaption><pre tabIndex={0}><code>{"pnpm add interface-kit\n<MagneticButton label=\"Launch\" />"}</code></pre></figure></div>}
