// Adapted from https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/elastic-stack.tsx under MIT. Copyright (c) Ashutoshx7.
'use client';
import '../../shared/base.css';
import './elastic-stack.css';
export default function ElasticStack({label='Elastic stack',paused=false}:{label?:string;paused?:boolean}){return <div className="bw-demo" data-active={!paused}><div className="adapt-elastic" aria-label={label}>{["Plan","Build","Review","Ship"].map((item,index)=><button type="button" key={item}><span>0{index+1}</span><b>{item}</b></button>)}</div></div>}
