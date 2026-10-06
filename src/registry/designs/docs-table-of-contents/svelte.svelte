<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script lang="ts">
  import { tick } from 'svelte';
  import { observeMotion } from '../../shared/motion-lifecycle';

  import '../../shared/base.css';
  import './docs-table-of-contents.css';
  let { label = 'Docs table of contents', className = '' }: { label?: string; className?: string } =
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
  let index = $state(0);
  let content: HTMLDivElement;
  const sections = ['Overview', 'Installation', 'Customization'];
  function track() {
    let current = 0;
    content.querySelectorAll<HTMLElement>('[data-section]').forEach((node, i) => {
      if (node.offsetTop - content.offsetTop <= content.scrollTop + 30) current = i;
    });
    index = current;
  }
</script>

<div
  bind:this={root}
  class={`bw-demo ${className ?? ''}`}
  data-active={active}
  data-component="docs-table-of-contents"
>
  <div class="bwm-outline">
    <nav aria-label={label}>
      {#each sections as section, i (section)}<a
          href={`#${uid}-${i}`}
          aria-current={index === i ? 'location' : undefined}
          onclick={() => (index = i)}>{section}</a
        >{/each}
    </nav>
    <!-- svelte-ignore a11y_no_noninteractive_tabindex (Focusable scroll region supports keyboard scrolling.) -->
    <div
      bind:this={content}
      class="bwm-document"
      role="region"
      tabindex="0"
      aria-label="Example document"
      onscroll={track}
    >
      {#each sections as section, i (section)}<section id={`${uid}-${i}`} data-section>
          <h3>{section}</h3>
          <p>
            {[
              'Start with a clear promise and a small set of useful components.',
              'Install the complete source closure in your chosen framework.',
              'Adjust semantic tokens, content, and motion to fit your product.',
            ][i]}
          </p>
          <p>
            Keep technical reading surfaces calm. Let headings and spacing explain the structure.
          </p>
        </section>{/each}
    </div>
  </div>
</div>
