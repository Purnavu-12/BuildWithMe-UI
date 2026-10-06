<!-- MIT · BuildWithMe-UI contributors. Original implementation. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './pricing-matrix.css';
const props = withDefaults(defineProps<{ label?: string; className?: string }>(), {
  label: 'Pricing matrix',
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
const yearly = ref(false);
const selected = ref('');
const plans = ['Starter', 'Studio', 'Team'];
const prices = [0, 18, 42];
</script>

<template>
  <div
    ref="root"
    class="bw-demo"
    :class="props.className"
    :data-active="active"
    data-component="pricing-matrix"
  >
    <div class="bwm-pricing">
      <h3>{{ props.label }}</h3>
      <div class="bwm-row">
        <small>Example plans · no checkout</small
        ><button type="button" class="bwm-control" :aria-pressed="yearly" @click="yearly = !yearly">
          Yearly billing {{ yearly ? '✓' : '○' }}
        </button>
      </div>
      <div class="bwm-plans">
        <article v-for="(plan, i) in plans" :key="plan" class="bwm-panel">
          <h4>{{ plan }}</h4>
          <strong
            >${{ yearly ? Math.round(prices[i] * 0.8) : prices[i] }}<small> / month</small></strong
          >
          <ul>
            <li>{{ i === 0 ? 'Personal projects' : 'Unlimited projects' }}</li>
            <li>{{ i === 2 ? 'Team workspace' : 'One workspace' }}</li>
            <li>Keep your source</li>
          </ul>
          <button type="button" :aria-pressed="selected === plan" @click="selected = plan">
            Choose {{ plan }}
          </button>
        </article>
      </div>
      <p role="status">
        {{ selected ? `${selected} selected locally.` : 'Find room for your next idea.' }}
      </p>
    </div>
  </div>
</template>
