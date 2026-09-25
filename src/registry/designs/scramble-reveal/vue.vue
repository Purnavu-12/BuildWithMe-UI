<script setup lang="ts">
import { ref } from 'vue';
withDefaults(defineProps<{ label?: string }>(), { label: "Scramble reveal" });
const active = ref(false);
const value = ref('');
</script>

<template>
  <section class="bwm-surface" :data-active="active">
    <span class="bwm-kicker">BUILDWITHME / VUE</span>
    <strong>{{ label }}</strong>
    <input v-if="false" v-model="value" aria-label="Example value" placeholder="Start typing…" />
    <p v-else>One design language. Native Vue interaction.</p>
    <button type="button" @click="active = !active">{{ active ? 'Selected' : 'Try interaction' }}</button>
  </section>
</template>

<style scoped>
.bwm-surface{display:grid;gap:1rem;min-height:12rem;place-content:center;padding:2rem;border:1px solid #333;background:#090909;color:#f5f5f2;font-family:ui-sans-serif,sans-serif}.bwm-kicker{font:10px ui-monospace,monospace;letter-spacing:.14em;color:#8b8b87}.bwm-surface strong{font-size:clamp(1.5rem,4vw,2.5rem)}button,input{border:1px solid #555;background:#fff;color:#050505;padding:.75rem 1rem;font:inherit}input{background:#111;color:#fff}
</style>
