<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './metric-sparkline.css';
  let { label = 'Metric sparkline', className = '' }: { label?: string; className?: string } =
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
      false,
    );
    return () => lifecycle.destroy();
  });
</script>

<div
  bind:this={root}
  class={`bw-demo ${className ?? ''}`}
  data-active={active}
  data-component="metric-sparkline"
>
  <figure class="bwm-panel bwm-metric">
    <figcaption>{label}<small>Weekly velocity · example data</small></figcaption>
    <strong>+24.8%</strong><svg
      viewBox="0 0 180 54"
      role="img"
      aria-label={`${label}: a rising weekly trend`}
      ><path d="M2 46 C30 44 34 18 58 30 S92 45 112 22 S146 8 178 4"></path></svg
    ><small>7 periods · steady growth</small>
  </figure>
</div>
