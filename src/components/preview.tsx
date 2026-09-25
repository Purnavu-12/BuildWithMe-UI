'use client';
import {
  Component,
  Suspense,
  lazy,
  useMemo,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ComponentType,
} from 'react';
import { RotateCcw, Pause, Play, Maximize2 } from 'lucide-react';
import { previewLoaders } from '@/generated/previews';
class PreviewBoundary extends Component<
  { children: ReactNode; onRetry: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="preview-error" role="alert">
        <p>This preview could not load.</p>
        <button className="small-button" onClick={this.props.onRetry}>
          Try again
        </button>
      </div>
    ) : (
      this.props.children
    );
  }
}
export function Preview({ id, controls = false }: { id: string; controls?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [replay, setReplay] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [width, setWidth] = useState('100%');
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setReady(true);
      },
      { rootMargin: '60px' },
    );
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  const Demo = useMemo(() => {
    const load = Object.hasOwn(previewLoaders, id)
      ? previewLoaders[id as keyof typeof previewLoaders]
      : undefined;
    return load ? lazy(load as () => Promise<{ default: ComponentType<{ paused?: boolean }> }>) : undefined;
  }, [id, replay]);
  return (
    <div ref={root} className={`preview-wrapper ${controls ? 'preview-full' : ''}`}>
      {controls ? (
        <div className="preview-toolbar">
          <span className="live-label">
            <i /> Live preview
          </span>
          <div>
            <button
              className="icon-button"
              onClick={() => setReplay((v) => v + 1)}
              aria-label="Replay preview"
            >
              <RotateCcw size={15} />
            </button>
            <button
              className="icon-button"
              onClick={() => setPaused((v) => !v)}
              aria-label={paused ? 'Play preview' : 'Pause preview'}
            >
              {paused ? <Play size={15} /> : <Pause size={15} />}
            </button>
            <label>
              <span className="sr-only">Preview theme</span>
              <select
                aria-label="Preview theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </label>
            <label className="viewport-select">
              <Maximize2 size={14} />
              <span className="sr-only">Preview width</span>
              <select
                aria-label="Preview width"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              >
                <option value="100%">Fluid</option>
                <option value="360px">360px</option>
                <option value="768px">768px</option>
              </select>
            </label>
          </div>
        </div>
      ) : null}
      <div
        className="preview-stage"
        data-theme={controls ? theme : undefined}
        style={controls ? { maxWidth: width } : undefined}
      >
        {ready && Demo ? (
          <PreviewBoundary key={replay} onRetry={() => window.location.reload()}>
            <Suspense fallback={<span className="preview-loading">Preparing preview…</span>}>
              <Demo paused={paused || !visible} />
            </Suspense>
          </PreviewBoundary>
        ) : (
          <span className="preview-loading">
            {Demo ? 'Preparing preview…' : 'Preview unavailable'}
          </span>
        )}
      </div>
    </div>
  );
}
