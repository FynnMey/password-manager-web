<script setup lang="ts">
import { useVaultStore } from '@/stores/vaultStore'
import BasicListItem from '@/components/common/list/BasicListItem.vue'
import BasicIcon from '@/components/common/icon/BasicIcon.vue'

const vaultStore = useVaultStore()
</script>

<template>
  <div class="password-list">
    <q-list v-if="vaultStore.currentVault().length" class="password-list__list q-pa-sm">
      <basic-list-item
        v-for="(item) in vaultStore.currentVault()"
        :key="item.id"
        :label="item.name"
        :caption="item.account"
        :website="item.website"
        class="non-selectable"
        clickable
        border
        @click="vaultStore.activeFieldId = item.id"
      >
        <template #right>
          <basic-icon name="chevron_right" size="18px" color="muted" />
        </template>
      </basic-list-item>
    </q-list>

    <div v-else class="password-list__empty column items-center q-py-xl">
      <div class="password-list__empty-icon q-mb-md">
        <basic-icon name="lock_open" size="36px" color="muted" />
      </div>
      <div class="card-title q-mb-xs">Noch keine Passwörter</div>
      <div class="empty-state-text">
        Füge dein erstes Passwort hinzu,<br />
        um es sicher zu speichern.
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.password-list {
  &__list {
    border-radius: 16px;
    border: 1px solid $border;
    background: rgba(26, 29, 39, 0.6);
  }

  &__empty {
    border-radius: 16px;
    border: 1px dashed rgba($border, 0.8);
    background: rgba(26, 29, 39, 0.4);
  }

  &__empty-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: rgba($primary, 0.06);
    border: 1px solid rgba($primary, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
