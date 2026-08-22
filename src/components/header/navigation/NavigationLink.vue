<script setup lang="ts">
import {NavigationLinkProps} from "@/types/navigation/NavigationLinkProps";

withDefaults(defineProps<NavigationLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
})
</script>

<template>
  <q-item
    clickable
    tag="a"
    :href="link"
    class="border-radius"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ label }}</q-item-label>
      <q-item-label v-if="caption" caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<style scoped lang="scss">
.border-radius {
  border-radius: 10px;
}
</style>
