// MIT · BuildWithMe-UI contributors. Original implementation.
'use client';
import { useAnimation, type AnimationProps } from '../../shared/use-animation';
import '../../shared/base.css';
import './prompt-composer.css';

import { useState } from 'react';
export default function PromptComposer({
  paused = false,
  onSubmit,
}: AnimationProps & { onSubmit?: (value: string) => void }) {
  const { ref, active } = useAnimation(paused);
  const [text, setText] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <form
        className="bw-panel bw-composer"
        onSubmit={(e) => {
          e.preventDefault();
          if (!text.trim()) return;
          onSubmit?.(text.trim());
          setSent(true);
          setText('');
        }}
      >
        <textarea
          aria-label="Your prompt"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setSent(false);
          }}
          placeholder="What will you build today?"
          rows={2}
        />
        <div>
          <span role="status">
            {sent ? 'Prompt submitted locally' : 'A little idea goes a long way'}
          </span>
          <button disabled={!text.trim()} type="submit" aria-label="Submit prompt">
            ↑
          </button>
        </div>
      </form>
    </div>
  );
}
