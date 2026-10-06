'use client';

import { useEffect, useRef } from 'react';
import { createScope, createTimeline } from 'animejs';
import { enginePoint } from '@/lib/engine-shapes';

/** The readable vector baseline is the same scene, including every chapter, without WebGL. */
export function InterfaceEngine({
  chapter,
  count,
  active,
}: {
  chapter: number;
  count: number;
  active: boolean;
}) {
  const root = useRef<SVGSVGElement>(null);
  const timeline = useRef<ReturnType<typeof createTimeline> | null>(null);
  useEffect(() => {
    if (!root.current) return;
    const scope = createScope({ root: root.current }).add(() => {
      timeline.current = createTimeline({ autoplay: false, loop: true })
        .add('.engine-tracer', {
          strokeDashoffset: [640, 0],
          opacity: [0.15, 0.7],
          duration: 2400,
          ease: 'linear',
        })
        .add('.engine-core-face', { opacity: [0.65, 1], duration: 1200, ease: 'out(3)' }, 0);
    });
    return () => {
      timeline.current = null;
      scope.revert();
    };
  }, [chapter]);
  useEffect(() => {
    if (active) timeline.current?.play();
    else timeline.current?.pause();
  }, [active, chapter]);
  const points = Array.from({ length: Math.min(count, 120) }, (_, index) =>
    enginePoint(index, Math.min(count, 120), chapter),
  );
  const offsets =
    chapter === 2 ? [-245, -80, 90, 255] : chapter === 3 ? [-94, -32, 32, 94] : [-39, 0, 39, 0];
  return (
    <svg
      ref={root}
      className="cosmos-static interface-engine-svg"
      viewBox="0 0 1200 440"
      aria-hidden="true"
      data-scene={chapter}
    >
      <g className="engine-wire-grid" fill="none">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <path
            key={index}
            d={
              'M ' +
              (40 + index * 220) +
              ' 25 L ' +
              (390 + index * 150) +
              ' 420 M ' +
              (1160 - index * 220) +
              ' 25 L ' +
              (810 - index * 150) +
              ' 420'
            }
          />
        ))}
        <path d="M0 200H1200M90 95 1110 345M90 345 1110 95M600 0V440" />
      </g>
      <g className="engine-node-network">
        {points.map((point, index) => {
          const next = points[(index + (chapter === 2 ? 3 : 1)) % points.length];
          return (
            <line
              key={index}
              x1={600 + point.x * 94}
              y1={220 - point.y * 94}
              x2={600 + next.x * 94}
              y2={220 - next.y * 94}
            />
          );
        })}
        {points.map((point, index) => (
          <circle
            key={index}
            cx={600 + point.x * 94}
            cy={220 - point.y * 94}
            r={index % 7 === 0 ? 4 : 2}
            className={'engine-node-' + (index % 3)}
          />
        ))}
      </g>
      <g className="engine-outer-parts" opacity={chapter === 1 ? 0 : chapter === 3 ? 0.35 : 1}>
        <path className="engine-arc" d="M370 94 A135 135 0 0 0 370 346" />
        <path className="engine-arc" d="M830 94 A135 135 0 0 1 830 346" />
        <path className="engine-coral-plane" d="M147 98 211 139 211 335 147 294Z" />
        <path className="engine-paper-plane" d="M258 134 289 153 289 299 258 280Z" />
        <path className="engine-coral-plane" d="M962 78 1018 48 1018 170 962 200Z" />
        <path className="engine-paper-plane" d="M918 175 965 201 965 341 918 315Z" />
        <path
          className="engine-glass-plane"
          d="M205 53 283 99 283 350 205 304Z M943 144 1022 97 1022 357 943 404Z"
        />
        <g className="engine-plane-grid">
          {Array.from({ length: 11 }, (_, index) => {
            const t = index / 10;
            return (
              <g key={index}>
                <line x1="205" y1={53 + 251 * t} x2="283" y2={99 + 251 * t} />
                <line x1={205 + 78 * t} y1={53 + 46 * t} x2={205 + 78 * t} y2={304 + 46 * t} />
                <line x1="943" y1={144 + 260 * t} x2="1022" y2={97 + 260 * t} />
                <line x1={943 + 79 * t} y1={144 - 47 * t} x2={943 + 79 * t} y2={404 - 47 * t} />
              </g>
            );
          })}
        </g>
        <path
          className="engine-tracer"
          d="M208 54 208 303 365 348 600 220 829 92 1018 171 M283 99 600 220 943 404"
          fill="none"
          strokeDasharray="640"
        />
        <circle className="engine-disc engine-disc-paper" cx="234" cy="238" r="30" />
        <ellipse className="engine-disc engine-disc-coral" cx="895" cy="229" rx="20" ry="39" />
      </g>
      <g className="engine-core" transform="translate(600 214)">
        {(chapter === 1 ? [] : chapter === 0 ? [0, 1, 2] : [0, 1, 2, 3]).map((index) => {
          const y = chapter === 2 || chapter === 3 ? 0 : [24, -64, 24, 13][index];
          return (
            <g
              key={index}
              transform={
                'translate(' +
                (chapter === 0 ? [-56, 0, 56][index] : offsets[index]) +
                ' ' +
                y +
                ')'
              }
            >
              <path className="engine-core-face" d="M0-32 31-14 0 4-31-14Z" />
              <path className="engine-core-side" d="M-31-14 0 4 0 39-31 21Z" />
              <path className="engine-core-front" d="M31-14 0 4 0 39 31 21Z" />
            </g>
          );
        })}
      </g>
      {chapter === 1 && (
        <g className="engine-chapter-planes">
          <path
            className="engine-glass-plane"
            d="M350 145 475 210V400L350 335Z M670 35 795 100V370L670 305Z"
          />
          <path fill="#00d8ef" d="M490 80 620 155V345L490 270Z" />
          <path fill="#ff7469" d="M835 90 970 15V270L835 345Z" />
          <path fill="#101511" d="M855 190 910 159V227L855 258Z" />
          {Array.from({ length: 10 }, (_, i) => (
            <g key={i} className="engine-plane-grid">
              <line x1="670" y1={35 + i * 30} x2="795" y2={100 + i * 30} />
              <line x1={670 + i * 13} y1={35 + i * 6.5} x2={670 + i * 13} y2={305 + i * 6.5} />
            </g>
          ))}
          <path
            className="engine-tracer"
            d="M350 335 490 270 620 345 835 345"
            fill="none"
            strokeDasharray="4 5"
          />
        </g>
      )}
      {chapter === 2 ? (
        <g className="engine-framework-labels">
          <text x="355" y="307">
            REACT
          </text>
          <text x="600" y="307">
            VUE
          </text>
          <text x="845" y="307">
            SVELTE
          </text>
        </g>
      ) : null}
      {chapter === 3 ? (
        <g className="engine-file-labels">
          <text x="450" y="314">
            react.tsx
          </text>
          <text x="600" y="314">
            vue.vue
          </text>
          <text x="750" y="314">
            svelte.svelte
          </text>
        </g>
      ) : null}
    </svg>
  );
}

export function ChapterMiniature({ chapter, count }: { chapter: number; count: number }) {
  return (
    <div className="mobile-chapter-scene">
      <InterfaceEngine chapter={chapter} count={Math.min(count, 12)} active={false} />
    </div>
  );
}
