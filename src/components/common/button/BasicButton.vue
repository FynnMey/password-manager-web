<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
  icon?: string
  iconRight?: string
  disable?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}>(), {
  type: 'submit',
  variant: 'primary',
  size: 'md',
  fullWidth: true,
})
</script>

<template>
  <q-btn
    :type="type"
    :label="label"
    :icon="icon"
    :icon-right="iconRight"
    :loading="loading"
    :disable="disable"
    :class="[
      'basic-btn',
      `basic-btn--${variant}`,
      `basic-btn--${size}`,
      fullWidth ? 'full-width' : '',
    ]"
    unelevated
    no-caps
  >
    <template v-if="loading" #loading>
      <q-spinner-dots size="1.2em" />
    </template>
    <slot />
  </q-btn>
</template>

<style scoped lang="scss">
.basic-btn {
  border-radius: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &--sm { height: 36px; padding: 0 16px; font-size: 13px; }
  &--md { height: 44px; padding: 0 20px; font-size: 14px; }
  &--lg { height: 52px; padding: 0 28px; font-size: 16px; }

  &--primary {
    background: linear-gradient(135deg, $primary 0%, $secondary 100%);
    color: #ffffff;

    &:hover:not(.disabled) {
      box-shadow: 0 0 24px rgba($primary, 0.5);
      transform: translateY(-1px);
    }

    &:active:not(.disabled) {
      transform: translateY(0);
    }
  }

  &--secondary {
    background: rgba($primary, 0.12);
    color: $secondary;
    border: 1px solid rgba($primary, 0.3);

    &:hover:not(.disabled) {
      background: rgba($primary, 0.2);
      border-color: rgba($primary, 0.5);
      box-shadow: 0 0 16px rgba($primary, 0.2);
    }
  }

  &--ghost {
    background: transparent;
    color: $text-muted;
    border: 1px solid $border;

    &:hover:not(.disabled) {
      background: rgba(255, 255, 255, 0.05);
      border-color: #3A3D4E;
      color: $text-primary;
    }
  }

  &--danger {
    background: rgba($negative, 0.12);
    color: $negative;
    border: 1px solid rgba($negative, 0.3);

    &:hover:not(.disabled) {
      background: rgba($negative, 0.2);
      border-color: rgba($negative, 0.5);
      box-shadow: 0 0 16px rgba($negative, 0.2);
    }
  }

  &.disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}
</style>
