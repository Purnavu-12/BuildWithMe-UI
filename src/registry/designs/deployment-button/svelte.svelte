<!-- Adapted from https://github.com/vercel/examples/blob/main/internal/packages/ui/src/button.tsx under MIT. Copyright (c) Vercel, Inc.. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './deployment-button.css';
  let { label = 'Deployment button', paused = false }: { label?: string; paused?: boolean } =
    $props();
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
  let complete = $state(false);
</script>

<div bind:this={root} class="bw-demo" data-active={active} data-component="deployment-button">
  <div>
    <button type="button" class="adapt-deploy" onclick={() => (complete = !complete)}
      ><i aria-hidden="true"></i><span>{complete ? 'Preview ready · run again' : label}</span><b
        aria-hidden="true">{complete ? '✓' : '↗'}</b
      ></button
    >
    <p class="bw-caption" role="status">
      {complete
        ? 'Local deployment simulation complete. No files were published.'
        : 'Local simulation'}
    </p>
  </div>
</div>
