// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useAnimation, type AnimationProps } from '../../shared/use-animation';
import '../../shared/base.css';
import './aurora-field.css';

export default function AuroraField({ paused = false }: AnimationProps) {
  const { ref, active } = useAnimation(paused);
  return (
    <div ref={ref} className="bw-demo bw-aurora" data-active={active}>
      <div aria-hidden="true" />
    </div>
  );
}
