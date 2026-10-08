<script setup lang="ts">
import BasicCard from "@/components/common/card/BasicCard.vue"
import BasicInput from "@/components/common/input/BasicInput.vue"
import BasicButton from "@/components/common/button/BasicButton.vue"
import BasicIconBox from "@/components/common/icon/BasicIconBox.vue"
import BasicIcon from "@/components/common/icon/BasicIcon.vue"
import {useVaultStore} from "@/stores/vaultStore"
import {storeToRefs} from "pinia";

const vaultStore = useVaultStore()
const { searchField } = storeToRefs(vaultStore)
</script>

<template>
  <div class="col-12 col-md-4">
    <basic-card variant="flat" padding="q-pa-md" max-width="100%">
      <div class="q-mb-md">
        <div class="section-label q-mb-sm">Durchsuchen</div>
        <basic-input
          v-model="searchField"
          label="Tresor durchsuchen"
        />
      </div>

      <div class="q-mb-md">
        <basic-button
          label="Neues Passwort"
          icon="add"
          to="/create/password"
          size="md"
        />
      </div>

      <div class="dashboard-info q-pa-md">
        <div class="row items-center q-gutter-sm q-mb-xs">
          <basic-icon-box size="xs" variant="soft">
            <basic-icon name="info_outline" size="14px" color="secondary" />
          </basic-icon-box>
          <span class="card-title">Tipp</span>
        </div>
        <div class="card-subtitle">
          Verwende für jede Seite ein einzigartiges, zufällig generiertes Passwort.
        </div>
      </div>

    </basic-card>
  </div>
</template>

<style scoped lang="scss">
.dashboard-info {
  background: rgba($primary, 0.04);
  border: 1px solid rgba($primary, 0.12);
  border-radius: 12px;
}
</style>
