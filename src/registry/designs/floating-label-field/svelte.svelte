<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './floating-label-field.css';
  let { label = 'Floating label field', className = '' }: { label?: string; className?: string } =
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
  let value = $state('');
</script>

<div
  bind:this={root}
  class={`bw-demo ${className ?? ''}`}
  data-active={active}
  data-component="floating-label-field"
>
  <label class="bwm-floating"><input bind:value placeholder=" " /><span>{label}</span></label>
</div>
