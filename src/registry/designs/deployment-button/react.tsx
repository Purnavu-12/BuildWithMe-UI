// Adapted from https://github.com/vercel/examples/blob/main/internal/packages/ui/src/button.tsx under MIT. Copyright (c) Vercel, Inc..
'use client';
import '../../shared/base.css';
import './deployment-button.css';
export default function DeploymentButton({label='Deployment button',paused=false}:{label?:string;paused?:boolean}){return <div className="bw-demo" data-active={!paused}><button className="adapt-deploy" type="button"><i aria-hidden="true"/><span>{label}</span><b>↗</b></button></div>}
