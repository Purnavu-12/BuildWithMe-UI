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
export function Preview({
  id,
  controls = false,
  initialTheme = 'site',
}: {
  id: string;
  controls?: boolean;
  initialTheme?: 'site' | 'dark' | 'light';
}) {
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [replay, setReplay] = useState(0);
  const [theme, setTheme] = useState<'site' | 'dark' | 'light'>(initialTheme);
  const [siteTheme, setSiteTheme] = useState<'dark' | 'light'>('dark');
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
  useEffect(() => {
    const html = document.documentElement;
    const sync = () => setSiteTheme(html.dataset.theme === 'light' ? 'light' : 'dark');
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(html, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);
  const Demo = useMemo(() => {
    const load = Object.hasOwn(previewLoaders, id)
      ? previewLoaders[id as keyof typeof previewLoaders]
      : undefined;
    return load
      ? lazy(load as () => Promise<{ default: ComponentType<{ paused?: boolean }> }>)
      : undefined;
  }, [id, replay]);
  const effectiveTheme = theme === 'site' ? siteTheme : theme;
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
                onChange={(e) => setTheme(e.target.value as 'site' | 'dark' | 'light')}
              >
                <option value="site">Follow site</option>
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
      ) : (
        <button
          type="button"
          className="preview-pause-compact icon-button"
          onClick={() => setPaused((value) => !value)}
          aria-label={`${paused ? 'Play' : 'Pause'} ${id} preview`}
          aria-pressed={paused}
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
        </button>
      )}
      <div
        className="preview-stage"
        data-theme={effectiveTheme}
        data-bwm-theme={effectiveTheme}
        style={controls ? { maxWidth: width } : undefined}
      >
        {ready && Demo ? (
          <PreviewBoundary key={replay} onRetry={() => setReplay((value) => value + 1)}>
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
