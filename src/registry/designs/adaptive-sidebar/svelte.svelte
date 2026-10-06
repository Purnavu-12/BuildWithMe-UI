<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './adaptive-sidebar.css';
  let { label = 'Adaptive sidebar', className = '' }: { label?: string; className?: string } =
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
  let collapsed = $state(false);
  let selected = $state('Overview');
  const items = ['Overview', 'Components', 'Contribute'];
</script>

<div
  bind:this={root}
  class={`bw-demo ${className ?? ''}`}
  data-active={active}
  data-component="adaptive-sidebar"
>
  <div class="bwm-sidebar" data-collapsed={collapsed}>
    <nav aria-label={label}>
      <button
        type="button"
        class="bwm-control"
        aria-expanded={!collapsed}
        aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
        onclick={() => (collapsed = !collapsed)}
        >{collapsed ? '→' : '←'}{#if !collapsed}<span>Workspace</span>{/if}</button
      >{#each items as item, i (item)}<button
          type="button"
          aria-label={item}
          aria-current={selected === item ? 'page' : undefined}
          onclick={() => (selected = item)}
          ><b aria-hidden="true">{['◈', '▦', '＋'][i]}</b>{#if !collapsed}<span>{item}</span
            >{/if}</button
        >{/each}
    </nav>
    <article>
      <small>WORKSPACE</small>
      <h3>{selected}</h3>
      <p>
        {selected === 'Overview'
          ? 'Your next interface starts here.'
          : selected === 'Components'
            ? 'Explore reusable building blocks.'
            : 'Share an idea. Keep its source open.'}
      </p>
    </article>
  </div>
</div>
