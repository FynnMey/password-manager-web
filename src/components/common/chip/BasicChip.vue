<script setup lang="ts">
import BasicIcon from '@/components/common/icon/BasicIcon.vue'

withDefaults(
  defineProps<{
    label: string
    active?: boolean
    disable?: boolean
    clickable?: boolean
    icon?: string
    size?: 'sm' | 'md'
  }>(),
  {
    active: false,
    disable: false,
    clickable: true,
    size: 'sm',
  }
)

defineEmits<{
  click: [event: Event]
}>()
</script>

<template>
  <button
    type="button"
    :disabled="disable"
    :class="[
      'basic-chip',
      `basic-chip--${size}`,
      {
        'basic-chip--active': active,
        'basic-chip--clickable': clickable && !disable,
        'basic-chip--disabled': disable,
      },
    ]"
    @click="$emit('click', $event)"
  >
    <basic-icon v-if="icon" :name="icon" size="14px" class="q-mr-xs" />
    <span>{{ label }}</span>
  </button>
</template>

<style scoped lang="scss">
.basic-chip {
  display: inline-flex;
  align-items: center;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid $border;
  color: $text-muted;
  font-weight: 500;
  transition: all 0.2s ease;
  outline: none;

  &--sm {
    padding: 3px 10px;
    font-size: 11px;
  }

  &--md {
    padding: 6px 14px;
    font-size: 13px;
  }

  &--clickable {
    cursor: pointer;

    &:hover:not(.basic-chip--disabled) {
      background: rgba(255, 255, 255, 0.1);
      color: $text-primary;
      border-color: rgba($primary, 0.3);
    }
  }

  &--active {
    background: rgba($primary, 0.2) !important;
    border-color: rgba($primary, 0.5) !important;
    color: $secondary !important;
    font-weight: 600;
    box-shadow: 0 0 12px rgba($primary, 0.15);
  }

  &--disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}
</style>
