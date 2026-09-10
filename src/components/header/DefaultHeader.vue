<script setup lang="ts">
import { useDrawerStore } from '@/stores/drawerStore'
import { storeToRefs } from 'pinia'
import DesktopNavigationMenu from '@/components/header/navigation/DesktopNavigationMenu.vue'
import { useUserStore } from '@/stores/userStore'
import BasicIconBox from '@/components/common/icon/BasicIconBox.vue'
import BasicIcon from '@/components/common/icon/BasicIcon.vue'

const drawerStore = useDrawerStore()
const { navigationDrawer } = storeToRefs(drawerStore)

const user = useUserStore()

const toggleLeftDrawer = () => {
  navigationDrawer.value = !navigationDrawer.value
}
</script>

<template>
  <q-header class="vault-header" bordered>
    <q-toolbar class="vault-header__toolbar">
      <q-btn
        v-if="user.isAuthenticated"
        flat
        dense
        round
        class="vault-header__menu-btn lt-md"
        aria-label="Navigation öffnen"
        @click="toggleLeftDrawer"
      >
        <basic-icon name="menu" size="22px" color="muted" />
      </q-btn>

      <router-link to="/" class="vault-header__brand">
        <basic-icon-box size="sm" variant="gradient">
          <basic-icon name="lock" size="18px" color="white" />
        </basic-icon-box>
        <span class="vault-header__title">VaultGuard</span>
      </router-link>

      <q-space />

      <div class="vault-header__right row items-center q-gutter-sm">
        <span class="vault-header__version">v{{ $q.version }}</span>

        <div v-if="user.isAuthenticated" class="vault-header__avatar">
          <basic-icon name="person" size="16px" color="secondary" />
        </div>
      </div>
    </q-toolbar>
  </q-header>

  <desktop-navigation-menu />
</template>

<style scoped lang="scss">
.vault-header {
  background: rgba(15, 17, 23, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid $border !important;
  box-shadow: 0 1px 24px rgba(0, 0, 0, 0.4);

  &__toolbar {
    min-height: 60px;
    padding: 0 16px;
  }

  &__menu-btn {
    margin-right: 8px;

    &:hover {
      background: rgba(255, 255, 255, 0.06);
    }
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.85;
    }
  }

  &__title {
    font-size: 17px;
    font-weight: 700;
    color: $text-primary;
    letter-spacing: -0.01em;
  }

  &__right {
    align-items: center;
  }

  &__version {
    color: $text-muted;
    font-size: 11px;
    font-weight: 500;
  }

  &__avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba($primary, 0.15);
    border: 1px solid rgba($primary, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba($primary, 0.25);
      box-shadow: 0 0 12px rgba($primary, 0.3);
    }
  }
}
</style>
