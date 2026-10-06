<!-- Adapted from https://github.com/vercel/examples/blob/main/internal/packages/ui/src/snippet.tsx under MIT. Copyright (c) Vercel, Inc.. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './code-snippet.css';
  let { label = 'Code snippet', paused = false }: { label?: string; paused?: boolean } = $props();
  let root: HTMLDivElement;
  let active = $state(false);
  let reduced = $state(true);
  const uid = $props.id();
  $effect(() => {
    if (!root) return;
    const lifecycle = observeMotion(
      root,
      (state) => {
        active = state.active;
        reduced = state.reduced;
      },
      paused,
    );
    return () => lifecycle.destroy();
  });
  const code =
    'import AnimatedTabs from "./animated-tabs/react";\n\nexport default function Example() {\n  return <AnimatedTabs paused={false} />;\n}';
  let failed = $state(false);
  let copied = $state(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      copied = true;
      failed = false;
    } catch {
      failed = true;
    }
  }
</script>

<div bind:this={root} class="bw-demo" data-active={active} data-component="code-snippet">
  <figure class="adapt-snippet">
    <figcaption>{label}<span>TSX</span></figcaption>
    <!-- svelte-ignore a11y_no_noninteractive_tabindex (Focusable scroll region supports keyboard scrolling.) -->
    <pre role="region" aria-label="Source code" tabindex="0"><code>{code}</code></pre>
    <button type="button" onclick={copy}>{copied ? 'Copied' : 'Copy source'}</button
    >{#if failed}<label
        >Clipboard unavailable. Copy manually.<textarea
          readonly
          value={code}
          onfocus={(e) => e.currentTarget.select()}></textarea></label
      >{/if}
  </figure>
</div>
