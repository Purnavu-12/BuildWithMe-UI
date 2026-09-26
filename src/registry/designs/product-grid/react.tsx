// Adapted from https://github.com/vercel/registry-starter/blob/main/src/components/product-grid.tsx under MIT. Copyright (c) Vercel, Inc..
'use client';
import '../../shared/base.css';
import './product-grid.css';
export default function ProductGrid({label='Product grid',paused=false}:{label?:string;paused?:boolean}){return <div className="bw-demo" data-active={!paused}><div className="adapt-products" aria-label={label}>{["Signal lamp","Mono chair","Grid clock"].map((item,index)=><button type="button" key={item}><i aria-hidden="true">0{index+1}</i><span><b>{item}</b><small>${[89,240,64][index]}</small></span></button>)}</div></div>}
