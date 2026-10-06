<!-- Adapted from https://github.com/vercel/examples/blob/main/internal/packages/ui/src/snippet.tsx under MIT. Copyright (c) Vercel, Inc.. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './code-snippet.css';
const props = withDefaults(defineProps<{ label?: string; paused?: boolean }>(), {
  label: 'Code snippet',
  paused: false,
});
const root = ref<HTMLElement | null>(null);
const active = ref(false);
const reduced = ref(true);
const uid = useId();
let lifecycle: ReturnType<typeof observeMotion> | undefined;
onMounted(() => {
  if (root.value)
    lifecycle = observeMotion(
      root.value,
      (state) => {
        active.value = state.active;
        reduced.value = state.reduced;
      },
      props.paused,
    );
});
watch(
  () => props.paused,
  (value) => lifecycle?.setPaused(Boolean(value)),
);
onBeforeUnmount(() => lifecycle?.destroy());
const code =
  'import AnimatedTabs from "./animated-tabs/react";\n\nexport default function Example() {\n  return <AnimatedTabs paused={false} />;\n}';
const failed = ref(false);
const copied = ref(false);
async function copy() {
  try {
    await navigator.clipboard.writeText(code);
    copied.value = true;
    failed.value = false;
  } catch {
    failed.value = true;
  }
}
</script>

<template>
  <div ref="root" class="bw-demo" :data-active="active" data-component="code-snippet">
    <figure class="adapt-snippet">
      <figcaption>{{ props.label }}<span>TSX</span></figcaption>
      <pre tabindex="0"><code>{{ code }}</code></pre>
      <button type="button" @click="copy">{{ copied ? 'Copied' : 'Copy source' }}</button
      ><label v-if="failed"
        >Clipboard unavailable. Copy manually.<textarea
          readonly
          :value="code"
          @focus="($event.target as HTMLTextAreaElement).select()"
        />
      </label>
    </figure>
  </div>
</template>
