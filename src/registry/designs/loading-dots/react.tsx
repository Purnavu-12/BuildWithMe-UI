// Adapted from https://github.com/vercel/examples/blob/main/internal/packages/ui/src/loading-dots.tsx under MIT. Copyright (c) Vercel, Inc..
'use client';
import '../../shared/base.css';
import './loading-dots.css';
export default function LoadingDots({label='Loading dots',paused=false}:{label?:string;paused?:boolean}){return <div className="bw-demo" data-active={!paused}><span className="adapt-loading" role="status"><span className="bw-sr-only">{label}</span><i/><i/><i/></span></div>}
