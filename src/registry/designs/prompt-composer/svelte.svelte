<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './prompt-composer.css';
  let { paused = false, onSubmit }: { paused?: boolean; onSubmit?: (value: string) => void } =
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
  let text = $state('');
  let sent = $state(false);
  function submit(event: SubmitEvent) {
    event.preventDefault();
    const value = text.trim();
    if (!value) return;
    onSubmit?.(value);
    sent = true;
    text = '';
  }
</script>

<div bind:this={root} class="bw-demo" data-active={active} data-component="prompt-composer">
  <form class="bw-panel bw-composer" onsubmit={submit}>
    <textarea
      aria-label="Your prompt"
      bind:value={text}
      oninput={() => (sent = false)}
      placeholder="What will you build today?"
      rows="2"></textarea>
    <div>
      <span role="status"
        >{sent ? 'Prompt submitted locally' : 'A little idea goes a long way'}</span
      ><button type="submit" disabled={!text.trim()} aria-label="Submit prompt">↑</button>
    </div>
  </form>
</div>
