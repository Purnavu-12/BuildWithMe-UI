<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './animated-tabs.css';
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
  const tabs = ['Design', 'Develop', 'Deliver'];
  const copy = [
    'A good idea deserves a thoughtful interface.',
    'Turn the details into something that works.',
    'Put it into the world. Keep making it better.',
  ];
  let selected = $state(0);
  async function navigate(event: KeyboardEvent, index: number) {
    const next =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? 2
          : event.key === 'ArrowRight'
            ? (index + 1) % 3
            : event.key === 'ArrowLeft'
              ? (index + 2) % 3
              : -1;
    if (next < 0) return;
    event.preventDefault();
    selected = next;
    await tick();
    root?.querySelectorAll<HTMLButtonElement>('[role=tab]')[next]?.focus();
  }
</script>

<div bind:this={root} class="bw-demo" data-active={active} data-component="animated-tabs">
  <div class="bw-tab-box">
    <div class="bw-tabs" role="tablist" aria-label="Workflow">
      {#each tabs as tab, index (tab)}<button
          type="button"
          id={`${uid}-tab-${index}`}
          role="tab"
          aria-selected={selected === index}
          aria-controls={`${uid}-panel-${index}`}
          tabindex={selected === index ? 0 : -1}
          onclick={() => (selected = index)}
          onkeydown={(event) => navigate(event, index)}
          >{#if selected === index}<span class="bw-tab-indicator"></span>{/if}<span>{tab}</span
          ></button
        >{/each}
    </div>
    <div
      class="bw-description bw-tab-copy"
      role="tabpanel"
      id={`${uid}-panel-${selected}`}
      aria-labelledby={`${uid}-tab-${selected}`}
      tabindex="0"
    >
      {copy[selected]}
    </div>
  </div>
</div>
