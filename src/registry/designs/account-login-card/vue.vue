<!-- Adapted from https://github.com/vercel/registry-starter/blob/main/src/components/login.tsx under MIT. Copyright (c) Vercel, Inc.. -->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { observeMotion } from '../../shared/motion-lifecycle';

import '../../shared/base.css';
import './account-login-card.css';
const props = withDefaults(defineProps<{ label?: string; paused?: boolean }>(), {
  label: 'Account login card',
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
const complete = ref(false);
</script>

<template>
  <div ref="root" class="bw-demo" :data-active="active" data-component="account-login-card">
    <form class="adapt-login" @submit.prevent="complete = true">
      <span>ACCOUNT / LOCAL DEMO</span>
      <h3>{{ props.label }}</h3>
      <label
        >Email<input
          type="email"
          autocomplete="email"
          placeholder="you@example.com"
          required /></label
      ><label
        >Password<input
          type="password"
          autocomplete="current-password"
          placeholder="••••••••"
          required /></label
      ><button type="submit">{{ complete ? 'Ready' : 'Continue' }}</button>
      <p role="status" class="adapt-login-status">{{ complete ? 'Demo sign-in complete.' : '' }}</p>
    </form>
  </div>
</template>
