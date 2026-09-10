<script setup lang="ts">
withDefaults(defineProps<{
  name: string
  size?: string
  color?: 'primary' | 'secondary' | 'accent' | 'muted' | 'positive' | 'negative' | 'warning' | 'white' | 'inherit'
}>(), {
  size: '20px',
  color: 'inherit',
})
</script>

<template>
  <q-icon :name="name" :size="size" :class="`icon-color--${color}`" />
</template>

<style lang="scss">
.icon-color--primary   { color: $primary; }
.icon-color--secondary { color: $secondary; }
.icon-color--accent    { color: $accent; }
.icon-color--muted     { color: $text-muted; }
.icon-color--positive  { color: $positive; }
.icon-color--negative  { color: $negative; }
.icon-color--warning   { color: $warning; }
.icon-color--white     { color: #ffffff; }
.icon-color--inherit   { color: inherit; }
</style>
