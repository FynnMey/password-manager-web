<script setup lang="ts">
import { QInputType } from 'quasar'
import { computed, ref } from 'vue'
import BasicIcon from '@/components/common/icon/BasicIcon.vue'

const model = defineModel<string>({ required: true })
const disable = defineModel<boolean>('disable')

const showPassword = ref(false)

const props = withDefaults(defineProps<{
  label?: string
  type?: QInputType
  icon?: string
  hint?: string
  required?: boolean
  error?: boolean
  errorMessage?: string
}>(), {
  type: 'text',
  required: true,
  error: false,
})

const inputType = computed(() => {
  if (props.type === 'password')
    return showPassword.value ? 'text' : 'password'
  return props.type
})
</script>

<template>
  <div class="basic-input-wrapper">
    <q-input
      v-model="model"
      :type="inputType"
      :label="label"
      :hint="hint"
      :disable="disable"
      outlined
      dark
      dense
      color="primary"
      label-color="grey-5"
      class="basic-input"
      bg-color="transparent"
    >
      <template v-if="icon" #prepend>
        <basic-icon :name="icon" size="18px" color="muted" />
      </template>

      <template v-if="type === 'password'" #append>
        <basic-icon
          :name="showPassword ? 'visibility_off' : 'visibility'"
          size="18px"
          color="muted"
          class="cursor-pointer basic-input__toggle"
          @click="showPassword = !showPassword"
        />
      </template>
    </q-input>
  </div>
</template>

<style scoped lang="scss">
.basic-input-wrapper {
  width: 100%;
}

.basic-input {
  :deep(.q-field__control) {
    border-radius: 12px;
    background: rgba(26, 29, 39, 0.8) !important;
    border: 1px solid $border;
    transition: all 0.2s ease;
    height: 48px;

    &::before,
    &::after {
      border: none !important;
    }
  }

  :deep(.q-field__label) {
    color: $text-muted;
    font-size: 14px;
    top: 14px;
  }

  :deep(.q-field__native) {
    color: $text-primary;
    font-size: 14px;
    padding-top: 4px;
  }

  :deep(.q-field__marginal) {
    color: $text-muted;
    height: 48px;
  }

  :deep(.q-field--focused .q-field__control) {
    border-color: $primary !important;
    box-shadow: 0 0 0 3px rgba($primary, 0.12);
  }

  :deep(.q-field--focused .q-field__label) {
    color: $secondary !important;
  }

  :deep(.q-field--error .q-field__control) {
    border-color: $negative !important;
    box-shadow: 0 0 0 3px rgba($negative, 0.12);
  }

  :deep(.q-field__control:hover::before) {
    border-color: transparent !important;
  }
}

:deep(.q-field--dense.q-field--float .q-field__label) {
  transform: translateY(-55%) scale(0.70)!important;
}

.basic-input__toggle {
  transition: color 0.2s ease;

  &:hover {
    color: $secondary !important;
  }
}
</style>
