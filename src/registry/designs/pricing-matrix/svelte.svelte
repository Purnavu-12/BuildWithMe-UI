<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './pricing-matrix.css';
  let { label = 'Pricing matrix', className = '' }: { label?: string; className?: string } =
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
  let yearly = $state(false);
  let selected = $state('');
  const plans = ['Starter', 'Studio', 'Team'];
  const prices = [0, 18, 42];
</script>

<div
  bind:this={root}
  class={`bw-demo ${className ?? ''}`}
  data-active={active}
  data-component="pricing-matrix"
>
  <div class="bwm-pricing">
    <h3>{label}</h3>
    <div class="bwm-row">
      <small>Example plans · no checkout</small><button
        type="button"
        class="bwm-control"
        aria-pressed={yearly}
        onclick={() => (yearly = !yearly)}>Yearly billing {yearly ? '✓' : '○'}</button
      >
    </div>
    <div class="bwm-plans">
      {#each plans as plan, i (plan)}<article class="bwm-panel">
          <h4>{plan}</h4>
          <strong>${yearly ? Math.round(prices[i] * 0.8) : prices[i]}<small> / month</small></strong
          >
          <ul>
            <li>{i === 0 ? 'Personal projects' : 'Unlimited projects'}</li>
            <li>{i === 2 ? 'Team workspace' : 'One workspace'}</li>
            <li>Keep your source</li>
          </ul>
          <button type="button" aria-pressed={selected === plan} onclick={() => (selected = plan)}
            >Choose {plan}</button
          >
        </article>{/each}
    </div>
    <p role="status">
      {selected ? `${selected} selected locally.` : 'Find room for your next idea.'}
    </p>
  </div>
</div>
