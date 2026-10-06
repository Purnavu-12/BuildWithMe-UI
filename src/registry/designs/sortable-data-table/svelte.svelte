<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './sortable-data-table.css';
  let { className = '', label = 'Sortable data table' }: { label?: string } = $props();
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
  const rows = [
    { id: 'aurora', name: 'Aurora', status: 'Ready' },
    { id: 'orbit', name: 'Orbit', status: 'Review' },
    { id: 'signal', name: 'Signal', status: 'Ready' },
  ];
  type Key = 'name' | 'status';
  let key = $state<Key>('name');
  let direction = $state<'ascending' | 'descending'>('ascending');
  let selected = $state('');
  const sorted = $derived(
    [...rows].sort((a, b) => a[key].localeCompare(b[key]) * (direction === 'ascending' ? 1 : -1)),
  );
  function sort(next: Key) {
    direction = next === key && direction === 'ascending' ? 'descending' : 'ascending';
    key = next;
  }
</script>

<div
  bind:this={root}
  class={`bw-demo ${className}`}
  data-active={active}
  data-component="sortable-data-table"
>
  <div class="bwm-table-shell">
    <div class="bwm-table-meta" aria-hidden="true">
      <span>System index</span><span>03 records</span>
    </div>
    <div class="bwm-table-scroll">
      <table class="bwm-table">
        <caption class="bw-sr-only">{label}</caption><thead
          ><tr
            ><th scope="col" aria-sort={key === 'name' ? direction : undefined}
              ><button type="button" onclick={() => sort('name')}
                >Name {key === 'name' ? (direction === 'ascending' ? '↑' : '↓') : '↕'}</button
              ></th
            ><th scope="col" aria-sort={key === 'status' ? direction : undefined}
              ><button type="button" onclick={() => sort('status')}
                >Status {key === 'status' ? (direction === 'ascending' ? '↑' : '↓') : '↕'}</button
              ></th
            ><th scope="col">Action</th></tr
          ></thead
        ><tbody
          >{#each sorted as row (row.id)}<tr
              ><td>{row.name}</td><td
                ><span class={`bwm-status bwm-status-${row.status.toLowerCase()}`}
                  >{row.status}</span
                ></td
              ><td
                ><button
                  type="button"
                  class="bwm-row-action"
                  aria-label={`Inspect ${row.name}`}
                  onclick={() => (selected = row.name)}>Inspect</button
                ></td
              ></tr
            >{/each}</tbody
        >
      </table>
    </div>
    <p class="bwm-table-status" role="status">
      {selected ? `Selected ${selected}.` : 'Select a record to inspect.'}
    </p>
  </div>
</div>
