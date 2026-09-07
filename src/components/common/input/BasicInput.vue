<script setup lang="ts">
import {QInputType} from "quasar";
import {computed, ref} from "vue";

const model = defineModel<string>({ required: true })
const disable = defineModel<boolean>('disable')

const showPassword = ref(false)

const props = withDefaults(defineProps<{
  label?: string,
  type?: QInputType,
  icon?: string,
  required?: boolean,
}>(), {
  type: 'text',
  required: true,
})

const inputType = computed(() => {
  if (props.type === 'password')
    return showPassword.value ? 'text' : 'password'

  return props.type
})
</script>

<template>
  <q-input
    v-model="model"
    :type="inputType"
    outlined
    dark
    color="primary"
    :label="label"
    class="basic-input"
    :disable="disable"
  >
    <template v-if="icon" #prepend>
      <q-icon :name="icon" />
    </template>

    <template v-if="type === 'password'" #append>
      <q-icon
        :name="showPassword ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="showPassword = !showPassword"
      />
    </template>
  </q-input>
</template>

<style scoped lang="scss">
.basic-input :deep(.q-field__control) {
  border-radius: 12px;
}
</style>
