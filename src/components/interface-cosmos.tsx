'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type KeyboardEvent,
} from 'react';
import { useReducedMotion } from 'motion/react';
import { Boxes, CircleDot, Layers3, Pause, Play } from 'lucide-react';
import { engineModes, type EngineMode } from '@/lib/engine-shapes';
import { InterfaceEngine } from './interface-engine';

const CosmosUniverse = dynamic(() => import('./cosmos-universe'), { ssr: false });
type Chapter = { id: string; index: string; label: string };
type Connection = {
  saveData?: boolean;
  addEventListener?: (type: string, callback: () => void) => void;
  removeEventListener?: (type: string, callback: () => void) => void;
};

class CosmosBoundary extends Component<
  { children: ReactNode; onFail: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFail();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function InterfaceCosmos({
  chapters,
  nodeCount,
  domainCount,
  intro,
  children,
}: {
  chapters: readonly Chapter[];
  nodeCount: number;
  domainCount: number;
  intro: ReactNode;
  children: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const artboard = useRef<HTMLDivElement>(null);
  const modeButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const motionPreference = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const reduced = !mounted || motionPreference !== false;
  useEffect(() => {
    setMounted(true);
  }, []);
  const [chapter, setChapter] = useState(0);
  const [mode, setMode] = useState<EngineMode>('assemble');
  const [paused, setPaused] = useState(false);
  const [capable, setCapable] = useState(false);
  const [visible, setVisible] = useState(true);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [webglReady, setWebglReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [siteLight, setSiteLight] = useState(false);
  const active = !reduced && !paused && visible && documentVisible;
  const variant = engineModes.findIndex((item) => item.id === mode);
  const paper = siteLight;
  const onReady = useCallback(() => setWebglReady(true), []);
  const onFail = useCallback(() => {
    setWebglReady(false);
    setFailed(true);
  }, []);

  useEffect(() => {
    const screen = window.matchMedia('(min-width: 981px)');
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    const update = () => {
      const eligible =
        screen.matches &&
        !connection?.saveData &&
        (navigator.hardwareConcurrency ?? 0) > 4 &&
        !reduced;
      setCapable(eligible);
      if (!eligible) setWebglReady(false);
    };
    screen.addEventListener('change', update);
    connection?.addEventListener?.('change', update);
    update();
    return () => {
      screen.removeEventListener('change', update);
      connection?.removeEventListener?.('change', update);
    };
  }, [reduced]);

  useEffect(() => {
    if (!root.current || !stage.current) return;
    const element = root.current;
    const targets = Array.from(element.querySelectorAll<HTMLElement>('[data-cosmos-chapter]'));
    let boundaries: number[] = [];
    let frame = 0;
    let current = 0;
    const updateChapter = () => {
      frame = 0;
      const position = window.scrollY + window.innerHeight * 0.4;
      let next = 0;
      boundaries.forEach((top, index) => {
        if (position >= top) next = index;
      });
      if (next !== current) {
        current = next;
        setChapter(next);
      }
    };
    const measure = () => {
      boundaries = targets.map((target) => target.getBoundingClientRect().top + window.scrollY);
      updateChapter();
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(updateChapter);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    const intersection = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: '80px',
    });
    intersection.observe(artboard.current ?? stage.current);
    const visibility = () => setDocumentVisible(!document.hidden);
    const theme = () => setSiteLight(document.documentElement.dataset.theme === 'light');
    const themeObserver = new MutationObserver(theme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', measure);
    document.addEventListener('visibilitychange', visibility);
    measure();
    visibility();
    theme();
    return () => {
      observer.disconnect();
      intersection.disconnect();
      themeObserver.disconnect();
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('resize', measure);
      document.removeEventListener('visibilitychange', visibility);
      cancelAnimationFrame(frame);
    };
  }, []);

  function navigateMode(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? 2
          : event.key === 'ArrowRight'
            ? (index + 1) % 3
            : event.key === 'ArrowLeft'
              ? (index + 2) % 3
              : -1;
    if (next < 0) return;
    event.preventDefault();
    setMode(engineModes[next].id);
    modeButtons.current[next]?.focus();
  }

  return (
    <section
      ref={root}
      className="cosmos-story kinetic-story"
      data-active-chapter={chapter}
      data-paper={paper}
      aria-label="The BuildWithMe interface cosmos"
    >
      {intro}
      <div
        ref={stage}
        className="engine-sticky"
        data-running={active}
        data-renderer={capable && !failed && webglReady ? 'webgl' : 'svg'}
        data-canvas-state={
          !capable ? 'ineligible' : failed ? 'failed' : webglReady ? 'ready' : 'loading'
        }
      >
        <div ref={artboard} className="engine-artboard" data-paper={paper}>
          <div className="engine-vector" data-covered={capable && !failed && webglReady}>
            <InterfaceEngine chapter={variant} count={nodeCount} active={active} />
          </div>
          {capable && !failed ? (
            <CosmosBoundary onFail={onFail}>
              <div
                className="cosmos-canvas engine-canvas"
                aria-hidden="true"
                data-ready={webglReady}
              >
                <CosmosUniverse
                  activeChapter={variant}
                  active={active}
                  nodeCount={nodeCount}
                  paper={paper}
                  onReady={onReady}
                  onFail={onFail}
                />
              </div>
            </CosmosBoundary>
          ) : null}
        </div>
        <button
          className="engine-pause"
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? 'Play story animation' : 'Pause story animation'}
        >
          {paused ? <Play size={15} /> : <Pause size={15} />}
          <span>{paused ? 'Play' : 'Pause'}</span>
        </button>
      </div>
      <div className="engine-experiment" role="group" aria-label="Interface Engine view">
        {engineModes.map((item, index) => {
          const Icon = [Boxes, CircleDot, Layers3][index];
          return (
            <button
              key={item.id}
              ref={(element) => {
                modeButtons.current[index] = element;
              }}
              type="button"
              aria-pressed={mode === item.id}
              onClick={() => setMode(item.id)}
              onKeyDown={(event) => navigateMode(event, index)}
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
      <p className="engine-caption" role="status">
        {mode === 'assemble'
          ? 'One idea. Every possibility.'
          : engineModes.find((item) => item.id === mode)?.description}
      </p>
      <nav className="cosmos-rail kinetic-chapter-nav" aria-label="Interface Cosmos chapters">
        {chapters.map((item, index) => (
          <Link
            key={item.id}
            href={'#' + item.id}
            aria-current={chapter === index ? 'step' : undefined}
          >
            <span className="chapter-dot" aria-hidden="true" />
            <b>{item.index}</b>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="engine-meta">
        <span>{nodeCount} designs</span>
        <span>React / Vue / Svelte</span>
        <span>Source installation available</span>
        <span className="sr-only">{domainCount} product domains</span>
      </div>
      <div className="kinetic-chapters">{children}</div>
    </section>
  );
}
