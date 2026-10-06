<!-- Adapted from https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/glow-border-card.tsx under MIT. Copyright (c) Ashutoshx7. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './glow-border-card.css';
  let { label = 'Glow border card', paused = false }: { label?: string; paused?: boolean } =
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
</script>

<div bind:this={root} class="bw-demo" data-active={active} data-component="glow-border-card">
  <article class="adapt-glow-card">
    <span>INTERFACE / 07</span>
    <h3>{label}</h3>
    <p>One clear surface, one moving signal, and source you can keep.</p>
    <details>
      <summary>Inspect source ↗</summary>
      <pre>border: 1px solid var(--bw-border);</pre>
    </details>
  </article>
</div>
