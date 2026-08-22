<script setup lang="ts">
import DesktopNavigationMenu from "@/components/header/navigation/DesktopNavigationMenu.vue";
import DefaultHeader from "@/components/header/DefaultHeader.vue";
</script>


<template>
  <q-layout view="lHh Lpr lFf">
    <default-header />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
