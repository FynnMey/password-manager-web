<script setup lang="ts">
import NavigationLink from "@/components/header/navigation/NavigationLink.vue";
import { useDrawerStore } from "@/stores/drawerStore";
import { storeToRefs } from "pinia";
import { useNavigationItems } from "@/composabiles/useNavigationItems";
import {useUserStore} from "@/stores/userStore";

const drawerStore = useDrawerStore()
const { navigationDrawer } = storeToRefs(drawerStore)

const user = useUserStore()

const itemList = useNavigationItems
</script>

<template>
  <q-drawer v-if="user.isAuthenticated" v-model="navigationDrawer" show-if-above bordered>
    <q-list class="q-pa-md">
      <q-item-label header> Essential Links </q-item-label>
      <NavigationLink
        v-for="link in itemList"
        :key="'dsk-nav-' + link.label"
        :label="link.label"
      />
    </q-list>
  </q-drawer>
</template>

<style scoped lang="scss">

</style>
