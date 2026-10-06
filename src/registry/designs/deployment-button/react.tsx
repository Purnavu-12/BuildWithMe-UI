// Adapted from https://github.com/vercel/examples/blob/main/internal/packages/ui/src/button.tsx under MIT. Copyright (c) Vercel, Inc..
'use client';
import { useState } from 'react';
import { useAnimation } from '../../shared/use-animation';
import '../../shared/base.css';
import './deployment-button.css';
export default function DeploymentButton({
  label = 'Deployment button',
  paused = false,
}: {
  label?: string;
  paused?: boolean;
}) {
  const [complete, setComplete] = useState(false);
  const { ref, active } = useAnimation(paused);
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <button className="adapt-deploy" type="button" onClick={() => setComplete(!complete)}>
        <i aria-hidden="true" />
        <span>{complete ? 'Preview ready · run again' : label}</span>
        <b>↗</b>
      </button>
      <p className="bw-caption" role="status">
        {complete
          ? 'Local deployment simulation complete. No files were published.'
          : 'Local simulation'}
      </p>
    </div>
  );
}
