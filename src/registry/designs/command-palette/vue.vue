<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './command-palette.css';
const props = withDefaults(defineProps<{ label?: string; className?: string }>(), {
  label: 'Command palette',
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
const query = ref('');
const index = ref(0);
const selected = ref('');
const commands = [
  { name: 'Create component', group: 'Create' },
  { name: 'Open library', group: 'Navigate' },
  { name: 'Read handbook', group: 'Navigate' },
  { name: 'Share an idea', group: 'Create' },
];
const matches = computed(() =>
  commands.filter((item) => item.name.toLowerCase().includes(query.value.toLowerCase())),
);
function choose(name: string) {
  selected.value = name;
  dialog.value?.close();
}
function key(e: KeyboardEvent) {
  const count = Math.max(matches.value.length, 1);
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    index.value = (index.value + 1) % count;
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    index.value = (index.value + count - 1) % count;
  } else if (e.key === 'Home') {
    e.preventDefault();
    index.value = 0;
  } else if (e.key === 'End') {
    e.preventDefault();
    index.value = count - 1;
  } else if (e.key === 'Enter' && matches.value[index.value]) {
    e.preventDefault();
    choose(matches.value[index.value].name);
  }
}
</script>

<template>
  <div
    ref="root"
    class="bw-demo"
    :class="props.className"
    :data-active="active"
    data-component="command-palette"
  >
    <div>
      <button
        ref="trigger"
        type="button"
        class="bwm-control"
        aria-haspopup="dialog"
        @click="dialog?.showModal()"
      >
        Open {{ props.label }}
      </button>
      <p class="bw-caption" role="status">{{ selected ? `${selected} selected locally.` : '' }}</p>
      <dialog
        ref="dialog"
        class="bwm-command"
        :aria-labelledby="`${uid}-title`"
        @close="trigger?.focus()"
      >
        <h3 :id="`${uid}-title`">{{ props.label }}</h3>
        <label class="bw-sr-only" :for="`${uid}-query`">Search commands</label
        ><input
          :id="`${uid}-query`"
          role="combobox"
          aria-autocomplete="list"
          :aria-expanded="true"
          :aria-controls="`${uid}-list`"
          :aria-activedescendant="matches[index] ? `${uid}-option-${index}` : undefined"
          v-model="query"
          @input="index = 0"
          @keydown="key"
        />
        <ul :id="`${uid}-list`" role="listbox" aria-label="Commands">
          <li
            v-for="(item, i) in matches"
            :key="item.name"
            :id="`${uid}-option-${i}`"
            role="option"
            :aria-selected="index === i"
          >
            <button type="button" tabindex="-1" @click="choose(item.name)">
              <span>{{ item.name }}</span
              ><small>{{ item.group }}</small>
            </button>
          </li>
        </ul>
        <p v-if="!matches.length" role="status">No matching commands.</p>
        <button type="button" class="bwm-control" @click="dialog?.close()">Close commands</button>
      </dialog>
    </div>
  </div>
</template>
