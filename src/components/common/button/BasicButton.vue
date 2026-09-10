<script setup lang="ts">
const isLoading = defineModel<boolean>('loading')

withDefaults(defineProps<{
  label?: string,
  icon?: string,
  disable?: boolean
}>(), {

})
</script>

<template>
  <q-btn
    type="submit"
    :label="label"
    color="secondary"
    class="full-width q-pa-sm"
    rounded
    :icon="icon"
    :loading="isLoading"
    :disable="disable"
  />
</template>

<style scoped lang="scss">

</style>
