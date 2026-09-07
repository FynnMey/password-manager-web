<script setup lang="ts">
withDefaults(defineProps<{
  fullWidth?: boolean,
  bordered?: boolean,
  maxWidth?: string,
}>(), {
  fullWidth: true,
  bordered: true,
  maxWidth: '600px',
})
</script>

<template>
  <q-card
    :class="fullWidth ? 'full-width' : ''"
    :bordered="bordered"
    class="basic-card-border-radius basic-card-box-shadow"
    :style="maxWidth ? `max-width: ${maxWidth}` : ''"
  >
    <q-card-section>
      <slot />
    </q-card-section>
  </q-card>
</template>

<style scoped lang="scss">
.basic-card-border-radius {
  border-radius: 10px;
}

.basic-card-box-shadow {
  box-shadow: 0 0 22px rgba($primary, 0.45);
  transition: 0.3s;
}

.basic-card-box-shadow:hover {
  box-shadow: 0 0 22px rgba($primary, 0.65);
  transition: 0.3s;
}
</style>
