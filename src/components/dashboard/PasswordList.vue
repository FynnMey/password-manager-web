<script setup lang="ts">
import { useVaultStore } from '@/stores/vaultStore'
import { storeToRefs } from 'pinia'
import { useCryptoStore } from '@/stores/cryptoStore'
import { ref, watchEffect } from 'vue'
import BasicListItem from '@/components/common/list/BasicListItem.vue'
import BasicIcon from '@/components/common/icon/BasicIcon.vue'
import BasicBadge from "@/components/common/badge/BasicBadge.vue";

const vaultStore = useVaultStore()
const { vault } = storeToRefs(vaultStore)

const crypto = useCryptoStore()

const decrypt = async (value: string) => {
  return await crypto.decrypt(value)
}

interface DecryptedEntry {
  name: string
  account: string
}

const decryptedVault = ref<DecryptedEntry[]>([])

watchEffect(async () => {
  const promises = vault.value.map(async (item) => ({
    name: await decrypt(item.name),
    account: await decrypt(item.account),
  }))
  decryptedVault.value = await Promise.all(promises)
})
</script>

<template>
  <div class="password-list">
    <div class="row items-center justify-between q-mb-md">
      <div class="section-label">Gespeicherte Passwörter</div>
      <basic-badge
        :label="`${decryptedVault.length} ${decryptedVault.length === 1 ? 'Eintrag' : 'Einträge'}`"
      />
    </div>

    <q-list v-if="decryptedVault.length" class="password-list__list q-pa-sm">
      <basic-list-item
        v-for="(item, index) in decryptedVault"
        :key="`vault-${index}`"
        :label="item.name"
        :caption="item.account"
        class="non-selectable"
        icon="lock"
        clickable
        border
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
