<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './dialog-sheet.css';
const props = withDefaults(defineProps<{ label?: string; className?: string }>(), {
  label: 'Dialog sheet',
  className: '',
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
      false,
    );
});
watch(
  () => false,
  (value) => lifecycle?.setPaused(Boolean(value)),
);
onBeforeUnmount(() => lifecycle?.destroy());
const dialog = ref<HTMLDialogElement | null>(null);
const trigger = ref<HTMLButtonElement | null>(null);
</script>

<template>
  <div
    ref="root"
    class="bw-demo"
    :class="props.className"
    :data-active="active"
    data-component="dialog-sheet"
  >
    <button
      ref="trigger"
      type="button"
      class="bwm-dialog-sheet__trigger"
      aria-haspopup="dialog"
      @click="dialog?.showModal()"
    >
      Open {{ props.label }}
    </button>
    <dialog
      ref="dialog"
      class="bwm-dialog-sheet__dialog"
      :aria-labelledby="uid"
      @close="trigger?.focus()"
    >
      <div class="bwm-dialog-sheet__panel">
        <p class="bwm-dialog-sheet__eyebrow">Overlay / adaptive</p>
        <h2 :id="uid">{{ props.label }}</h2>
        <p class="bwm-dialog-sheet__copy">
          Keep the current task in view while reviewing the next building block.
        </p>
        <button type="button" class="bwm-dialog-sheet__close" @click="dialog?.close()">
          Close {{ props.label }}
        </button>
      </div>
    </dialog>
  </div>
</template>
