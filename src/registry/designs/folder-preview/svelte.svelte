<!-- Adapted from https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/folder-preview.tsx under MIT. Copyright (c) Ashutoshx7. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './folder-preview.css';
  let {
    label = 'Folder preview',
    paused = false,
    files = ['manifest.ts', 'react.tsx', 'styles.css'],
  }: { label?: string; paused?: boolean; files?: string[] } = $props();
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

<div bind:this={root} class="bw-demo" data-active={active} data-component="folder-preview">
  <details class="adapt-folder">
    <summary>{label}<span>{files.length} files</span></summary>
    <div>
      <i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i>
      <ul class="bw-folder-files">
        {#each files as file, index (`${file}-${index}`)}<li>{file}</li>{/each}
      </ul>
    </div>
  </details>
</div>
