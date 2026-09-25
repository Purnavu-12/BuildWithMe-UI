<script lang="ts">
  let { label = "Sortable data table" }: { label?: string } = $props();
  let active = $state(false);
  let value = $state('');
</script>

<section class="bwm-surface" data-active={active}>
  <span class="bwm-kicker">BUILDWITHME / SVELTE</span>
  <strong>{label}</strong>
  {#if "data-display" === 'forms'}
    <input bind:value aria-label="Example value" placeholder="Start typing…" />
  {:else}
    <p>One design language. Native Svelte interaction.</p>
  {/if}
  <button type="button" onclick={() => active = !active}>{active ? 'Selected' : 'Try interaction'}</button>
</section>

<style>
  .bwm-surface{display:grid;gap:1rem;min-height:12rem;place-content:center;padding:2rem;border:1px solid #333;background:#090909;color:#f5f5f2;font-family:ui-sans-serif,sans-serif}.bwm-kicker{font:10px ui-monospace,monospace;letter-spacing:.14em;color:#8b8b87}.bwm-surface strong{font-size:clamp(1.5rem,4vw,2.5rem)}button,input{border:1px solid #555;background:#fff;color:#050505;padding:.75rem 1rem;font:inherit}input{background:#111;color:#fff}
</style>
