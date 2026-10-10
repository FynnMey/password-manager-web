<script setup lang="ts">
withDefaults(
  defineProps<{
    autofocus?: boolean
    greedy?: boolean
  }>(),
  {
    autofocus: false,
    greedy: false,
  }
)

defineEmits<{
  submit: [event: Event]
  reset: []
}>()
</script>

<template>
  <q-form
    :autofocus="autofocus"
    :greedy="greedy"
    class="basic-form"
    @submit.prevent="$emit('submit', $event)"
    @reset="$emit('reset')"
  >
    <slot />
  </q-form>
</template>

<style scoped lang="scss">
.basic-form {
  width: 100%;
}
</style>
