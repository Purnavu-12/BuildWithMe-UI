// Adapted from https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/flip-text.tsx under MIT. Copyright (c) Ashutoshx7.
'use client';
import '../../shared/base.css';
import './flip-text.css';
export default function FlipText({label='Flip text',paused=false}:{label?:string;paused?:boolean}){return <div className="bw-demo" data-active={!paused}><p className="adapt-flip" aria-label={label}>{label.split("").map((letter,index)=><span aria-hidden="true" style={{animationDelay:`${index*45}ms`}} key={`${letter}-${index}`}>{letter===" "?" ":letter}</span>)}</p></div>}
