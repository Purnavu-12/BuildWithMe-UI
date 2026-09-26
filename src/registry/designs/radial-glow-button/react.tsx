// Adapted from https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/radial-glow-button.tsx under MIT. Copyright (c) Ashutoshx7.
'use client';
import '../../shared/base.css';
import './radial-glow-button.css';
export default function RadialGlowButton({label='Radial glow button',paused=false}:{label?:string;paused?:boolean}){return <div className="bw-demo" data-active={!paused}><button className="adapt-radial" type="button"><span>{label}</span><i aria-hidden="true"/></button></div>}
