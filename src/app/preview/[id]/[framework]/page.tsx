import { notFound } from 'next/navigation';
import { Preview } from '@/components/preview';
import { components, frameworkLabels, getComponent } from '@/lib/registry';
import { frameworks, type Framework } from '@/registry/schema';

export function generateStaticParams() { return components.flatMap(({id})=>frameworks.map((framework)=>({id,framework}))); }
export default async function PreviewPage({params}:{params:Promise<{id:string;framework:string}>}) { const {id,framework}=await params; const item=getComponent(id); if(!item||!frameworks.includes(framework as Framework))notFound(); return <main id="main-content" className="standalone-preview" style={{minHeight:'100vh',padding:'30px'}}><p className="mono-label">{frameworkLabels[framework as Framework]} PREVIEW</p><h1>{item.title}</h1><Preview id={id} controls/></main>; }
