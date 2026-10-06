<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './suggestion-chips.css';
  let {
    paused = false,
    options = ['Design a landing page', 'Explore an idea', 'Write something useful'],
    onSelect,
  }: { paused?: boolean; options?: string[]; onSelect?: (value: string) => void } = $props();
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
  let selected = $state('');
  function choose(value: string) {
    selected = value;
    onSelect?.(value);
  }
</script>

<div bind:this={root} class="bw-demo" data-active={active} data-component="suggestion-chips">
  <div class="bw-chips">
    <p class="bw-caption">A place to start</p>
    {#each options as option, index (index)}<button
        type="button"
        aria-pressed={selected === option}
        onclick={() => choose(option)}>{option}<span aria-hidden="true">↗</span></button
      >{/each}
  </div>
</div>
