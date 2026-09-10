<script setup lang="ts">
import NavigationLink from '@/components/header/navigation/NavigationLink.vue'
import { useDrawerStore } from '@/stores/drawerStore'
import { storeToRefs } from 'pinia'
import { useNavigationItems } from '@/composabiles/useNavigationItems'
import { useUserStore } from '@/stores/userStore'
import BasicIcon from '@/components/common/icon/BasicIcon.vue'

const drawerStore = useDrawerStore()
const { navigationDrawer } = storeToRefs(drawerStore)

const user = useUserStore()

const itemList = useNavigationItems
</script>

<template>
  <q-drawer
    v-if="user.isAuthenticated"
    v-model="navigationDrawer"
    show-if-above
    class="vault-drawer"
    :width="240"
  >
    <div class="vault-drawer__header q-px-md q-pt-lg q-pb-md">
      <div class="section-label">Navigation</div>
    </div>

    <q-list class="q-px-sm q-pb-md">
      <NavigationLink
        v-for="link in itemList"
        :key="'nav-' + link.label"
        :label="link.label"
        :caption="link.caption"
        :icon="link.icon"
        :link="link.link"
      />
    </q-list>

    <div class="vault-drawer__footer q-px-md q-pb-md">
      <div class="vault-drawer__divider" />
      <div class="row items-center q-gutter-xs q-mt-md">
        <basic-icon name="shield" size="14px" color="positive" />
        <span class="vault-drawer__footer-text">End-to-End Encrypted</span>
      </div>
    </div>
  </q-drawer>
</template>

<style scoped lang="scss">
.vault-drawer {
  background: $dark-page !important;
  border-right: 1px solid $border !important;

  &__header {
    border-bottom: 1px solid rgba($border, 0.5);
  }

  &__footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  &__divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, $border, transparent);
  }

  &__footer-text {
    color: $text-muted;
    font-size: 11px;
  }
}
</style>
