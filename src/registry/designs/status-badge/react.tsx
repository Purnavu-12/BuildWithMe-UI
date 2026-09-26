// Adapted from https://github.com/vercel/registry-starter/blob/main/src/components/ui/badge.tsx under MIT. Copyright (c) Vercel, Inc..
'use client';
import '../../shared/base.css';
import './status-badge.css';
export default function StatusBadge({label='Status badge',paused=false}:{label?:string;paused?:boolean}){return <div className="bw-demo" data-active={!paused}><div className="adapt-status" role="status"><i aria-hidden="true"/><span>{label}</span><time>12:04 UTC</time></div></div>}
