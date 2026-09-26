// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useAnimation, type AnimationProps } from '../../shared/use-animation';
import '../../shared/base.css';
import './underline-reveal.css';

export default function UnderlineReveal({
  paused = false,
  text = 'Make your mark.',
}: AnimationProps & { text?: string }) {
  const { ref, active } = useAnimation(paused);
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <p className="bw-large-text bw-underline">{text}</p>
    </div>
  );
}
