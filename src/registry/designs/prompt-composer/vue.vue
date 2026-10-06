<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './prompt-composer.css';
const props = withDefaults(
  defineProps<{ paused?: boolean; onSubmit?: (value: string) => void }>(),
  { paused: false },
);
const emit = defineEmits<{ submit: [value: string] }>();
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
const text = ref('');
const sent = ref(false);
function submit() {
  const value = text.value.trim();
  if (!value) return;
  emit('submit', value);
  sent.value = true;
  text.value = '';
}
</script>

<template>
  <div ref="root" class="bw-demo" :data-active="active" data-component="prompt-composer">
    <form class="bw-panel bw-composer" @submit.prevent="submit">
      <textarea
        aria-label="Your prompt"
        v-model="text"
        @input="sent = false"
        placeholder="What will you build today?"
        rows="2"
      />
      <div>
        <span role="status">{{
          sent ? 'Prompt submitted locally' : 'A little idea goes a long way'
        }}</span
        ><button type="submit" :disabled="!text.trim()" aria-label="Submit prompt">↑</button>
      </div>
    </form>
  </div>
</template>
