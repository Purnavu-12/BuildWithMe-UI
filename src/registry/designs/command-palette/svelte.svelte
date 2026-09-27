<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  let { label = "Command palette" }: { label?: string } = $props();
  const commands = ['Overview', 'Components', 'Contribute'];
  let active = $state(commands[0]);
</script>

<section class="bwm-surface bwm-command-palette">
  <nav class="bwm-list" aria-label={label}>
    {#each commands as command (command)}
      <button
        type="button"
        aria-current={active === command ? 'page' : undefined}
        onclick={() => (active = command)}
      >
        <span class="bwm-command-label">{command}</span>
        <span class="bwm-command-glyph" aria-hidden="true">↗</span>
      </button>
    {/each}
  </nav>
</section>

<style>
  .bwm-surface {
    box-sizing: border-box;
    display: grid;
    width: min(100%, 320px);
    padding: 0.5rem;
    border: 1px solid var(--bwm-component-border, #343431);
    background: var(--bwm-component-panel, #10100f);
    color: var(--bwm-component-fg, #f4f1e8);
    font-family: inherit;
  }
  .bwm-list {
    display: grid;
    gap: 0.125rem;
  }
  .bwm-list button {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    min-height: 44px;
    padding: 0 0.875rem;
    border: 0;
    border-radius: 8px;
    background: none;
    color: var(--bwm-component-muted, #a6a49c);
    font: inherit;
    font-size: 14px;
    text-align: left;
    cursor: pointer;
    transition: background-color 150ms ease, color 150ms ease;
  }
  .bwm-list button:hover {
    background: color-mix(in srgb, var(--bwm-component-fg, #f4f1e8) 8%, transparent);
    color: var(--bwm-component-fg, #f4f1e8);
  }
  .bwm-list button[aria-current='page'] {
    background: color-mix(in srgb, var(--bwm-component-fg, #f4f1e8) 12%, transparent);
    color: var(--bwm-component-fg, #f4f1e8);
    font-weight: 550;
  }
  .bwm-command-glyph {
    color: inherit;
    font-size: 12px;
  }
  .bwm-list button:focus-visible {
    outline: 2px solid var(--bwm-component-focus, #fff);
    outline-offset: 2px;
  }
  @media (prefers-reduced-motion: reduce) {
    .bwm-list button {
      transition: none;
    }
  }
</style>
