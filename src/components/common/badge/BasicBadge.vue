<script setup lang="ts">
import BasicIcon from '@/components/common/icon/BasicIcon.vue'

withDefaults(defineProps<{
  label?: string
  icon?: string | undefined
  color?: 'primary' | 'positive' | 'negative' | 'warning' | 'info' | 'grey'
  dot?: boolean
}>(), {
  color: 'primary',
})

const colorMap = {
  primary:  { bg: 'rgba(99,102,241,0.15)',  border: 'rgba(99,102,241,0.35)',  text: '#818CF8' },
  positive: { bg: 'rgba(16,185,129,0.12)',  border: 'rgba(16,185,129,0.3)',   text: '#34D399' },
  negative: { bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.3)',    text: '#F87171' },
  warning:  { bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.3)',   text: '#FCD34D' },
  info:     { bg: 'rgba(56,189,248,0.12)',  border: 'rgba(56,189,248,0.3)',   text: '#7DD3FC' },
  grey:     { bg: 'rgba(100,116,139,0.12)', border: 'rgba(100,116,139,0.3)',  text: '#94A3B8' },
}
</script>

<template>
  <span
    class="basic-badge"
    :style="{
      background: colorMap[color].bg,
      border: `1px solid ${colorMap[color].border}`,
      color: colorMap[color].text,
    }"
  >
    <span v-if="dot" class="basic-badge__dot" :style="{ background: colorMap[color].text }" />
    <basic-icon v-if="icon" :name="icon" size="12px" class="q-mr-xs" />
    <span v-if="label">{{ label }}</span>
    <slot />
  </span>
</template>

<style scoped lang="scss">
.basic-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.03em;
  white-space: nowrap;

  &__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
    animation: pulse-dot 2s ease-in-out infinite;
  }
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.6; transform: scale(0.85); }
}
</style>
