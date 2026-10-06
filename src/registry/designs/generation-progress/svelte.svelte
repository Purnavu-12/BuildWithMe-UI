<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './generation-progress.css';
  let { paused = false }: { paused?: boolean } = $props();
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
  let progress = $state(0);
  const value = $derived(reduced ? 100 : progress);
  const steps = ['Understanding your idea', 'Bringing it together', 'Ready to make it yours'];
  const restarting = $derived(progress === 0);
  $effect(() => {
    void restarting;
    if (!active) return;
    const timer = setInterval(() => {
      progress = Math.min(progress + 2, 100);
      if (progress === 100) clearInterval(timer);
    }, 120);
    return () => clearInterval(timer);
  });
</script>

<div bind:this={root} class="bw-demo" data-active={active} data-component="generation-progress">
  <div class="bw-panel bw-progress">
    <p class="bw-caption">Local generation demo</p>
    <p class="bw-description">{steps[value === 100 ? 2 : value > 40 ? 1 : 0]}</p>
    <div
      role="progressbar"
      aria-label="Generation"
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax="100"
      class="bw-progress-track"
    >
      <span style:width={`${value}%`}></span>
    </div>
    <div class="bw-progress-footer">
      <span>{value}%</span><button type="button" onclick={() => (progress = 0)}>Restart ↗</button>
    </div>
  </div>
</div>
