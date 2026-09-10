<script setup lang="ts">
withDefaults(defineProps<{
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'gradient' | 'soft' | 'nav'
}>(), {
  size: 'md',
  variant: 'gradient',
})
</script>

<template>
  <div :class="['icon-box', `icon-box--${size}`, `icon-box--${variant}`]">
    <slot />
  </div>
</template>

<style lang="scss">
.icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &--xs { width: 32px; height: 32px; border-radius: 8px; }
  &--sm { width: 38px; height: 38px; border-radius: 10px; }
  &--md { width: 48px; height: 48px; border-radius: 14px; }
  &--lg { width: 64px; height: 64px; border-radius: 18px; }
  &--xl { width: 72px; height: 72px; border-radius: 20px; }

  &--gradient {
    background: linear-gradient(135deg, $primary 0%, $secondary 100%);
    box-shadow: 0 0 24px rgba($primary, 0.35);
  }

  &--soft {
    background: rgba($primary, 0.1);
    border: 1px solid rgba($primary, 0.2);
    transition: background 0.2s ease;
  }

  &--nav {
    background: transparent;
    transition: background 0.2s ease;
  }
}
</style>
