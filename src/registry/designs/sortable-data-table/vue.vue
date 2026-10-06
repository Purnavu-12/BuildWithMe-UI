<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './sortable-data-table.css';
const props = withDefaults(defineProps<{ label?: string; className?: string }>(), {
  label: 'Sortable data table',
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
const rows = [
  { id: 'aurora', name: 'Aurora', status: 'Ready' },
  { id: 'orbit', name: 'Orbit', status: 'Review' },
  { id: 'signal', name: 'Signal', status: 'Ready' },
];
type Key = 'name' | 'status';
const key = ref<Key>('name');
const direction = ref<'ascending' | 'descending'>('ascending');
const selected = ref('');
const sorted = computed(() =>
  [...rows].sort(
    (a, b) => a[key.value].localeCompare(b[key.value]) * (direction.value === 'ascending' ? 1 : -1),
  ),
);
function sort(next: Key) {
  direction.value =
    next === key.value && direction.value === 'ascending' ? 'descending' : 'ascending';
  key.value = next;
}
</script>

<template>
  <div
    ref="root"
    class="bw-demo"
    :class="props.className"
    :data-active="active"
    data-component="sortable-data-table"
  >
    <div class="bwm-table-shell">
      <div class="bwm-table-meta" aria-hidden="true">
        <span>System index</span><span>03 records</span>
      </div>
      <div class="bwm-table-scroll">
        <table class="bwm-table">
          <caption class="bw-sr-only">
            {{
              props.label
            }}
          </caption>
          <thead>
            <tr>
              <th scope="col" :aria-sort="key === 'name' ? direction : undefined">
                <button type="button" @click="sort('name')">
                  Name {{ key === 'name' ? (direction === 'ascending' ? '↑' : '↓') : '↕' }}
                </button>
              </th>
              <th scope="col" :aria-sort="key === 'status' ? direction : undefined">
                <button type="button" @click="sort('status')">
                  Status {{ key === 'status' ? (direction === 'ascending' ? '↑' : '↓') : '↕' }}
                </button>
              </th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in sorted" :key="row.id">
              <td>{{ row.name }}</td>
              <td>
                <span class="bwm-status" :class="`bwm-status-${row.status.toLowerCase()}`">{{
                  row.status
                }}</span>
              </td>
              <td>
                <button
                  type="button"
                  class="bwm-row-action"
                  :aria-label="`Inspect ${row.name}`"
                  @click="selected = row.name"
                >
                  Inspect
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="bwm-table-status" role="status">
        {{ selected ? `Selected ${selected}.` : 'Select a record to inspect.' }}
      </p>
    </div>
  </div>
</template>
