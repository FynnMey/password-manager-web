<script setup lang="ts">
const isLoading = defineModel<boolean>('loading')

withDefaults(defineProps<{
  disable?: boolean
}>(), {

})
</script>

<template>
  <q-btn
    type="submit"
    label="Login"
    color="secondary"
    class="full-width q-pa-sm"
    rounded
    icon="key"
    :loading="isLoading"
    :disable="disable"
  />
</template>

<style scoped lang="scss">

</style>
