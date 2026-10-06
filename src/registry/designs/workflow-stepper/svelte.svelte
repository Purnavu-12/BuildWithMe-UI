<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './workflow-stepper.css';
  let { label = 'Workflow stepper', className = '' }: { label?: string; className?: string } =
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
  let step = $state(1);
  const steps = ['Discover', 'Adapt', 'Ship'];
</script>

<div
  bind:this={root}
  class={`bw-demo ${className ?? ''}`}
  data-active={active}
  data-component="workflow-stepper"
>
  <div class="bwm-panel">
    <ol class="bwm-steps" aria-label={label}>
      {#each steps as entry, i (entry)}<li
          data-state={i < step ? 'complete' : i === step ? 'active' : 'pending'}
        >
          <button
            type="button"
            aria-current={i === step ? 'step' : undefined}
            onclick={() => (step = i)}
            ><b aria-hidden="true">{i < step ? '✓' : i + 1}</b>{entry}<span class="bw-sr-only"
              >{i < step ? ' completed' : i === step ? ' current' : ' pending'}</span
            ></button
          >
        </li>{/each}
    </ol>
    <p role="status">{steps[step]} — step {step + 1} of 3</p>
    <div class="bwm-row">
      <button type="button" disabled={step === 0} onclick={() => step--}>Back</button><button
        type="button"
        disabled={step === 2}
        onclick={() => step++}>Next</button
      >
    </div>
  </div>
</div>
