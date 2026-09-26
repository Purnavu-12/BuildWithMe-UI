// Adapted from https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/glass-dock.tsx under MIT. Copyright (c) Ashutoshx7.
'use client';
import '../../shared/base.css';
import './glass-dock.css';
export default function GlassDock({label='Glass dock',paused=false}:{label?:string;paused?:boolean}){return <div className="bw-demo" data-active={!paused}><nav className="adapt-dock" aria-label={label}>{["Home","Search","Create","Profile"].map((item,index)=><button type="button" aria-label={item} key={item}><span aria-hidden="true">{["⌂","⌕","＋","◉"][index]}</span></button>)}</nav></div>}
