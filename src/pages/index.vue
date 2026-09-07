<script setup lang="ts">
import DesktopNavigationMenu from "@/components/header/navigation/DesktopNavigationMenu.vue";
import DefaultHeader from "@/components/header/DefaultHeader.vue";
</script>


<template>
  <q-layout view="lHh Lpr lFf">
    <default-header />

    <q-page-container>
      <q-page class="q-px-lg q-py-md">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
