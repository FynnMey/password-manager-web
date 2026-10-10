<script setup lang="ts">
withDefaults(
  defineProps<{
    icon: string
    size?: string
    color?: string
    tooltip?: string
    disable?: boolean
  }>(),
  {
    size: 'sm',
    disable: false,
  }
)

defineEmits<{
  click: [event: Event]
}>()
</script>

<template>
  <q-btn
    :icon="icon"
    :size="size"
    :color="color"
    :disable="disable"
    flat
    round
    dense
    :class="['basic-icon-btn', !color ? 'basic-icon-btn--default' : '']"
    @click="$emit('click', $event)"
  >
    <q-tooltip v-if="tooltip">{{ tooltip }}</q-tooltip>
    <slot />
  </q-btn>
</template>

<style scoped lang="scss">
.basic-icon-btn {
  transition: all 0.2s ease;

  &--default {
    color: $text-muted;

    &:hover:not(.disabled) {
      color: $text-primary;
      background: rgba(255, 255, 255, 0.08);
    }
  }
}
</style>
