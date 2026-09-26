// Adapted from https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/glow-border-card.tsx under MIT. Copyright (c) Ashutoshx7.
'use client';
import '../../shared/base.css';
import './glow-border-card.css';
export default function GlowBorderCard({label='Glow border card',paused=false}:{label?:string;paused?:boolean}){return <div className="bw-demo" data-active={!paused}><article className="adapt-glow-card"><span>INTERFACE / 07</span><h3>{label}</h3><p>One clear surface, one moving signal, and source you can keep.</p><button type="button">Inspect source ↗</button></article></div>}
