<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './multi-step-form.css';
  let { label = 'Multi-step form', className = '' }: { label?: string; className?: string } =
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
  let step = $state(0);
  let name = $state('');
  let email = $state('');
  let complete = $state(false);
  function submit(e: SubmitEvent) {
    e.preventDefault();
    if (step < 2) step++;
    else complete = true;
  }
</script>

<div
  bind:this={root}
  class={`bw-demo ${className ?? ''}`}
  data-active={active}
  data-component="multi-step-form"
>
  <form class="bwm-panel" aria-label={label} onsubmit={submit}>
    <small>STEP {step + 1} / 3 · Local demonstration</small>
    <h3>{label}</h3>
    {#if complete}<p role="status">
        Thanks, {name}. Your local profile is ready.
      </p>{:else}{#if step === 0}<label
          >Your name<input required autocomplete="name" bind:value={name} /></label
        >{:else if step === 1}<label
          >Email address<input
            required
            type="email"
            autocomplete="email"
            bind:value={email}
          /></label
        >{:else}<dl>
          <dt>Name</dt>
          <dd>{name}</dd>
          <dt>Email</dt>
          <dd>{email}</dd>
        </dl>{/if}
      <div class="bwm-row">
        <button type="button" disabled={step === 0} onclick={() => step--}>Back</button><button
          type="submit">{step === 2 ? 'Complete profile' : 'Continue'}</button
        >
      </div>{/if}
  </form>
</div>
