'use client';

import { Pause, Play, RotateCcw, Maximize2 } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Framework } from '@/registry/schema';

type HostMessage =
  | { source: 'buildwithme-host'; type: 'theme'; value: 'dark' | 'light' }
  | { source: 'buildwithme-host'; type: 'pause'; value: boolean }
  | { source: 'buildwithme-host'; type: 'replay' };

type PreviewMessage = { source: 'buildwithme-preview'; framework: Framework; id: string; type: 'ready' | 'error'; detail?: string };

export function FrameworkPreview({ id, framework }: { id: string; framework: Exclude<Framework, 'react'> }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [siteTheme, setSiteTheme] = useState<'dark' | 'light'>('dark');
  const [theme, setTheme] = useState<'site' | 'dark' | 'light'>('site');
  const [paused, setPaused] = useState(false);
  const [width, setWidth] = useState('100%');
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [error, setError] = useState('');
  const effectiveTheme = theme === 'site' ? siteTheme : theme;
  const [frameSrc] = useState(
    () => `/preview-runtime/${framework}/index.html?id=${encodeURIComponent(id)}&theme=${effectiveTheme}`,
  );
  const send = useCallback((message: HostMessage) => frame.current?.contentWindow?.postMessage(message, window.location.origin), []);

  useEffect(() => {
    const html = document.documentElement;
    const sync = () => setSiteTheme(html.dataset.theme === 'light' ? 'light' : 'dark');
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(html, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);
  useEffect(() => send({ source: 'buildwithme-host', type: 'theme', value: effectiveTheme }), [effectiveTheme, send]);
  useEffect(() => send({ source: 'buildwithme-host', type: 'pause', value: paused }), [paused, send]);
  useEffect(() => {
    const receive = (event: MessageEvent<PreviewMessage>) => {
      if (event.origin !== window.location.origin || event.data?.source !== 'buildwithme-preview' || event.data.id !== id || event.data.framework !== framework) return;
      if (event.data.type === 'ready') setStatus('ready');
      if (event.data.type === 'error') { setStatus('error'); setError(event.data.detail ?? 'The preview runtime failed.'); }
    };
    window.addEventListener('message', receive);
    return () => window.removeEventListener('message', receive);
  }, [framework, id]);

  function replay() {
    setStatus('loading');
    setError('');
    send({ source: 'buildwithme-host', type: 'replay' });
  }

  return <div className="preview-wrapper preview-full isolated-preview">
    <div className="preview-toolbar"><span className="live-label"><i /> {framework} runtime</span><div>
      <button className="icon-button" onClick={replay} aria-label="Replay preview"><RotateCcw size={15}/></button>
      <button className="icon-button" onClick={() => setPaused((value) => !value)} aria-label={paused ? 'Play preview' : 'Pause preview'}>{paused ? <Play size={15}/> : <Pause size={15}/>}</button>
      <label><span className="sr-only">Preview theme</span><select aria-label="Preview theme" value={theme} onChange={(event) => setTheme(event.target.value as typeof theme)}><option value="site">Follow site</option><option value="dark">Dark</option><option value="light">Light</option></select></label>
      <label className="viewport-select"><Maximize2 size={14}/><span className="sr-only">Preview width</span><select aria-label="Preview width" value={width} onChange={(event) => setWidth(event.target.value)}><option value="100%">Fluid</option><option value="360px">360px</option><option value="768px">768px</option></select></label>
    </div></div>
    <div className="preview-stage isolated-preview-stage" data-bwm-theme={effectiveTheme} style={{ maxWidth: width }}>
      {status === 'loading' ? <span className="preview-loading" role="status">Starting {framework} runtime…</span> : null}
      {status === 'error' ? <div className="preview-error" role="alert"><p>{error}</p><button className="small-button" onClick={replay}>Try again</button></div> : null}
      <iframe ref={frame} className="framework-preview-frame" title={`${framework} preview for ${id}`} src={frameSrc} onLoad={() => send({ source: 'buildwithme-host', type: 'theme', value: effectiveTheme })}/>
    </div>
  </div>;
}
