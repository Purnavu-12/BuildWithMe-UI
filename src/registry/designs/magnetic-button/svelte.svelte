<script lang="ts">
  let { label = "Magnetic button" }: { label?: string } = $props();
  let active = $state(false);
  let value = $state('');
</script>

<section class="bwm-surface" data-active={active}>
  <span class="bwm-kicker">BUILDWITHME / SVELTE</span>
  <strong>{label}</strong>
  {#if "actions" === 'forms'}
    <input bind:value aria-label="Example value" placeholder="Start typing…" />
  {:else}
    <p>One design language. Native Svelte interaction.</p>
  {/if}
  <button type="button" onclick={() => active = !active}>{active ? 'Selected' : 'Try interaction'}</button>
</section>

<style>
  .bwm-surface{display:grid;gap:1rem;min-height:12rem;place-content:center;padding:2rem;border:1px solid var(--bwm-component-border,#333);background:var(--bwm-component-canvas,#090909);color:var(--bwm-component-fg,#f5f5f2);font-family:ui-sans-serif,sans-serif}.bwm-kicker{font:10px ui-monospace,monospace;letter-spacing:.14em;color:var(--bwm-component-muted,#8b8b87)}.bwm-surface strong{font-size:clamp(1.5rem,4vw,2.5rem)}button,input{border:1px solid var(--bwm-component-border,#555);background:var(--bwm-component-fg,#fff);color:var(--bwm-component-canvas,#050505);padding:.75rem 1rem;font:inherit}input{background:var(--bwm-component-panel,#111);color:var(--bwm-component-fg,#fff)}
</style>
