<!-- Adapted from https://github.com/vercel/registry-starter/blob/main/src/components/login.tsx under MIT. Copyright (c) Vercel, Inc.. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './account-login-card.css';
  let { label = 'Account login card', paused = false }: { label?: string; paused?: boolean } =
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
      paused,
    );
    return () => lifecycle.destroy();
  });
  let complete = $state(false);
</script>

<div bind:this={root} class="bw-demo" data-active={active} data-component="account-login-card">
  <form
    class="adapt-login"
    onsubmit={(e) => {
      e.preventDefault();
      complete = true;
    }}
  >
    <span>ACCOUNT / LOCAL DEMO</span>
    <h3>{label}</h3>
    <label
      >Email<input
        type="email"
        autocomplete="email"
        placeholder="you@example.com"
        required
      /></label
    ><label
      >Password<input
        type="password"
        autocomplete="current-password"
        placeholder="••••••••"
        required
      /></label
    ><button type="submit">{complete ? 'Ready' : 'Continue'}</button>
    <p role="status" class="adapt-login-status">{complete ? 'Demo sign-in complete.' : ''}</p>
  </form>
</div>
