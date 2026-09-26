'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Component, useEffect, useRef, useState, type ReactNode } from 'react';
import { animate, stagger } from 'animejs';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { ArrowDown, Orbit } from 'lucide-react';

const CosmosUniverse = dynamic(() => import('./cosmos-universe'), { ssr: false });

type Chapter = { id: string; index: string; label: string };

class CosmosBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function StaticConstellation({ count, chapter }: { count: number; chapter: number }) {
  const points = Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2;
    const radius = 35 + (index % 5) * 7;
    return {
      x: Number((100 + Math.cos(angle) * radius).toFixed(4)),
      y: Number((100 + Math.sin(angle * 2) * (25 + (index % 3) * 6)).toFixed(4)),
    };
  });
  return (
    <svg className="cosmos-static" viewBox="0 0 200 200" aria-hidden="true">
      <g className={`cosmos-static-state cosmos-static-state-${chapter}`}>
        {points.map((point, index) => {
          const next = points[(index + 5) % points.length];
          return <line key={`line-${index}`} x1={point.x} y1={point.y} x2={next.x} y2={next.y} />;
        })}
        {points.map((point, index) => <circle key={index} cx={point.x} cy={point.y} r={index % 7 === 0 ? 2.4 : 1.15} />)}
        <path className="cosmos-core" d="M100 86 114 100 100 114 86 100Z" />
      </g>
    </svg>
  );
}

function IgnitionSequence({ active, reduced }: { active: boolean; reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!active || reduced || !ref.current) return;
    const animation = animate(ref.current.querySelectorAll('i'), {
      opacity: [0.16, 1, 0.16],
      translateX: [-8, 0, 8],
      delay: stagger(90),
      duration: 900,
      ease: 'inOutSine',
    });
    return () => { animation.revert(); };
  }, [active, reduced]);
  return <div className="ignition-sequence" ref={ref} aria-hidden="true">{Array.from({ length: 9 }, (_, i) => <i key={i} />)}</div>;
}

function supportsCosmos() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return !connection?.saveData && navigator.hardwareConcurrency > 4 && window.innerWidth >= 900;
}

export function InterfaceCosmos({
  chapters,
  nodeCount,
  domainCount,
  children,
}: {
  chapters: readonly Chapter[];
  nodeCount: number;
  domainCount: number;
  children: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [activeChapter, setActiveChapter] = useState(0);
  const [capable, setCapable] = useState(false);
  const [visible, setVisible] = useState(true);
  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 });

  useEffect(() => setCapable(!reducedMotion && supportsCosmos()), [reducedMotion]);
  useEffect(() => {
    const section = root.current;
    if (!section) return;
    const targets = [...section.querySelectorAll<HTMLElement>('[data-cosmos-chapter]')];
    const observer = new IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!current) return;
      const index = Number((current.target as HTMLElement).dataset.cosmosChapter);
      setActiveChapter(index);
      targets.forEach((target, targetIndex) => { target.dataset.active = String(index === targetIndex); });
    }, { threshold: [0.35, 0.55, 0.75] });
    targets.forEach((target) => observer.observe(target));
    const visibility = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '100px' });
    visibility.observe(section);
    return () => { observer.disconnect(); visibility.disconnect(); };
  }, []);

  const fallback = <StaticConstellation count={nodeCount} chapter={activeChapter} />;
  return (
    <section className="cosmos-story" ref={root} aria-label="The BuildWithMe interface cosmos">
      <aside className="cosmos-stage" aria-label={`Chapter ${activeChapter + 1}: ${chapters[activeChapter].label}`}>
        <div className="cosmos-stage-grid" aria-hidden="true" />
        {fallback}
        {capable ? (
          <CosmosBoundary fallback={fallback}>
            <div className="cosmos-canvas" aria-hidden="true">
              <CosmosUniverse activeChapter={activeChapter} active={visible} nodeCount={nodeCount} />
            </div>
          </CosmosBoundary>
        ) : null}
        <div className="cosmos-coordinate cosmos-coordinate-top">BWM–COSMOS / {String(activeChapter + 1).padStart(2, '0')}</div>
        <div className="cosmos-coordinate cosmos-coordinate-bottom">{nodeCount} SIGNALS · {domainCount} ORBITS</div>
        <div className="cosmos-frameworks" aria-hidden="true"><span>REACT / {nodeCount}</span><span>VUE / {nodeCount}</span><span>SVELTE / {nodeCount}</span></div>
        <IgnitionSequence active={activeChapter === 3} reduced={Boolean(reducedMotion)} />
        <nav className="cosmos-rail" aria-label="Interface Cosmos chapters">
          <motion.span className="cosmos-progress" style={{ scaleY: progress }} />
          {chapters.map((chapter, index) => (
            <Link key={chapter.id} href={`#${chapter.id}`} aria-current={activeChapter === index ? 'step' : undefined}>
              <b>{chapter.index}</b><span>{chapter.label}</span>
            </Link>
          ))}
        </nav>
        <div className="cosmos-chapter-readout"><Orbit size={15} /><span>{chapters[activeChapter].label}</span><b>{activeChapter + 1}/{chapters.length}</b></div>
      </aside>
      <div className="cosmos-chapters">{children}</div>
      <div className="cosmos-scroll-cue" aria-hidden="true"><span>ENTER THE SYSTEM</span><ArrowDown size={13} /></div>
    </section>
  );
}

export function ChapterMiniature({ state }: { state: string }) {
  return <div className={`chapter-miniature chapter-miniature-${state}`} aria-hidden="true"><i /><i /><i /><i /><span /></div>;
}
