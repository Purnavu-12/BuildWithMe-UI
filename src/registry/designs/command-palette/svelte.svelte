<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './command-palette.css';
  let { label = 'Command palette', className = '' }: { label?: string; className?: string } =
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
  let dialog: HTMLDialogElement;
  let trigger: HTMLButtonElement;
  let query = $state('');
  let index = $state(0);
  let selected = $state('');
  const commands = [
    { name: 'Create component', group: 'Create' },
    { name: 'Open library', group: 'Navigate' },
    { name: 'Read handbook', group: 'Navigate' },
    { name: 'Share an idea', group: 'Create' },
  ];
  const matches = $derived(
    commands.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())),
  );
  function choose(name: string) {
    selected = name;
    dialog.close();
  }
  function key(e: KeyboardEvent) {
    const count = Math.max(matches.length, 1);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      index = (index + 1) % count;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      index = (index + count - 1) % count;
    } else if (e.key === 'Home') {
      e.preventDefault();
      index = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      index = count - 1;
    } else if (e.key === 'Enter' && matches[index]) {
      e.preventDefault();
      choose(matches[index].name);
    }
  }
</script>

<div
  bind:this={root}
  class={`bw-demo ${className ?? ''}`}
  data-active={active}
  data-component="command-palette"
>
  <div>
    <button
      bind:this={trigger}
      type="button"
      class="bwm-control"
      aria-haspopup="dialog"
      onclick={() => dialog.showModal()}>Open {label}</button
    >
    <p class="bw-caption" role="status">{selected ? `${selected} selected locally.` : ''}</p>
    <dialog
      bind:this={dialog}
      class="bwm-command"
      aria-labelledby={`${uid}-title`}
      onclose={() => trigger.focus()}
    >
      <h3 id={`${uid}-title`}>{label}</h3>
      <label class="bw-sr-only" for={`${uid}-query`}>Search commands</label><input
        id={`${uid}-query`}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded="true"
        aria-controls={`${uid}-list`}
        aria-activedescendant={matches[index] ? `${uid}-option-${index}` : undefined}
        bind:value={query}
        oninput={() => (index = 0)}
        onkeydown={key}
      />
      <ul id={`${uid}-list`} role="listbox" aria-label="Commands">
        {#each matches as item, i (item.name)}<li
            id={`${uid}-option-${i}`}
            role="option"
            aria-selected={index === i}
          >
            <button type="button" tabindex="-1" onclick={() => choose(item.name)}
              ><span>{item.name}</span><small>{item.group}</small></button
            >
          </li>{/each}
      </ul>
      {#if !matches.length}<p role="status">No matching commands.</p>{/if}<button
        type="button"
        class="bwm-control"
        onclick={() => dialog.close()}>Close commands</button
      >
    </dialog>
  </div>
</div>
