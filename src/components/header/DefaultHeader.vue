<script setup lang="ts">
import {useDrawerStore} from "@/stores/drawerStore";
import {storeToRefs} from "pinia";
import DesktopNavigationMenu from "@/components/header/navigation/DesktopNavigationMenu.vue";
import {useUserStore} from "@/stores/userStore";

const drawerStore = useDrawerStore()
const { navigationDrawer } = storeToRefs(drawerStore)

const user = useUserStore()

const toggleLeftDrawer = () => {
  navigationDrawer.value = !navigationDrawer.value;
}
</script>

<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn
        v-if="user.isAuthenticated"
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />

      <q-toolbar-title> Quasar App </q-toolbar-title>

      <div>Quasar v{{ $q.version }}</div>
    </q-toolbar>
  </q-header>

  <desktop-navigation-menu />
</template>

<style scoped lang="scss">

</style>
