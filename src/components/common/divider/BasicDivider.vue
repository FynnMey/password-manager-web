<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
  vertical?: boolean
}>(), {
  vertical: false,
})
</script>

<template>
  <div :class="['basic-divider', vertical ? 'basic-divider--vertical' : 'basic-divider--horizontal']">
    <div class="basic-divider__line" />
    <span v-if="label" class="basic-divider__label">{{ label }}</span>
    <div v-if="label" class="basic-divider__line" />
  </div>
</template>

<style scoped lang="scss">
.basic-divider {
  display: flex;
  align-items: center;

  &--horizontal {
    flex-direction: row;
    width: 100%;
    gap: 12px;
  }

  &--vertical {
    flex-direction: column;
    height: 100%;
    gap: 8px;
  }

  &__line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, $border, transparent);

    .basic-divider--vertical & {
      height: auto;
      width: 1px;
      background: linear-gradient(180deg, transparent, $border, transparent);
    }
  }

  &__label {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    white-space: nowrap;
    flex-shrink: 0;
    color: $text-muted;
  }
}
</style>
