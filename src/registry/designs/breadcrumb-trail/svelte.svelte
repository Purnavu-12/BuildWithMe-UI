<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './breadcrumb-trail.css';
  let { label = 'Breadcrumb trail', className = '' }: { label?: string; className?: string } =
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
  let current = $state('Navigation');
</script>

<div
  bind:this={root}
  class={`bw-demo ${className ?? ''}`}
  data-active={active}
  data-component="breadcrumb-trail"
>
  <nav class="bwm-breadcrumb" aria-label={label}>
    <ol>
      <li><button type="button" onclick={() => (current = 'Workspace')}>Workspace</button></li>
      <li class="bwm-crumb-overflow">
        <details>
          <summary aria-label="Show parent pages">…</summary><button
            type="button"
            onclick={() => (current = 'Library')}>Library</button
          >
        </details>
      </li>
      <li>
        <button type="button" aria-current="page" onclick={() => (current = 'Navigation')}
          >{current}</button
        >
      </li>
    </ol>
  </nav>
</div>
