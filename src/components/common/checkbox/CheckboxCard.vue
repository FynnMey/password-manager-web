<script setup lang="ts">
import BasicIcon from '@/components/common/icon/BasicIcon.vue'

const model = defineModel<boolean>({ default: false })

withDefaults(
  defineProps<{
    label?: string
    caption?: string
    icon?: string
    disable?: boolean
    color?: string
    variant?: 'card' | 'inline'
  }>(),
  {
    disable: false,
    variant: 'card',
  }
)
</script>

<template>
  <div
    :class="[
      'basic-checkbox',
      `basic-checkbox--${variant}`,
      {
        'basic-checkbox--checked': model,
        'basic-checkbox--disabled': disable,
      },
    ]"
  >
    <q-checkbox
      v-model="model"
      :disable="disable"
      :color="color"
      dark
      dense
      class="basic-checkbox__control full-width"
    >
      <div class="basic-checkbox__content q-ml-sm">
        <div class="row items-center q-gutter-xs no-wrap">
          <basic-icon
            v-if="icon"
            :name="icon"
            size="16px"
            :color="model ? 'secondary' : 'muted'"
            class="q-mr-xs"
          />
          <span v-if="label" class="basic-checkbox__label">{{ label }}</span>
        </div>
        <div v-if="caption" class="basic-checkbox__caption q-mt-xs">
          {{ caption }}
        </div>
        <slot />
      </div>
    </q-checkbox>
  </div>
</template>

<style scoped lang="scss">
.basic-checkbox {
  transition: all 0.2s ease;

  &--card {
    border-radius: 12px;
    background: rgba(26, 29, 39, 0.8);
    border: 1px solid $border;
    padding: 12px 14px;
    cursor: pointer;

    &:hover:not(.basic-checkbox--disabled) {
      border-color: rgba($primary, 0.4);
      background: rgba(26, 29, 39, 0.95);
    }
  }

  &--checked.basic-checkbox--card {
    border-color: rgba($primary, 0.6);
    background: rgba($primary, 0.1);
    box-shadow: 0 0 16px rgba($primary, 0.12);
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &__label {
    font-size: 14px;
    font-weight: 600;
    color: $text-primary;
  }

  &__caption {
    font-size: 12px;
    color: $text-muted;
    line-height: 1.4;
  }

  :deep(.q-checkbox__label) {
    width: 100%;
  }
}
</style>
