<!-- Adapted from https://github.com/vercel/registry-starter/blob/main/src/components/login.tsx under MIT. Copyright (c) Vercel, Inc.. -->
<script lang="ts">
  let {
    label = 'Account login card',
    paused = false,
  }: { label?: string; paused?: boolean } = $props();

  let complete = $state(false);

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    complete = true;
  }
</script>

<div class="bw-demo" data-active={!paused}>
  <form class="adapt-login" onsubmit={handleSubmit}>
    <span>ACCOUNT / SECURE</span>
    <h3>{label}</h3>
    <label>
      Email
      <input type="email" autocomplete="email" placeholder="you@example.com" required />
    </label>
    <label>
      Password
      <input
        type="password"
        autocomplete="current-password"
        placeholder="••••••••"
        required
      />
    </label>
    <button type="submit">{complete ? 'Ready' : 'Continue'}</button>
    <p class="adapt-login-status" role="status" aria-live="polite">
      {complete ? 'Demo sign-in complete.' : ''}
    </p>
  </form>
</div>

<style>
  .bw-demo {
    --bw-fg: var(--bwm-component-fg, #f5f5f1);
    --bw-bg: var(--bwm-component-canvas, #090909);
    --bw-panel: var(--bwm-component-panel, #111);
    --bw-muted: var(--bwm-component-muted, #9a9a94);
    --bw-line: var(--bwm-component-border, #343432);
    --bw-strong: var(--bwm-component-focus, #fff);
    display: grid;
    isolation: isolate;
    place-items: center;
    width: 100%;
    min-height: 220px;
    padding: 24px;
    color: var(--bw-fg);
    font-family: inherit;
  }
  .bw-demo * {
    box-sizing: border-box;
  }
  .bw-demo button,
  .bw-demo input {
    font: inherit;
  }
  .bw-demo button {
    color: inherit;
  }
  .bw-demo :focus-visible {
    outline: 2px solid var(--bw-strong);
    outline-offset: 3px;
  }
  .bw-demo[data-active='false'] * {
    animation-play-state: paused !important;
  }
  .adapt-login {
    display: grid;
    gap: 14px;
    width: min(100%, 350px);
    padding: 24px;
    border: 1px solid var(--bw-line);
    background: var(--bw-panel);
  }
  .adapt-login > span {
    color: var(--bw-muted);
    font: 9px monospace;
  }
  .adapt-login h3 {
    margin: 12px 0;
    font-size: 28px;
  }
  .adapt-login label {
    display: grid;
    gap: 7px;
    color: var(--bw-muted);
    font-size: 11px;
  }
  .adapt-login input {
    height: 42px;
    padding: 0 12px;
    border: 1px solid var(--bw-line);
    background: var(--bw-bg);
    color: var(--bw-fg);
  }
  .adapt-login button {
    height: 44px;
    margin-top: 4px;
    border: 0;
    background: var(--bw-fg);
    color: var(--bw-bg);
  }
  .adapt-login-status {
    min-height: 1.2em;
    margin: 0;
    color: var(--bw-muted);
    font: 10px/1.2 monospace;
    text-align: center;
  }
  @media (prefers-reduced-motion: reduce) {
    .bw-demo * {
      animation: none !important;
      transition: none !important;
    }
  }
</style>
