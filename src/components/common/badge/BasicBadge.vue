<script setup lang="ts">
import BasicIcon from '@/components/common/icon/BasicIcon.vue'

withDefaults(
  defineProps<{
    label?: string
    icon?: string | undefined
    color?: 'primary' | 'positive' | 'negative' | 'warning' | 'info' | 'grey'
    dot?: boolean
  }>(),
  {
    color: 'primary',
  }
)
</script>

<template>
  <span :class="['basic-badge', `basic-badge--${color}`]">
    <span v-if="dot" class="basic-badge__dot" />
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
    background: currentColor;
  }

  &--primary {
    background: rgba($primary, 0.15);
    border: 1px solid rgba($primary, 0.35);
    color: $secondary;
  }

  &--positive {
    background: rgba($positive, 0.12);
    border: 1px solid rgba($positive, 0.3);
    color: #34D399;
  }

  &--negative {
    background: rgba($negative, 0.12);
    border: 1px solid rgba($negative, 0.3);
    color: #F87171;
  }

  &--warning {
    background: rgba($warning, 0.12);
    border: 1px solid rgba($warning, 0.3);
    color: #FCD34D;
  }

  &--info {
    background: rgba($info, 0.12);
    border: 1px solid rgba($info, 0.3);
    color: #7DD3FC;
  }

  &--grey {
    background: rgba($text-muted, 0.12);
    border: 1px solid rgba($text-muted, 0.3);
    color: $text-muted;
  }
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.6; transform: scale(0.85); }
}
</style>
