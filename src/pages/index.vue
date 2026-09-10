<script setup lang="ts">
import DefaultHeader from '@/components/header/DefaultHeader.vue'
</script>

<template>
  <q-layout view="lHh Lpr lFf" class="vault-layout">
    <default-header />

    <q-page-container>
      <q-page class="q-px-md q-px-lg-lg q-py-lg">
        <div class="vault-layout__blob vault-layout__blob--1" />
        <div class="vault-layout__blob vault-layout__blob--2" />

        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss">
.vault-layout {
  background: #0F1117;

  &__page {
    background: #0F1117;
    min-height: 100vh;
  }

  &__blob {
    position: fixed;
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none;
    animation: blob-float 8s ease-in-out infinite;

    &--1 {
      width: 400px;
      height: 400px;
      background: rgba($primary, 0.12);
      top: -100px;
      right: -100px;
      animation-delay: 0s;
    }

    &--2 {
      width: 300px;
      height: 300px;
      background: rgba($accent, 0.08);
      bottom: -80px;
      left: -80px;
      animation-delay: -4s;
    }
  }
}

@keyframes blob-float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33%       { transform: translate(20px, -20px) scale(1.05); }
  66%       { transform: translate(-15px, 15px) scale(0.96); }
}
</style>
