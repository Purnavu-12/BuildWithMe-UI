<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  let { paused = false, onAction }: { paused?: boolean; onAction?: () => Promise<void> } = $props();
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
  let status = $state('idle');
  let alive = true;
  let timer: ReturnType<typeof setTimeout> | undefined;
  $effect(() => {
    alive = true;
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  });
  async function run() {
    if (status === 'working') return;
    status = 'working';
    try {
      await (onAction
        ? onAction()
        : new Promise<void>((resolve) => (timer = setTimeout(resolve, 1200))));
      if (alive) status = 'done';
    } catch {
      if (alive) status = 'error';
    }
  }
</script>

<div bind:this={root} class="bw-demo" data-active={active} data-component="async-status-button">
  <button
    type="button"
    class="bw-button"
    disabled={status === 'working'}
    aria-busy={status === 'working'}
    onclick={run}
    ><span role="status"
      >{status === 'working'
        ? 'Saving…'
        : status === 'done'
          ? '✓ Saved. Run again?'
          : status === 'error'
            ? 'Try again'
            : 'Save your changes'}</span
    ></button
  >
</div>
