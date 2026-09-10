<script setup lang="ts">
withDefaults(defineProps<{
  fullWidth?: boolean
  maxWidth?: string
  variant?: 'default' | 'elevated' | 'flat'
  padding?: string
}>(), {
  fullWidth: true,
  maxWidth: '480px',
  variant: 'default',
  padding: 'q-pa-lg',
})
</script>

<template>
  <q-card
    :class="[
      'basic-card',
      `basic-card--${variant}`,
      fullWidth ? 'full-width' : '',
      padding,
    ]"
    :style="maxWidth ? `max-width: ${maxWidth}` : ''"
    flat
    dark
  >
    <slot />
  </q-card>
</template>

<style scoped lang="scss">
.basic-card {
  border-radius: 20px;
  transition: box-shadow 0.3s ease;

  &--default {
    background: rgba(26, 29, 39, 0.95);
    border: 1px solid $border;
    box-shadow:
      0 0 0 1px rgba($primary, 0.06),
      0 4px 24px rgba(0, 0, 0, 0.4),
      0 0 40px rgba($primary, 0.08);

    &:hover {
      box-shadow:
        0 0 0 1px rgba($primary, 0.12),
        0 4px 32px rgba(0, 0, 0, 0.5),
        0 0 50px rgba($primary, 0.14);
    }
  }

  &--elevated {
    background: $surface;
    border: 1px solid $border;
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.5),
      0 0 60px rgba($primary, 0.1);

    &:hover {
      box-shadow:
        0 8px 40px rgba(0, 0, 0, 0.6),
        0 0 70px rgba($primary, 0.16);
    }
  }

  &--flat {
    background: rgba(42, 45, 62, 0.4);
    border: 1px solid rgba($primary, 0.1);
  }
}
</style>
