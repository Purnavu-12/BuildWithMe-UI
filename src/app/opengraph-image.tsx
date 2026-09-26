import { ImageResponse } from 'next/og';
import { registryStats } from '@/lib/registry';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 64, color: '#f4f1e8', background: '#050505', fontFamily: 'Arial, sans-serif', backgroundImage: 'linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)', backgroundSize: '72px 72px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, letterSpacing: 3 }}><span>BUILDWITHME / UI</span><span>INTERFACE COSMOS</span></div>
      <div style={{ display: 'flex', flexDirection: 'column' }}><span style={{ fontSize: 84, lineHeight: .9, letterSpacing: -6 }}>Build the interface.</span><span style={{ fontSize: 84, lineHeight: .9, letterSpacing: -6, color: '#85857f' }}>Keep the source.</span></div>
      <div style={{ display: 'flex', gap: 40, fontSize: 18, color: '#aaa9a3' }}><span>{registryStats.designs} DESIGNS</span><span>{registryStats.implementations} FRAMEWORK SOURCES</span><span>REACT · VUE · SVELTE</span></div>
    </div>,
    size,
  );
}
