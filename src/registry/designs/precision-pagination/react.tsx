// Adapted from https://github.com/vercel/registry-starter/blob/main/src/components/ui/pagination.tsx under MIT. Copyright (c) Vercel, Inc..
'use client';
import '../../shared/base.css';
import './precision-pagination.css';
export default function PrecisionPagination({label='Precision pagination',paused=false}:{label?:string;paused?:boolean}){return <div className="bw-demo" data-active={!paused}><nav className="adapt-pagination" aria-label={label}><button type="button" aria-label="Previous page">←</button>{[1,2,3,4].map(page=><button type="button" aria-current={page===2?"page":undefined} key={page}>{page}</button>)}<button type="button" aria-label="Next page">→</button></nav></div>}
