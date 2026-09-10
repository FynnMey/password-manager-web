<script setup lang="ts">
import BasicIcon from '@/components/common/icon/BasicIcon.vue'

defineProps<{
  message: string
}>()
</script>

<template>
  <div v-if="message" class="error-banner">
    <basic-icon name="error_outline" size="14px" color="negative" />
    <span>{{ message }}</span>
  </div>
</template>

<style lang="scss">
.error-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 10px;
  background: rgba($negative, 0.1);
  border: 1px solid rgba($negative, 0.25);
  color: lighten($negative, 15%);
  font-size: 13px;
}
</style>
